import { createLayerComponent, type LayerProps } from '@react-leaflet/core'
import { MaptilerLayer, Language } from '@maptiler/leaflet-maptilersdk'
import type { LanguageInfo, Map as MapTilerSDKMap } from '@maptiler/sdk'
import type { LayerSpecification } from 'maplibre-gl'
import '@maptiler/sdk/dist/maptiler-sdk.css'
import type { Layer } from 'leaflet'

export type MapLang = 'ko' | 'en'

const LANGUAGE: Record<MapLang, LanguageInfo> = {
  ko: Language.KOREAN,
  en: Language.ENGLISH,
}

// 배경 지도의 바다 이름 라벨 중 표시를 바꾸고 싶은 것들.
// key: MapTiler 기본 데이터에 들어있는 이름, value: 화면에 대신 표시할 이름.
const SEA_LABEL_OVERRIDES: Record<string, string> = {
  'Sea of Japan': 'East Sea',
}

// OpenMapTiles 스키마(대부분의 벡터 지도 공급자가 따르는 표준 스키마)에서
// 바다 이름 라벨은 water_name 소스 레이어의 심볼 레이어에 들어있습니다.
// 원래 표현식은 그대로 두고, 특정 이름일 때만 대체 표시명으로 바꾸는
// case 표현식으로 감쌉니다.
function applySeaLabelOverrides(map: MapTilerSDKMap) {
  const layers = map.getStyle()?.layers as LayerSpecification[] | undefined
  if (!layers) return
  for (const layer of layers) {
    if (layer.type !== 'symbol' || layer['source-layer'] !== 'water_name') continue
    const current = map.getLayoutProperty(layer.id, 'text-field')
    // 예전 방식의 "{name}" 토큰 문자열은 case 표현식과 섞이면 깨지므로
    // 안전하게 건너뜁니다(최신 MapTiler 스타일은 배열 표현식을 사용합니다).
    if (!Array.isArray(current)) continue
    if (JSON.stringify(current).includes('East Sea')) continue // 이미 적용됨

    let expr: unknown = current
    for (const [original, replacement] of Object.entries(SEA_LABEL_OVERRIDES)) {
      expr = ['case', ['==', ['get', 'name'], original], replacement, expr]
    }
    map.setLayoutProperty(layer.id, 'text-field', expr)
  }
}

// 스타일이 (재)로드될 때마다 라벨 대체를 다시 적용합니다(지도/위성 전환,
// 언어 전환 시 스타일 전체가 새로 로드되어 이전 수정 내용이 초기화되므로).
function watchSeaLabelOverrides(map: MapTilerSDKMap) {
  map.on('styledata', () => applySeaLabelOverrides(map))
  if (map.isStyleLoaded()) applySeaLabelOverrides(map)
}

// MapTiler 벡터 지도를 Leaflet 레이어로 감싼 컴포넌트.
// style/language 변경 시 레이어를 새로 만들지 않고 SDK의 setStyle/setLanguage 로 갱신합니다.
interface MapTilerLayerProps extends LayerProps {
  apiKey: string
  style: string
  lang: MapLang
}

interface MaptilerLayerInstance extends Layer {
  setStyle: (s: string) => void
  setLanguage: (l: LanguageInfo) => void
  getMaptilerSDKMap: () => MapTilerSDKMap
}

const MapTilerReactLayer = createLayerComponent<Layer, MapTilerLayerProps>(
  (props, context) => {
    const raw = new MaptilerLayer({
      apiKey: props.apiKey,
      style: props.style,
      language: LANGUAGE[props.lang],
    })
    // 내부 MapTiler SDK 지도는 Leaflet 이 레이어를 실제로 추가한 뒤에야 생성되므로,
    // 생성 직후에는 아직 준비되어 있지 않습니다. 'add' 이벤트 이후에 훅을 겁니다.
    raw.on('add', () => {
      const sdkMap = raw.getMaptilerSDKMap()
      if (sdkMap) watchSeaLabelOverrides(sdkMap)
    })
    const instance = raw as unknown as Layer
    return { instance, context }
  },
  (instance, props, prevProps) => {
    const layer = instance as unknown as MaptilerLayerInstance
    if (props.style !== prevProps.style) layer.setStyle(props.style)
    if (props.lang !== prevProps.lang) layer.setLanguage(LANGUAGE[props.lang])
  },
)

export default MapTilerReactLayer

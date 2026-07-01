import { createLayerComponent, type LayerProps } from '@react-leaflet/core'
import { MaptilerLayer, Language } from '@maptiler/leaflet-maptilersdk'
import type { LanguageInfo, Map as MapTilerSDKMap } from '@maptiler/sdk'
import '@maptiler/sdk/dist/maptiler-sdk.css'
import type { Layer } from 'leaflet'

export type MapLang = 'ko' | 'en'

const LANGUAGE: Record<MapLang, LanguageInfo> = {
  ko: Language.KOREAN,
  en: Language.ENGLISH,
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

// MapTiler SDK는 선택한 언어(name:ko / name:en) 표기가 없는 지명을 자동으로
// 현지어 원어 표기(name)로 대체해서 보여주는데, 그러면 한글 지도에 아랍어·터키어 등
// 현지 문자가, 영문 지도에도 마찬가지로 원어 표기가 섞여 보이게 됩니다.
// 해당 대체 표기를 제거해 선택한 언어 표기가 없으면 라벨을 비워 언어가 섞이지 않게 합니다.
function stripLocalFallback(map: MapTilerSDKMap) {
  const flag = map.getPrimaryLanguage()?.flag
  if (!flag || flag === 'name') return // LOCAL 등 이 로직이 적용되지 않는 모드
  const layers = map.getStyle()?.layers ?? []
  for (const layer of layers) {
    if (layer.type !== 'symbol') continue
    const textField = map.getLayoutProperty(layer.id, 'text-field')
    // MapTiler가 적용하는 형태: ["coalesce", ["get", "name:ko"], ["get", "name"]]
    if (
      Array.isArray(textField) &&
      textField[0] === 'coalesce' &&
      Array.isArray(textField[1]) &&
      textField[1][0] === 'get' &&
      textField[1][1] === flag
    ) {
      map.setLayoutProperty(layer.id, 'text-field', ['get', flag])
    }
  }
}

const MapTilerReactLayer = createLayerComponent<Layer, MapTilerLayerProps>(
  (props, context) => {
    const instance = new MaptilerLayer({
      apiKey: props.apiKey,
      style: props.style,
      language: LANGUAGE[props.lang],
    }) as unknown as MaptilerLayerInstance
    // 레이어가 지도에 실제로 추가된 뒤(onAdd)에야 내부 SDK 맵 인스턴스가 생기므로
    // 'add' 이벤트에서 훅을 걸고, 이후 스타일/언어가 바뀔 때마다(styledata) 다시 적용합니다.
    instance.on('add', () => {
      const sdkMap = instance.getMaptilerSDKMap()
      sdkMap.on('styledata', () => stripLocalFallback(sdkMap))
    })
    return { instance: instance as unknown as Layer, context }
  },
  (instance, props, prevProps) => {
    const layer = instance as unknown as MaptilerLayerInstance
    if (props.style !== prevProps.style) layer.setStyle(props.style)
    if (props.lang !== prevProps.lang) layer.setLanguage(LANGUAGE[props.lang])
  },
)

export default MapTilerReactLayer

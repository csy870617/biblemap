import { createLayerComponent, type LayerProps } from '@react-leaflet/core'
import { MaptilerLayer, Language } from '@maptiler/leaflet-maptilersdk'
import type { LanguageInfo } from '@maptiler/sdk'
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
}

const MapTilerReactLayer = createLayerComponent<Layer, MapTilerLayerProps>(
  (props, context) => {
    const instance = new MaptilerLayer({
      apiKey: props.apiKey,
      style: props.style,
      language: LANGUAGE[props.lang],
    }) as unknown as Layer
    return { instance, context }
  },
  (instance, props, prevProps) => {
    const layer = instance as unknown as MaptilerLayerInstance
    if (props.style !== prevProps.style) layer.setStyle(props.style)
    if (props.lang !== prevProps.lang) layer.setLanguage(LANGUAGE[props.lang])
  },
)

export default MapTilerReactLayer

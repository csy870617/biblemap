import { createLayerComponent, type LayerProps } from '@react-leaflet/core'
import { MaptilerLayer, Language } from '@maptiler/leaflet-maptilersdk'
import '@maptiler/sdk/dist/maptiler-sdk.css'
import type { Layer } from 'leaflet'

// MapTiler 벡터 지도를 Leaflet 레이어로 감싼 컴포넌트.
// language 를 지정해 지명을 원하는 언어(기본: 한국어)로 표시합니다.
interface MapTilerLayerProps extends LayerProps {
  apiKey: string
  style?: string
  language?: string
}

const MapTilerReactLayer = createLayerComponent<Layer, MapTilerLayerProps>((props, context) => {
  const instance = new MaptilerLayer({
    apiKey: props.apiKey,
    style: props.style,
    language: props.language ?? Language.KOREAN,
  }) as unknown as Layer
  return { instance, context }
})

export default MapTilerReactLayer

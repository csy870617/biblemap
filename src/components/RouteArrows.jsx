import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-polylinedecorator'

export default function RouteArrows({ path, color }) {
  const map = useMap()

  useEffect(() => {
    const latlngs = path.map((p) => [p.lat, p.lng])
    const polyline = L.polyline(latlngs, { opacity: 0 })

    const decorator = L.polylineDecorator(polyline, {
      patterns: [
        {
          offset: 25,
          repeat: 80,
          symbol: L.Symbol.arrowHead({
            pixelSize: 10,
            polygon: false,
            pathOptions: { stroke: true, color, weight: 2, opacity: 0.7 },
          }),
        },
      ],
    }).addTo(map)

    return () => {
      map.removeLayer(decorator)
    }
  }, [map, path, color])

  return null
}

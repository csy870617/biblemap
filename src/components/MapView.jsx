import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import locations from '../data/locations.json'
import routes from '../data/routes.json'
import RouteArrows from './RouteArrows'
import { useLang } from '../i18n/LangContext'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const JERUSALEM_CENTER = [31.7683, 35.2137]
const DEFAULT_ZOOM = 8

export default function MapView({ onSelectLocation, activeRouteId }) {
  const { lang } = useLang()
  const activeRoute = routes.find((r) => r.id === activeRouteId)

  return (
    <MapContainer
      center={JERUSALEM_CENTER}
      zoom={DEFAULT_ZOOM}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={20}
      />

      {/* Location markers */}
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]}
          eventHandlers={{
            click: () => onSelectLocation(location),
          }}
        >
          <Popup>{location[`name_${lang}`] || location.name_ko}</Popup>
        </Marker>
      ))}

      {/* Route polyline + arrows + waypoint dots */}
      {activeRoute && (
        <>
          <Polyline
            positions={activeRoute.path.map((p) => [p.lat, p.lng])}
            pathOptions={{
              color: activeRoute.color,
              weight: 3.5,
              opacity: 0.8,
              dashArray: '8 6',
            }}
          />
          <RouteArrows path={activeRoute.path} color={activeRoute.color} />
          {activeRoute.path.map((point, i) => (
            <CircleMarker
              key={`${activeRoute.id}-${i}`}
              center={[point.lat, point.lng]}
              radius={4}
              pathOptions={{
                color: activeRoute.color,
                fillColor: i === 0 ? '#fff' : activeRoute.color,
                fillOpacity: 1,
                weight: 2,
              }}
            >
              <Tooltip direction="top" offset={[0, -6]}>
                {point[`label_${lang}`] || point.label_ko}
              </Tooltip>
            </CircleMarker>
          ))}
        </>
      )}
    </MapContainer>
  )
}

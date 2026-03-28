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

function WaypointNumber({ center, index, color }) {
  return (
    <CircleMarker
      center={center}
      radius={10}
      pathOptions={{
        color: '#fff',
        fillColor: color,
        fillOpacity: 1,
        weight: 2,
      }}
    >
      <Tooltip direction="center" permanent className="waypoint-number">
        <span style={{ color: '#fff', fontSize: '9px', fontWeight: 700 }}>
          {index + 1}
        </span>
      </Tooltip>
    </CircleMarker>
  )
}

export default function MapView({ onSelectLocation, activeRouteIds }) {
  const { lang } = useLang()
  const activeRoutes = routes.filter((r) => activeRouteIds.has(r.id))

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

      {/* Route polylines + arrows + numbered waypoints */}
      {activeRoutes.map((route) => (
        <RouteLayer key={route.id} route={route} lang={lang} />
      ))}
    </MapContainer>
  )
}

function RouteLayer({ route, lang }) {
  const positions = route.path.map((p) => [p.lat, p.lng])

  return (
    <>
      <Polyline
        positions={positions}
        pathOptions={{
          color: route.color,
          weight: 3.5,
          opacity: 0.8,
          dashArray: '8 6',
        }}
      />
      <RouteArrows path={route.path} color={route.color} />
      {route.path.map((point, i) => (
        <CircleMarker
          key={`${route.id}-wp-${i}`}
          center={[point.lat, point.lng]}
          radius={9}
          pathOptions={{
            color: '#fff',
            fillColor: route.color,
            fillOpacity: 0.9,
            weight: 2,
          }}
        >
          <Tooltip
            direction="center"
            permanent
            className="waypoint-label"
          >
            <span style={{ color: '#fff', fontSize: '8px', fontWeight: 700 }}>
              {i + 1}
            </span>
          </Tooltip>
          <Popup>
            <strong>{i + 1}.</strong> {point[`label_${lang}`] || point.label_ko}
          </Popup>
        </CircleMarker>
      ))}
    </>
  )
}

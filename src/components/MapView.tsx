import { lazy, Suspense, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, Popup, LayersControl, useMap } from 'react-leaflet'
import GoogleLayer from 'react-leaflet-google-layer'
import L from 'leaflet'

// MapTiler(벡터/maplibre)는 무거우므로 키가 있을 때만 지연 로딩
const MapTilerLayer = lazy(() => import('./MapTilerLayer'))
import type { BibleMapTheme, LngLat } from '../data/maps'

// Google Maps API 키(선택). .env 의 VITE_GOOGLE_MAPS_API_KEY 로 주입.
const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const hasGoogle = !!GOOGLE_KEY
// 구글 지도 지명을 한국어로 표시
const googleConf = { apiKey: GOOGLE_KEY ?? '', language: 'ko', region: 'KR' }

// MapTiler API 키(선택). 있으면 한글 지명 벡터 지도 사용.
const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY
const hasMapTiler = !!MAPTILER_KEY
// 무료(OSM 영문)를 기본값으로 쓸지 여부 — 구글/맵타일러 키가 모두 없을 때만
const freeDefault = !hasGoogle && !hasMapTiler

interface Props {
  themes: BibleMapTheme[] // 지도에 표시할 테마들(비교 모드면 여러 개)
  activeId: string | null // 재생/강조 대상 테마
  selectedLocId: string | null
  onSelectLoc: (id: string) => void
  onSelectTheme: (id: string) => void
  playPos: number | null
}

// 번호 마커(journey)
function pinIcon(num: number, color: string, dim: boolean) {
  return L.divIcon({
    className: '',
    html: `<div class="map-marker${dim ? ' dim' : ''}" style="width:26px;height:26px;background:${color}"><span>${num}</span></div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
    popupAnchor: [0, -26],
  })
}

// 라벨 마커(region)
function labelIcon(name: string, color: string, dim: boolean) {
  return L.divIcon({
    className: '',
    html: `<div class="region-label${dim ? ' dim' : ''}" style="border-color:${color}"><i style="background:${color}"></i>${name}</div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
    popupAnchor: [0, -8],
  })
}

const movingIcon = L.divIcon({
  className: '',
  html: '<div class="moving-dot"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

function lerp(a: LngLat, b: LngLat, t: number): LngLat {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
}

function positionAt(coords: LngLat[], pos: number): LngLat {
  if (coords.length === 0) return [0, 0]
  if (pos <= 0) return coords[0]
  if (pos >= coords.length - 1) return coords[coords.length - 1]
  const i = Math.floor(pos)
  return lerp(coords[i], coords[i + 1], pos - i)
}

function drawnPath(coords: LngLat[], pos: number | null): LngLat[] {
  if (pos === null) return coords
  const i = Math.floor(pos)
  const head = coords.slice(0, i + 1)
  if (i < coords.length - 1) head.push(positionAt(coords, pos))
  return head
}

function MapController({
  themes,
  activeId,
  selectedLocId,
  playPos,
}: Pick<Props, 'themes' | 'activeId' | 'selectedLocId' | 'playPos'>) {
  const map = useMap()
  const boundsKey = themes.map((t) => t.id).join(',')
  const active = themes.find((t) => t.id === activeId) ?? null

  // 표시 테마 집합이 바뀌면 전체가 보이도록 맞춤
  useEffect(() => {
    if (themes.length === 0) return
    const pts = themes.flatMap((t) => t.locations.map((l) => l.coord))
    map.fitBounds(L.latLngBounds(pts), { padding: [60, 60], maxZoom: 8 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boundsKey, map])

  // 지점 선택 시 이동
  useEffect(() => {
    if (!active || !selectedLocId) return
    const loc = active.locations.find((l) => l.id === selectedLocId)
    if (loc) map.flyTo(loc.coord, Math.max(map.getZoom(), 7), { duration: 0.8 })
  }, [selectedLocId, active, map])

  // 재생 카메라 추적
  useEffect(() => {
    if (!active || playPos === null) return
    const pos = positionAt(active.locations.map((l) => l.coord), playPos)
    map.panTo(pos, { animate: true, duration: 0.4 })
  }, [playPos, active, map])

  return null
}

function ThemeLayer({
  theme,
  isActive,
  playPos,
  onSelectLoc,
  onSelectTheme,
}: {
  theme: BibleMapTheme
  isActive: boolean
  playPos: number | null
  onSelectLoc: (id: string) => void
  onSelectTheme: (id: string) => void
}) {
  const coords = theme.locations.map((l) => l.coord)
  const dim = !isActive
  const path = useMemo(
    () => (isActive ? drawnPath(coords, playPos) : coords),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme.id, isActive, playPos],
  )
  const visibleCount = isActive && playPos !== null ? Math.floor(playPos) + 1 : theme.locations.length

  return (
    <>
      {theme.kind === 'journey' && (
        <>
          <Polyline
            positions={path}
            pathOptions={{
              color: theme.color,
              weight: isActive ? 4 : 3,
              opacity: isActive ? 0.9 : 0.4,
              dashArray: '1 8',
              lineCap: 'round',
            }}
          />
          <Polyline
            positions={path}
            pathOptions={{ color: theme.color, weight: 2, opacity: isActive ? 0.45 : 0.2 }}
          />
        </>
      )}

      {theme.locations.map((loc, idx) => (
        <Marker
          key={theme.id + loc.id}
          position={loc.coord}
          icon={
            theme.kind === 'region'
              ? labelIcon(loc.name, theme.color, dim)
              : pinIcon(idx + 1, theme.color, dim || idx >= visibleCount)
          }
          eventHandlers={{
            click: () => {
              if (isActive) onSelectLoc(loc.id)
              else onSelectTheme(theme.id)
            },
          }}
        >
          <Popup>
            <b>
              {theme.kind === 'journey' ? `${idx + 1}. ` : ''}
              {loc.name}
            </b>
            <br />
            <span style={{ opacity: 0.7 }}>
              {loc.nameEn} · {theme.title}
            </span>
            <br />
            {loc.desc}
          </Popup>
        </Marker>
      ))}

      {isActive && theme.kind === 'journey' && playPos !== null && (
        <Marker position={positionAt(coords, playPos)} icon={movingIcon} interactive={false} />
      )}
    </>
  )
}

export default function MapView(props: Props) {
  const { themes, activeId, onSelectLoc, onSelectTheme, playPos, selectedLocId } = props
  const active = themes.find((t) => t.id === activeId) ?? null

  return (
    <div className="map-wrap">
      <MapContainer center={[33, 33]} zoom={5} scrollWheelZoom worldCopyJump>
        <LayersControl position="bottomright">
          {/* 구글 지도 (API 키가 있을 때만) — 한국어 지명 */}
          {hasGoogle && (
            <>
              <LayersControl.BaseLayer checked name="구글 지도 (한글)">
                <GoogleLayer apiKey={GOOGLE_KEY!} type="roadmap" googleMapsLoaderConf={googleConf} />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="구글 위성 (한글)">
                <GoogleLayer apiKey={GOOGLE_KEY!} type="hybrid" googleMapsLoaderConf={googleConf} />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="구글 지형 (한글)">
                <GoogleLayer apiKey={GOOGLE_KEY!} type="terrain" googleMapsLoaderConf={googleConf} />
              </LayersControl.BaseLayer>
            </>
          )}

          {/* MapTiler 벡터 지도 (API 키가 있을 때만) — 한국어 지명 */}
          {hasMapTiler && (
            <>
              <LayersControl.BaseLayer checked={!hasGoogle} name="MapTiler 지도 (한글)">
                <Suspense fallback={null}>
                  <MapTilerLayer apiKey={MAPTILER_KEY!} style="streets-v4" language="ko" />
                </Suspense>
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="MapTiler 위성 (한글)">
                <Suspense fallback={null}>
                  <MapTilerLayer apiKey={MAPTILER_KEY!} style="hybrid-v4" language="ko" />
                </Suspense>
              </LayersControl.BaseLayer>
            </>
          )}

          {/* 무료 지도 — 지명 영어 (Wikimedia osm-intl), 다른 키 없으면 기본값 */}
          <LayersControl.BaseLayer checked={freeDefault} name="일반 지도 (영문)">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · <a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>'
              url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
              maxZoom={18}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="일반 지도 (현지어)">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="지형 지도 (OpenTopo)">
            <TileLayer
              attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)'
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              maxZoom={17}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="위성 사진 (Esri)">
            <TileLayer
              attribution="Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {themes.map((theme) => (
          <ThemeLayer
            key={theme.id}
            theme={theme}
            isActive={theme.id === activeId}
            playPos={playPos}
            onSelectLoc={onSelectLoc}
            onSelectTheme={onSelectTheme}
          />
        ))}

        <MapController themes={themes} activeId={activeId} selectedLocId={selectedLocId} playPos={playPos} />
      </MapContainer>

      {active && (
        <div className="legend">
          <div className="lg-title">
            {active.icon} {active.title}
          </div>
          <div className="lg-row">{active.book}</div>
          <div className="lg-row">{active.era}</div>
          <div className="lg-row">
            {active.kind === 'journey' ? '번호 순서대로 이동' : '지역 분포'} · 지점 {active.locations.length}곳
          </div>
          {themes.length > 1 && (
            <div className="lg-row" style={{ marginTop: 6, opacity: 0.9 }}>
              비교 중: {themes.length}개 테마
            </div>
          )}
        </div>
      )}

      {themes.length === 0 && (
        <div className="empty-hint">
          <div className="box">
            왼쪽에서 성경 지도 테마를 선택하세요.
            <br />
            여러 개를 함께 켜서 비교할 수도 있습니다.
          </div>
        </div>
      )}
    </div>
  )
}

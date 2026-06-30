import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { BibleMapTheme, LngLat } from '../data/maps'

interface Props {
  theme: BibleMapTheme | null
  selectedLocId: string | null
  onSelectLoc: (id: string) => void
  playPos: number | null // 재생 중 현재 진행도(실수 index), null이면 정지
}

// 번호 마커 아이콘 생성
function numberIcon(num: number, color: string, dim: boolean) {
  return L.divIcon({
    className: '',
    html: `<div class="map-marker${dim ? ' dim' : ''}" style="width:28px;height:28px;background:${color}"><span>${num}</span></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  })
}

const movingIcon = L.divIcon({
  className: '',
  html: '<div class="moving-dot"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

// 두 좌표 사이를 t(0~1)로 보간
function lerp(a: LngLat, b: LngLat, t: number): LngLat {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
}

// 경로 위 playPos 위치의 좌표 계산
function positionAt(coords: LngLat[], pos: number): LngLat {
  if (coords.length === 0) return [0, 0]
  if (pos <= 0) return coords[0]
  if (pos >= coords.length - 1) return coords[coords.length - 1]
  const i = Math.floor(pos)
  return lerp(coords[i], coords[i + 1], pos - i)
}

// 경로를 playPos까지 잘라낸 라인
function drawnPath(coords: LngLat[], pos: number | null): LngLat[] {
  if (pos === null) return coords
  const i = Math.floor(pos)
  const head = coords.slice(0, i + 1)
  if (i < coords.length - 1) head.push(positionAt(coords, pos))
  return head
}

// 선택/재생에 따라 지도 시점 이동
function MapController({ theme, selectedLocId, playPos }: Props) {
  const map = useMap()

  // 테마 변경 시 전체 경로가 보이도록 맞춤
  useEffect(() => {
    if (!theme) return
    const bounds = L.latLngBounds(theme.locations.map((l) => l.coord))
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 8 })
  }, [theme, map])

  // 지점 선택 시 해당 위치로 이동
  useEffect(() => {
    if (!theme || !selectedLocId) return
    const loc = theme.locations.find((l) => l.id === selectedLocId)
    if (loc) map.flyTo(loc.coord, Math.max(map.getZoom(), 7), { duration: 0.8 })
  }, [selectedLocId, theme, map])

  // 재생 중 카메라가 진행 위치를 따라감
  useEffect(() => {
    if (!theme || playPos === null) return
    const pos = positionAt(theme.locations.map((l) => l.coord), playPos)
    map.panTo(pos, { animate: true, duration: 0.4 })
  }, [playPos, theme, map])

  return null
}

export default function MapView(props: Props) {
  const { theme, onSelectLoc, playPos } = props
  const coords = useMemo(() => theme?.locations.map((l) => l.coord) ?? [], [theme])
  const path = useMemo(() => drawnPath(coords, playPos), [coords, playPos])
  const visibleCount = playPos === null ? coords.length : Math.floor(playPos) + 1

  return (
    <div className="map-wrap">
      <MapContainer
        center={[33, 33]}
        zoom={5}
        scrollWheelZoom
        worldCopyJump
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {theme && (
          <>
            <Polyline
              positions={path}
              pathOptions={{ color: theme.color, weight: 4, opacity: 0.9, dashArray: '1 8', lineCap: 'round' }}
            />
            <Polyline
              positions={path}
              pathOptions={{ color: theme.color, weight: 2, opacity: 0.45 }}
            />

            {theme.locations.map((loc, idx) => (
              <Marker
                key={loc.id}
                position={loc.coord}
                icon={numberIcon(idx + 1, theme.color, idx >= visibleCount)}
                eventHandlers={{ click: () => onSelectLoc(loc.id) }}
              >
                <Popup>
                  <b>
                    {idx + 1}. {loc.name}
                  </b>
                  <br />
                  <span style={{ opacity: 0.7 }}>{loc.nameEn}</span>
                  <br />
                  {loc.desc}
                </Popup>
              </Marker>
            ))}

            {playPos !== null && (
              <Marker position={positionAt(coords, playPos)} icon={movingIcon} interactive={false} />
            )}

            <MapController {...props} />
          </>
        )}
      </MapContainer>

      {theme && (
        <div className="legend">
          <div className="lg-title">
            {theme.icon} {theme.title}
          </div>
          <div className="lg-row">{theme.book}</div>
          <div className="lg-row">{theme.era}</div>
          <div className="lg-row">지점 {theme.locations.length}곳 · 번호 순서대로 이동</div>
        </div>
      )}

      {!theme && (
        <div className="empty-hint">
          <div className="box">
            왼쪽에서 성경 지도 테마를 선택하세요.
            <br />
            여정의 경로와 지점별 말씀을 함께 볼 수 있습니다.
          </div>
        </div>
      )}
    </div>
  )
}

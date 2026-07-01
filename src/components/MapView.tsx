import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, Popup, ZoomControl, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { BibleMapTheme, LngLat } from '../data/maps'
import type { MapLang } from './MapTilerLayer'

// MapTiler(벡터/maplibre)는 무거우므로 키가 있을 때만 지연 로딩
const MapTilerLayer = lazy(() => import('./MapTilerLayer'))

// MapTiler API 키(선택). 있으면 한글/영문 지명 벡터 지도 사용.
const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY
const hasMapTiler = !!MAPTILER_KEY

type MapStyleKind = 'map' | 'satellite'
const STYLE_ID: Record<MapStyleKind, string> = { map: 'streets-v4', satellite: 'hybrid-v4' }

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

// 배경 지도의 바다 이름 표기 위에 우리가 직접 덮어 그리는 라벨.
// MapTiler 배경 지도 자체의 라벨(예: "Sea of Japan")은 그대로 둔 채,
// 그 위에 항상 우리 표기가 보이도록 별도 마커로 그립니다.
const SEA_LABEL_OVERLAYS: { coord: LngLat; text: string }[] = [{ coord: [40.0, 135.0], text: 'East Sea' }]
function seaLabelIcon(text: string) {
  return L.divIcon({
    className: '',
    html: `<div class="sea-label">${text}</div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  })
}

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
  // playPos 는 매 프레임(rAF)마다 갱신되므로, 여기서 또 애니메이션을 걸면
  // 이전 이동이 끝나기 전에 계속 새로 시작되어 화면이 흔들리게 됩니다.
  // 애니메이션 없이 즉시 이동시켜야 부드럽게 따라갑니다.
  useEffect(() => {
    if (!active || playPos === null) return
    const pos = positionAt(active.locations.map((l) => l.coord), playPos)
    map.panTo(pos, { animate: false })
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
          key={`${theme.id}:${loc.id}`}
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
          <Popup maxWidth={240}>
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

// 지도 스타일(지도/위성) · 언어(한글/영어) 전환 컨트롤
function MapStyleSwitcher({
  styleKind,
  lang,
  onStyleChange,
  onLangChange,
}: {
  styleKind: MapStyleKind
  lang: MapLang
  onStyleChange: (s: MapStyleKind) => void
  onLangChange: (l: MapLang) => void
}) {
  if (!hasMapTiler) return null
  return (
    <div className="map-switcher" role="group" aria-label="지도 표시 설정">
      <div className="switcher-row">
        <button
          className={styleKind === 'map' ? 'on' : ''}
          onClick={() => onStyleChange('map')}
          aria-pressed={styleKind === 'map'}
        >
          🗺️ 지도
        </button>
        <button
          className={styleKind === 'satellite' ? 'on' : ''}
          onClick={() => onStyleChange('satellite')}
          aria-pressed={styleKind === 'satellite'}
        >
          🛰️ 위성
        </button>
      </div>
      <div className="switcher-row">
        <button className={lang === 'ko' ? 'on' : ''} onClick={() => onLangChange('ko')} aria-pressed={lang === 'ko'}>
          한글
        </button>
        <button className={lang === 'en' ? 'on' : ''} onClick={() => onLangChange('en')} aria-pressed={lang === 'en'}>
          English
        </button>
      </div>
    </div>
  )
}

export default function MapView(props: Props) {
  const { themes, activeId, onSelectLoc, onSelectTheme, playPos, selectedLocId } = props
  const active = themes.find((t) => t.id === activeId) ?? null
  const [styleKind, setStyleKind] = useState<MapStyleKind>('map')
  const [lang, setLang] = useState<MapLang>('ko')

  return (
    <div className="map-wrap">
      <MapContainer center={[33, 33]} zoom={5} scrollWheelZoom worldCopyJump zoomControl={false}>
        <ZoomControl position="bottomleft" />

        {hasMapTiler ? (
          <Suspense fallback={<div className="map-loading"><div className="box">지도를 불러오는 중…</div></div>}>
            <MapTilerLayer apiKey={MAPTILER_KEY!} style={STYLE_ID[styleKind]} lang={lang} />
          </Suspense>
        ) : (
          // 안전망: 키가 설정되지 않은 개발 환경에서 지도가 완전히 빈 화면이 되지 않도록 함
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}

        {SEA_LABEL_OVERLAYS.map((label) => (
          <Marker key={label.text} position={label.coord} icon={seaLabelIcon(label.text)} interactive={false} />
        ))}

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

      <MapStyleSwitcher styleKind={styleKind} lang={lang} onStyleChange={setStyleKind} onLangChange={setLang} />

      {!hasMapTiler && (
        <div className="key-missing-badge">MapTiler API 키가 설정되지 않아 기본 지도로 표시됩니다.</div>
      )}

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
            왼쪽 메뉴에서 성경 지도 테마를 선택하세요.
            <br />
            여러 개를 함께 켜서 비교할 수도 있습니다.
          </div>
        </div>
      )}
    </div>
  )
}

import { useCallback, useEffect, useRef, useState } from 'react'
import MapView from './components/MapView'
import Sidebar from './components/Sidebar'
import { THEMES } from './data/maps'

export default function App() {
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null)
  const [selectedLocId, setSelectedLocId] = useState<string | null>(null)
  const [playPos, setPlayPos] = useState<number | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastTsRef = useRef<number>(0)

  const theme = THEMES.find((t) => t.id === selectedThemeId) ?? null

  const stopPlay = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    setPlayPos(null)
  }, [])

  const handleSelectTheme = (id: string) => {
    stopPlay()
    setSelectedThemeId(id)
    setSelectedLocId(null)
  }

  const handleSelectLoc = (id: string) => {
    stopPlay()
    setSelectedLocId(id)
  }

  // 여정 재생: requestAnimationFrame으로 진행도 증가
  const play = useCallback(() => {
    if (!theme) return
    const last = theme.locations.length - 1
    if (last <= 0) return
    stopPlay()
    const SPEED = 0.55 // 초당 진행 지점 수
    let pos = 0
    setPlayPos(0)
    setSelectedLocId(null)
    lastTsRef.current = 0

    const step = (ts: number) => {
      if (lastTsRef.current === 0) lastTsRef.current = ts
      const dt = (ts - lastTsRef.current) / 1000
      lastTsRef.current = ts
      pos += dt * SPEED
      if (pos >= last) {
        setPlayPos(last)
        rafRef.current = null
        // 재생 종료 후 잠시 뒤 정지 상태(전체 경로)로 복귀
        window.setTimeout(() => setPlayPos(null), 900)
        return
      }
      setPlayPos(pos)
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
  }, [theme, stopPlay])

  useEffect(() => () => stopPlay(), [stopPlay])

  return (
    <div className="app">
      <aside className="sidebar">
        <Sidebar selectedThemeId={selectedThemeId} onSelectTheme={handleSelectTheme} />

        {theme && (
          <div className="detail">
            <div className="head">
              <div className="ttl">
                {theme.icon} {theme.title}
              </div>
              <div className="smy">{theme.summary}</div>
            </div>

            <div className="player">
              {playPos === null ? (
                <button className="btn primary" onClick={play}>
                  ▶ 여정 재생
                </button>
              ) : (
                <button className="btn" onClick={stopPlay}>
                  ■ 정지
                </button>
              )}
              <button
                className="btn"
                onClick={() => {
                  stopPlay()
                  setSelectedLocId(null)
                }}
              >
                ⤢ 전체 보기
              </button>
            </div>

            <div className="loc-list">
              {theme.locations.map((loc, idx) => (
                <div
                  key={loc.id}
                  className={`loc-item${loc.id === selectedLocId ? ' active' : ''}`}
                  onClick={() => handleSelectLoc(loc.id)}
                >
                  <div className="num" style={{ background: theme.color }}>
                    {idx + 1}
                  </div>
                  <div className="body">
                    <div className="nm">
                      {loc.name}
                      {loc.modern ? <span style={{ color: 'var(--muted)', fontWeight: 400 }}> · {loc.modern}</span> : null}
                    </div>
                    <div className="en">{loc.nameEn}</div>
                    <div className="refs">
                      {loc.refs.map((r) => (
                        <span className="ref-chip" key={r}>
                          {r}
                        </span>
                      ))}
                    </div>
                    <div className="ds">{loc.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      <MapView
        theme={theme}
        selectedLocId={selectedLocId}
        onSelectLoc={handleSelectLoc}
        playPos={playPos}
      />
    </div>
  )
}

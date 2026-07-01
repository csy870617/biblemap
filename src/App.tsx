import { useCallback, useEffect, useRef, useState } from 'react'
import MapView from './components/MapView'
import Sidebar from './components/Sidebar'
import Timeline from './components/Timeline'
import VersePanel from './components/VersePanel'
import { THEMES } from './data/maps'

export default function App() {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [selectedLocId, setSelectedLocId] = useState<string | null>(null)
  const [playPos, setPlayPos] = useState<number | null>(null)
  const [verseRef, setVerseRef] = useState<string | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastTsRef = useRef<number>(0)

  const themes = selectedIds.map((id) => THEMES.find((t) => t.id === id)!).filter(Boolean)
  const active = THEMES.find((t) => t.id === activeId) ?? null

  const stopPlay = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    setPlayPos(null)
  }, [])

  // 단독 보기: 해당 테마만 표시하고 활성화
  const openTheme = (id: string) => {
    stopPlay()
    setSelectedIds([id])
    setActiveId(id)
    setSelectedLocId(null)
  }

  // 비교 목록 토글
  const toggleCompare = (id: string) => {
    stopPlay()
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        const next = prev.filter((x) => x !== id)
        if (activeId === id) setActiveId(next[0] ?? null)
        return next
      }
      if (!activeId) setActiveId(id)
      return [...prev, id]
    })
  }

  const selectLoc = (id: string) => {
    stopPlay()
    setSelectedLocId(id)
  }

  // 비교 중 특정 테마를 활성으로 전환(지도 마커 클릭 등)
  const activateTheme = (id: string) => {
    stopPlay()
    setActiveId(id)
    setSelectedLocId(null)
  }

  const play = useCallback(() => {
    if (!active || active.kind !== 'journey') return
    const last = active.locations.length - 1
    if (last <= 0) return
    stopPlay()
    const SPEED = 0.55
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
        window.setTimeout(() => setPlayPos(null), 900)
        return
      }
      setPlayPos(pos)
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
  }, [active, stopPlay])

  useEffect(() => () => stopPlay(), [stopPlay])

  return (
    <div className="app">
      <aside className="sidebar">
        <Sidebar
          activeId={activeId}
          selectedIds={selectedIds}
          onOpenTheme={openTheme}
          onToggleCompare={toggleCompare}
        />

        {active && (
          <div className="detail">
            <div className="head">
              <div className="ttl">
                {active.icon} {active.title}
              </div>
              <div className="smy">{active.summary}</div>
            </div>

            <div className="player">
              {active.kind === 'journey' &&
                (playPos === null ? (
                  <button className="btn primary" onClick={play}>
                    ▶ 여정 재생
                  </button>
                ) : (
                  <button className="btn" onClick={stopPlay}>
                    ■ 정지
                  </button>
                ))}
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
              {active.locations.map((loc, idx) => (
                <div
                  key={loc.id}
                  className={`loc-item${loc.id === selectedLocId ? ' active' : ''}`}
                  onClick={() => selectLoc(loc.id)}
                >
                  <div className="num" style={{ background: active.color }}>
                    {active.kind === 'journey' ? idx + 1 : '•'}
                  </div>
                  <div className="body">
                    <div className="nm">
                      {loc.name}
                      {loc.modern ? <span style={{ color: 'var(--muted)', fontWeight: 400 }}> · {loc.modern}</span> : null}
                    </div>
                    <div className="en">{loc.nameEn}</div>
                    <div className="refs">
                      {loc.refs.map((r) => (
                        <button
                          className="ref-chip"
                          key={r}
                          onClick={(e) => {
                            e.stopPropagation()
                            setVerseRef(r)
                          }}
                          title="본문 보기"
                        >
                          {r}
                        </button>
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

      <div className="main">
        <MapView
          themes={themes}
          activeId={activeId}
          selectedLocId={selectedLocId}
          onSelectLoc={selectLoc}
          onSelectTheme={activateTheme}
          playPos={playPos}
        />
        <Timeline activeId={activeId} selectedIds={selectedIds} onSelect={openTheme} />
      </div>

      <VersePanel refStr={verseRef} onClose={() => setVerseRef(null)} />
    </div>
  )
}

import { THEMES } from '../data/maps'

interface Props {
  activeId: string | null
  selectedIds: string[]
  onSelect: (id: string) => void
}

// 연표 범위: BC 2100 ~ AD 100
const MIN = -2100
const MAX = 100
const TICKS = [-2000, -1500, -1000, -500, 0, 100]

function pct(year: number) {
  return ((year - MIN) / (MAX - MIN)) * 100
}

function yearLabel(y: number) {
  if (y === 0) return 'AD 1'
  return y < 0 ? `BC ${-y}` : `AD ${y}`
}

export default function Timeline({ activeId, selectedIds, onSelect }: Props) {
  return (
    <div className="timeline">
      <div className="timeline-label">연대표</div>
      <div className="timeline-track">
        {/* 눈금 */}
        {TICKS.map((t) => (
          <div key={t} className="tl-tick" style={{ left: `${pct(t)}%` }}>
            <span>{yearLabel(t)}</span>
          </div>
        ))}
        {/* 테마 마커 */}
        {THEMES.map((th, i) => {
          const active = th.id === activeId
          const selected = selectedIds.includes(th.id)
          return (
            <button
              key={th.id}
              className={`tl-dot${active ? ' active' : ''}${selected ? ' selected' : ''}`}
              style={{
                left: `${pct(th.year)}%`,
                background: th.color,
                // 라벨이 겹치지 않도록 위/아래 번갈아 배치
                bottom: i % 2 === 0 ? '22px' : '2px',
              }}
              title={`${th.title} · ${th.era}`}
              onClick={() => onSelect(th.id)}
            >
              <span className="tl-emoji">{th.icon}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

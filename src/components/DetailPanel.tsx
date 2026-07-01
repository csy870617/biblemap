import type { BibleMapTheme } from '../data/maps'

interface Props {
  theme: BibleMapTheme
  playPos: number | null
  selectedLocId: string | null
  onBack: () => void
  onPlay: () => void
  onStop: () => void
  onShowAll: () => void
  onSelectLoc: (id: string) => void
  onOpenVerse: (ref: string) => void
}

// 여정 상세·재생 화면. 목록과 동시에 보이지 않도록 별도 화면으로 분리했습니다.
export default function DetailPanel({
  theme,
  playPos,
  selectedLocId,
  onBack,
  onPlay,
  onStop,
  onShowAll,
  onSelectLoc,
  onOpenVerse,
}: Props) {
  return (
    <div className="detail">
      <div className="detail-nav">
        <button className="back-btn" onClick={onBack}>
          ← 목록
        </button>
      </div>

      <div className="head">
        <div className="ttl">
          {theme.icon} {theme.title}
        </div>
        <div className="smy">{theme.summary}</div>
      </div>

      <div className="player">
        {theme.kind === 'journey' &&
          (playPos === null ? (
            <button className="btn primary" onClick={onPlay}>
              ▶ 여정 재생
            </button>
          ) : (
            <button className="btn" onClick={onStop}>
              ■ 정지
            </button>
          ))}
        <button className="btn" onClick={onShowAll}>
          ⤢ 전체 보기
        </button>
      </div>

      <div className="loc-list">
        {theme.locations.map((loc, idx) => (
          <div
            key={loc.id}
            className={`loc-item${loc.id === selectedLocId ? ' active' : ''}`}
            onClick={() => onSelectLoc(loc.id)}
          >
            <div className="num" style={{ background: theme.color }}>
              {theme.kind === 'journey' ? idx + 1 : '•'}
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
                      onOpenVerse(r)
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
  )
}

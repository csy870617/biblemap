import { useMemo, useState } from 'react'
import type { BibleMapTheme } from '../data/maps'
import { THEMES } from '../data/maps'

interface Props {
  activeId: string | null
  selectedIds: string[]
  onOpenTheme: (id: string) => void // 단독 보기(활성화)
  onToggleCompare: (id: string) => void // 비교 목록 토글
}

export default function Sidebar({ activeId, selectedIds, onOpenTheme, onToggleCompare }: Props) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return THEMES
    return THEMES.filter((t) => {
      const hay = [t.title, t.subtitle, t.book, t.summary, ...t.locations.flatMap((l) => [l.name, l.nameEn, l.modern ?? '', ...l.refs])]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [query])

  const ot = filtered.filter((t) => t.testament === 'OT')
  const nt = filtered.filter((t) => t.testament === 'NT')

  const card = (t: BibleMapTheme) => {
    const isActive = t.id === activeId
    const isSelected = selectedIds.includes(t.id)
    return (
      <div
        key={t.id}
        className={`theme-card${isActive ? ' active' : ''}${isSelected && !isActive ? ' selected' : ''}`}
        onClick={() => onOpenTheme(t.id)}
        style={isActive ? { borderLeftColor: t.color } : isSelected ? { borderLeftColor: t.color, opacity: 0.95 } : undefined}
      >
        <div className="icon">{t.icon}</div>
        <div className="info">
          <div className="title">{t.title}</div>
          <div className="sub">{t.subtitle}</div>
          <div className="meta">
            {t.book} · {t.era}
          </div>
        </div>
        <button
          className={`compare-btn${isSelected ? ' on' : ''}`}
          title={isSelected ? '비교 목록에서 제거' : '비교 목록에 추가'}
          style={isSelected ? { background: t.color, borderColor: t.color } : undefined}
          onClick={(e) => {
            e.stopPropagation()
            onToggleCompare(t.id)
          }}
        >
          {isSelected ? '✓' : '＋'}
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="brand">
        <h1>
          <span className="pin">📍</span> BibleMap
        </h1>
        <p>성경 지도와 함께 말씀을 읽는 보조 도구</p>
      </div>

      <div className="search">
        <input
          placeholder="지명·성경 구절·테마 검색 (예: 에베소, 출애굽)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="theme-list">
        <div className="compare-hint">중복선택</div>
        {ot.length > 0 && <div className="section-label">구약 OLD TESTAMENT</div>}
        {ot.map(card)}
        {nt.length > 0 && <div className="section-label">신약 NEW TESTAMENT</div>}
        {nt.map(card)}
        {filtered.length === 0 && (
          <div className="section-label" style={{ opacity: 0.7 }}>
            검색 결과가 없습니다.
          </div>
        )}
        <div className="hint-row">＋ 를 눌러 여러 지도를 지도 위에서 함께 비교할 수 있어요.</div>
      </div>
    </>
  )
}

import { useMemo, useState } from 'react'
import type { BibleMapTheme } from '../data/maps'
import { THEMES, KEY_PLACES } from '../data/maps'

interface Props {
  activeId: string | null
  selectedIds: string[]
  onOpenTheme: (id: string) => void // 단독 보기(활성화)
  onSelectKeyPlace: (id: string) => void // 핵심지명 선택(목록에 머문 채 지도에만 표시)
  onToggleCompare: (id: string) => void // 비교 목록 토글
}

type SectionKey = 'OT' | 'NT' | 'KEY'

function matches(t: BibleMapTheme, q: string) {
  if (!q) return true
  const hay = [t.title, t.subtitle, t.book, t.summary, ...t.locations.flatMap((l) => [l.name, l.nameEn, l.modern ?? '', ...l.refs])]
    .join(' ')
    .toLowerCase()
  return hay.includes(q)
}

// activeId가 속한 섹션을 찾아 반환합니다. 상세 화면에서 목록으로 돌아왔을 때
// 방금 보고 있던 항목의 섹션이 접혀 숨어버리지 않도록 초기 펼침 상태를 정할 때 씁니다.
function sectionOf(id: string | null): SectionKey | null {
  if (!id) return null
  if (KEY_PLACES.some((t) => t.id === id)) return 'KEY'
  const theme = THEMES.find((t) => t.id === id)
  return theme ? theme.testament : null
}

// 같은 book(소주제)끼리 원래 순서를 유지하며 묶습니다. 핵심지명은 book이 모든 항목에
// 반복돼 카드마다 표시하는 대신 소주제 제목 하나로 묶어 보여주기 위해 사용합니다.
function groupByBook(themes: BibleMapTheme[]): { book: string; items: BibleMapTheme[] }[] {
  const groups: { book: string; items: BibleMapTheme[] }[] = []
  for (const t of themes) {
    const last = groups[groups.length - 1]
    if (last && last.book === t.book) last.items.push(t)
    else groups.push({ book: t.book, items: [t] })
  }
  return groups
}

export default function Sidebar({ activeId, selectedIds, onOpenTheme, onSelectKeyPlace, onToggleCompare }: Props) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<Record<SectionKey, boolean>>(() => {
    const initial: Record<SectionKey, boolean> = { OT: false, NT: false, KEY: false }
    const sec = sectionOf(activeId)
    if (sec) initial[sec] = true
    return initial
  })
  // 한 번에 하나의 섹션만 펼쳐지는 아코디언: 다른 섹션을 열면 나머지는 자동으로 닫힘
  const toggleSection = (s: SectionKey) =>
    setOpen((prev) => (prev[s] ? { ...prev, [s]: false } : { OT: false, NT: false, KEY: false, [s]: true }))

  const q = query.trim().toLowerCase()
  const ot = useMemo(() => THEMES.filter((t) => t.testament === 'OT').filter((t) => matches(t, q)), [q])
  const nt = useMemo(() => THEMES.filter((t) => t.testament === 'NT').filter((t) => matches(t, q)), [q])
  const keyPlaces = useMemo(() => KEY_PLACES.filter((t) => matches(t, q)), [q])
  const filtered = [...ot, ...nt, ...keyPlaces]
  // 검색 중에는 결과가 접힌 섹션에 숨어 보이지 않는 일이 없도록 모든 섹션을 강제로 펼침
  const isOpen = (s: SectionKey) => (q ? true : open[s])

  const card = (t: BibleMapTheme, isKey = false) => {
    const isActive = t.id === activeId
    const isSelected = selectedIds.includes(t.id)
    return (
      <div
        key={t.id}
        className={`theme-card${isActive ? ' active' : ''}${isSelected && !isActive ? ' selected' : ''}`}
        onClick={() => (isKey ? onSelectKeyPlace(t.id) : onOpenTheme(t.id))}
        style={isActive ? { borderLeftColor: t.color } : isSelected ? { borderLeftColor: t.color, opacity: 0.95 } : undefined}
      >
        <div className="icon">{t.icon}</div>
        <div className="info">
          <div className="title">{t.title}</div>
          <div className="sub">{t.subtitle}</div>
          <div className="meta">{isKey ? t.era : `${t.book} · ${t.era}`}</div>
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
        {ot.length > 0 && (
          <>
            <button className="section-toggle" onClick={() => toggleSection('OT')} aria-expanded={isOpen('OT')}>
              <span>구약 OLD TESTAMENT</span>
              <span className="chevron">{isOpen('OT') ? '▾' : '▸'}</span>
            </button>
            {isOpen('OT') && ot.map((t) => card(t))}
          </>
        )}

        {nt.length > 0 && (
          <>
            <button className="section-toggle" onClick={() => toggleSection('NT')} aria-expanded={isOpen('NT')}>
              <span>신약 NEW TESTAMENT</span>
              <span className="chevron">{isOpen('NT') ? '▾' : '▸'}</span>
            </button>
            {isOpen('NT') && nt.map((t) => card(t))}
          </>
        )}

        {keyPlaces.length > 0 && (
          <>
            <button className="section-toggle" onClick={() => toggleSection('KEY')} aria-expanded={isOpen('KEY')}>
              <span>핵심지명 KEY PLACES</span>
              <span className="chevron">{isOpen('KEY') ? '▾' : '▸'}</span>
            </button>
            {isOpen('KEY') &&
              groupByBook(keyPlaces).map((g) => (
                <div key={g.book}>
                  <div className="subsection-label">{g.book}</div>
                  {g.items.map((t) => card(t, true))}
                </div>
              ))}
          </>
        )}

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

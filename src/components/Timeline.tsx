import { useEffect, useRef, useState } from 'react'
import { THEMES, type BibleMapTheme } from '../data/maps'

interface Props {
  activeId: string | null
  selectedIds: string[]
  onSelect: (id: string) => void
}

// 연표 범위: BC 2100 ~ AD 100
const MIN = -2100
const MAX = 100
// 500년 간격으로 고르게 배치. MAX(100)는 축 범위 계산에만 쓰고 눈금은 찍지 않습니다.
// (0과 100은 겨우 100년 차이라 좁은 화면에서 라벨끼리 겹쳐 보였습니다.)
const TICKS = [-2000, -1500, -1000, -500, 0]

// 이보다 가까운 연도의 테마는 한 화면에서 겹쳐 보이므로 하나의 묶음으로 합칩니다.
const CLUSTER_YEARS = 80

function pct(year: number) {
  return ((year - MIN) / (MAX - MIN)) * 100
}

function yearLabel(y: number) {
  if (y === 0) return 'AD 1'
  return y < 0 ? `BC ${-y}` : `AD ${y}`
}

interface Cluster {
  id: string
  year: number
  themes: BibleMapTheme[]
}

// 연도순으로 정렬 후, 인접한 항목끼리 연도 차이가 임계값보다 작으면 같은 묶음으로 합칩니다.
function buildClusters(themes: BibleMapTheme[]): Cluster[] {
  const sorted = [...themes].sort((a, b) => a.year - b.year)
  const clusters: Cluster[] = []
  for (const th of sorted) {
    const last = clusters[clusters.length - 1]
    if (last && th.year - last.themes[last.themes.length - 1].year < CLUSTER_YEARS) {
      last.themes.push(th)
      last.year = last.themes.reduce((sum, t) => sum + t.year, 0) / last.themes.length
    } else {
      clusters.push({ id: th.id, year: th.year, themes: [th] })
    }
  }
  return clusters
}

const CLUSTERS = buildClusters(THEMES)

export default function Timeline({ activeId, selectedIds, onSelect }: Props) {
  const [openCluster, setOpenCluster] = useState<string | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  // 바깥 클릭 / ESC 로 팝오버 닫기
  useEffect(() => {
    if (!openCluster) return
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpenCluster(null)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenCluster(null)
    }
    document.addEventListener('mousedown', onDocClick)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      window.removeEventListener('keydown', onKey)
    }
  }, [openCluster])

  const pick = (id: string) => {
    setOpenCluster(null)
    onSelect(id)
  }

  return (
    <div className="timeline" ref={rootRef}>
      <div className="timeline-label">연대표</div>
      <div className="timeline-track">
        {/* 눈금 */}
        {TICKS.map((t) => (
          <div key={t} className="tl-tick" style={{ left: `${pct(t)}%` }}>
            <span>{yearLabel(t)}</span>
          </div>
        ))}

        {/* 테마 마커. 단일/묶음 모두 먼저 눌러서 주제를 확인한 뒤 골라 선택합니다. */}
        {CLUSTERS.map((cluster) => {
          // 모두 한 줄로 배치하되, 위로는 "연대표" 라벨과 아래로는 연도 눈금 숫자와
          // 겹치지 않도록 여백을 둡니다. (가까운 연도끼리는 이미 하나의 클러스터로 묶여 있어
          // 같은 줄에 놓아도 서로 겹치지 않습니다.)
          const bottom = '24px'
          const left = `${pct(cluster.year)}%`
          const isSolo = cluster.themes.length === 1
          const hasActive = cluster.themes.some((t) => t.id === activeId)
          const hasSelected = cluster.themes.some((t) => selectedIds.includes(t.id))
          const isOpen = openCluster === cluster.id
          const clusterPct = pct(cluster.year)
          // 화면 가장자리에 가까운 묶음은 팝오버가 잘리지 않도록 정렬 방향을 바꿈
          const align = clusterPct > 75 ? 'align-right' : clusterPct < 25 ? 'align-left' : 'align-center'

          return (
            <div key={cluster.id} className="tl-cluster-wrap" style={{ left, bottom }}>
              <button
                className={`tl-dot${isSolo ? '' : ' tl-cluster'}${hasActive ? ' active' : ''}${isSolo && hasSelected ? ' selected' : ''}`}
                style={{ background: cluster.themes[0].color }}
                title={isSolo ? `${cluster.themes[0].title} · ${cluster.themes[0].era}` : `${cluster.themes.length}개 테마 · 눌러서 선택`}
                onClick={() => setOpenCluster(isOpen ? null : cluster.id)}
                aria-expanded={isOpen}
              >
                {isSolo ? <span className="tl-emoji">{cluster.themes[0].icon}</span> : cluster.themes.length}
              </button>
              {isOpen && (
                <div className={`tl-popover ${align}`}>
                  {cluster.themes.map((th) => (
                    <button
                      key={th.id}
                      className={`tl-popover-row${th.id === activeId ? ' active' : ''}`}
                      onClick={() => pick(th.id)}
                    >
                      <span className="ic">{th.icon}</span>
                      <span className="tx">
                        <span className="nm">{th.title}</span>
                        <span className="yr">{th.era}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

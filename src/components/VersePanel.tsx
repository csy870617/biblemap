import { useEffect, useState } from 'react'
import { externalLink, fetchPassage, parseRef, type PassageResult, type ParsedRef } from '../data/bible'

interface Props {
  refStr: string | null
  onClose: () => void
}

export default function VersePanel({ refStr, onClose }: Props) {
  const [lang, setLang] = useState<'ko' | 'en'>('ko')
  const [data, setData] = useState<PassageResult | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  const parsed: ParsedRef | null = refStr ? parseRef(refStr) : null

  useEffect(() => {
    if (!parsed) return
    let cancelled = false
    setStatus('loading')
    setData(null)
    fetchPassage(parsed, lang)
      .then((r) => {
        if (!cancelled) {
          setData(r)
          setStatus('idle')
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refStr, lang])

  if (!refStr) return null

  return (
    <div className="verse-overlay" onClick={onClose}>
      <div className="verse-panel" onClick={(e) => e.stopPropagation()}>
        <div className="verse-head">
          <div className="verse-ref">📖 {refStr}</div>
          <div className="verse-actions">
            <div className="lang-toggle">
              <button className={lang === 'ko' ? 'on' : ''} onClick={() => setLang('ko')}>
                한국어
              </button>
              <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>
                English
              </button>
            </div>
            <button className="verse-close" onClick={onClose} aria-label="닫기">
              ✕
            </button>
          </div>
        </div>

        <div className="verse-body">
          {!parsed && <p className="verse-msg">이 구절 표기는 자동 조회를 지원하지 않습니다.</p>}

          {parsed && status === 'loading' && <p className="verse-msg">본문을 불러오는 중…</p>}

          {parsed && status === 'error' && (
            <p className="verse-msg">
              본문을 불러오지 못했습니다. 아래 링크에서 확인하세요.
              <br />
              <span style={{ opacity: 0.7 }}>(오프라인이거나 API 연결이 차단된 환경일 수 있습니다.)</span>
            </p>
          )}

          {parsed && status === 'idle' && data && (
            <>
              {data.verses.map((v) => (
                <p key={v.verse} className="verse-line">
                  <sup>{v.verse}</sup> {v.text}
                </p>
              ))}
              <div className="verse-src">번역: {lang === 'ko' ? '개역(getbible.net)' : data.translationName}</div>
            </>
          )}
        </div>

        {parsed && (
          <a className="verse-ext" href={externalLink(parsed, lang)} target="_blank" rel="noreferrer">
            🔗 다른 번역으로 보기 (BibleGateway)
          </a>
        )}
      </div>
    </div>
  )
}

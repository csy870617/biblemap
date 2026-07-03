// 성경 본문 연동 유틸
// 한국어 구절 표기(예: "사도행전 13:1-3")를 파싱해 무료 공개 API(getbible.net v2)에서
// 본문을 가져옵니다. 실패 시 외부 성경 사이트 링크로 우아하게 대체합니다.

interface BookInfo {
  num: number // 표준 성경 권 번호(1~66)
  en: string // 영문 책 이름(외부 링크용)
}

// 한국어 책 이름 → 권 번호 + 영문 이름
export const BOOKS: Record<string, BookInfo> = {
  창세기: { num: 1, en: 'Genesis' },
  출애굽기: { num: 2, en: 'Exodus' },
  레위기: { num: 3, en: 'Leviticus' },
  민수기: { num: 4, en: 'Numbers' },
  신명기: { num: 5, en: 'Deuteronomy' },
  여호수아: { num: 6, en: 'Joshua' },
  사사기: { num: 7, en: 'Judges' },
  룻기: { num: 8, en: 'Ruth' },
  사무엘상: { num: 9, en: '1 Samuel' },
  사무엘하: { num: 10, en: '2 Samuel' },
  열왕기상: { num: 11, en: '1 Kings' },
  열왕기하: { num: 12, en: '2 Kings' },
  역대상: { num: 13, en: '1 Chronicles' },
  역대하: { num: 14, en: '2 Chronicles' },
  에스라: { num: 15, en: 'Ezra' },
  느헤미야: { num: 16, en: 'Nehemiah' },
  에스더: { num: 17, en: 'Esther' },
  욥기: { num: 18, en: 'Job' },
  시편: { num: 19, en: 'Psalms' },
  잠언: { num: 20, en: 'Proverbs' },
  전도서: { num: 21, en: 'Ecclesiastes' },
  아가: { num: 22, en: 'Song of Solomon' },
  이사야: { num: 23, en: 'Isaiah' },
  예레미야: { num: 24, en: 'Jeremiah' },
  예레미야애가: { num: 25, en: 'Lamentations' },
  에스겔: { num: 26, en: 'Ezekiel' },
  다니엘: { num: 27, en: 'Daniel' },
  호세아: { num: 28, en: 'Hosea' },
  요엘: { num: 29, en: 'Joel' },
  아모스: { num: 30, en: 'Amos' },
  오바댜: { num: 31, en: 'Obadiah' },
  요나: { num: 32, en: 'Jonah' },
  미가: { num: 33, en: 'Micah' },
  나훔: { num: 34, en: 'Nahum' },
  하박국: { num: 35, en: 'Habakkuk' },
  스바냐: { num: 36, en: 'Zephaniah' },
  학개: { num: 37, en: 'Haggai' },
  스가랴: { num: 38, en: 'Zechariah' },
  말라기: { num: 39, en: 'Malachi' },
  마태복음: { num: 40, en: 'Matthew' },
  마가복음: { num: 41, en: 'Mark' },
  누가복음: { num: 42, en: 'Luke' },
  요한복음: { num: 43, en: 'John' },
  사도행전: { num: 44, en: 'Acts' },
  로마서: { num: 45, en: 'Romans' },
  고린도전서: { num: 46, en: '1 Corinthians' },
  고린도후서: { num: 47, en: '2 Corinthians' },
  갈라디아서: { num: 48, en: 'Galatians' },
  에베소서: { num: 49, en: 'Ephesians' },
  빌립보서: { num: 50, en: 'Philippians' },
  골로새서: { num: 51, en: 'Colossians' },
  데살로니가전서: { num: 52, en: '1 Thessalonians' },
  데살로니가후서: { num: 53, en: '2 Thessalonians' },
  디모데전서: { num: 54, en: '1 Timothy' },
  디모데후서: { num: 55, en: '2 Timothy' },
  디도서: { num: 56, en: 'Titus' },
  빌레몬서: { num: 57, en: 'Philemon' },
  히브리서: { num: 58, en: 'Hebrews' },
  야고보서: { num: 59, en: 'James' },
  베드로전서: { num: 60, en: '1 Peter' },
  베드로후서: { num: 61, en: '2 Peter' },
  요한일서: { num: 62, en: '1 John' },
  요한이서: { num: 63, en: '2 John' },
  요한삼서: { num: 64, en: '3 John' },
  유다서: { num: 65, en: 'Jude' },
  요한계시록: { num: 66, en: 'Revelation' },
}

export interface ParsedRef {
  raw: string
  book: string
  info: BookInfo
  chapter: number
  vStart?: number
  vEnd?: number
}

// "사도행전 13:1-3", "출애굽기 19~20장", "시편 137편" 등을 파싱
export function parseRef(raw: string): ParsedRef | null {
  const m = raw.match(/^([가-힣]+)\s*(.+)$/)
  if (!m) return null
  const book = m[1]
  const info = BOOKS[book]
  if (!info) return null
  const rest = m[2]

  const chapter = parseInt(rest.match(/\d+/)?.[0] ?? '', 10)
  if (!Number.isFinite(chapter)) return null

  // 절 범위(11:31 / 11:31-32 / 11:31~28:10) 추출
  let vStart: number | undefined
  let vEnd: number | undefined
  const vm = rest.match(/:\s*(\d+)\s*[-~]\s*(?:\d+:)?(\d+)/) // 11:31-32, 27:39~28:10
  const vs = rest.match(/:\s*(\d+)/) // 11:31
  if (vm) {
    vStart = parseInt(vm[1], 10)
    vEnd = parseInt(vm[2], 10)
    if (vEnd < vStart) vEnd = undefined // 장을 넘는 범위는 시작 장만 표시
  } else if (vs) {
    vStart = parseInt(vs[1], 10)
    vEnd = vStart
  }

  return { raw, book, info, chapter, vStart, vEnd }
}

export interface Verse {
  verse: number
  text: string
}

export interface PassageResult {
  translationName: string
  verses: Verse[]
}

// 응답이 오지 않는 채로 무한정 "불러오는 중" 상태에 머무르지 않도록 타임아웃을 둡니다.
const FETCH_TIMEOUT_MS = 10000

// getbible.net v2에서 본문 가져오기
export async function fetchPassage(ref: ParsedRef, lang: 'ko' | 'en'): Promise<PassageResult> {
  const translation = lang === 'ko' ? 'korean' : 'kjv'
  const url = `https://api.getbible.net/v2/${translation}/${ref.info.num}/${ref.chapter}.json`
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const res = await fetch(url, { signal: controller.signal })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    // API 응답 형태가 예상과 다르면(필드명 변경 등) 조용히 깨진 본문을 보여주는 대신
    // 에러로 처리해 호출 측(VersePanel)의 기존 오류 안내 화면으로 넘어가게 합니다.
    if (!Array.isArray(data.verses)) throw new Error('Unexpected API response shape: verses is not an array')
    const all: Verse[] = data.verses
      .filter((v: unknown): v is { verse: number; text: string } => {
        const rec = v as { verse?: unknown; text?: unknown } | null
        return typeof rec?.verse === 'number' && typeof rec?.text === 'string'
      })
      .map((v: { verse: number; text: string }) => ({
        verse: v.verse,
        text: v.text.trim(),
      }))
    if (all.length === 0) throw new Error('No valid verses parsed from API response')
    let verses = all
    if (ref.vStart != null) {
      const end = ref.vEnd ?? ref.vStart
      verses = all.filter((v) => v.verse >= ref.vStart! && v.verse <= end)
    }
    if (verses.length === 0) verses = all.slice(0, 5) // 범위 매칭 실패 시 앞부분
    return { translationName: data.translation ?? translation, verses }
  } finally {
    window.clearTimeout(timeoutId)
  }
}

// 외부 성경 사이트 링크(폴백/추가 번역)
export function externalLink(ref: ParsedRef, lang: 'ko' | 'en'): string {
  const vpart = ref.vStart != null ? `:${ref.vStart}${ref.vEnd && ref.vEnd !== ref.vStart ? '-' + ref.vEnd : ''}` : ''
  const search = encodeURIComponent(`${ref.info.en} ${ref.chapter}${vpart}`)
  const version = lang === 'ko' ? 'KLB' : 'NIV'
  return `https://www.biblegateway.com/passage/?search=${search}&version=${version}`
}

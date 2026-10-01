import { useEffect, useState } from 'react'
import { createLayerComponent, type LayerProps } from '@react-leaflet/core'
import { MaptilerLayer, Language } from '@maptiler/leaflet-maptilersdk'
import type { LanguageInfo, StyleSpecification } from '@maptiler/sdk'
import '@maptiler/sdk/dist/maptiler-sdk.css'
import type { Layer } from 'leaflet'

export type MapLang = 'ko' | 'en'

const LANGUAGE: Record<MapLang, LanguageInfo> = {
  ko: Language.KOREAN,
  en: Language.ENGLISH,
}

// ─────────────────────────────────────────────────────────────────────────────
// 한글/영어 이외의 지명 표기 숨기기
//
// MapTiler SDK의 언어 설정(setLanguage)은 선택한 언어 표기가 없는 지명을 현지어 원어(name)로
// 대체해서, 한글 지도에도 아랍어·히브리어 등이 섞여 보입니다.
//
// 예전에 'styledata' 이벤트에서 라벨 식을 고쳐 쓰는 방식을 두 번 시도했다가 실제 지도가 빈 화면이
// 되어 되돌렸습니다. SDK도 같은 이벤트마다 "원본 스타일" 기준으로 라벨 식을 다시 덮어쓰기 때문에,
// 두 쪽이 서로의 변경을 계속 되돌리며 스타일이 끝없이 갱신된 것이 원인입니다.
//
// 그래서 이번에는 이벤트를 전혀 쓰지 않습니다. 스타일 JSON을 직접 받아 라벨 식을 미리 바꾼 뒤
// 지도에 넘기고, SDK의 언어 자동 변경은 STYLE_LOCK으로 꺼 둡니다. 스타일을 받지 못하거나
// 변환에 실패하면 기존 방식(SDK 언어 설정)으로 그대로 표시해 지도가 비는 일이 없게 합니다.
// ─────────────────────────────────────────────────────────────────────────────

// 현지어 표기(name). 값이 없으면 ''가 되어 아래 문자열 비교가 오류 없이 false가 됩니다.
const LOCAL_NAME = ['to-string', ['get', 'name']]
// 스타일 식에는 정규식이 없으므로, 첫 글자의 유니코드 범위를 문자열 크기 비교로 판별합니다.
// 라틴 문자(A~ɏ, 터키어·유럽 지명 포함)로 시작하는 현지어 표기
const LOCAL_IS_LATIN = ['all', ['>=', LOCAL_NAME, 'A'], ['<', LOCAL_NAME, 'ɐ']]
// 한글 음절(가~힣)로 시작하는 현지어 표기(국내 지명은 name 자체가 한글이고 name:ko가 없는 경우가 많음)
const LOCAL_IS_HANGUL = ['all', ['>=', LOCAL_NAME, '가'], ['<', LOCAL_NAME, '힤']]

// 언어별 라벨 식. 앞에서부터 처음 있는 표기를 쓰고, 한글/영어 표기가 없으면 라벨을 비웁니다.
const LABEL_EXPR: Record<MapLang, unknown[]> = {
  ko: [
    'case',
    ['has', 'name:ko'], ['to-string', ['get', 'name:ko']],
    LOCAL_IS_HANGUL, LOCAL_NAME,
    ['has', 'name:en'], ['to-string', ['get', 'name:en']],
    LOCAL_IS_LATIN, LOCAL_NAME,
    '',
  ],
  en: [
    'case',
    ['has', 'name:en'], ['to-string', ['get', 'name:en']],
    LOCAL_IS_LATIN, LOCAL_NAME,
    LOCAL_IS_HANGUL, LOCAL_NAME,
    '',
  ],
}

const isNameKey = (k: unknown) => typeof k === 'string' && (k === 'name' || k.startsWith('name:') || k.startsWith('name_'))

// text-field 식 안의 지명 참조(["get","name"], ["get","name:en"], "{name}" 등)를 언어별 라벨 식으로 교체
function rewriteTextField(value: unknown, expr: unknown[]): unknown {
  if (typeof value === 'string') return /^\{name([:_][a-z_-]+)?\}$/.test(value) ? expr : value
  if (!Array.isArray(value)) return value
  if (value.length === 2 && value[0] === 'get' && isNameKey(value[1])) return expr
  return value.map((v) => rewriteTextField(v, expr))
}

function localizeStyle(style: StyleSpecification, lang: MapLang): StyleSpecification {
  const expr = LABEL_EXPR[lang]
  return {
    ...style,
    layers: style.layers.map((layer) => {
      if (layer.type !== 'symbol' || !layer.layout || layer.layout['text-field'] === undefined) return layer
      return {
        ...layer,
        layout: { ...layer.layout, 'text-field': rewriteTextField(layer.layout['text-field'], expr) },
      } as typeof layer
    }),
  }
}

// 스타일 JSON은 지도/위성별로 한 번만 받아 재사용(언어 전환 시 다시 받지 않음)
const styleCache = new Map<string, Promise<StyleSpecification>>()
function loadStyle(apiKey: string, styleId: string): Promise<StyleSpecification> {
  const cacheKey = `${styleId}|${apiKey}`
  let p = styleCache.get(cacheKey)
  if (!p) {
    p = fetch(`https://api.maptiler.com/maps/${encodeURIComponent(styleId)}/style.json?key=${encodeURIComponent(apiKey)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<StyleSpecification>
      })
      .then((style) => {
        if (!style || !Array.isArray(style.layers)) throw new Error('Unexpected style shape')
        return style
      })
    p.catch(() => styleCache.delete(cacheKey)) // 실패한 요청은 캐시하지 않아 다음에 다시 시도
    styleCache.set(cacheKey, p)
  }
  return p
}

interface MaptilerLayerInstance extends Layer {
  setStyle: (s: string | StyleSpecification) => void
  setLanguage: (l: LanguageInfo) => void
}

// 기존 방식: 스타일 ID + SDK 언어 설정(현지어 대체 표기가 섞일 수 있음). 안전망으로만 사용.
interface SdkLangLayerProps extends LayerProps {
  apiKey: string
  style: string
  lang: MapLang
}

const SdkLangLayer = createLayerComponent<Layer, SdkLangLayerProps>(
  (props, context) => {
    const instance = new MaptilerLayer({
      apiKey: props.apiKey,
      style: props.style,
      language: LANGUAGE[props.lang],
    }) as unknown as Layer
    return { instance, context }
  },
  (instance, props, prevProps) => {
    const layer = instance as unknown as MaptilerLayerInstance
    if (props.style !== prevProps.style) layer.setStyle(props.style)
    if (props.lang !== prevProps.lang) layer.setLanguage(LANGUAGE[props.lang])
  },
)

// 라벨을 미리 변환한 스타일 객체를 쓰는 레이어. STYLE_LOCK으로 SDK가 라벨을 다시 바꾸지 못하게 합니다.
interface LocalizedLayerProps extends LayerProps {
  apiKey: string
  styleSpec: StyleSpecification
}

const LocalizedLayer = createLayerComponent<Layer, LocalizedLayerProps>(
  (props, context) => {
    const instance = new MaptilerLayer({
      apiKey: props.apiKey,
      style: props.styleSpec,
      language: Language.STYLE_LOCK,
    }) as unknown as Layer
    return { instance, context }
  },
  (instance, props, prevProps) => {
    if (props.styleSpec !== prevProps.styleSpec) (instance as unknown as MaptilerLayerInstance).setStyle(props.styleSpec)
  },
)

interface Props {
  apiKey: string
  style: string
  lang: MapLang
}

type Resolved = { kind: 'localized'; spec: StyleSpecification } | { kind: 'fallback' }

export default function MapTilerLayer({ apiKey, style, lang }: Props) {
  const [resolved, setResolved] = useState<Resolved | null>(null)

  useEffect(() => {
    let cancelled = false
    loadStyle(apiKey, style)
      .then((raw) => {
        const spec = localizeStyle(raw, lang)
        if (!cancelled) setResolved({ kind: 'localized', spec })
      })
      .catch((err) => {
        console.warn('MapTiler style localization failed; using SDK language labels instead.', err)
        if (!cancelled) setResolved({ kind: 'fallback' })
      })
    return () => {
      cancelled = true
    }
  }, [apiKey, style, lang])

  if (!resolved) return null
  if (resolved.kind === 'fallback') return <SdkLangLayer key="sdk" apiKey={apiKey} style={style} lang={lang} />
  return <LocalizedLayer key="localized" apiKey={apiKey} styleSpec={resolved.spec} />
}

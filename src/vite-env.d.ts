/// <reference types="vite/client" />

interface ImportMetaEnv {
  // MapTiler API 키 (선택). 설정하면 한글/영문 지명 벡터 지도(지도·위성)를 사용합니다.
  readonly VITE_MAPTILER_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

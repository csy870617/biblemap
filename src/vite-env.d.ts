/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Google Maps Platform API 키 (선택). 설정하면 배경 지도로 구글 지도를 사용합니다.
  readonly VITE_GOOGLE_MAPS_API_KEY?: string
  // MapTiler API 키 (선택). 설정하면 한글 지명 벡터 지도를 사용합니다.
  readonly VITE_MAPTILER_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

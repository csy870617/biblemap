import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: true,
    port: 5173,
  },
  build: {
    // MapTiler(maplibre) 청크는 지연 로딩되므로 경고 임계값을 완화
    chunkSizeWarningLimit: 1500,
  },
})

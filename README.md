# 📍 BibleMap

성경을 읽을 때 **지도와 함께 보면 이해에 큰 도움이 되는 핵심 여정**만 모아, 실제 지도 위에서 경로 애니메이션·말씀 본문과 함께 보는 인터랙티브 학습 보조 도구입니다.

## ✨ 기능

- **큐레이션된 11개 지도** — 성경 이해에 특히 도움이 되는 지도만 선별
  - 구약: 아브라함의 여정 · 출애굽 경로 · 가나안 정복 · 12지파 분배 · 분열 왕국 · 바벨론 포로
  - 신약: 예수님의 생애와 사역 · 바울의 1~3차 전도여행 · 로마 압송 항해
- **여정 재생(▶)** — 출발지부터 도착지까지 경로가 그려지며 카메라가 따라가는 애니메이션
- **여러 지도 비교** — `＋` 버튼으로 여러 여정을 지도 위에 색깔별로 동시에 표시 (예: 바울 1·2·3차)
- **성경 본문 연동** — 구절 칩을 누르면 실제 본문을 팝업으로 표시 (한국어/영어 전환, [getbible.net](https://getbible.net) API)
- **연대표(타임라인)** — BC 2000 ~ AD 100 시대순으로 지도를 배치, 클릭해 이동
- **베이스맵 전환** — 일반 지도 / 지형 지도 / 위성 사진 (우하단 레이어 버튼)
- **검색** — 지명·성경 구절·테마로 빠르게 찾기 (예: `에베소`, `출애굽`, `사도행전 27`)
- **현대 지명 병기** — 옛 지명과 오늘날 위치를 함께 표시

## 🌐 온라인 배포 (GitHub Pages)

`main` 또는 작업 브랜치에 푸시하면 `.github/workflows/deploy.yml`이 자동으로 빌드해
GitHub Pages에 배포합니다.

**최초 1회 설정** (저장소 관리자):

1. GitHub 저장소 → **Settings → Pages**
2. **Build and deployment → Source** 를 **GitHub Actions** 로 선택
3. 이후 푸시 시 자동 배포 — 주소: `https://<사용자명>.github.io/biblemap/`

> 워크플로우의 `configure-pages(enablement: true)`가 Pages를 자동으로 켜려 시도하므로,
> 권한이 허용된 경우 위 설정 없이도 첫 배포 시 활성화될 수 있습니다.
> 배포 진행 상황은 저장소 **Actions** 탭에서 볼 수 있습니다.

## 🚀 로컬 실행

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 정적 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
```

## 🧱 기술 스택

- Vite + React + TypeScript
- Leaflet + OpenStreetMap / OpenTopoMap / Esri (무료 타일, API 키 불필요)
- 성경 본문: getbible.net v2 (런타임 조회, 실패 시 BibleGateway 링크로 대체)

## 🗂️ 구조

```
src/
  data/
    maps.ts             # 테마·지점·좌표·말씀 데이터 (지도 추가/수정은 여기만)
    bible.ts            # 성경 책 매핑 · 구절 파서 · 본문 API
  components/
    Sidebar.tsx         # 테마 목록 + 검색 + 비교 토글
    MapView.tsx         # 지도, 마커, 경로, 애니메이션, 베이스맵
    Timeline.tsx        # 연대표
    VersePanel.tsx      # 성경 본문 팝업
  App.tsx               # 상태 관리 (선택·비교·재생·본문)
.github/workflows/deploy.yml   # GitHub Pages 자동 배포
```

## ➕ 지도 추가하기

`src/data/maps.ts`의 `THEMES` 배열에 항목을 추가하면 됩니다. 각 지점은 좌표(`coord`),
관련 성경 구절(`refs`), 해설(`desc`)을 가집니다. `kind`가 `journey`면 순서 있는 경로(재생 가능),
`region`이면 지역 분포로 표시됩니다. `year`는 연대표 위치를 정합니다.

## ⚠️ 참고

지명의 위치와 경로는 학습을 돕기 위한 **추정·단순화된 표현**이며, 일부 지명은 정확한 고고학적
위치에 대해 학자마다 견해가 다를 수 있습니다.

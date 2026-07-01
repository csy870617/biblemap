# 📍 BibleMap

성경을 읽을 때 **지도와 함께 보면 이해에 큰 도움이 되는 핵심 여정**만 모아, 실제 지도 위에서 경로 애니메이션·말씀 본문과 함께 보는 인터랙티브 학습 보조 도구입니다.

## ✨ 기능

- **큐레이션된 11개 지도** — 성경 이해에 특히 도움이 되는 지도만 선별
  - 구약: 아브라함의 여정 · 출애굽 경로 · 가나안 정복 · 12지파 분배 · 분열 왕국 · 바벨론 포로
  - 신약: 예수님의 생애와 사역 · 바울의 1~3차 전도여행 · 로마 압송 항해
- **목록 / 상세(재생) 화면 분리** — 여정을 선택하면 목록 대신 해당 여정의 요약·재생·지점
  목록만 보이는 상세 화면으로 전환됩니다. `← 목록`으로 언제든 돌아갈 수 있어 한 화면에
  정보가 몰리지 않습니다.
- **여정 재생(▶)** — 출발지부터 도착지까지 경로가 그려지며 카메라가 따라가는 애니메이션
- **여러 지도 비교** — `＋` 버튼으로 여러 여정을 지도 위에 색깔별로 동시에 표시 (예: 바울 1·2·3차)
- **성경 본문 연동** — 구절 칩을 누르면 실제 본문을 팝업으로 표시 (한국어/영어 전환, [getbible.net](https://getbible.net) API)
- **연대표(타임라인)** — BC 2000 ~ AD 100 시대순으로 지도를 배치, 클릭해 이동.
  연대가 가까워 겹치는 항목은 자동으로 묶여서 숫자 배지로 표시되고, 눌러서 목록에서
  고를 수 있습니다.
- **베이스맵 전환** — 지도 우하단 스위처로 전환
  - **지도 / 위성** 스타일 × **한글 / English** 지명, 총 4가지 조합 (MapTiler 벡터 지도, 아래 참고)
- **검색** — 지명·성경 구절·테마로 빠르게 찾기 (예: `에베소`, `출애굽`, `사도행전 27`)
- **현대 지명 병기** — 옛 지명과 오늘날 위치를 함께 표시
- **모바일 대응** — 좁은 화면에서는 지도가 전체 화면을 채우고, 테마 목록은 좌측에서
  슬라이드로 여닫는 드로어(햄버거 메뉴)로 전환되어 화면 요소가 겹치지 않습니다.

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

**배포본에서 지도(MapTiler)를 쓰려면**, 키를 저장소 시크릿으로 등록해야 합니다
(빌드 로그·소스코드 어디에도 값이 노출되지 않습니다):

1. GitHub 저장소 → **Settings → Secrets and variables → Actions → New repository secret**
2. Name: `VITE_MAPTILER_KEY` / Secret: 발급받은 MapTiler 키 → **Add secret**
3. 이후 아무 커밋이나 푸시하면(또는 Actions 탭에서 Re-run) 배포본에 지도가 반영됩니다

워크플로우(`deploy.yml`)는 이미 이 시크릿을 빌드 시점에 주입하도록 설정되어 있어,
등록만 하면 별도 코드 수정 없이 바로 적용됩니다. 시크릿을 등록하지 않으면 기본
무료 지도(OpenStreetMap)로 동작합니다.

## 🗺️ 배경 지도 (MapTiler)

배경 지도는 **MapTiler 벡터 지도** 하나이며, 지도 위 스위처에서 **지도/위성** 스타일과
**한글/English** 지명을 자유롭게 조합해 볼 수 있습니다.

```bash
cp .env.example .env
# .env 에 VITE_MAPTILER_KEY=발급받은키 입력 후 재실행
```

키 발급: [MapTiler Cloud](https://cloud.maptiler.com/) 가입 → Account → Keys. 무료 요금제는
월 타일 요청 10만 회이며, 초과하면 다음 달까지 자동 정지되어 **요금이 청구되지 않습니다.**
(벡터 지도라 무거워서, 키가 있을 때만 해당 코드가 지연 로딩됩니다.)

키가 없으면 기본 무료 지도(OpenStreetMap, 스타일/언어 전환 불가)로 자동 동작하며, 화면에
"MapTiler API 키가 설정되지 않아 기본 지도로 표시됩니다" 배지가 표시됩니다.

## 🚀 로컬 실행

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 정적 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
```

## 🧱 기술 스택

- Vite + React + TypeScript
- Leaflet + MapTiler 벡터 지도(지도/위성 × 한글/영문, `@maptiler/leaflet-maptilersdk`)
- 키 미설정 시 안전망: OpenStreetMap 무료 타일
- 성경 본문: getbible.net v2 (런타임 조회, 실패 시 BibleGateway 링크로 대체)

## 🗂️ 구조

```
src/
  data/
    maps.ts             # 테마·지점·좌표·말씀 데이터 (지도 추가/수정은 여기만)
    bible.ts            # 성경 책 매핑 · 구절 파서 · 본문 API
  components/
    Sidebar.tsx         # 테마 목록 + 검색 + 비교 토글 (목록 화면)
    DetailPanel.tsx     # 여정 요약 · 재생 · 지점 목록 (상세 화면, 목록과 분리)
    MapView.tsx         # 지도, 마커, 경로, 애니메이션, 배경 스위처
    MapTilerLayer.tsx   # MapTiler 벡터 레이어(react-leaflet 래퍼)
    Timeline.tsx        # 연대표(근접 연도 자동 묶음 + 팝오버)
    VersePanel.tsx      # 성경 본문 팝업
    ErrorBoundary.tsx   # 렌더링 오류 시 복구 화면
  App.tsx               # 상태 관리 (선택·비교·재생·본문·모바일 드로어·목록/상세 전환)
.github/workflows/deploy.yml   # GitHub Pages 자동 배포
```

## ➕ 지도 추가하기

`src/data/maps.ts`의 `THEMES` 배열에 항목을 추가하면 됩니다. 각 지점은 좌표(`coord`),
관련 성경 구절(`refs`), 해설(`desc`)을 가집니다. `kind`가 `journey`면 순서 있는 경로(재생 가능),
`region`이면 지역 분포로 표시됩니다. `year`는 연대표 위치를 정합니다.

## ⚠️ 참고

지명의 위치와 경로는 학습을 돕기 위한 **추정·단순화된 표현**이며, 일부 지명은 정확한 고고학적
위치에 대해 학자마다 견해가 다를 수 있습니다.

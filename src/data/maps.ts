// BibleMap 데이터셋
// 성경 이해에 특히 도움이 되는 핵심 여정/지도를 큐레이션했습니다.
// 좌표는 위도/경도(현대 지명 기준 추정 위치)이며 학습 보조용입니다.

export type LngLat = [number, number] // [lat, lng]

export interface BibleLocation {
  id: string
  name: string // 한글 지명
  nameEn: string // 영문 지명
  modern?: string // 현대 지명
  coord: LngLat
  refs: string[] // 관련 성경 구절
  desc: string // 해설
}

export type Testament = 'OT' | 'NT'

// journey: 순서가 있는 이동 경로(경로선 + 재생)
// region: 영역/분포(경로선 없음, 지점 표시)
export type MapKind = 'journey' | 'region'

export interface BibleMapTheme {
  id: string
  title: string // 테마 제목
  subtitle: string // 한 줄 요약
  testament: Testament
  kind: MapKind
  book: string // 주요 성경 권
  era: string // 시대(연대 표기)
  year: number // 연표용 대표 연도(음수=BC)
  color: string // 경로/마커 색상
  icon: string // 이모지 아이콘
  summary: string // 테마 개요(말씀 이해 포인트)
  locations: BibleLocation[]
}

export const THEMES: BibleMapTheme[] = [
  {
    id: 'abraham',
    title: '아브라함의 여정',
    subtitle: '갈대아 우르에서 약속의 땅까지',
    testament: 'OT',
    kind: 'journey',
    book: '창세기 11~25장',
    era: '약 BC 2000년경',
    year: -2000,
    color: '#d97706',
    icon: '🏕️',
    summary:
      '하나님의 부르심을 따라 고향과 친척을 떠나 가나안으로 향한 믿음의 조상 아브라함의 이동 경로입니다. 우르→하란→가나안→애굽→헤브론으로 이어지는 긴 여정을 지도로 보면 "믿음으로 떠남"의 규모가 실감납니다.',
    locations: [
      { id: 'ur', name: '갈대아 우르', nameEn: 'Ur of the Chaldeans', modern: '이라크 남부', coord: [30.9626, 46.1031], refs: ['창세기 11:31'], desc: '아브라함이 태어나 살던 고향. 번성한 메소포타미아의 도시였습니다.' },
      { id: 'haran', name: '하란', nameEn: 'Haran', modern: '터키 남부', coord: [36.8628, 39.0306], refs: ['창세기 11:31-32', '창세기 12:4'], desc: '아버지 데라와 함께 머물던 중간 기착지. 데라가 여기서 죽고 아브라함은 75세에 다시 떠납니다.' },
      { id: 'shechem', name: '세겜', nameEn: 'Shechem', modern: '나블루스', coord: [32.2140, 35.2790], refs: ['창세기 12:6-7'], desc: '가나안에 들어와 처음 제단을 쌓은 곳. "이 땅을 네 자손에게 주리라"는 약속을 받습니다.' },
      { id: 'bethel', name: '벧엘', nameEn: 'Bethel', modern: '베이틴', coord: [31.9308, 35.2206], refs: ['창세기 12:8', '창세기 13:3-4'], desc: '아브라함이 제단을 쌓고 여호와의 이름을 부른 곳.' },
      { id: 'egypt', name: '애굽(이집트)', nameEn: 'Egypt', modern: '나일 삼각주', coord: [30.8025, 31.8400], refs: ['창세기 12:10'], desc: '가나안에 기근이 들자 잠시 내려갔던 곳. 이곳에서 위기를 겪습니다.' },
      { id: 'hebron', name: '헤브론(마므레)', nameEn: 'Hebron / Mamre', modern: '헤브론', coord: [31.5326, 35.0998], refs: ['창세기 13:18', '창세기 23장'], desc: '아브라함이 오래 거주한 곳이자 막벨라 굴에 사라를 장사한 가족 묘지가 있던 땅.' },
      { id: 'beersheba', name: '브엘세바', nameEn: 'Beersheba', modern: '브엘셰바', coord: [31.2518, 34.7913], refs: ['창세기 21:31-33'], desc: '아비멜렉과 언약을 맺고 우물을 판 곳. 이스라엘 남쪽 경계의 상징.' },
    ],
  },
  {
    id: 'exodus',
    title: '출애굽 경로',
    subtitle: '종살이의 땅에서 시내산을 거쳐',
    testament: 'OT',
    kind: 'journey',
    book: '출애굽기~신명기',
    era: '약 BC 1446 / 1290년경',
    year: -1446,
    color: '#dc2626',
    icon: '🔥',
    summary:
      '이집트의 노예 생활에서 해방된 이스라엘이 홍해를 건너 시내산에서 율법을 받고 약속의 땅 경계까지 이동한 광야 여정입니다. 직선 거리는 짧지만 광야에서 40년을 보낸 이유를 지도로 보면 이해가 깊어집니다.',
    locations: [
      { id: 'rameses', name: '라암셋', nameEn: 'Rameses', modern: '콴티르', coord: [30.8000, 31.8333], refs: ['출애굽기 12:37'], desc: '출애굽이 시작된 출발지. 이스라엘이 노역하던 국고성 중 하나.' },
      { id: 'succoth', name: '숙곳', nameEn: 'Succoth', coord: [30.5500, 32.0500], refs: ['출애굽기 12:37', '출애굽기 13:20'], desc: '라암셋을 떠난 후 첫 진을 친 곳.' },
      { id: 'redsea', name: '홍해 도하 지점', nameEn: 'Red Sea Crossing', coord: [29.9700, 32.5500], refs: ['출애굽기 14장'], desc: '바다가 갈라져 마른 땅으로 건넌 구원의 결정적 사건. 추격하던 애굽 군대는 수장됩니다.' },
      { id: 'marah', name: '마라', nameEn: 'Marah', coord: [29.2000, 32.9000], refs: ['출애굽기 15:22-25'], desc: '쓴 물이 단 물로 변한 곳. 광야 생활의 첫 시험.' },
      { id: 'elim', name: '엘림', nameEn: 'Elim', coord: [29.0000, 33.0000], refs: ['출애굽기 15:27'], desc: '샘 열둘과 종려나무 일흔 그루가 있던 오아시스.' },
      { id: 'sinai', name: '시내산', nameEn: 'Mount Sinai', modern: '제벨 무사', coord: [28.5392, 33.9756], refs: ['출애굽기 19~20장'], desc: '하나님이 모세에게 십계명과 율법을 주신 언약의 산. 출애굽 여정의 신학적 정점.' },
      { id: 'kadesh', name: '가데스 바네아', nameEn: 'Kadesh Barnea', coord: [30.6906, 34.4983], refs: ['민수기 13~14장'], desc: '열두 정탐꾼을 보낸 곳. 불신앙으로 인해 광야 40년 방랑이 결정됩니다.' },
      { id: 'nebo', name: '느보산', nameEn: 'Mount Nebo', modern: '요르단', coord: [31.7681, 35.7256], refs: ['신명기 34장'], desc: '모세가 약속의 땅을 바라보고 죽은 산. 가나안 입성 직전의 마지막 지점.' },
    ],
  },
  {
    id: 'conquest',
    title: '가나안 정복',
    subtitle: '여호수아의 약속의 땅 점령',
    testament: 'OT',
    kind: 'journey',
    book: '여호수아 1~12장',
    era: '약 BC 1400년경',
    year: -1400,
    color: '#b45309',
    icon: '🗡️',
    summary:
      '여호수아의 지휘 아래 요단강을 건너 중부→남부→북부 순으로 가나안을 점령해 간 정복 전쟁입니다. 중앙을 먼저 끊고 남북을 차례로 친 전략이 지도에서 한눈에 보입니다.',
    locations: [
      { id: 'gilgal', name: '길갈(요단 도하)', nameEn: 'Gilgal', coord: [31.8700, 35.5600], refs: ['여호수아 3~4장'], desc: '요단강이 갈라져 마른 땅으로 건넌 입성 지점. 열두 돌 기념비를 세웁니다.' },
      { id: 'jericho-c', name: '여리고', nameEn: 'Jericho', coord: [31.8607, 35.4444], refs: ['여호수아 6장'], desc: '엿새를 돌고 이레째 외침으로 성벽이 무너진 첫 승리.' },
      { id: 'ai', name: '아이', nameEn: 'Ai', coord: [31.9170, 35.2700], refs: ['여호수아 7~8장'], desc: '아간의 범죄로 첫 패배를 겪었으나 회개 후 점령한 곳.' },
      { id: 'gibeon', name: '기브온', nameEn: 'Gibeon', coord: [31.8460, 35.1840], refs: ['여호수아 9~10장'], desc: '꾀로 화친을 맺은 성읍. 이로 인해 남부 연합군과의 전쟁이 시작됩니다.' },
      { id: 'aijalon', name: '아얄론 골짜기', nameEn: 'Valley of Aijalon', coord: [31.8600, 35.0200], refs: ['여호수아 10:12-14'], desc: '"태양아 머무르라" — 해와 달이 멈춘 기적이 일어난 남부 전투의 현장.' },
      { id: 'merom', name: '메롬 물가', nameEn: 'Waters of Merom', coord: [33.0500, 35.5000], refs: ['여호수아 11:1-9'], desc: '북부 연합군을 격파한 결정적 전투지.' },
      { id: 'hazor', name: '하솔', nameEn: 'Hazor', coord: [33.0170, 35.5680], refs: ['여호수아 11:10-13'], desc: '북부 동맹의 우두머리 성읍. 불사른 유일한 도시.' },
      { id: 'shiloh-c', name: '실로', nameEn: 'Shiloh', coord: [32.0550, 35.2890], refs: ['여호수아 18:1'], desc: '정복 후 성막을 세우고 땅을 분배한 신앙의 중심지.' },
    ],
  },
  {
    id: 'tribes',
    title: '이스라엘 12지파 분배',
    subtitle: '약속의 땅, 지파별 기업',
    testament: 'OT',
    kind: 'region',
    book: '여호수아 13~21장',
    era: '약 BC 1380년경',
    year: -1380,
    color: '#0d9488',
    icon: '🧩',
    summary:
      '정복한 가나안 땅을 열두 지파에게 제비뽑아 나누어 준 기업의 분포입니다. 지파의 위치를 알면 이후 사사기·왕국 시대의 사건들이 일어난 무대가 명확해집니다. (영역의 대략적 중심을 표시)',
    locations: [
      { id: 'asher', name: '아셀', nameEn: 'Asher', coord: [32.9500, 35.1000], refs: ['여호수아 19:24-31'], desc: '북서쪽 지중해 해안 지역.' },
      { id: 'naphtali', name: '납달리', nameEn: 'Naphtali', coord: [33.0000, 35.5000], refs: ['여호수아 19:32-39'], desc: '갈릴리 북동부. 훗날 예수님 사역의 중심이 됩니다.' },
      { id: 'zebulun', name: '스불론', nameEn: 'Zebulun', coord: [32.8000, 35.3000], refs: ['여호수아 19:10-16'], desc: '갈릴리 남서부. 나사렛이 이 지역에 속합니다.' },
      { id: 'issachar', name: '잇사갈', nameEn: 'Issachar', coord: [32.6000, 35.4500], refs: ['여호수아 19:17-23'], desc: '비옥한 이스르엘 골짜기 일대.' },
      { id: 'manasseh-w', name: '므낫세(서편 반)', nameEn: 'Manasseh (West)', coord: [32.4000, 35.2000], refs: ['여호수아 17:1-13'], desc: '중부 산지 북쪽.' },
      { id: 'manasseh-e', name: '므낫세(동편 반)', nameEn: 'Manasseh (East)', coord: [32.7000, 35.9000], refs: ['여호수아 13:29-31'], desc: '요단 동편 바산 지역.' },
      { id: 'ephraim', name: '에브라임', nameEn: 'Ephraim', coord: [32.1000, 35.2500], refs: ['여호수아 16장'], desc: '중부 산지. 실로와 세겜이 속한 강력한 지파.' },
      { id: 'gad', name: '갓', nameEn: 'Gad', coord: [32.1000, 35.7500], refs: ['여호수아 13:24-28'], desc: '요단 동편 길르앗 지역.' },
      { id: 'dan', name: '단', nameEn: 'Dan', coord: [31.9500, 34.9000], refs: ['여호수아 19:40-48'], desc: '본래 서쪽 해안에 분배되었으나 후에 북쪽으로 이주.' },
      { id: 'benjamin', name: '베냐민', nameEn: 'Benjamin', coord: [31.8500, 35.2200], refs: ['여호수아 18:11-28'], desc: '예루살렘을 포함한 중앙의 작은 지파.' },
      { id: 'reuben', name: '르우벤', nameEn: 'Reuben', coord: [31.5000, 35.7000], refs: ['여호수아 13:15-23'], desc: '요단 동편 남쪽, 사해 동편 고원.' },
      { id: 'judah', name: '유다', nameEn: 'Judah', coord: [31.5000, 35.0000], refs: ['여호수아 15장'], desc: '남부의 가장 큰 기업. 다윗 왕가와 메시아의 지파.' },
      { id: 'simeon', name: '시므온', nameEn: 'Simeon', coord: [31.2000, 34.8000], refs: ['여호수아 19:1-9'], desc: '유다 영토 안 남서쪽에 분포한 지파.' },
      { id: 'levi', name: '레위(기업 없음)', nameEn: 'Levi', coord: [32.0550, 35.2890], refs: ['여호수아 21장'], desc: '땅 대신 각 지파 가운데 48성읍을 받은 제사장 지파. (위치는 성막의 실로로 표시)' },
    ],
  },
  {
    id: 'divided',
    title: '분열 왕국',
    subtitle: '북이스라엘과 남유다',
    testament: 'OT',
    kind: 'region',
    book: '열왕기상~하',
    era: '약 BC 930~586년',
    year: -930,
    color: '#9333ea',
    icon: '👑',
    summary:
      '솔로몬 사후 한 나라가 북이스라엘(수도 사마리아)과 남유다(수도 예루살렘)로 갈라진 시대입니다. 두 왕국의 주요 도시를 지도로 보면 열왕기·예언서의 무대가 정리됩니다.',
    locations: [
      { id: 'jerusalem-d', name: '예루살렘 〔남유다 수도〕', nameEn: 'Jerusalem', coord: [31.7683, 35.2137], refs: ['열왕기상 12:21'], desc: '남유다의 수도이자 성전이 있는 도시.' },
      { id: 'hebron-d', name: '헤브론 〔남유다〕', nameEn: 'Hebron', coord: [31.5326, 35.0998], refs: ['열왕기상 2:11'], desc: '유다 남부의 주요 성읍.' },
      { id: 'lachish', name: '라기스 〔남유다〕', nameEn: 'Lachish', coord: [31.5650, 34.8490], refs: ['열왕기하 18:13-14'], desc: '유다의 군사 요새. 앗수르 산헤립의 공격을 받습니다.' },
      { id: 'beersheba-d', name: '브엘세바 〔남유다〕', nameEn: 'Beersheba', coord: [31.2518, 34.7913], refs: ['열왕기상 19:3'], desc: '유다 최남단 경계 도시.' },
      { id: 'samaria', name: '사마리아 〔북이스라엘 수도〕', nameEn: 'Samaria', coord: [32.2806, 35.1900], refs: ['열왕기상 16:24'], desc: '오므리가 세운 북이스라엘의 수도. 아합과 이세벨의 거점.' },
      { id: 'shechem-d', name: '세겜 〔북이스라엘〕', nameEn: 'Shechem', coord: [32.2140, 35.2790], refs: ['열왕기상 12:25'], desc: '여로보암이 처음 도읍으로 삼은 곳.' },
      { id: 'jezreel', name: '이스르엘 〔북이스라엘〕', nameEn: 'Jezreel', coord: [32.5570, 35.3280], refs: ['열왕기상 21장'], desc: '아합의 별궁이 있던 곳. 나봇의 포도원 사건의 현장.' },
      { id: 'bethel-d', name: '벧엘 〔북이스라엘〕', nameEn: 'Bethel', coord: [31.9308, 35.2206], refs: ['열왕기상 12:28-29'], desc: '여로보암이 금송아지를 세운 남쪽 예배처.' },
      { id: 'dan-d', name: '단 〔북이스라엘〕', nameEn: 'Dan', coord: [33.2486, 35.6528], refs: ['열왕기상 12:28-29'], desc: '여로보암이 금송아지를 세운 북쪽 예배처. 나라의 최북단.' },
      { id: 'ramoth', name: '길르앗 라못 〔북이스라엘〕', nameEn: 'Ramoth-Gilead', coord: [32.6000, 35.8600], refs: ['열왕기상 22장'], desc: '아람과의 전쟁터. 아합이 전사한 곳.' },
    ],
  },
  {
    id: 'exile',
    title: '바벨론 포로',
    subtitle: '예루살렘에서 바벨론으로',
    testament: 'OT',
    kind: 'journey',
    book: '열왕기하 25장 · 다니엘 · 에스겔',
    era: '약 BC 586년',
    year: -586,
    color: '#1d4ed8',
    icon: '⛓️',
    summary:
      '예루살렘이 함락되고 유다 백성이 바벨론으로 끌려간 포로의 길입니다. 약 1,500km에 이르는 강제 이주의 경로를 보면 "바벨론 강가에서 울었도다"(시 137편)의 정서가 와닿습니다.',
    locations: [
      { id: 'jerusalem-e', name: '예루살렘', nameEn: 'Jerusalem', coord: [31.7683, 35.2137], refs: ['열왕기하 25:1-10'], desc: '바벨론 느부갓네살에게 함락되어 성전이 불탄 멸망의 시작점.' },
      { id: 'riblah', name: '리블라', nameEn: 'Riblah', coord: [34.4610, 36.5480], refs: ['열왕기하 25:6-7'], desc: '시드기야가 끌려와 재판받고 두 눈이 뽑힌 느부갓네살의 진영.' },
      { id: 'mari', name: '마리(유프라테스 길)', nameEn: 'Mari', coord: [34.5500, 40.8900], refs: ['시편 137:1'], desc: '유프라테스 강을 따라 내려가는 포로 행렬의 경유지.' },
      { id: 'babylon', name: '바벨론', nameEn: 'Babylon', coord: [32.5424, 44.4208], refs: ['다니엘 1:1-7', '시편 137편'], desc: '포로 생활의 중심 도시. 다니엘과 세 친구가 신앙을 지킨 제국의 수도.' },
      { id: 'telabib', name: '델아빕(그발 강가)', nameEn: 'Tel-abib, Chebar', coord: [32.1300, 45.1900], refs: ['에스겔 1:1-3', '에스겔 3:15'], desc: '포로 공동체가 정착한 운하 지역. 에스겔이 환상을 본 곳.' },
    ],
  },
  {
    id: 'jesus',
    title: '예수님의 생애와 사역',
    subtitle: '베들레헴에서 예루살렘까지',
    testament: 'NT',
    kind: 'journey',
    book: '4복음서',
    era: '약 BC 4 ~ AD 30',
    year: 27,
    color: '#7c3aed',
    icon: '✝️',
    summary:
      '예수님의 탄생, 성장, 갈릴리 사역, 그리고 예루살렘에서의 마지막 한 주를 잇는 지도입니다. 갈릴리(사역의 중심)와 예루살렘(십자가·부활)의 거리를 보면 복음서의 흐름이 한눈에 들어옵니다.',
    locations: [
      { id: 'bethlehem', name: '베들레헴', nameEn: 'Bethlehem', coord: [31.7054, 35.2024], refs: ['누가복음 2:1-7', '미가 5:2'], desc: '예수님이 탄생하신 다윗의 동네.' },
      { id: 'nazareth', name: '나사렛', nameEn: 'Nazareth', coord: [32.7019, 35.2978], refs: ['누가복음 2:39-40', '마태복음 2:23'], desc: '예수님이 자라신 갈릴리의 마을. "나사렛 예수"의 고향.' },
      { id: 'jordan', name: '요단강(세례터)', nameEn: 'Jordan River', coord: [31.8370, 35.5470], refs: ['마태복음 3:13-17'], desc: '세례 요한에게 세례를 받고 공생애를 시작하신 곳.' },
      { id: 'capernaum', name: '가버나움', nameEn: 'Capernaum', coord: [32.8807, 35.5750], refs: ['마태복음 4:13', '마가복음 2:1'], desc: '갈릴리 사역의 본거지. 많은 기적과 가르침이 이곳을 중심으로 일어났습니다.' },
      { id: 'cana', name: '가나', nameEn: 'Cana', coord: [32.7456, 35.3392], refs: ['요한복음 2:1-11'], desc: '물로 포도주를 만든 첫 표적이 있었던 혼인 잔치의 마을.' },
      { id: 'galilee', name: '갈릴리 호수', nameEn: 'Sea of Galilee', coord: [32.8000, 35.5900], refs: ['마가복음 4:35-41', '요한복음 21장'], desc: '제자들을 부르시고 풍랑을 잠재우신 호수. 갈릴리 사역의 무대.' },
      { id: 'caesarea-philippi', name: '가이사랴 빌립보', nameEn: 'Caesarea Philippi', coord: [33.2486, 35.6944], refs: ['마태복음 16:13-20'], desc: '베드로가 "주는 그리스도시요"라고 신앙을 고백한 곳.' },
      { id: 'jericho', name: '여리고', nameEn: 'Jericho', coord: [31.8607, 35.4444], refs: ['누가복음 19:1-10'], desc: '삭개오를 만나시고 예루살렘으로 오르시던 길목.' },
      { id: 'bethany', name: '베다니', nameEn: 'Bethany', coord: [31.7717, 35.2614], refs: ['요한복음 11장', '요한복음 12:1-3'], desc: '나사로를 살리신 마을. 마리아·마르다·나사로의 집.' },
      { id: 'jerusalem-j', name: '예루살렘', nameEn: 'Jerusalem', coord: [31.7683, 35.2137], refs: ['누가복음 19:28', '마태복음 27~28장'], desc: '십자가와 부활이 일어난 구속사의 중심 도시.' },
    ],
  },
  {
    id: 'paul1',
    title: '바울의 1차 전도여행',
    subtitle: '구브로와 갈라디아 지역',
    testament: 'NT',
    kind: 'journey',
    book: '사도행전 13~14장',
    era: '약 AD 46~48',
    year: 47,
    color: '#0891b2',
    icon: '⛵',
    summary:
      '안디옥 교회의 파송으로 바나바와 함께 떠난 첫 선교 여행. 구브로(키프로스)를 거쳐 소아시아 내륙의 갈라디아 지역에 복음을 전하고 교회를 세웁니다.',
    locations: [
      { id: 'antioch1', name: '안디옥(수리아)', nameEn: 'Antioch in Syria', coord: [36.2021, 36.1604], refs: ['사도행전 13:1-3'], desc: '선교 여행이 시작된 파송 교회. "그리스도인"이라는 이름이 처음 생긴 곳.' },
      { id: 'seleucia', name: '실루기아', nameEn: 'Seleucia', coord: [36.1200, 35.9300], refs: ['사도행전 13:4'], desc: '안디옥의 항구. 여기서 배를 타고 출항했습니다.' },
      { id: 'salamis', name: '살라미', nameEn: 'Salamis', modern: '키프로스', coord: [35.1817, 33.9006], refs: ['사도행전 13:5'], desc: '구브로 섬 동쪽의 항구. 회당에서 말씀을 전했습니다.' },
      { id: 'paphos', name: '바보', nameEn: 'Paphos', coord: [34.7571, 32.4067], refs: ['사도행전 13:6-12'], desc: '총독 서기오 바울이 믿게 된 곳. 마술사 엘루마를 책망합니다.' },
      { id: 'perga', name: '버가', nameEn: 'Perga', coord: [36.9617, 30.8536], refs: ['사도행전 13:13'], desc: '소아시아 본토 상륙지. 여기서 마가 요한이 떠나갑니다.' },
      { id: 'pisidian-antioch', name: '비시디아 안디옥', nameEn: 'Pisidian Antioch', coord: [38.3060, 31.1897], refs: ['사도행전 13:14-50'], desc: '회당에서 강력한 설교를 한 곳. 이방인에게로 돌이키는 전환점.' },
      { id: 'iconium', name: '이고니온', nameEn: 'Iconium', coord: [37.8716, 32.4847], refs: ['사도행전 14:1-6'], desc: '많은 사람이 믿었으나 박해로 떠나야 했던 도시.' },
      { id: 'lystra', name: '루스드라', nameEn: 'Lystra', coord: [37.5800, 32.4500], refs: ['사도행전 14:8-20'], desc: '앉은뱅이를 고치자 신으로 오해받고, 이후 돌에 맞은 곳. 디모데의 고향.' },
      { id: 'derbe', name: '더베', nameEn: 'Derbe', coord: [37.3500, 33.2700], refs: ['사도행전 14:20-21'], desc: '1차 여행의 가장 먼 지점. 많은 제자를 삼은 후 왔던 길로 되돌아갑니다.' },
    ],
  },
  {
    id: 'paul2',
    title: '바울의 2차 전도여행',
    subtitle: '복음이 유럽으로 건너가다',
    testament: 'NT',
    kind: 'journey',
    book: '사도행전 15:36~18:22',
    era: '약 AD 49~52',
    year: 50,
    color: '#16a34a',
    icon: '🌍',
    summary:
      '마게도냐 환상을 따라 복음이 처음으로 유럽(빌립보·데살로니가·아덴·고린도)에 전해진 결정적 여행입니다. 아시아에서 유럽으로 건너가는 지점을 지도로 보면 복음 확장의 의미가 분명해집니다.',
    locations: [
      { id: 'antioch2', name: '안디옥(수리아)', nameEn: 'Antioch', coord: [36.2021, 36.1604], refs: ['사도행전 15:36-40'], desc: '실라와 함께 다시 출발. 바나바와는 마가 문제로 갈라섭니다.' },
      { id: 'troas', name: '드로아', nameEn: 'Troas', coord: [39.7500, 26.1600], refs: ['사도행전 16:8-10'], desc: '"마게도냐로 건너와 도우라"는 환상을 본 곳. 유럽 선교의 출발점.' },
      { id: 'philippi', name: '빌립보', nameEn: 'Philippi', coord: [41.0130, 24.2870], refs: ['사도행전 16:11-40'], desc: '유럽 최초의 교회. 루디아의 회심, 옥중 찬송과 간수의 구원이 있었던 곳.' },
      { id: 'thessalonica', name: '데살로니가', nameEn: 'Thessalonica', coord: [40.6401, 22.9444], refs: ['사도행전 17:1-9'], desc: '세 안식일 동안 강론한 곳. 데살로니가전후서의 수신 교회.' },
      { id: 'berea', name: '베뢰아', nameEn: 'Berea', coord: [40.5240, 22.2030], refs: ['사도행전 17:10-15'], desc: '말씀을 날마다 상고한 신사적인 사람들이 있던 곳.' },
      { id: 'athens', name: '아덴(아테네)', nameEn: 'Athens', coord: [37.9838, 23.7275], refs: ['사도행전 17:16-34'], desc: '아레오바고에서 "알지 못하는 신"을 설교한 철학과 우상의 도시.' },
      { id: 'corinth', name: '고린도', nameEn: 'Corinth', coord: [37.9060, 22.8780], refs: ['사도행전 18:1-18'], desc: '1년 6개월을 머물며 교회를 세운 무역 도시. 고린도전후서의 수신지.' },
      { id: 'ephesus2', name: '에베소', nameEn: 'Ephesus', coord: [37.9410, 27.3400], refs: ['사도행전 18:19-21'], desc: '잠시 들러 회당에서 변론하고, 다시 오겠다고 약속한 곳.' },
      { id: 'caesarea2', name: '가이사랴', nameEn: 'Caesarea', coord: [32.5000, 34.8900], refs: ['사도행전 18:22'], desc: '예루살렘 교회에 인사한 뒤 안디옥으로 돌아가는 항구.' },
    ],
  },
  {
    id: 'paul3',
    title: '바울의 3차 전도여행',
    subtitle: '에베소 사역과 교회 양육',
    testament: 'NT',
    kind: 'journey',
    book: '사도행전 18:23~21:17',
    era: '약 AD 53~57',
    year: 54,
    color: '#ca8a04',
    icon: '📜',
    summary:
      '에베소에서 약 3년간 집중적으로 가르치며 아시아 전역에 복음이 퍼진 여행입니다. 이미 세운 교회들을 다시 방문해 굳게 세우는 양육의 여정이며, 마지막엔 예루살렘으로 향합니다.',
    locations: [
      { id: 'antioch3', name: '안디옥(수리아)', nameEn: 'Antioch', coord: [36.2021, 36.1604], refs: ['사도행전 18:23'], desc: '세 번째 여행의 출발지. 갈라디아와 브루기아를 차례로 다니며 제자들을 굳게 합니다.' },
      { id: 'ephesus3', name: '에베소', nameEn: 'Ephesus', coord: [37.9410, 27.3400], refs: ['사도행전 19장'], desc: '두란노 서원에서 2년간 강론. 큰 부흥과 은장색 데메드리오의 소동이 있던 사역의 중심.' },
      { id: 'macedonia3', name: '마게도냐(빌립보)', nameEn: 'Macedonia', coord: [41.0130, 24.2870], refs: ['사도행전 20:1-2'], desc: '에베소를 떠나 마게도냐 지역 교회들을 다시 방문하며 격려합니다.' },
      { id: 'greece3', name: '헬라(고린도)', nameEn: 'Greece / Corinth', coord: [37.9060, 22.8780], refs: ['사도행전 20:2-3'], desc: '석 달을 머문 곳. 이 시기에 로마서를 기록한 것으로 봅니다.' },
      { id: 'troas3', name: '드로아', nameEn: 'Troas', coord: [39.7500, 26.1600], refs: ['사도행전 20:6-12'], desc: '밤늦도록 강론하던 중 유두고가 떨어졌다가 살아난 곳.' },
      { id: 'miletus', name: '밀레도', nameEn: 'Miletus', coord: [37.5300, 27.2800], refs: ['사도행전 20:17-38'], desc: '에베소 장로들을 불러 눈물의 고별 설교를 한 항구.' },
      { id: 'tyre3', name: '두로', nameEn: 'Tyre', coord: [33.2700, 35.2000], refs: ['사도행전 21:3-6'], desc: '제자들이 성령으로 예루살렘에 가지 말라 권면했으나 바울은 계속 나아갑니다.' },
      { id: 'caesarea3', name: '가이사랴', nameEn: 'Caesarea', coord: [32.5000, 34.8900], refs: ['사도행전 21:8-14'], desc: '선지자 아가보가 결박을 예언한 곳. 그래도 바울은 예루살렘으로 향합니다.' },
      { id: 'jerusalem3', name: '예루살렘', nameEn: 'Jerusalem', coord: [31.7683, 35.2137], refs: ['사도행전 21:15-17'], desc: '여행의 종착지. 이곳에서 체포되어 로마 압송으로 이어집니다.' },
    ],
  },
  {
    id: 'paul-rome',
    title: '바울의 로마 압송 항해',
    subtitle: '죄수가 되어 제국의 심장으로',
    testament: 'NT',
    kind: 'journey',
    book: '사도행전 27~28장',
    era: '약 AD 59~60',
    year: 59,
    color: '#475569',
    icon: '🚢',
    summary:
      '가이사에게 상소한 바울이 죄수 신분으로 로마까지 호송된 험난한 항해입니다. 유라굴로 광풍과 멜리데(몰타) 난파를 거쳐 마침내 로마에 도착, 복음이 제국의 수도에 이르게 됩니다.',
    locations: [
      { id: 'caesarea-r', name: '가이사랴', nameEn: 'Caesarea', coord: [32.5000, 34.8900], refs: ['사도행전 27:1-2'], desc: '항해의 출발지. 백부장 율리오에게 인계되어 배에 오릅니다.' },
      { id: 'sidon', name: '시돈', nameEn: 'Sidon', coord: [33.5600, 35.3700], refs: ['사도행전 27:3'], desc: '백부장이 친절을 베풀어 친구들에게 대접받게 한 항구.' },
      { id: 'myra', name: '무라', nameEn: 'Myra', coord: [36.2580, 29.9850], refs: ['사도행전 27:5-6'], desc: '이달리야로 가는 알렉산드리아 배로 갈아탄 곳.' },
      { id: 'fair-havens', name: '미항(아름다운 항구)', nameEn: 'Fair Havens', modern: '크레타', coord: [34.9200, 24.8000], refs: ['사도행전 27:8-12'], desc: '항해하기에 위험한 시기였으나 더 나은 항구를 찾아 떠나려다 광풍을 만납니다.' },
      { id: 'malta', name: '멜리데(몰타)', nameEn: 'Malta', coord: [35.8900, 14.5100], refs: ['사도행전 27:39~28:10'], desc: '배가 난파되었으나 전원이 구조된 섬. 독사에 물려도 무사했고 많은 병자를 고칩니다.' },
      { id: 'syracuse', name: '수라구사', nameEn: 'Syracuse', coord: [37.0700, 15.2900], refs: ['사도행전 28:12'], desc: '시칠리아의 항구. 사흘을 머뭅니다.' },
      { id: 'puteoli', name: '보디올', nameEn: 'Puteoli', coord: [40.8200, 14.1200], refs: ['사도행전 28:13-14'], desc: '이탈리아 본토 상륙지. 형제들을 만나 이레를 함께 지냅니다.' },
      { id: 'rome', name: '로마', nameEn: 'Rome', coord: [41.9000, 12.5000], refs: ['사도행전 28:14-31'], desc: '최종 도착지. 셋집에 머물며 담대히 하나님 나라를 전파합니다. 복음이 제국의 수도에 이른 사건.' },
    ],
  },
]

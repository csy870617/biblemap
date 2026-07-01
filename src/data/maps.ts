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
      { id: 'hebron-d', name: '헤브론 〔남유다〕', nameEn: 'Hebron', coord: [31.5326, 35.0998], refs: ['역대하 11:10'], desc: '르호보암이 요새화한 유다 남부의 주요 성읍.' },
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

// 성경 핵심 지명 30선 — 사이드바의 별도 "핵심지명" 목록에서 개별적으로 켜고 끌 수 있도록,
// 하나의 지명(또는 짝지어 설명되는 두 지명)을 각각 별도 테마로 등록했습니다.
// THEMES와 분리된 배열이라 하단 연대표(Timeline)에는 나타나지 않습니다.
const KEY_PLACE_COLOR = '#e11d48'
const KEY_PLACE_ICON = '📍'

export const KEY_PLACES: BibleMapTheme[] = [
  {
    id: 'key-ur', title: '갈대아 우르 (Ur of the Chaldeans)', subtitle: '유프라테스강 하구 (현 이라크)', testament: 'OT', kind: 'region',
    book: 'I. 창세기~출애굽, 광야 시대', era: '족장 시대 (약 BC 2000년경)', year: -2000, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '아브라함이 믿음의 여정을 시작한 기점. 당시 최고로 발달한 문명 도시였음을 지도로 확인하면 그의 결단이 더 크게 다가옵니다.',
    locations: [{ id: 'key-ur', name: '갈대아 우르', nameEn: 'Ur of the Chaldeans', modern: '이라크', coord: [30.9626, 46.1031], refs: [], desc: '아브라함이 믿음의 여정을 시작한 기점. 당시 최고로 발달한 문명 도시였음을 지도로 확인하면 그의 결단이 더 크게 다가옵니다.' }],
  },
  {
    id: 'key-haran', title: '하란 (Haran)', subtitle: '유프라테스강 상류 (현 터키 남부)', testament: 'OT', kind: 'region',
    book: 'I. 창세기~출애굽, 광야 시대', era: '족장 시대 (약 BC 2000년경)', year: -1990, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '아브라함이 가나안으로 가기 전 머물렀던 중간 기착지로, 고대 무역로의 핵심 요충지였습니다.',
    locations: [{ id: 'key-haran', name: '하란', nameEn: 'Haran', modern: '터키 남부', coord: [36.8628, 39.0306], refs: [], desc: '아브라함이 가나안으로 가기 전 머물렀던 중간 기착지로, 고대 무역로의 핵심 요충지였습니다.' }],
  },
  {
    id: 'key-shechem', title: '세겜 (Shechem)', subtitle: '중앙 산악지대의 허리', testament: 'OT', kind: 'region',
    book: 'I. 창세기~출애굽, 광야 시대', era: '족장 시대', year: -1980, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '아브라함이 가나안에서 첫 제단을 쌓은 곳이자, 야곱의 우물, 요셉의 묘가 있는 곳으로 고대 남북 교통로의 중심입니다.',
    locations: [{ id: 'key-shechem', name: '세겜', nameEn: 'Shechem', modern: '나블루스', coord: [32.2140, 35.2790], refs: [], desc: '아브라함이 가나안에서 첫 제단을 쌓은 곳이자, 야곱의 우물, 요셉의 묘가 있는 곳으로 고대 남북 교통로의 중심입니다.' }],
  },
  {
    id: 'key-goshen', title: '고센 (Goshen)', subtitle: '이집트 나일강 삼각주 동북부', testament: 'OT', kind: 'region',
    book: 'I. 창세기~출애굽, 광야 시대', era: '족장~출애굽 시대', year: -1700, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '이스라엘 백성이 430년간 정착했던 비옥한 땅으로, 출애굽의 시작점입니다.',
    locations: [{ id: 'key-goshen', name: '고센', nameEn: 'Goshen', coord: [30.7300, 31.8000], refs: [], desc: '이스라엘 백성이 430년간 정착했던 비옥한 땅으로, 출애굽의 시작점입니다.' }],
  },
  {
    id: 'key-sinai', title: '시내산 (Mount Sinai)', subtitle: '시나이반도 남부', testament: 'OT', kind: 'region',
    book: 'I. 창세기~출애굽, 광야 시대', era: '출애굽 시대 (약 BC 1446년경)', year: -1446, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '모세가 율법을 받고 성막을 제작한 곳으로, 거친 광야 한복판에 고립된 지형적 엄숙함을 보여줍니다.',
    locations: [{ id: 'key-sinai', name: '시내산', nameEn: 'Mount Sinai', modern: '제벨 무사', coord: [28.5392, 33.9756], refs: [], desc: '모세가 율법을 받고 성막을 제작한 곳으로, 거친 광야 한복판에 고립된 지형적 엄숙함을 보여줍니다.' }],
  },
  {
    id: 'key-kadesh', title: '가데스 바네아 (Kadesh Barnea)', subtitle: '가나안 남쪽 국경 (신 광야)', testament: 'OT', kind: 'region',
    book: 'I. 창세기~출애굽, 광야 시대', era: '광야 시대', year: -1440, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '12정탐꾼을 보낸 곳이자 38년 방황의 기준점으로, 가나안 땅과의 물리적 거리가 얼마나 가까웠는지 지도로 봐야 실감 납니다.',
    locations: [{ id: 'key-kadesh', name: '가데스 바네아', nameEn: 'Kadesh Barnea', coord: [30.6906, 34.4983], refs: [], desc: '12정탐꾼을 보낸 곳이자 38년 방황의 기준점으로, 가나안 땅과의 물리적 거리가 얼마나 가까웠는지 지도로 봐야 실감 납니다.' }],
  },
  {
    id: 'key-moab', title: '모압 평지 (Plains of Moab)', subtitle: '요단강 동쪽, 여리고 맞은편', testament: 'OT', kind: 'region',
    book: 'I. 창세기~출애굽, 광야 시대', era: '광야 시대 말기', year: -1401, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '신명기가 선포된 장소이자 모세가 가나안을 바라보며 죽은 느보산이 있는 출애굽 여정의 최종 종착지입니다.',
    locations: [{ id: 'key-moab', name: '모압 평지', nameEn: 'Plains of Moab', coord: [31.8300, 35.6300], refs: [], desc: '신명기가 선포된 장소이자 모세가 가나안을 바라보며 죽은 느보산이 있는 출애굽 여정의 최종 종착지입니다.' }],
  },
  {
    id: 'key-jericho', title: '여리고 (Jericho)', subtitle: '요단 계곡 (해수면보다 약 250m 낮은 지형)', testament: 'OT', kind: 'region',
    book: 'II. 정복~통일 왕국 시대', era: '정복 시대 (약 BC 1400년경)', year: -1400, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '요단강을 건넌 이스라엘이 가나안 중부를 공략하기 위해 반드시 거쳐야 했던 관문입니다.',
    locations: [{ id: 'key-jericho', name: '여리고', nameEn: 'Jericho', coord: [31.8607, 35.4444], refs: [], desc: '요단강을 건넌 이스라엘이 가나안 중부를 공략하기 위해 반드시 거쳐야 했던 관문입니다.' }],
  },
  {
    id: 'key-ai-bethel', title: '아이 & 벧엘 (Ai & Bethel)', subtitle: '여리고 서쪽 산악지대', testament: 'OT', kind: 'region',
    book: 'II. 정복~통일 왕국 시대', era: '정복 시대', year: -1399, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '중부 산지 도로를 장악하기 위한 요충지로, 두 도시의 가까운 거리를 통해 패배와 승리의 반전이 시각화됩니다.',
    locations: [
      { id: 'key-ai', name: '아이', nameEn: 'Ai', coord: [31.9170, 35.2700], refs: [], desc: '중부 산지 도로를 장악하기 위한 요충지로, 두 도시의 가까운 거리를 통해 패배와 승리의 반전이 시각화됩니다.' },
      { id: 'key-bethel-9', name: '벧엘', nameEn: 'Bethel', coord: [31.9308, 35.2206], refs: [], desc: '중부 산지 도로를 장악하기 위한 요충지로, 두 도시의 가까운 거리를 통해 패배와 승리의 반전이 시각화됩니다.' },
    ],
  },
  {
    id: 'key-gilgal', title: '길갈 (Gilgal)', subtitle: '요단강과 여리고 사이', testament: 'OT', kind: 'region',
    book: 'II. 정복~통일 왕국 시대', era: '정복 시대', year: -1400, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '가나안 정복 전쟁의 베이스캠프이자 할례와 유월절을 행한 영적 재정비의 장소입니다.',
    locations: [{ id: 'key-gilgal', name: '길갈', nameEn: 'Gilgal', coord: [31.8700, 35.5600], refs: [], desc: '가나안 정복 전쟁의 베이스캠프이자 할례와 유월절을 행한 영적 재정비의 장소입니다.' }],
  },
  {
    id: 'key-shiloh', title: '실로 (Shiloh)', subtitle: '에브라임 산지 중심부', testament: 'OT', kind: 'region',
    book: 'II. 정복~통일 왕국 시대', era: '사사 시대 초기', year: -1380, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '예루살렘 이전에 언약궤가 장기간 머물렀던 초기 이스라엘의 종교·정치적 중심지입니다.',
    locations: [{ id: 'key-shiloh', name: '실로', nameEn: 'Shiloh', coord: [32.0550, 35.2890], refs: [], desc: '예루살렘 이전에 언약궤가 장기간 머물렀던 초기 이스라엘의 종교·정치적 중심지입니다.' }],
  },
  {
    id: 'key-jezreel', title: '이스르엘 골짜기 (Jezreel Valley / 므깃도)', subtitle: '갈릴리 남쪽의 거대한 평야', testament: 'OT', kind: 'region',
    book: 'II. 정복~통일 왕국 시대', era: '사사~왕국 시대', year: -1100, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '해변길(Via Maris)이 지나는 사방이 열린 군사 요충지로, 기드온·사울·요시아 등의 주요 전쟁이 집중된 성경 최고의 전장입니다.',
    locations: [{ id: 'key-jezreel', name: '이스르엘 골짜기', nameEn: 'Jezreel Valley / Megiddo', coord: [32.5844, 35.1841], refs: [], desc: '해변길(Via Maris)이 지나는 사방이 열린 군사 요충지로, 기드온·사울·요시아 등의 주요 전쟁이 집중된 성경 최고의 전장입니다.' }],
  },
  {
    id: 'key-adullam-gath', title: '아둘람 & 가드 (Adullam & Gath)', subtitle: '유다 산지와 블레셋 평야의 경계 (셰펠라)', testament: 'OT', kind: 'region',
    book: 'II. 정복~통일 왕국 시대', era: '통일왕국 시대 초기', year: -1020, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '다윗이 사울을 피해 블레셋 영토(가드)와 국경 동굴(아둘람)을 넘나들던 아슬아슬한 도피 경로가 보입니다.',
    locations: [
      { id: 'key-adullam', name: '아둘람', nameEn: 'Adullam', coord: [31.6167, 34.9967], refs: [], desc: '다윗이 사울을 피해 블레셋 영토(가드)와 국경 동굴(아둘람)을 넘나들던 아슬아슬한 도피 경로가 보입니다.' },
      { id: 'key-gath', name: '가드', nameEn: 'Gath', coord: [31.7000, 34.8500], refs: [], desc: '다윗이 사울을 피해 블레셋 영토(가드)와 국경 동굴(아둘람)을 넘나들던 아슬아슬한 도피 경로가 보입니다.' },
    ],
  },
  {
    id: 'key-hebron', title: '헤브론 (Hebron)', subtitle: '예루살렘 남쪽 약 30km (유다 산지 최고 고도)', testament: 'OT', kind: 'region',
    book: 'II. 정복~통일 왕국 시대', era: '통일왕국 시대', year: -1010, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '막벨라 굴(족장들의 매장지)이 있으며, 다윗이 예루살렘 이전 7년 반 동안 유다를 다스린 첫 수도입니다.',
    locations: [{ id: 'key-hebron', name: '헤브론', nameEn: 'Hebron', coord: [31.5326, 35.0998], refs: [], desc: '막벨라 굴(족장들의 매장지)이 있으며, 다윗이 예루살렘 이전 7년 반 동안 유다를 다스린 첫 수도입니다.' }],
  },
  {
    id: 'key-jerusalem', title: '예루살렘 (Jerusalem)', subtitle: '유다와 베냐민 경계의 천혜의 요새', testament: 'OT', kind: 'region',
    book: 'II. 정복~통일 왕국 시대', era: '통일왕국 시대', year: -1000, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '다윗이 정복해 수도로 삼고 솔로몬이 성전을 건축한, 성경 구속사의 영원한 중심지입니다.',
    locations: [{ id: 'key-jerusalem', name: '예루살렘', nameEn: 'Jerusalem', coord: [31.7683, 35.2137], refs: [], desc: '다윗이 정복해 수도로 삼고 솔로몬이 성전을 건축한, 성경 구속사의 영원한 중심지입니다.' }],
  },
  {
    id: 'key-dan-bethel', title: '단 & 벧엘 (Dan & Bethel)', subtitle: '북이스라엘의 최북단(단)과 최남단(벧엘)', testament: 'OT', kind: 'region',
    book: 'III. 분열 왕국 ~ 포로 시대', era: '분열왕국 시대 (약 BC 930년경)', year: -930, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '여로보암 1세가 예루살렘으로 가는 남유다의 통로를 막기 위해 금송아지 신전을 세운 경계 도시들입니다.',
    locations: [
      { id: 'key-dan-16', name: '단', nameEn: 'Dan', coord: [33.2486, 35.6528], refs: [], desc: '여로보암 1세가 예루살렘으로 가는 남유다의 통로를 막기 위해 금송아지 신전을 세운 경계 도시들입니다.' },
      { id: 'key-bethel-16', name: '벧엘', nameEn: 'Bethel', coord: [31.9308, 35.2206], refs: [], desc: '여로보암 1세가 예루살렘으로 가는 남유다의 통로를 막기 위해 금송아지 신전을 세운 경계 도시들입니다.' },
    ],
  },
  {
    id: 'key-samaria', title: '사마리아 (Samaria)', subtitle: '북이스라엘의 세 번째 수도', testament: 'OT', kind: 'region',
    book: 'III. 분열 왕국 ~ 포로 시대', era: '분열왕국 시대', year: -880, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '사방이 평지로 둘러싸인 독특한 구릉 지형으로, 오므리 왕조가 국방과 교역을 위해 선택한 요새입니다.',
    locations: [{ id: 'key-samaria', name: '사마리아', nameEn: 'Samaria', coord: [32.2806, 35.1900], refs: [], desc: '사방이 평지로 둘러싸인 독특한 구릉 지형으로, 오므리 왕조가 국방과 교역을 위해 선택한 요새입니다.' }],
  },
  {
    id: 'key-tishbe-cherith', title: '디셉 & 그릿 시냇가 (Tishbe & Cherith Brook)', subtitle: '요단 동쪽 길르앗 지역', testament: 'OT', kind: 'region',
    book: 'III. 분열 왕국 ~ 포로 시대', era: '분열왕국 시대', year: -860, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '엘리야 선지자의 고향과 숨어 지내던 곳으로, 척박하고 험준한 지형이 선지자의 사역과 어우러집니다.',
    locations: [
      { id: 'key-tishbe', name: '디셉', nameEn: 'Tishbe', coord: [32.3800, 35.6200], refs: [], desc: '엘리야 선지자의 고향과 숨어 지내던 곳으로, 척박하고 험준한 지형이 선지자의 사역과 어우러집니다.' },
      { id: 'key-cherith', name: '그릿 시냇가', nameEn: 'Cherith Brook', coord: [32.4000, 35.6400], refs: [], desc: '엘리야 선지자의 고향과 숨어 지내던 곳으로, 척박하고 험준한 지형이 선지자의 사역과 어우러집니다.' },
    ],
  },
  {
    id: 'key-carmel', title: '갈멜산 (Mount Carmel)', subtitle: '지중해로 돌출한 산맥', testament: 'OT', kind: 'region',
    book: 'III. 분열 왕국 ~ 포로 시대', era: '분열왕국 시대', year: -850, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '북이스라엘과 바알을 섬기던 페니키아의 접경지대로, 엘리야가 바알 선지자들과 대결한 종교적 격전지입니다.',
    locations: [{ id: 'key-carmel', name: '갈멜산', nameEn: 'Mount Carmel', coord: [32.7259, 34.9707], refs: [], desc: '북이스라엘과 바알을 섬기던 페니키아의 접경지대로, 엘리야가 바알 선지자들과 대결한 종교적 격전지입니다.' }],
  },
  {
    id: 'key-lachish', title: '라기스 (Lachish)', subtitle: '예루살렘 남서쪽 (셰펠라의 핵심 요새)', testament: 'OT', kind: 'region',
    book: 'III. 분열 왕국 ~ 포로 시대', era: '분열왕국 말기', year: -701, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '예루살렘을 지키는 최후의 보루로, 앗수르와 바벨론의 유다 침공 경로에서 항상 먼저 함락당한 방어기지입니다.',
    locations: [{ id: 'key-lachish', name: '라기스', nameEn: 'Lachish', coord: [31.5650, 34.8490], refs: [], desc: '예루살렘을 지키는 최후의 보루로, 앗수르와 바벨론의 유다 침공 경로에서 항상 먼저 함락당한 방어기지입니다.' }],
  },
  {
    id: 'key-kebar', title: '그발 강가 (Kebar River)', subtitle: '바벨론 니푸르 근처의 대운하', testament: 'OT', kind: 'region',
    book: 'III. 분열 왕국 ~ 포로 시대', era: '포로 시대 (약 BC 593년경)', year: -593, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '포로로 잡혀간 에스겔이 환상을 본 곳으로, 예루살렘과의 지리적 단절과 절망을 보여주는 장소입니다.',
    locations: [{ id: 'key-kebar', name: '그발 강가', nameEn: 'Kebar River', coord: [32.1300, 45.1900], refs: [], desc: '포로로 잡혀간 에스겔이 환상을 본 곳으로, 예루살렘과의 지리적 단절과 절망을 보여주는 장소입니다.' }],
  },
  {
    id: 'key-nazareth', title: '나사렛 (Nazareth)', subtitle: '갈릴리 남부 산지 마을', testament: 'NT', kind: 'region',
    book: 'IV. 예수님의 생애와 사역', era: '예수님 생애 (약 BC 4~AD 30년경)', year: -4, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '예루살렘 중심부와 멀리 떨어진 변두리 지형을 보면 "나사렛에서 무슨 선한 것이 나겠느냐"라는 말의 뉘앙스가 이해됩니다.',
    locations: [{ id: 'key-nazareth', name: '나사렛', nameEn: 'Nazareth', coord: [32.7019, 35.2978], refs: [], desc: '예루살렘 중심부와 멀리 떨어진 변두리 지형을 보면 "나사렛에서 무슨 선한 것이 나겠느냐"라는 말의 뉘앙스가 이해됩니다.' }],
  },
  {
    id: 'key-capernaum', title: '가버나움 (Capernaum)', subtitle: '갈릴리 바다 북서쪽 해안', testament: 'NT', kind: 'region',
    book: 'IV. 예수님의 생애와 사역', era: '예수님 생애', year: 28, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '예수님 갈릴리 사역의 본거지이자, 세관이 있을 정도로 당시 국제 도로(해변길)가 관통하던 활발한 무역 도시였습니다.',
    locations: [{ id: 'key-capernaum', name: '가버나움', nameEn: 'Capernaum', coord: [32.8807, 35.5750], refs: [], desc: '예수님 갈릴리 사역의 본거지이자, 세관이 있을 정도로 당시 국제 도로(해변길)가 관통하던 활발한 무역 도시였습니다.' }],
  },
  {
    id: 'key-caesarea-philippi', title: '가이사랴 빌립보 (Caesarea Philippi)', subtitle: '헐몬산 기슭 최북단', testament: 'NT', kind: 'region',
    book: 'IV. 예수님의 생애와 사역', era: '예수님 생애', year: 29, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '거대한 바위산과 로마 황제·판(Pan) 신전이 가득했던 이방 종교의 중심지에서 베드로가 신앙 고백을 한 시각적 대비가 일품입니다.',
    locations: [{ id: 'key-caesarea-philippi', name: '가이사랴 빌립보', nameEn: 'Caesarea Philippi', coord: [33.2486, 35.6944], refs: [], desc: '거대한 바위산과 로마 황제·판(Pan) 신전이 가득했던 이방 종교의 중심지에서 베드로가 신앙 고백을 한 시각적 대비가 일품입니다.' }],
  },
  {
    id: 'key-jericho-road', title: '여리고에서 예루살렘으로 올라가는 길', subtitle: '유대 광야 길 (거리 약 20여 km)', testament: 'NT', kind: 'journey',
    book: 'IV. 예수님의 생애와 사역', era: '예수님 생애', year: 30, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '해수면 아래 250m(여리고)에서 해발 750m(예루살렘)까지 단숨에 고도를 치고 올라가는 험준한 길로, 선한 사마리아인 비유의 배경입니다.',
    locations: [
      { id: 'key-jericho-road-start', name: '여리고', nameEn: 'Jericho', coord: [31.8607, 35.4444], refs: [], desc: '해수면 아래 250m(여리고)에서 해발 750m(예루살렘)까지 단숨에 고도를 치고 올라가는 험준한 길로, 선한 사마리아인 비유의 배경입니다.' },
      { id: 'key-jericho-road-end', name: '예루살렘', nameEn: 'Jerusalem', coord: [31.7683, 35.2137], refs: [], desc: '해수면 아래 250m(여리고)에서 해발 750m(예루살렘)까지 단숨에 고도를 치고 올라가는 험준한 길로, 선한 사마리아인 비유의 배경입니다.' },
    ],
  },
  {
    id: 'key-olivet-gethsemane', title: '감람산 & 겟세마네 (Mount of Olives & Gethsemane)', subtitle: '예루살렘 동쪽, 기드론 골짜기 건너편', testament: 'NT', kind: 'region',
    book: 'IV. 예수님의 생애와 사역', era: '예수님 생애', year: 30, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '예루살렘 성전을 한눈에 내려다볼 수 있는 고도로, 예수님이 성을 보며 우시던 장소이자 최후의 기도를 하신 곳입니다.',
    locations: [
      { id: 'key-olivet', name: '감람산', nameEn: 'Mount of Olives', coord: [31.7823, 35.2411], refs: [], desc: '예루살렘 성전을 한눈에 내려다볼 수 있는 고도로, 예수님이 성을 보며 우시던 장소이자 최후의 기도를 하신 곳입니다.' },
      { id: 'key-gethsemane', name: '겟세마네', nameEn: 'Gethsemane', coord: [31.7791, 35.2389], refs: [], desc: '예루살렘 성전을 한눈에 내려다볼 수 있는 고도로, 예수님이 성을 보며 우시던 장소이자 최후의 기도를 하신 곳입니다.' },
    ],
  },
  {
    id: 'key-caesarea-maritima', title: '가이사랴 (Caesarea Maritima)', subtitle: '유대 지방의 지중해 인공 항구 도시', testament: 'NT', kind: 'region',
    book: 'V. 사도행전 & 초대 교회', era: '초대교회 시대 (약 AD 35~60년경)', year: 44, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '로마 총독부가 있던 곳으로, 고넬료의 개종 및 바울이 로마로 압송된 세계 선교의 바닷길 관문입니다.',
    locations: [{ id: 'key-caesarea-maritima', name: '가이사랴', nameEn: 'Caesarea Maritima', coord: [32.5000, 34.8900], refs: [], desc: '로마 총독부가 있던 곳으로, 고넬료의 개종 및 바울이 로마로 압송된 세계 선교의 바닷길 관문입니다.' }],
  },
  {
    id: 'key-damascus', title: '다메섹 (Damascus)', subtitle: '현 시리아 수도', testament: 'NT', kind: 'region',
    book: 'V. 사도행전 & 초대 교회', era: '초대교회 시대', year: 34, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '예루살렘에서 북쪽으로 약 220km 떨어진 고대 도시로, 사울이 이 먼 거리까지 믿는 자들을 잡으러 가다가 회심한 열정의 거리를 보여줍니다.',
    locations: [{ id: 'key-damascus', name: '다메섹', nameEn: 'Damascus', modern: '시리아', coord: [33.5138, 36.2765], refs: [], desc: '예루살렘에서 북쪽으로 약 220km 떨어진 고대 도시로, 사울이 이 먼 거리까지 믿는 자들을 잡으러 가다가 회심한 열정의 거리를 보여줍니다.' }],
  },
  {
    id: 'key-antioch', title: '수리아 안디옥 (Antioch in Syria)', subtitle: '로마 제국 제3의 대도시 (현 터키 안타키아)', testament: 'NT', kind: 'region',
    book: 'V. 사도행전 & 초대 교회', era: '초대교회 시대', year: 47, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '이방인 선교의 전초기지가 된 바울 1, 2, 3차 전도여행의 출발점입니다.',
    locations: [{ id: 'key-antioch', name: '수리아 안디옥', nameEn: 'Antioch in Syria', modern: '터키 안타키아', coord: [36.2021, 36.1604], refs: [], desc: '이방인 선교의 전초기지가 된 바울 1, 2, 3차 전도여행의 출발점입니다.' }],
  },
  {
    id: 'key-ephesus', title: '에베소 (Ephesus)', subtitle: '소아시아 서해안 (현 터키)', testament: 'NT', kind: 'region',
    book: 'V. 사도행전 & 초대 교회', era: '초대교회 시대', year: 54, color: KEY_PLACE_COLOR, icon: KEY_PLACE_ICON,
    summary: '아데미 신전이 있던 곳으로, 바울이 3년간 머물며 두란노 서원을 통해 소아시아 전역에 복음을 퍼뜨린 전략적 거점입니다.',
    locations: [{ id: 'key-ephesus', name: '에베소', nameEn: 'Ephesus', modern: '터키', coord: [37.9410, 27.3400], refs: [], desc: '아데미 신전이 있던 곳으로, 바울이 3년간 머물며 두란노 서원을 통해 소아시아 전역에 복음을 퍼뜨린 전략적 거점입니다.' }],
  },
]

// 성지순례 필수 코스 — 업로드된 순례 자료를 국가별(이스라엘/요르단/이집트/튀르키예/그리스/이탈리아)로
// 정리했습니다. KEY_PLACES와 마찬가지로 사이드바의 별도 목록에서 국가별 소주제로 묶어 보여주며,
// THEMES와 분리된 배열이라 연대표(Timeline)에는 나타나지 않습니다.
const PILGRIM_COLOR = '#059669'
const PILGRIM_ICON = '⛪'

export const PILGRIMAGE: BibleMapTheme[] = [
  {
    id: 'pilgrim-galilee', title: '갈릴리 호수 (Sea of Galilee)', subtitle: '풍랑을 잔잔케 하신 담수호', testament: 'NT', kind: 'region',
    book: '1. 이스라엘 (Israel)', era: '예수님 생애 (갈릴리 사역)', year: 28, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '해수면보다 약 210m 낮고 주변이 산으로 둘러싸여 돌풍이 잦은 거대한 담수호. 예수님이 물 위를 걸으시고 풍랑을 잔잔케 하신 현장으로, 순례단이 선상 예배를 드리는 필수 코스입니다.',
    locations: [{ id: 'pilgrim-galilee', name: '갈릴리 호수', nameEn: 'Sea of Galilee', coord: [32.8000, 35.5900], refs: [], desc: '해수면보다 약 210m 낮고 주변이 산으로 둘러싸여 돌풍이 잦은 거대한 담수호. 예수님이 물 위를 걸으시고 풍랑을 잔잔케 하신 현장으로, 순례단이 선상 예배를 드리는 필수 코스입니다.' }],
  },
  {
    id: 'pilgrim-capernaum', title: '가버나움 (Capernaum)', subtitle: '갈릴리 사역의 본거지', testament: 'NT', kind: 'region',
    book: '1. 이스라엘 (Israel)', era: '예수님 생애 (갈릴리 사역)', year: 28, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '갈릴리 호수 북서안, 고대 국제 무역로 해변길(Via Maris)이 지나던 세관 도시로 예수님 갈릴리 사역의 본거지였습니다. 베드로 집 터와 옛 회당 유적이 남아 사역의 중심지였음을 확인할 수 있습니다.',
    locations: [{ id: 'pilgrim-capernaum', name: '가버나움', nameEn: 'Capernaum', coord: [32.8807, 35.5750], refs: [], desc: '갈릴리 호수 북서안, 고대 국제 무역로 해변길(Via Maris)이 지나던 세관 도시로 예수님 갈릴리 사역의 본거지였습니다. 베드로 집 터와 옛 회당 유적이 남아 사역의 중심지였음을 확인할 수 있습니다.' }],
  },
  {
    id: 'pilgrim-beatitudes-tabgha', title: '팔복교회 & 오병이어교회 (Mount of Beatitudes & Tabgha)', subtitle: '산상수훈과 오병이어 기적의 현장', testament: 'NT', kind: 'region',
    book: '1. 이스라엘 (Israel)', era: '예수님 생애 (갈릴리 사역)', year: 28, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '갈릴리 호수가 내려다보이는 완만한 산기슭과 연안. 산상수훈과 오병이어 기적의 현장으로, 팔복산은 소리가 위로 잘 울리는 천연 야외극장 지형입니다.',
    locations: [
      { id: 'pilgrim-beatitudes', name: '팔복교회', nameEn: 'Mount of Beatitudes', coord: [32.8792, 35.5544], refs: [], desc: '산상수훈이 선포된 곳. 소리가 위로 잘 울리는 천연 야외극장 지형입니다.' },
      { id: 'pilgrim-tabgha', name: '오병이어교회', nameEn: 'Tabgha', coord: [32.8707, 35.5486], refs: [], desc: '보리떡 다섯 개와 물고기 두 마리로 오천 명을 먹이신 기적의 현장.' },
    ],
  },
  {
    id: 'pilgrim-nazareth', title: '나사렛 수태고지 교회 (Nazareth)', subtitle: '예수님의 고향, 변두리 지형', testament: 'NT', kind: 'region',
    book: '1. 이스라엘 (Israel)', era: '예수님 생애', year: -4, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '갈릴리 남부 산지에 둘러싸인 고립된 분지 마을로 마리아가 수태고지를 들은 곳이자 예수님의 고향입니다. 중심지와 단절된 변두리 지형에서 "나사렛에서 무슨 선한 것이 나겠느냐"던 당시 인식이 이해됩니다.',
    locations: [{ id: 'pilgrim-nazareth', name: '나사렛', nameEn: 'Nazareth', coord: [32.7019, 35.2978], refs: [], desc: '갈릴리 남부 산지에 둘러싸인 고립된 분지 마을로 마리아가 수태고지를 들은 곳이자 예수님의 고향입니다.' }],
  },
  {
    id: 'pilgrim-cana', title: '가나의 혼인잔치 교회 (Cana)', subtitle: '첫 번째 이적, 물로 포도주를', testament: 'NT', kind: 'region',
    book: '1. 이스라엘 (Israel)', era: '예수님 생애', year: 27, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '나사렛에서 북동쪽으로 약 7km 떨어진 마을로, 예수님의 첫 이적인 물로 포도주를 만드신 혼인잔치가 열린 곳입니다. 순례단 부부들이 혼인 서약 갱신식을 갖는 코스로도 잘 알려져 있습니다.',
    locations: [{ id: 'pilgrim-cana', name: '가나', nameEn: 'Cana', coord: [32.7456, 35.3392], refs: [], desc: '예수님의 첫 이적인 물로 포도주를 만드신 혼인잔치가 열린 곳.' }],
  },
  {
    id: 'pilgrim-via-dolorosa', title: '비아 돌로로사 (Via Dolorosa / 십자가의 길)', subtitle: '예루살렘 구시가지, 고난의 14처소', testament: 'NT', kind: 'region',
    book: '1. 이스라엘 (Israel)', era: '예수님 생애', year: 30, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '안토니아 요새에서 골고다 언덕(성묘교회)까지 이어지는 예루살렘 구시가지의 약 600m 경사길. 예수님이 십자가를 지고 가신 14처소를 복음서를 따라 직접 걸으며 고난을 묵상합니다.',
    locations: [{ id: 'pilgrim-via-dolorosa', name: '비아 돌로로사', nameEn: 'Via Dolorosa', coord: [31.7794, 35.2308], refs: [], desc: '예수님이 십자가를 지고 가신 고난의 14처소.' }],
  },
  {
    id: 'pilgrim-holy-sepulchre', title: '무덤교회 / 성묘교회 (Church of the Holy Sepulchre)', subtitle: '골고다와 부활의 돌무덤', testament: 'NT', kind: 'region',
    book: '1. 이스라엘 (Israel)', era: '예수님 생애', year: 30, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '비아 돌로로사의 종착지로, 예수님이 못 박히신 골고다 언덕과 장사되신 돌무덤이 한 건물 안에 보존된 기독교 최고의 성지입니다.',
    locations: [{ id: 'pilgrim-holy-sepulchre', name: '성묘교회', nameEn: 'Church of the Holy Sepulchre', coord: [31.7784, 35.2296], refs: [], desc: '골고다 언덕과 부활의 돌무덤이 함께 보존된 기독교 최고의 성지.' }],
  },
  {
    id: 'pilgrim-olivet-gethsemane', title: '감람산과 겟세마네 (Mount of Olives & Gethsemane)', subtitle: '마지막 밤의 기도', testament: 'NT', kind: 'region',
    book: '1. 이스라엘 (Israel)', era: '예수님 생애', year: 30, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '예루살렘 성 동쪽 기드론 골짜기 건너편, 성전산을 정면으로 마주보는 해발 800m의 산. 예수님이 성을 보며 우신 눈물교회와 핏방울 같은 땀을 흘리며 기도하신 겟세마네 동산이 있어 마지막 밤의 긴장감이 느껴집니다.',
    locations: [
      { id: 'pilgrim-olivet', name: '감람산', nameEn: 'Mount of Olives', coord: [31.7823, 35.2411], refs: [], desc: '예수님이 예루살렘 성을 보며 우신 눈물교회가 있는 산.' },
      { id: 'pilgrim-gethsemane', name: '겟세마네', nameEn: 'Gethsemane', coord: [31.7791, 35.2389], refs: [], desc: '체포되시기 전 핏방울 같은 땀을 흘리며 기도하신 동산.' },
    ],
  },
  {
    id: 'pilgrim-gallicantu', title: '베드로 통곡교회 (St. Peter in Gallicantu)', subtitle: '가야바 법정 터, 통곡의 자리', testament: 'NT', kind: 'region',
    book: '1. 이스라엘 (Israel)', era: '예수님 생애', year: 30, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '예루살렘 시온산 동쪽 경사지, 대제사장 가야바의 저택 터. 베드로가 닭 울기 전 예수님을 세 번 부인하고 통곡한 곳으로, 깊은 지하 감옥과 고대 돌계단이 남아 있습니다.',
    locations: [{ id: 'pilgrim-gallicantu', name: '베드로 통곡교회', nameEn: 'St. Peter in Gallicantu', coord: [31.7735, 35.2296], refs: [], desc: '베드로가 예수님을 세 번 부인하고 통곡한 가야바 법정 터.' }],
  },
  {
    id: 'pilgrim-western-wall', title: '통곡의 벽 (Western Wall)', subtitle: '성전산 서쪽 외벽', testament: 'OT', kind: 'region',
    book: '1. 이스라엘 (Israel)', era: '제2성전 시대', year: -20, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '솔로몬·헤롯 성전이 있던 성전산 서쪽 외벽 일부. 성전의 역사적 실체를 확인하며 세계 평화와 유대인의 회복을 위해 벽에 손을 얹고 기도하는 장소입니다.',
    locations: [{ id: 'pilgrim-western-wall', name: '통곡의 벽', nameEn: 'Western Wall', coord: [31.7767, 35.2345], refs: [], desc: '성전산 서쪽 외벽으로, 벽에 손을 얹고 기도하는 장소.' }],
  },
  {
    id: 'pilgrim-cenacle', title: '마가 다락방 (Cenacle / 시온산)', subtitle: '최후의 만찬, 성령 강림의 자리', testament: 'NT', kind: 'region',
    book: '1. 이스라엘 (Israel)', era: '초대교회 시대', year: 30, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '예루살렘 성벽 밖 남서쪽 시온산의 고대 2층 건물 공간. 최후의 만찬 장소이자 오순절 성령 강림이 일어난 초대 교회의 발상지로, 한국 성도들이 통성으로 기도하는 곳입니다.',
    locations: [{ id: 'pilgrim-cenacle', name: '마가 다락방', nameEn: 'Cenacle', coord: [31.7717, 35.2286], refs: [], desc: '최후의 만찬 장소이자 오순절 성령 강림이 일어난 초대 교회의 발상지.' }],
  },
  {
    id: 'pilgrim-city-of-david', title: '다윗성, 히스기야 터널 및 실로암 (City of David & Siloam)', subtitle: '히스기야의 지하 수로', testament: 'OT', kind: 'region',
    book: '1. 이스라엘 (Israel)', era: '왕국 시대', year: -700, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '기혼샘에서 실로암까지 이어지는 530m 길이의 지하 암반 수로. 앗수르 포위에 대비한 히스기야 왕의 수로로, 플래시를 들고 냉수를 헤치며 통과해 실로암에 도달하는 역동적인 역사 체험 코스입니다.',
    locations: [
      { id: 'pilgrim-city-of-david', name: '다윗성', nameEn: 'City of David', coord: [31.7735, 35.2354], refs: [], desc: '다윗이 정복해 수도로 삼은 예루살렘의 옛 터.' },
      { id: 'pilgrim-siloam', name: '실로암', nameEn: 'Pool of Siloam', coord: [31.7717, 35.2342], refs: [], desc: '히스기야 터널의 종점, 날 때부터 소경 된 자가 눈을 뜬 곳.' },
    ],
  },
  {
    id: 'pilgrim-bethlehem', title: '베들레헴 예수 탄생 기념교회 (Church of the Nativity)', subtitle: '말구유 동굴 위의 교회', testament: 'NT', kind: 'region',
    book: '1. 이스라엘 (Israel)', era: '예수님 생애', year: -4, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '예루살렘 남쪽 약 8km 유다 산지 도시. 예수님이 탄생하신 말구유 동굴 위에 세워진 교회로, 분단된 현실 속에서 평화의 왕을 묵상하게 합니다.',
    locations: [{ id: 'pilgrim-bethlehem', name: '베들레헴', nameEn: 'Bethlehem', coord: [31.7043, 35.2038], refs: [], desc: '예수님이 탄생하신 말구유 동굴 위에 세워진 교회.' }],
  },
  {
    id: 'pilgrim-beth-shemesh', title: '벧세메스 (Beth Shemesh)', subtitle: '언약궤가 돌아온 접경지', testament: 'OT', kind: 'region',
    book: '1. 이스라엘 (Israel)', era: '사사 시대', year: -1050, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '유다 산지와 블레셋 평야 사이 셰펠라(낮은 구릉지)의 핵심 골짜기. 블레셋에 빼앗겼던 언약궤가 암소 수레에 실려 돌아온 곳이자 삼손의 고향으로, 접경지의 긴장감이 느껴집니다.',
    locations: [{ id: 'pilgrim-beth-shemesh', name: '벧세메스', nameEn: 'Beth Shemesh', coord: [31.7631, 34.9814], refs: [], desc: '블레셋에 빼앗겼던 언약궤가 돌아온 곳이자 삼손의 고향.' }],
  },
  {
    id: 'pilgrim-jericho-temptation', title: '여리고와 시험산 (Jericho & Mount of Temptation)', subtitle: '40일 금식 시험의 광야', testament: 'NT', kind: 'region',
    book: '1. 이스라엘 (Israel)', era: '예수님 생애', year: 28, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '해수면보다 250m 아래 오아시스 도시와 그 뒤편 가파른 유대 광야 절벽산. 예수님이 40일간 시험받으신 척박한 광야, 삭개오의 돌무화과나무, 엘리사의 샘을 함께 돌아봅니다.',
    locations: [
      { id: 'pilgrim-jericho', name: '여리고', nameEn: 'Jericho', coord: [31.8607, 35.4444], refs: [], desc: '삭개오의 돌무화과나무와 엘리사의 샘이 있는 오아시스 도시.' },
      { id: 'pilgrim-temptation', name: '시험산', nameEn: 'Mount of Temptation', coord: [31.8706, 35.4363], refs: [], desc: '예수님이 40일간 마귀에게 시험받으신 척박한 절벽산.' },
    ],
  },
  {
    id: 'pilgrim-qumran', title: '쿰란 (Qumran)', subtitle: '사해 사본이 발견된 곳', testament: 'NT', kind: 'region',
    book: '1. 이스라엘 (Israel)', era: '제2성전 시대', year: -100, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '사해 서북쪽 해안의 삭막한 절벽과 흙 구릉 지대. 사해 사본이 발견된 동굴들이 있는 곳으로, 세속과 단절되어 성경을 필사하며 메시아를 기다린 에센파 공동체의 흔적을 확인합니다.',
    locations: [{ id: 'pilgrim-qumran', name: '쿰란', nameEn: 'Qumran', coord: [31.7415, 35.4592], refs: [], desc: '사해 사본이 발견된 동굴들이 있는 에센파 공동체의 흔적.' }],
  },
  {
    id: 'pilgrim-tel-dan', title: '텔 단 (Tel Dan)', subtitle: '금송아지 우상숭배의 현장', testament: 'OT', kind: 'region',
    book: '1. 이스라엘 (Israel)', era: '분열왕국 시대', year: -930, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '이스라엘 최북단, 헐몬산 용천수가 솟구치는 요단강의 주 수원지. 북이스라엘 여로보암 1세가 금송아지 신단을 쌓은 우상숭배의 현장이자 가나안 시대 성문 유적이 보존되어 있습니다.',
    locations: [{ id: 'pilgrim-tel-dan', name: '텔 단', nameEn: 'Tel Dan', coord: [33.2486, 35.6528], refs: [], desc: '여로보암 1세가 금송아지 신단을 쌓은 우상숭배의 현장.' }],
  },
  {
    id: 'pilgrim-caesarea', title: '가이사랴 (Caesarea Maritima)', subtitle: '세계 선교의 바닷길 관문', testament: 'NT', kind: 'region',
    book: '1. 이스라엘 (Israel)', era: '초대교회 시대', year: 44, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '헤롯 대왕이 건설한 로마식 인공 항구 도시이자 로마 총독부 소재지. 고넬료가 성령을 받은 곳이자 바울이 로마 황제에게 상소해 죄수의 몸으로 배를 탄 세계 선교의 바닷길 관문입니다.',
    locations: [{ id: 'pilgrim-caesarea', name: '가이사랴', nameEn: 'Caesarea Maritima', coord: [32.5000, 34.8900], refs: [], desc: '고넬료가 성령을 받고 바울이 로마로 압송된 바닷길 관문.' }],
  },
  {
    id: 'pilgrim-joppa', title: '욥바 (Joppa / 현 텔아비브 야포)', subtitle: '요나와 베드로의 항구', testament: 'NT', kind: 'region',
    book: '1. 이스라엘 (Israel)', era: '초대교회 시대', year: 38, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '예루살렘에서 가장 가까운 고대 천연 항구 도시. 솔로몬 성전 건축용 백향목을 받은 곳이자 요나가 다시스로 도망치려 배를 탔고, 베드로가 고넬료에게 가기로 결단한 피장 시몬의 집이 있던 곳입니다.',
    locations: [{ id: 'pilgrim-joppa', name: '욥바', nameEn: 'Joppa', modern: '텔아비브 야포', coord: [32.0534, 34.7522], refs: [], desc: '요나가 배를 탄 곳이자 베드로가 고넬료에게 가기로 결단한 곳.' }],
  },
  {
    id: 'pilgrim-nebo', title: '느보산 모세 기념교회 (Mount Nebo)', subtitle: '약속의 땅을 바라본 최종 기착지', testament: 'OT', kind: 'region',
    book: '2. 요르단 (Jordan)', era: '광야 시대 말기', year: -1401, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '사해 동북쪽 해발 800m 산으로 가나안 땅과 요단 계곡이 한눈에 펼쳐지는 천혜의 전망대입니다. 모세가 약속의 땅을 바라보기만 하고 숨을 거둔 출애굽 여정의 최종 기착지입니다.',
    locations: [{ id: 'pilgrim-nebo', name: '느보산', nameEn: 'Mount Nebo', coord: [31.7681, 35.7256], refs: [], desc: '모세가 약속의 땅을 바라보고 숨을 거둔 출애굽 여정의 최종 기착지.' }],
  },
  {
    id: 'pilgrim-petra', title: '페트라 (Petra / 성경의 "셀라")', subtitle: '시크길 너머의 사암 바위 도시', testament: 'OT', kind: 'region',
    book: '2. 요르단 (Jordan)', era: '에돔 시대 · 나바테아 시대', year: -100, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '요르단 남부 산악지대의 거대한 사암 바위 도시로, 좁은 절벽 틈새(시크길)를 지나야 들어갈 수 있는 천혜의 요새입니다. 구약 에돔 족속의 영토로, 출애굽 당시 이 험준한 땅을 통과하지 못해 우회해야 했던 광야의 고단함을 체감하게 합니다.',
    locations: [{ id: 'pilgrim-petra', name: '페트라', nameEn: 'Petra', coord: [30.3285, 35.4444], refs: [], desc: '구약 에돔 족속의 영토였던 거대한 사암 바위 도시.' }],
  },
  {
    id: 'pilgrim-wadi-rum', title: '와디 룸 (Wadi Rum)', subtitle: '광야 여정의 원형', testament: 'OT', kind: 'region',
    book: '2. 요르단 (Jordan)', era: '광야 시대', year: -1440, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '붉은 모래사막 위에 거대한 사암·화강암 바위산들이 솟은 황량한 광야. 출애굽 경로의 원형을 보여주는 곳으로, 낮의 열기와 밤의 혹독한 추위를 통해 구름 기둥과 불 기둥의 은혜를 실감합니다.',
    locations: [{ id: 'pilgrim-wadi-rum', name: '와디 룸', nameEn: 'Wadi Rum', coord: [29.5760, 35.4206], refs: [], desc: '출애굽 광야 여정의 원형을 보여주는 황량한 사막.' }],
  },
  {
    id: 'pilgrim-jabbok', title: '얍복강 (Jabbok River)', subtitle: '야곱이 씨름한 밤', testament: 'OT', kind: 'region',
    book: '2. 요르단 (Jordan)', era: '족장 시대', year: -1900, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '요단강 동쪽에서 흘러내리는 험준한 계곡 형태의 지류로 고도 차이가 심합니다. 야곱이 에서를 만나기 전 천사와 밤새 씨름해 "이스라엘"이라는 이름을 받은 영적 결전의 장소로, 그의 절박함을 묵상하게 합니다.',
    locations: [{ id: 'pilgrim-jabbok', name: '얍복강', nameEn: 'Jabbok River', coord: [32.1858, 35.6868], refs: [], desc: '야곱이 천사와 씨름해 "이스라엘" 이름을 받은 곳.' }],
  },
  {
    id: 'pilgrim-madaba', title: '마다바 (Madaba)', subtitle: '6세기 성지 모자이크 지도', testament: 'OT', kind: 'region',
    book: '2. 요르단 (Jordan)', era: '비잔틴 시대 (모자이크 지도)', year: 560, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '수도 암만 남쪽 30km, 고대 "왕의 대로" 상의 고원 도시. 성 조지 교회 바닥의 6세기 성지 모자이크 지도를 통해 고대인의 시각으로 그려진 성지 지형을 확인할 수 있습니다.',
    locations: [{ id: 'pilgrim-madaba', name: '마다바', nameEn: 'Madaba', coord: [31.7197, 35.7936], refs: [], desc: '6세기 성지 모자이크 지도가 있는 성 조지 교회가 위치한 곳.' }],
  },
  {
    id: 'pilgrim-sinai', title: '시내산 및 성 카타리나 수도원 (Mount Sinai)', subtitle: '십계명을 받은 구속사의 핵심 현장', testament: 'OT', kind: 'region',
    book: '3. 이집트 (Egypt)', era: '출애굽 시대', year: -1446, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '시나이반도 남부의 해발 2,285m 화강암 바위산으로 모세가 십계명을 받은 구속사의 핵심 현장입니다. 새벽 산행 후 정상에서 일출 예배를 드리며, 산 아래 불타는 떨기나무 전승의 수도원을 방문합니다.',
    locations: [{ id: 'pilgrim-sinai', name: '시내산', nameEn: 'Mount Sinai', coord: [28.5392, 33.9756], refs: [], desc: '모세가 십계명과 율법을 받은 구속사의 핵심 현장.' }],
  },
  {
    id: 'pilgrim-marah', title: '마라의 샘 (Marah)', subtitle: '쓴 물이 단 물로', testament: 'OT', kind: 'region',
    book: '3. 이집트 (Egypt)', era: '출애굽 시대', year: -1446, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '수에즈 운하를 건너 시나이반도 서부 해안을 따라가는 광야 길목의 오아시스. 출애굽 후 사흘 만에 처음 만났으나 물이 써서 원망했던 곳으로, 나뭇가지로 물을 달게 하신 여호와 라파의 현장입니다.',
    locations: [{ id: 'pilgrim-marah', name: '마라', nameEn: 'Marah', coord: [29.2000, 32.9000], refs: [], desc: '쓴 물이 단 물로 변한 여호와 라파의 현장.' }],
  },
  {
    id: 'pilgrim-elim', title: '엘림 (Elim)', subtitle: '샘 열둘과 종려나무의 쉼터', testament: 'OT', kind: 'region',
    book: '3. 이집트 (Egypt)', era: '출애굽 시대', year: -1446, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '마라의 샘 남쪽에 위치한 비옥한 오아시스 지역. 샘 열둘과 종려나무 일흔 그루가 있던 쉼터로, 마라의 시험 직후 예비된 이곳을 보며 인내의 신앙을 배웁니다.',
    locations: [{ id: 'pilgrim-elim', name: '엘림', nameEn: 'Elim', coord: [29.0000, 33.0000], refs: [], desc: '샘 열둘과 종려나무 일흔 그루가 있던 오아시스 쉼터.' }],
  },
  {
    id: 'pilgrim-tarsus', title: '다소 (Tarsus)', subtitle: '사도 바울의 고향', testament: 'NT', kind: 'region',
    book: '4. 튀르키예 (Türkiye)', era: '초대교회 시대', year: 5, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '튀르키예 남부 지중해 연안의 비옥한 평야에 위치한 로마 시대 학문·무역 도시. 사도 바울의 고향으로, 바울 생가 터와 우물을 보며 이방인의 사도로 준비된 지리적 배경을 묵상합니다.',
    locations: [{ id: 'pilgrim-tarsus', name: '다소', nameEn: 'Tarsus', coord: [36.9179, 34.8954], refs: [], desc: '이방인의 사도로 준비된 사도 바울의 고향.' }],
  },
  {
    id: 'pilgrim-cappadocia', title: '갑바도기아 (Cappadocia)', subtitle: '지하 도시와 동굴 교회', testament: 'NT', kind: 'region',
    book: '4. 튀르키예 (Türkiye)', era: '로마 박해 시대', year: 300, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '화산 폭발과 풍화 작용으로 형성된 기묘한 바위 기둥이 가득한 아나톨리아 고원. 로마 박해를 피해 기독교인들이 파놓은 대규모 지하 도시와 동굴 교회들이 모여 있어 순교 신앙의 야성을 배우는 곳입니다.',
    locations: [{ id: 'pilgrim-cappadocia', name: '갑바도기아', nameEn: 'Cappadocia', coord: [38.6431, 34.8286], refs: [], desc: '박해를 피해 판 대규모 지하 도시와 동굴 교회가 있는 곳.' }],
  },
  {
    id: 'pilgrim-laodicea-hierapolis', title: '라오디게아 & 파묵칼레 (Laodicea & Hierapolis)', subtitle: '"차지도 덥지도 않은" 교회', testament: 'NT', kind: 'region',
    book: '4. 튀르키예 (Türkiye)', era: '초대교회 시대 (요한계시록)', year: 95, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '뜨거운 온천 지대(히에라볼리)와 차가운 만년설 물이 내려오는 골로새 사이의 금융 중심지. "차지도 덥지도 않다" 책망받은 라오디게아 교회가 있던 곳으로, 온천수가 흘러오며 미지근해지고 석회질로 마실 수 없게 되는 실제 지형을 확인합니다.',
    locations: [
      { id: 'pilgrim-laodicea', name: '라오디게아', nameEn: 'Laodicea', coord: [37.8382, 29.1081], refs: [], desc: '"차지도 덥지도 않다" 책망받은 요한계시록의 교회.' },
      { id: 'pilgrim-hierapolis', name: '히에라볼리(파묵칼레)', nameEn: 'Hierapolis', coord: [37.9236, 29.1275], refs: [], desc: '뜨거운 온천수가 흘러내리는 석회 지대.' },
    ],
  },
  {
    id: 'pilgrim-smyrna', title: '서머나 교회 (Smyrna / 현 이즈미르)', subtitle: '"죽도록 충성하라" 칭찬받은 교회', testament: 'NT', kind: 'region',
    book: '4. 튀르키예 (Türkiye)', era: '초대교회 시대 (요한계시록)', year: 95, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '튀르키예 서해안의 번창한 고대 항구 도시(현 이즈미르). "죽도록 충성하라" 칭찬받은 교회가 있던 곳으로, 불속에서도 신앙을 지키며 순교한 사도 요한의 제자 폴리캅 감독 순교 기념교회를 방문합니다.',
    locations: [{ id: 'pilgrim-smyrna', name: '서머나', nameEn: 'Smyrna', modern: '이즈미르', coord: [38.4192, 27.1287], refs: [], desc: '"죽도록 충성하라" 칭찬받은 요한계시록의 교회.' }],
  },
  {
    id: 'pilgrim-seven-churches-2', title: '사데·빌라델비아·버가모·두아디라 교회 유적', subtitle: '소아시아 일곱 교회의 나머지 도시들', testament: 'NT', kind: 'region',
    book: '4. 튀르키예 (Türkiye)', era: '초대교회 시대 (요한계시록)', year: 95, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '에베소, 서머나, 라오디게아와 함께 소아시아 일곱 교회를 이루는 서부 고대 도시들. 거대한 신전 터(버가모), 칭찬만 받은 기둥 유적(빌라델비아) 등을 순회하며 초대 교회의 다양한 영적 상태를 대조해 봅니다.',
    locations: [
      { id: 'pilgrim-sardis', name: '사데', nameEn: 'Sardis', coord: [38.4879, 28.0403], refs: [], desc: '살았다 하나 죽은 교회라 책망받은 곳.' },
      { id: 'pilgrim-philadelphia', name: '빌라델비아', nameEn: 'Philadelphia', coord: [38.3527, 28.5133], refs: [], desc: '책망 없이 칭찬만 받은 요한계시록의 교회.' },
      { id: 'pilgrim-pergamon', name: '버가모', nameEn: 'Pergamon', coord: [39.1213, 27.1803], refs: [], desc: '거대한 제우스 신전 터가 있는 "사탄의 권좌"의 도시.' },
      { id: 'pilgrim-thyatira', name: '두아디라', nameEn: 'Thyatira', coord: [38.9204, 27.8438], refs: [], desc: '자칭 선지자 이세벨을 용납했다고 책망받은 교회.' },
    ],
  },
  {
    id: 'pilgrim-philippi', title: '빌립보 (Philippi)', subtitle: '유럽 최초의 교회', testament: 'NT', kind: 'region',
    book: '5. 그리스 (Greece)', era: '초대교회 시대', year: 50, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '그리스 북부 마케도니아 관문, 로마 군사 도로 에그나티아 길이 지나는 요충지. 바울이 세운 유럽 최초의 교회로, 유럽 첫 개종자 루디아의 세례 터(강가)와 찬송으로 지진이 났던 감옥 터가 보존되어 있습니다.',
    locations: [{ id: 'pilgrim-philippi', name: '빌립보', nameEn: 'Philippi', coord: [41.0130, 24.2870], refs: [], desc: '바울이 세운 유럽 최초의 교회, 루디아의 세례 터.' }],
  },
  {
    id: 'pilgrim-thessalonica-berea', title: '데살로니가 & 베뢰아 (Thessalonica & Berea)', subtitle: '말씀을 간절히 상고한 사람들', testament: 'NT', kind: 'region',
    book: '5. 그리스 (Greece)', era: '초대교회 시대', year: 50, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '마케도니아의 거대 항구 도시(데살로니가)와 그 남서쪽 조용한 내륙 도시(베뢰아). 3주 사역으로 건강하게 자라난 데살로니가 교회와, "간절한 마음으로 말씀을 상고했다"는 베뢰아의 말씀 연구 터를 함께 방문합니다.',
    locations: [
      { id: 'pilgrim-thessalonica', name: '데살로니가', nameEn: 'Thessalonica', coord: [40.6401, 22.9444], refs: [], desc: '3주 사역으로 건강하게 자라난 교회, 데살로니가전후서의 수신지.' },
      { id: 'pilgrim-berea', name: '베뢰아', nameEn: 'Berea', coord: [40.5240, 22.2030], refs: [], desc: '말씀을 날마다 간절히 상고한 신사적인 사람들이 있던 곳.' },
    ],
  },
  {
    id: 'pilgrim-athens', title: '아테네 아레오바고 언덕 (Athens)', subtitle: '"알지 못하는 신"에게 드린 변증', testament: 'NT', kind: 'region',
    book: '5. 그리스 (Greece)', era: '초대교회 시대', year: 51, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '고대 그리스 철학의 심장부 아크로폴리스 옆의 가파른 바위 언덕. 바울이 에피쿠로스·스토아 철학자들을 상대로 "알지 못하는 신에게" 비문을 인용하며 변증 설교를 펼친 장소입니다.',
    locations: [{ id: 'pilgrim-athens', name: '아레오바고 언덕', nameEn: 'Areopagus', coord: [37.9715, 23.7238], refs: [], desc: '바울이 철학자들을 상대로 변증 설교를 펼친 언덕.' }],
  },
  {
    id: 'pilgrim-corinth', title: '고린도 (Corinth)', subtitle: '1년 6개월 머물며 세운 교회', testament: 'NT', kind: 'region',
    book: '5. 그리스 (Greece)', era: '초대교회 시대', year: 51, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '펠로폰네소스반도와 본토를 잇는 지협 도시로 양쪽 항구를 둔 무역과 유흥의 중심지였습니다. 바울이 1년 6개월간 머물며 천막을 깁고 세운 교회로, 총독 재판석(베마 성좌)과 고린도 운하를 방문합니다.',
    locations: [{ id: 'pilgrim-corinth', name: '고린도', nameEn: 'Corinth', coord: [37.9060, 22.8780], refs: [], desc: '바울이 1년 6개월간 머물며 세운 무역 도시의 교회.' }],
  },
  {
    id: 'pilgrim-patmos', title: '밧모섬 (Patmos)', subtitle: '요한계시록이 기록된 섬', testament: 'NT', kind: 'region',
    book: '5. 그리스 (Greece)', era: '초대교회 시대 (요한계시록)', year: 95, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '에베소 서쪽 에게해 남부의 척박한 바위섬으로 로마 시대 유배지였습니다. 사도 요한이 유배되어 하늘 문이 열리는 환상을 보고 요한계시록을 기록한 성령의 동굴이 있는 곳입니다.',
    locations: [{ id: 'pilgrim-patmos', name: '밧모섬', nameEn: 'Patmos', coord: [37.3092, 26.5457], refs: [], desc: '사도 요한이 요한계시록을 기록한 유배지.' }],
  },
  {
    id: 'pilgrim-colosseum-catacombs', title: '로마 콜로세움 & 카타콤 (Colosseum & Catacombs)', subtitle: '순교와 지하 예배의 현장', testament: 'NT', kind: 'region',
    book: '6. 이탈리아 (Italy)', era: '로마 박해 시대', year: 250, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '로마 제국 수도 한복판의 거대 원형 경기장과 외곽 지하의 기독교인 지하 무덤. 사자 밥이 되면서도 신앙을 지킨 순교 현장과, 핍박을 피해 예배 중심지가 된 지하 무덤을 돌며 순례단이 가장 눈물을 많이 흘리는 곳입니다.',
    locations: [
      { id: 'pilgrim-colosseum', name: '콜로세움', nameEn: 'Colosseum', coord: [41.8902, 12.4922], refs: [], desc: '사자 밥이 되면서도 신앙을 지킨 순교의 현장.' },
      { id: 'pilgrim-catacombs', name: '카타콤', nameEn: 'Catacombs', coord: [41.8508, 12.5147], refs: [], desc: '핍박을 피해 예배 중심지가 된 지하 무덤.' },
    ],
  },
  {
    id: 'pilgrim-tre-fontane', title: '바울 순교 기념교회 / 세 분수 교회 (Tre Fontane)', subtitle: '사도 바울의 참수 순교지', testament: 'NT', kind: 'region',
    book: '6. 이탈리아 (Italy)', era: '로마 박해 시대', year: 67, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '로마 남부 외곽의 고요한 수도원 부지로 사도 바울이 참수형으로 순교한 자리입니다. 목이 잘려 세 번 튄 곳마다 샘이 솟았다는 전승과 참수 시 목을 얹은 대리석 기둥 유적이 보존되어 있습니다.',
    locations: [{ id: 'pilgrim-tre-fontane', name: '세 분수 교회', nameEn: 'Tre Fontane', coord: [41.8283, 12.4644], refs: [], desc: '사도 바울이 참수형으로 순교한 자리.' }],
  },
  {
    id: 'pilgrim-mamertine', title: '로마 마메르틴 감옥 (Mamertine Prison)', subtitle: '바울의 마지막 유언', testament: 'NT', kind: 'region',
    book: '6. 이탈리아 (Italy)', era: '로마 박해 시대', year: 67, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '로마 포로 로마노 옆의 깊고 차가운 지하 돌감옥으로 최고 정치범 수용소였습니다. 사도 바울이 순교 직전 디모데후서의 유언("나는 선한 싸움을 싸우고...")을 남긴 감옥 추정지로, 사도의 마지막 숨결을 묵상합니다.',
    locations: [{ id: 'pilgrim-mamertine', name: '마메르틴 감옥', nameEn: 'Mamertine Prison', coord: [41.8931, 12.4853], refs: [], desc: '바울이 순교 직전 디모데후서의 유언을 남긴 감옥 추정지.' }],
  },
  {
    id: 'pilgrim-quo-vadis', title: '쿼바디스 교회 (Church of Domine Quo Vadis)', subtitle: '"주여 어디로 가시나이까"', testament: 'NT', kind: 'region',
    book: '6. 이탈리아 (Italy)', era: '로마 박해 시대', year: 64, color: PILGRIM_COLOR, icon: PILGRIM_ICON,
    summary: '고대 로마 군사 도로 아피아 가도 초입의 작은 교회. 박해를 피해 로마를 탈출하던 베드로가 로마로 가시는 예수님을 만나 "주여, 어디로 가시나이까" 묻고 회개해 순교하러 돌이킨 결단의 장소입니다.',
    locations: [{ id: 'pilgrim-quo-vadis', name: '쿼바디스 교회', nameEn: 'Domine Quo Vadis', coord: [41.8560, 12.5108], refs: [], desc: '베드로가 예수님을 만나 회개하고 돌이킨 결단의 장소.' }],
  },
]

// 지도 위 마커/카드 조회용 THEMES + KEY_PLACES + PILGRIMAGE 통합 목록. Timeline은 THEMES만
// 사용해 핵심지명·성지순례가 연대표에 섞여 표시되지 않도록 분리합니다.
export const ALL_THEMES: BibleMapTheme[] = [...THEMES, ...KEY_PLACES, ...PILGRIMAGE]

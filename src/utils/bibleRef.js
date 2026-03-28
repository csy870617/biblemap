const BOOK_NAMES = {
  Gen: '창세기', Exod: '출애굽기', Lev: '레위기', Num: '민수기', Deut: '신명기',
  Josh: '여호수아', Judg: '사사기', Ruth: '룻기',
  '1Sam': '사무엘상', '2Sam': '사무엘하', '1Kgs': '열왕기상', '2Kgs': '열왕기하',
  '1Chr': '역대상', '2Chr': '역대하', Ezra: '에스라', Neh: '느헤미야', Esth: '에스더',
  Job: '욥기', Ps: '시편', Prov: '잠언', Eccl: '전도서', Song: '아가',
  Isa: '이사야', Jer: '예레미야', Lam: '예레미아애가', Ezek: '에스겔', Dan: '다니엘',
  Hos: '호세아', Joel: '요엘', Amos: '아모스', Obad: '오바댜',
  Jonah: '요나', Mic: '미가', Nah: '나훔', Hab: '하박국',
  Zeph: '스바냐', Hag: '학개', Zech: '스가랴', Mal: '말라기',
  Matt: '마태복음', Mark: '마가복음', Luke: '누가복음', John: '요한복음',
  Acts: '사도행전', Rom: '로마서',
  '1Cor': '고린도전서', '2Cor': '고린도후서', Gal: '갈라디아서', Eph: '에베소서',
  Phil: '빌립보서', Col: '골로새서',
  '1Thess': '데살로니가전서', '2Thess': '데살로니가후서',
  '1Tim': '디모데전서', '2Tim': '디모데후서', Titus: '디도서', Phlm: '빌레몬서',
  Heb: '히브리서', Jas: '야고보서',
  '1Pet': '베드로전서', '2Pet': '베드로후서',
  '1John': '요한1서', '2John': '요한2서', '3John': '요한3서',
  Jude: '유다서', Rev: '요한계시록',
}

export function formatVerseRef(verse) {
  const bookName = BOOK_NAMES[verse.book] || verse.book
  const verseRange = verse.startVerse === verse.endVerse
    ? `${verse.chapter}:${verse.startVerse}`
    : `${verse.chapter}:${verse.startVerse}-${verse.endVerse}`
  return `${bookName} ${verseRange}`
}

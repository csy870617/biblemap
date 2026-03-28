const BOOK_NAMES = {
  ko: {
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
  },
  en: {
    Gen: 'Genesis', Exod: 'Exodus', Lev: 'Leviticus', Num: 'Numbers', Deut: 'Deuteronomy',
    Josh: 'Joshua', Judg: 'Judges', Ruth: 'Ruth',
    '1Sam': '1 Samuel', '2Sam': '2 Samuel', '1Kgs': '1 Kings', '2Kgs': '2 Kings',
    '1Chr': '1 Chronicles', '2Chr': '2 Chronicles', Ezra: 'Ezra', Neh: 'Nehemiah', Esth: 'Esther',
    Job: 'Job', Ps: 'Psalms', Prov: 'Proverbs', Eccl: 'Ecclesiastes', Song: 'Song of Solomon',
    Isa: 'Isaiah', Jer: 'Jeremiah', Lam: 'Lamentations', Ezek: 'Ezekiel', Dan: 'Daniel',
    Hos: 'Hosea', Joel: 'Joel', Amos: 'Amos', Obad: 'Obadiah',
    Jonah: 'Jonah', Mic: 'Micah', Nah: 'Nahum', Hab: 'Habakkuk',
    Zeph: 'Zephaniah', Hag: 'Haggai', Zech: 'Zechariah', Mal: 'Malachi',
    Matt: 'Matthew', Mark: 'Mark', Luke: 'Luke', John: 'John',
    Acts: 'Acts', Rom: 'Romans',
    '1Cor': '1 Corinthians', '2Cor': '2 Corinthians', Gal: 'Galatians', Eph: 'Ephesians',
    Phil: 'Philippians', Col: 'Colossians',
    '1Thess': '1 Thessalonians', '2Thess': '2 Thessalonians',
    '1Tim': '1 Timothy', '2Tim': '2 Timothy', Titus: 'Titus', Phlm: 'Philemon',
    Heb: 'Hebrews', Jas: 'James',
    '1Pet': '1 Peter', '2Pet': '2 Peter',
    '1John': '1 John', '2John': '2 John', '3John': '3 John',
    Jude: 'Jude', Rev: 'Revelation',
  },
}

export function formatVerseRef(verse, lang = 'ko') {
  const names = BOOK_NAMES[lang] || BOOK_NAMES.ko
  const bookName = names[verse.book] || verse.book
  const verseRange = verse.startVerse === verse.endVerse
    ? `${verse.chapter}:${verse.startVerse}`
    : `${verse.chapter}:${verse.startVerse}-${verse.endVerse}`
  return `${bookName} ${verseRange}`
}

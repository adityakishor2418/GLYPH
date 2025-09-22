/**
 * Comprehensive Russian Cyrillic to Latin transliteration mappings
 * Includes Russian alphabet and common words/phrases with multiple romanization standards
 */

// Russian Cyrillic alphabet with GOST 7.79-2000 (System B) transliteration
export const russianAlphabetMap = {
  // Lowercase letters
  'а': 'a',
  'б': 'b', 
  'в': 'v',
  'г': 'g',
  'д': 'd',
  'е': 'e',
  'ё': 'yo',
  'ж': 'zh',
  'з': 'z',
  'и': 'i',
  'й': 'j',
  'к': 'k',
  'л': 'l',
  'м': 'm',
  'н': 'n',
  'о': 'o',
  'п': 'p',
  'р': 'r',
  'с': 's',
  'т': 't',
  'у': 'u',
  'ф': 'f',
  'х': 'kh',
  'ц': 'ts',
  'ч': 'ch',
  'ш': 'sh',
  'щ': 'shch',
  'ъ': '"',
  'ы': 'y',
  'ь': "'",
  'э': 'e`',
  'ю': 'yu',
  'я': 'ya',

  // Uppercase letters
  'А': 'A',
  'Б': 'B',
  'В': 'V', 
  'Г': 'G',
  'Д': 'D',
  'Е': 'E',
  'Ё': 'Yo',
  'Ж': 'Zh',
  'З': 'Z',
  'И': 'I',
  'Й': 'J',
  'К': 'K',
  'Л': 'L',
  'М': 'M',
  'Н': 'N',
  'О': 'O',
  'П': 'P',
  'Р': 'R',
  'С': 'S',
  'Т': 'T',
  'У': 'U',
  'Ф': 'F',
  'Х': 'Kh',
  'Ц': 'Ts',
  'Ч': 'Ch',
  'Ш': 'Sh',
  'Щ': 'Shch',
  'Ъ': '"',
  'Ы': 'Y',
  'Ь': "'",
  'Э': 'E`',
  'Ю': 'Yu',
  'Я': 'Ya'
};

// Common Russian words and phrases with accurate transliteration
export const russianWordsMap = {
  // Greetings
  'привет': 'privet',
  'здравствуй': 'zdravstvuj',
  'здравствуйте': 'zdravstvujte', 
  'добро пожаловать': 'dobro pozhalovat\'',
  'до свидания': 'do svidaniya',
  'пока': 'poka',
  'увидимся': 'uvidimsya',
  'спокойной ночи': 'spokojnoj nochi',
  'доброе утро': 'dobroye utro',
  'добрый день': 'dobryj den\'',
  'добрый вечер': 'dobryj vecher',

  // Basic words
  'да': 'da',
  'нет': 'net',
  'спасибо': 'spasibo',
  'пожалуйста': 'pozhalujsta',
  'извините': 'izvinite',
  'простите': 'prostite',
  'конечно': 'konechno',
  'может быть': 'mozhet byt\'',
  'хорошо': 'khorosho',
  'плохо': 'plokho',
  'очень': 'ochen\'',
  'много': 'mnogo',
  'мало': 'malo',
  'большой': 'bol\'shoj',
  'маленький': 'malen\'kij',
  'новый': 'novyj',
  'старый': 'staryj',
  'красивый': 'krasivyj',

  // Family
  'семья': 'sem\'ya',
  'мать': 'mat\'',
  'мама': 'mama',
  'отец': 'otets',
  'папа': 'papa',
  'сын': 'syn',
  'дочь': 'doch\'',
  'брат': 'brat',
  'сестра': 'sestra',
  'дедушка': 'dedushka',
  'бабушка': 'babushka',
  'дядя': 'dyadya',
  'тётя': 'tyotya',
  'муж': 'muzh',
  'жена': 'zhena',
  'ребёнок': 'rebyonok',
  'дети': 'deti',

  // Numbers
  'один': 'odin',
  'два': 'dva',
  'три': 'tri',
  'четыре': 'chetyre',
  'пять': 'pyat\'',
  'шесть': 'shest\'',
  'семь': 'sem\'',
  'восемь': 'vosem\'',
  'девять': 'devyat\'',
  'десять': 'desyat\'',
  'одиннадцать': 'odinnadtsat\'',
  'двенадцать': 'dvenadtsat\'',
  'тринадцать': 'trinadtsat\'',
  'двадцать': 'dvadtsat\'',
  'тридцать': 'tridtsat\'',
  'сорок': 'sorok',
  'пятьдесят': 'pyat\'desyat',
  'сто': 'sto',
  'тысяча': 'tysyacha',
  'миллион': 'million',

  // Time
  'время': 'vremya',
  'час': 'chas',
  'минута': 'minuta',
  'секунда': 'sekunda',
  'день': 'den\'',
  'неделя': 'nedelya',
  'месяц': 'mesyats',
  'год': 'god',
  'сегодня': 'segodnya',
  'вчера': 'vchera',
  'завтра': 'zavtra',
  'сейчас': 'sejchas',
  'утром': 'utrom',
  'днём': 'dnyom',
  'вечером': 'vecherom',
  'ночью': 'noch\'yu',
  'понедельник': 'ponedel\'nik',
  'вторник': 'vtornik',
  'среда': 'sreda',
  'четверг': 'chetverg',
  'пятница': 'pyatnitsa',
  'суббота': 'subbota',
  'воскресенье': 'voskresen\'e',

  // Colors
  'цвет': 'tsvet',
  'белый': 'belyj',
  'чёрный': 'chyornyj',
  'красный': 'krasnyj',
  'синий': 'sinij',
  'зелёный': 'zelyonyj',
  'жёлтый': 'zhyoltyj',
  'оранжевый': 'oranzhevyj',
  'фиолетовый': 'fioletovyj',
  'розовый': 'rozovyj',
  'серый': 'seryj',
  'коричневый': 'korichnevyj',

  // Body parts
  'тело': 'telo',
  'голова': 'golova',
  'лицо': 'litso',
  'глаз': 'glaz',
  'глаза': 'glaza',
  'нос': 'nos',
  'рот': 'rot',
  'ухо': 'ukho',
  'уши': 'ushi',
  'рука': 'ruka',
  'руки': 'ruki',
  'нога': 'noga',
  'ноги': 'nogi',
  'палец': 'palets',
  'сердце': 'serdtse',

  // Common verbs
  'быть': 'byt\'',
  'есть': 'est\'',
  'иметь': 'imet\'',
  'делать': 'delat\'',
  'говорить': 'govorit\'',
  'сказать': 'skazat\'',
  'знать': 'znat\'',
  'думать': 'dumat\'',
  'хотеть': 'khotet\'',
  'мочь': 'moch\'',
  'видеть': 'videt\'',
  'слышать': 'slyshat\'',
  'читать': 'chitat\'',
  'писать': 'pisat\'',
  'работать': 'rabotat\'',
  'учиться': 'uchit\'sya',
  'жить': 'zhit\'',
  'идти': 'idti',
  'ехать': 'ekhat\'',
  'покупать': 'pokupat\'',
  'продавать': 'prodavat\'',
  'есть': 'est\'', // to eat
  'пить': 'pit\'',
  'спать': 'spat\'',
  'играть': 'igrat\'',
  'смотреть': 'smotret\'',
  'слушать': 'slushat\'',
  'понимать': 'ponimat\'',
  'любить': 'lyubit\'',
  'помогать': 'pomogat\'',

  // Food and drink
  'еда': 'eda',
  'пища': 'pishcha',
  'завтрак': 'zavtrak',
  'обед': 'obed',
  'ужин': 'uzhin',
  'хлеб': 'khleb',
  'молоко': 'moloko',
  'мясо': 'myaso',
  'рыба': 'ryba',
  'курица': 'kuritsa',
  'овощи': 'ovoshchi',
  'фрукты': 'frukty',
  'яблоко': 'yabloko',
  'банан': 'banan',
  'апельсин': 'apel\'sin',
  'картофель': 'kartofel\'',
  'морковь': 'morkov\'',
  'лук': 'luk',
  'помидор': 'pomidor',
  'огурец': 'ogurets',
  'сыр': 'syr',
  'масло': 'maslo',
  'сахар': 'sakhar',
  'соль': 'sol\'',
  'вода': 'voda',
  'чай': 'chaj',
  'кофе': 'kofe',
  'сок': 'sok',
  'пиво': 'pivo',
  'вино': 'vino',

  // Places
  'место': 'mesto',
  'страна': 'strana',
  'город': 'gorod',
  'деревня': 'derevnya',
  'дом': 'dom',
  'квартира': 'kvartira',
  'комната': 'komnata',
  'кухня': 'kukhnya',
  'ванная': 'vannaya',
  'спальня': 'spal\'nya',
  'гостиная': 'gostinaya',
  'школа': 'shkola',
  'университет': 'universitet',
  'больница': 'bol\'nitsa',
  'магазин': 'magazin',
  'ресторан': 'restoran',
  'кафе': 'kafe',
  'гостиница': 'gostinitsa',
  'аэропорт': 'aeroport',
  'вокзал': 'vokzal',
  'музей': 'muzej',
  'театр': 'teatr',
  'кино': 'kino',
  'парк': 'park',
  'улица': 'ulitsa',
  'дорога': 'doroga',
  'мост': 'most',

  // Countries and cities
  'Россия': 'Rossiya',
  'Москва': 'Moskva',
  'Санкт-Петербург': 'Sankt-Peterburg',
  'Америка': 'Amerika',
  'Англия': 'Angliya',
  'Франция': 'Frantsiya',
  'Германия': 'Germaniya',
  'Китай': 'Kitaj',
  'Япония': 'Yaponiya',

  // Weather
  'погода': 'pogoda',
  'солнце': 'solntse',
  'дождь': 'dozhd\'',
  'снег': 'sneg',
  'ветер': 'veter',
  'облако': 'oblako',
  'туман': 'tuман',
  'холодно': 'kholodno',
  'тепло': 'teplo',
  'жарко': 'zharko',
  'прохладно': 'prokhладно',

  // Transportation
  'транспорт': 'transport',
  'машина': 'mashina',
  'автобус': 'avtobus',
  'троллейбус': 'trollejbus',
  'трамвай': 'tramvaj',
  'метро': 'metro',
  'поезд': 'poezd',
  'самолёт': 'samolуot',
  'корабль': 'korabl\'',
  'велосипед': 'velosiped',
  'мотоцикл': 'mototsikl',
  'такси': 'taksi',

  // Emotions
  'чувство': 'chuvstvo',
  'радость': 'radost\'',
  'счастье': 'schast\'e',
  'грусть': 'grust\'',
  'печаль': 'pechal\'',
  'злость': 'zlost\'',
  'гнев': 'gnev',
  'страх': 'strakh',
  'удивление': 'udivlenie',
  'любовь': 'lyubov\'',
  'ненависть': 'nenavist\'',

  // Work and education
  'работа': 'rabota',
  'профессия': 'professiya',
  'учитель': 'uchitel\'',
  'студент': 'student',
  'врач': 'vrach',
  'инженер': 'inzhener',
  'программист': 'programmist',
  'менеджер': 'menedzher',
  'директор': 'direktor',
  'секретарь': 'sekretar\'',
  'урок': 'urok',
  'лекция': 'lektsiya',
  'экзамен': 'ekzamen',
  'задание': 'zadanie',
  'книга': 'kniga',
  'тетрадь': 'tetrad\'',
  'ручка': 'ruchka',
  'карандаш': 'karandash',

  // Technology
  'компьютер': 'komp\'yuter',
  'интернет': 'internet',
  'телефон': 'telefon',
  'мобильный': 'mobil\'nyj',
  'планшет': 'planshet',
  'телевизор': 'televizor',
  'радио': 'radio',
  'фотография': 'fotografiya',
  'видео': 'video',
  'музыка': 'muzyka',
  'игра': 'igra',

  // Money and shopping
  'деньги': 'den\'gi',
  'рубль': 'rubl\'',
  'доллар': 'dollar',
  'евро': 'evro',
  'цена': 'tsena',
  'дорогой': 'dorogoj',
  'дешёвый': 'deshуovyj',
  'скидка': 'skidka',
  'касса': 'kassa',
  'чек': 'chek',
  'покупка': 'pokupka',
  'продажа': 'prodazha'
};

// Alternative romanization systems
export const alternativeRomanizations = {
  // BGN/PCGN romanization (US Board on Geographic Names)
  'bgn': {
    'ё': 'yo',
    'ж': 'zh',
    'х': 'kh',  
    'ц': 'ts',
    'ч': 'ch',
    'ш': 'sh',
    'щ': 'shch',
    'ъ': '"',
    'ы': 'y',
    'ь': "'",
    'э': 'e',
    'ю': 'yu',
    'я': 'ya'
  },
  
  // Scientific romanization (ISO 9:1995)
  'scientific': {
    'ё': 'ë',
    'ж': 'ž',
    'х': 'h',
    'ц': 'c',
    'ч': 'č',
    'ш': 'š',
    'щ': 'ŝ',
    'ъ': 'ʺ',
    'ы': 'y',
    'ь': 'ʹ',
    'э': 'è',
    'ю': 'û',
    'я': 'â'
  },
  
  // Simplified (without diacritics)
  'simplified': {
    'ё': 'e',
    'ж': 'zh',
    'х': 'h',
    'ц': 'ts',
    'ч': 'ch', 
    'ш': 'sh',
    'щ': 'sch',
    'ъ': '',
    'ы': 'y',
    'ь': '',
    'э': 'e',
    'ю': 'yu',
    'я': 'ya'
  }
};

// Unicode ranges for Cyrillic script detection
export const cyrillicRanges = [
  { start: 0x0400, end: 0x04FF },  // Cyrillic
  { start: 0x0500, end: 0x052F },  // Cyrillic Supplement
  { start: 0x2DE0, end: 0x2DFF },  // Cyrillic Extended-A
  { start: 0xA640, end: 0xA69F },  // Cyrillic Extended-B
];

/**
 * Check if a character is Cyrillic
 * @param {string} char - Single character to check
 * @returns {boolean} True if character is Cyrillic
 */
export function isCyrillicCharacter(char) {
  const code = char.charCodeAt(0);
  return cyrillicRanges.some(range => code >= range.start && code <= range.end);
}

/**
 * Get romanization for a Russian character or word
 * @param {string} text - Russian character(s) or word
 * @param {string} system - Romanization system ('gost', 'bgn', 'scientific', 'simplified')
 * @returns {string|null} Romanized text or null if not found
 */
export function getRomanization(text, system = 'gost') {
  // First try word/phrase mapping
  if (russianWordsMap[text]) {
    return russianWordsMap[text];
  }
  
  // Then try character mapping with specified system
  if (system === 'gost' && russianAlphabetMap[text]) {
    return russianAlphabetMap[text];
  }
  
  if (alternativeRomanizations[system] && alternativeRomanizations[system][text]) {
    return alternativeRomanizations[system][text];
  }
  
  // Fallback to GOST system
  return russianAlphabetMap[text] || null;
}

/**
 * Check if text is primarily Russian
 * @param {string} text - Text to check
 * @returns {boolean} True if text is primarily Russian
 */
export function isRussianText(text) {
  if (!text || typeof text !== 'string') {
    return false;
  }
  
  const chars = Array.from(text);
  const cyrillicCount = chars.filter(isCyrillicCharacter).length;
  
  return cyrillicCount / chars.length > 0.3;
}
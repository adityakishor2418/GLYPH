/**
 * Essential Kanji to Romaji mapping
 * Includes common Kanji characters with their most frequent readings
 * Each Kanji may have multiple readings (on'yomi and kun'yomi)
 */

export const kanjiMap = {
  // Numbers
  '一': ['ichi', 'hito'],
  '二': ['ni', 'futa'],
  '三': ['san', 'mi'],
  '四': ['shi', 'yon', 'yo'],
  '五': ['go', 'itsu'],
  '六': ['roku', 'mu'],
  '七': ['shichi', 'nana'],
  '八': ['hachi', 'ya'],
  '九': ['kyuu', 'kokono'],
  '十': ['juu', 'too'],
  '百': ['hyaku', 'momo'],
  '千': ['sen', 'chi'],
  '万': ['man', 'yorozu'],
  
  // Days/Time
  '日': ['nichi', 'hi', 'ka'],
  '月': ['getsu', 'tsuki'],
  '火': ['ka', 'hi'],
  '水': ['sui', 'mizu'],
  '木': ['moku', 'ki'],
  '金': ['kin', 'kane'],
  '土': ['do', 'tsuchi'],
  '年': ['nen', 'toshi'],
  '時': ['ji', 'toki'],
  '分': ['fun', 'bu', 'wa'],
  '秒': ['byou'],
  
  // Basic concepts
  '人': ['jin', 'hito'],
  '大': ['dai', 'oo'],
  '小': ['shou', 'chii', 'ko'],
  '中': ['chuu', 'naka'],
  '上': ['jou', 'ue', 'kami'],
  '下': ['ka', 'shita', 'shimo'],
  '前': ['zen', 'mae'],
  '後': ['go', 'ushi', 'ato'],
  '左': ['sa', 'hidari'],
  '右': ['u', 'migi'],
  
  // Common words
  '山': ['san', 'yama'],
  '川': ['sen', 'kawa'],
  '田': ['den', 'ta'],
  '海': ['kai', 'umi'],
  '空': ['kuu', 'sora'],
  '雨': ['u', 'ame'],
  '雪': ['setsu', 'yuki'],
  '風': ['fuu', 'kaze'],
  '花': ['ka', 'hana'],
  '木': ['moku', 'ki'],
  '林': ['rin', 'hayashi'],
  '森': ['shin', 'mori'],
  
  // Family
  '父': ['fu', 'chichi'],
  '母': ['bo', 'haha'],
  '子': ['shi', 'ko'],
  '兄': ['kei', 'ani'],
  '弟': ['tei', 'otouto'],
  '姉': ['shi', 'ane'],
  '妹': ['mai', 'imouto'],
  
  // Colors
  '白': ['haku', 'shiro'],
  '黒': ['koku', 'kuro'],
  '赤': ['seki', 'aka'],
  '青': ['sei', 'ao'],
  '黄': ['ou', 'ki'],
  '緑': ['ryoku', 'midori'],
  
  // Countries
  '日本': ['nihon', 'nippon'],
  '中国': ['chuugoku'],
  '韓国': ['kankoku'],
  '米国': ['beikoku'],
  '英国': ['eikoku'],
  '仏国': ['futsukoku'],
  '独国': ['doitsukoku'],
  
  // Actions/Verbs
  '見': ['ken', 'mi'],
  '聞': ['bun', 'ki'],
  '言': ['gen', 'i'],
  '話': ['wa', 'hanashi'],
  '読': ['doku', 'yo'],
  '書': ['sho', 'ka'],
  '食': ['shoku', 'ta'],
  '飲': ['in', 'no'],
  '行': ['kou', 'i', 'yu'],
  '来': ['rai', 'ki', 'ku'],
  '帰': ['ki', 'kaeri'],
  '買': ['bai', 'ka'],
  '売': ['bai', 'u'],
  '作': ['saku', 'tsuku'],
  '立': ['ritsu', 'ta'],
  '座': ['za', 'suwa'],
  '歩': ['ho', 'aru'],
  '走': ['sou', 'hashi'],
  '泳': ['ei', 'oyo'],
  '寝': ['shin', 'ne'],
  '起': ['ki', 'o'],
  
  // Places
  '国': ['koku', 'kuni'],
  '都': ['to', 'miyako'],
  '市': ['shi'],
  '町': ['chou', 'machi'],
  '村': ['son', 'mura'],
  '家': ['ka', 'ie', 'ya'],
  '店': ['ten', 'mise'],
  '学校': ['gakkou'],
  '病院': ['byouin'],
  '会社': ['kaisha'],
  '駅': ['eki'],
  '空港': ['kuukou'],
  
  // Education
  '学': ['gaku', 'mana'],
  '校': ['kou'],
  '生': ['sei', 'nama', 'i'],
  '先生': ['sensei'],
  '学生': ['gakusei'],
  '勉強': ['benkyou'],
  '試験': ['shiken'],
  '宿題': ['shukudai'],
  
  // Technology
  '電': ['den'],
  '話': ['wa', 'hanashi'],
  '車': ['sha', 'kuruma'],
  '機': ['ki', 'hata'],
  '械': ['kai'],
  
  // Emotions/States
  '好': ['kou', 'su'],
  '嫌': ['ken', 'kira'],
  '楽': ['raku', 'tano'],
  '悲': ['hi', 'kana'],
  '怒': ['do', 'oko'],
  '喜': ['ki', 'yoroko'],
  
  // Common adjectives
  '新': ['shin', 'atara'],
  '古': ['ko', 'furu'],
  '高': ['kou', 'taka'],
  '安': ['an', 'yasu'],
  '長': ['chou', 'naga'],
  '短': ['tan', 'mijika'],
  '重': ['juu', 'omo'],
  '軽': ['kei', 'karu'],
  '強': ['kyou', 'tsuyo'],
  '弱': ['jaku', 'yowa'],
  '速': ['soku', 'haya'],
  '遅': ['chi', 'oso'],
  
  // Business/Work
  '会': ['kai', 'a'],
  '社': ['sha', 'yashiro'],
  '仕事': ['shigoto'],
  '働': ['dou', 'hatara'],
  '金': ['kin', 'kane'],
  '円': ['en'],
  '買': ['bai', 'ka'],
  '売': ['bai', 'u'],
  
  // Common particles/grammar (when written in Kanji)
  '何': ['nani', 'nan'],
  '誰': ['dare', 'tare'],
  '何処': ['doko'],
  '何時': ['itsu'],
  '何故': ['naze', 'doushite'],
  '如何': ['dou', 'ikaga'],
};

// Complex Kanji compounds with specific readings
export const kanjiCompounds = {
  // Common compound words
  '日本': 'nihon',
  '日本語': 'nihongo',
  '英語': 'eigo',
  '中国語': 'chuugokugo',
  '韓国語': 'kankokugo',
  '学校': 'gakkou',
  '先生': 'sensei',
  '学生': 'gakusei',
  '会社': 'kaisha',
  '病院': 'byouin',
  '空港': 'kuukou',
  '電話': 'denwa',
  '電車': 'densha',
  '新幹線': 'shinkansen',
  '自動車': 'jidousha',
  '映画': 'eiga',
  '音楽': 'ongaku',
  '料理': 'ryouri',
  '寿司': 'sushi',
  '天気': 'tenki',
  '天皇': 'tennou',
  '政治': 'seiji',
  '経済': 'keizai',
  '文化': 'bunka',
  '歴史': 'rekishi',
  '科学': 'kagaku',
  '技術': 'gijutsu',
  '医学': 'igaku',
  '法律': 'houritsu',
  '宗教': 'shuukyou',
  
  // Time expressions
  '今日': 'kyou',
  '昨日': 'kinou',
  '明日': 'ashita',
  '今年': 'kotoshi',
  '去年': 'kyonen',
  '来年': 'rainen',
  '今月': 'kongetsu',
  '先月': 'sengetsu',
  '来月': 'raigetsu',
  '今週': 'konshuu',
  '先週': 'senshuu',
  '来週': 'raishuu',
  
  // Days of the week
  '月曜日': 'getsuyoubi',
  '火曜日': 'kayoubi',
  '水曜日': 'suiyoubi',
  '木曜日': 'mokuyoubi',
  '金曜日': 'kinyoubi',
  '土曜日': 'doyoubi',
  '日曜日': 'nichiyoubi',
  
  // Common expressions
  'お疲れ様': 'otsukaresama',
  'おはよう': 'ohayou',
  'こんにちは': 'konnichiwa',
  'こんばんは': 'konbanwa',
  'さようなら': 'sayounara',
  'ありがとう': 'arigatou',
  'すみません': 'sumimasen',
  'ごめんなさい': 'gomen\'nasai',
};

// Unicode ranges for Kanji detection
export const kanjiRanges = [
  { start: 0x4E00, end: 0x9FAF },  // CJK Unified Ideographs
  { start: 0x3400, end: 0x4DBF },  // CJK Extension A
  { start: 0x20000, end: 0x2A6DF }, // CJK Extension B
  { start: 0x2A700, end: 0x2B73F }, // CJK Extension C
  { start: 0x2B740, end: 0x2B81F }, // CJK Extension D
];

/**
 * Check if a character is Kanji
 * @param {string} char - Single character to check
 * @returns {boolean} True if character is Kanji
 */
export function isKanji(char) {
  const code = char.charCodeAt(0);
  return kanjiRanges.some(range => code >= range.start && code <= range.end);
}

/**
 * Get possible readings for a Kanji character
 * @param {string} kanji - Single Kanji character
 * @returns {string[]} Array of possible readings
 */
export function getKanjiReadings(kanji) {
  return kanjiMap[kanji] || [];
}
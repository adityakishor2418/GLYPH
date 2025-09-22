/**
 * Comprehensive Katakana to Romaji mapping
 * Includes all standard Katakana characters and their pronunciations
 */

export const katakanaMap = {
  // Basic Katakana (Gojūon)
  'ア': 'a',    'イ': 'i',    'ウ': 'u',    'エ': 'e',    'オ': 'o',
  'カ': 'ka',   'キ': 'ki',   'ク': 'ku',   'ケ': 'ke',   'コ': 'ko',
  'ガ': 'ga',   'ギ': 'gi',   'グ': 'gu',   'ゲ': 'ge',   'ゴ': 'go',
  'サ': 'sa',   'シ': 'shi',  'ス': 'su',   'セ': 'se',   'ソ': 'so',
  'ザ': 'za',   'ジ': 'ji',   'ズ': 'zu',   'ゼ': 'ze',   'ゾ': 'zo',
  'タ': 'ta',   'チ': 'chi',  'ツ': 'tsu',  'テ': 'te',   'ト': 'to',
  'ダ': 'da',   'ヂ': 'ji',   'ヅ': 'zu',   'デ': 'de',   'ド': 'do',
  'ナ': 'na',   'ニ': 'ni',   'ヌ': 'nu',   'ネ': 'ne',   'ノ': 'no',
  'ハ': 'ha',   'ヒ': 'hi',   'フ': 'fu',   'ヘ': 'he',   'ホ': 'ho',
  'バ': 'ba',   'ビ': 'bi',   'ブ': 'bu',   'ベ': 'be',   'ボ': 'bo',
  'パ': 'pa',   'ピ': 'pi',   'プ': 'pu',   'ペ': 'pe',   'ポ': 'po',
  'マ': 'ma',   'ミ': 'mi',   'ム': 'mu',   'メ': 'me',   'モ': 'mo',
  'ヤ': 'ya',   'ユ': 'yu',   'ヨ': 'yo',
  'ラ': 'ra',   'リ': 'ri',   'ル': 'ru',   'レ': 're',   'ロ': 'ro',
  'ワ': 'wa',   'ヰ': 'wi',   'ヱ': 'we',   'ヲ': 'wo',   'ン': 'n',
  
  // Combination characters (Yōon)
  'キャ': 'kya',  'キュ': 'kyu',  'キョ': 'kyo',
  'ギャ': 'gya',  'ギュ': 'gyu',  'ギョ': 'gyo',
  'シャ': 'sha',  'シュ': 'shu',  'ショ': 'sho',
  'ジャ': 'ja',   'ジュ': 'ju',   'ジョ': 'jo',
  'チャ': 'cha',  'チュ': 'chu',  'チョ': 'cho',
  'ヂャ': 'ja',   'ヂュ': 'ju',   'ヂョ': 'jo',
  'ニャ': 'nya',  'ニュ': 'nyu',  'ニョ': 'nyo',
  'ヒャ': 'hya',  'ヒュ': 'hyu',  'ヒョ': 'hyo',
  'ビャ': 'bya',  'ビュ': 'byu',  'ビョ': 'byo',
  'ピャ': 'pya',  'ピュ': 'pyu',  'ピョ': 'pyo',
  'ミャ': 'mya',  'ミュ': 'myu',  'ミョ': 'myo',
  'リャ': 'rya',  'リュ': 'ryu',  'リョ': 'ryo',
  
  // Extended Katakana for foreign words
  'ヴ': 'vu',
  'ファ': 'fa',  'フィ': 'fi',  'フェ': 'fe',  'フォ': 'fo',
  'ウィ': 'wi',  'ウェ': 'we',  'ウォ': 'wo',
  'ヴァ': 'va',  'ヴィ': 'vi',  'ヴェ': 've',  'ヴォ': 'vo',
  'シェ': 'she', 'ジェ': 'je',  'チェ': 'che', 'ディ': 'di',
  'デュ': 'du',  'ティ': 'ti',  'トゥ': 'tu',  'ドゥ': 'du',
  'ツァ': 'tsa', 'ツィ': 'tsi', 'ツェ': 'tse', 'ツォ': 'tso',
  
  // Special characters
  'ッ': '',      // Small tsu (handled specially for gemination)
  'ー': '',      // Long vowel mark (handled specially)
  '゛': '',      // Dakuten (handled in processing)
  '゜': '',      // Handakuten (handled in processing)
};

// Special two-character combinations that need priority over single character lookups
export const katakanaSpecialCombos = {
  // Long vowels with ー
  'アー': 'aa',   'イー': 'ii',   'ウー': 'uu',   'エー': 'ee',   'オー': 'oo',
  'カー': 'kaa',  'キー': 'kii',  'クー': 'kuu',  'ケー': 'kee',  'コー': 'koo',
  'ガー': 'gaa',  'ギー': 'gii',  'グー': 'guu',  'ゲー': 'gee',  'ゴー': 'goo',
  'サー': 'saa',  'シー': 'shii', 'スー': 'suu',  'セー': 'see',  'ソー': 'soo',
  'ザー': 'zaa',  'ジー': 'jii',  'ズー': 'zuu',  'ゼー': 'zee',  'ゾー': 'zoo',
  'ター': 'taa',  'チー': 'chii', 'ツー': 'tsuu', 'テー': 'tee',  'トー': 'too',
  'ダー': 'daa',  'ヂー': 'jii',  'ヅー': 'zuu',  'デー': 'dee',  'ドー': 'doo',
  'ナー': 'naa',  'ニー': 'nii',  'ヌー': 'nuu',  'ネー': 'nee',  'ノー': 'noo',
  'ハー': 'haa',  'ヒー': 'hii',  'フー': 'fuu',  'ヘー': 'hee',  'ホー': 'hoo',
  'バー': 'baa',  'ビー': 'bii',  'ブー': 'buu',  'ベー': 'bee',  'ボー': 'boo',
  'パー': 'paa',  'ピー': 'pii',  'プー': 'puu',  'ペー': 'pee',  'ポー': 'poo',
  'マー': 'maa',  'ミー': 'mii',  'ムー': 'muu',  'メー': 'mee',  'モー': 'moo',
  'ヤー': 'yaa',  'ユー': 'yuu',  'ヨー': 'yoo',
  'ラー': 'raa',  'リー': 'rii',  'ルー': 'ruu',  'レー': 'ree',  'ロー': 'roo',
  'ワー': 'waa',  'ヲー': 'woo',
  
  // Gemination (double consonants) with ッ
  'ッカ': 'kka',  'ッキ': 'kki',  'ック': 'kku',  'ッケ': 'kke',  'ッコ': 'kko',
  'ッガ': 'gga',  'ッギ': 'ggi',  'ッグ': 'ggu',  'ッゲ': 'gge',  'ッゴ': 'ggo',
  'ッサ': 'ssa',  'ッシ': 'sshi', 'ッス': 'ssu',  'ッセ': 'sse',  'ッソ': 'sso',
  'ッザ': 'zza',  'ッジ': 'jji',  'ッズ': 'zzu',  'ッゼ': 'zze',  'ッゾ': 'zzo',
  'ッタ': 'tta',  'ッチ': 'tchi', 'ッツ': 'ttsu', 'ッテ': 'tte',  'ット': 'tto',
  'ッダ': 'dda',  'ッヂ': 'jji',  'ッヅ': 'zzu',  'ッデ': 'dde',  'ッド': 'ddo',
  'ッパ': 'ppa',  'ッピ': 'ppi',  'ップ': 'ppu',  'ッペ': 'ppe',  'ッポ': 'ppo',
  'ッバ': 'bba',  'ッビ': 'bbi',  'ッブ': 'bbu',  'ッベ': 'bbe',  'ッボ': 'bbo',
  'ッファ': 'ffa', 'ッフィ': 'ffi', 'ッフ': 'ffu',  'ッフェ': 'ffe', 'ッフォ': 'ffo',
};

// Unicode ranges for Katakana detection
export const katakanaRange = {
  start: 0x30A1,  // ァ
  end: 0x30FC     // ー
};

/**
 * Check if a character is Katakana
 * @param {string} char - Single character to check
 * @returns {boolean} True if character is Katakana
 */
export function isKatakana(char) {
  const code = char.charCodeAt(0);
  return code >= katakanaRange.start && code <= katakanaRange.end;
}
/**
 * Comprehensive Hiragana to Romaji mapping
 * Includes all standard Hiragana characters and their pronunciations
 */

export const hiraganaMap = {
  // Basic Hiragana (Gojūon)
  'あ': 'a',    'い': 'i',    'う': 'u',    'え': 'e',    'お': 'o',
  'か': 'ka',   'き': 'ki',   'く': 'ku',   'け': 'ke',   'こ': 'ko',
  'が': 'ga',   'ぎ': 'gi',   'ぐ': 'gu',   'げ': 'ge',   'ご': 'go',
  'さ': 'sa',   'し': 'shi',  'す': 'su',   'せ': 'se',   'そ': 'so',
  'ざ': 'za',   'じ': 'ji',   'ず': 'zu',   'ぜ': 'ze',   'ぞ': 'zo',
  'た': 'ta',   'ち': 'chi',  'つ': 'tsu',  'て': 'te',   'と': 'to',
  'だ': 'da',   'ぢ': 'ji',   'づ': 'zu',   'で': 'de',   'ど': 'do',
  'な': 'na',   'に': 'ni',   'ぬ': 'nu',   'ね': 'ne',   'の': 'no',
  'は': 'ha',   'ひ': 'hi',   'ふ': 'fu',   'へ': 'he',   'ほ': 'ho',
  'ば': 'ba',   'び': 'bi',   'ぶ': 'bu',   'べ': 'be',   'ぼ': 'bo',
  'ぱ': 'pa',   'ぴ': 'pi',   'ぷ': 'pu',   'ぺ': 'pe',   'ぽ': 'po',
  'ま': 'ma',   'み': 'mi',   'む': 'mu',   'め': 'me',   'も': 'mo',
  'や': 'ya',   'ゆ': 'yu',   'よ': 'yo',
  'ら': 'ra',   'り': 'ri',   'る': 'ru',   'れ': 're',   'ろ': 'ro',
  'わ': 'wa',   'ゐ': 'wi',   'ゑ': 'we',   'を': 'wo',   'ん': 'n',
  
  // Combination characters (Yōon)
  'きゃ': 'kya',  'きゅ': 'kyu',  'きょ': 'kyo',
  'ぎゃ': 'gya',  'ぎゅ': 'gyu',  'ぎょ': 'gyo',
  'しゃ': 'sha',  'しゅ': 'shu',  'しょ': 'sho',
  'じゃ': 'ja',   'じゅ': 'ju',   'じょ': 'jo',
  'ちゃ': 'cha',  'ちゅ': 'chu',  'ちょ': 'cho',
  'ぢゃ': 'ja',   'ぢゅ': 'ju',   'ぢょ': 'jo',
  'にゃ': 'nya',  'にゅ': 'nyu',  'にょ': 'nyo',
  'ひゃ': 'hya',  'ひゅ': 'hyu',  'ひょ': 'hyo',
  'びゃ': 'bya',  'びゅ': 'byu',  'びょ': 'byo',
  'ぴゃ': 'pya',  'ぴゅ': 'pyu',  'ぴょ': 'pyo',
  'みゃ': 'mya',  'みゅ': 'myu',  'みょ': 'myo',
  'りゃ': 'rya',  'りゅ': 'ryu',  'りょ': 'ryo',
  
  // Extended characters
  'ゔ': 'vu',
  
  // Special characters
  'っ': '',      // Small tsu (handled specially for gemination)
  'ー': '',      // Long vowel mark (handled specially)
  '゛': '',      // Dakuten (handled in processing)
  '゜': '',      // Handakuten (handled in processing)
};

// Special two-character combinations that need priority over single character lookups
export const hiraganaSpecialCombos = {
  // Long vowels
  'ああ': 'aa',   'いい': 'ii',   'うう': 'uu',   'ええ': 'ee',   'おお': 'oo',
  'かあ': 'kaa',  'きい': 'kii',  'くう': 'kuu',  'けえ': 'kee',  'こお': 'koo',
  'があ': 'gaa',  'ぎい': 'gii',  'ぐう': 'guu',  'げえ': 'gee',  'ごお': 'goo',
  
  // Gemination (double consonants) with っ
  'っか': 'kka',  'っき': 'kki',  'っく': 'kku',  'っけ': 'kke',  'っこ': 'kko',
  'っが': 'gga',  'っぎ': 'ggi',  'っぐ': 'ggu',  'っげ': 'gge',  'っご': 'ggo',
  'っさ': 'ssa',  'っし': 'sshi', 'っす': 'ssu',  'っせ': 'sse',  'っそ': 'sso',
  'っざ': 'zza',  'っじ': 'jji',  'っず': 'zzu',  'っぜ': 'zze',  'っぞ': 'zzo',
  'った': 'tta',  'っち': 'tchi', 'っつ': 'ttsu', 'って': 'tte',  'っと': 'tto',
  'っだ': 'dda',  'っぢ': 'jji',  'っづ': 'zzu',  'っで': 'dde',  'っど': 'ddo',
  'っぱ': 'ppa',  'っぴ': 'ppi',  'っぷ': 'ppu',  'っぺ': 'ppe',  'っぽ': 'ppo',
  'っば': 'bba',  'っび': 'bbi',  'っぶ': 'bbu',  'っべ': 'bbe',  'っぼ': 'bbo',
};

// Unicode ranges for Hiragana detection
export const hiraganaRange = {
  start: 0x3041,  // ぁ
  end: 0x3096     // ゖ
};

/**
 * Check if a character is Hiragana
 * @param {string} char - Single character to check
 * @returns {boolean} True if character is Hiragana
 */
export function isHiragana(char) {
  const code = char.charCodeAt(0);
  return code >= hiraganaRange.start && code <= hiraganaRange.end;
}
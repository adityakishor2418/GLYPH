// Pure Transliteration System - Phonetic conversion only
console.log('🌍 Pure Transliteration System loaded - Phonetic conversion mode');

// Comprehensive transliteration maps (phonetic representation)
const transliterationMaps = {
    arabic: {
        // Basic letters
        'ا': 'a', 'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j', 'ح': 'h', 'خ': 'kh',
        'د': 'd', 'ذ': 'dh', 'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh', 'ص': 's',
        'ض': 'd', 'ط': 't', 'ظ': 'z', 'ع': "'", 'غ': 'gh', 'ف': 'f', 'ق': 'q',
        'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ه': 'h', 'و': 'w', 'ي': 'y',
        
        // Special forms and variations
        'ة': 'ah', 'ى': 'a', 'ء': "'", 'ئ': "'", 'ؤ': "w'", 'إ': 'i', 'أ': 'a',
        'آ': 'aa', 'ال': 'al-', 'لا': 'la', 'تا': 'ta', 'با': 'ba', 'ما': 'ma',
        'نا': 'na', 'را': 'ra', 'سا': 'sa', 'كا': 'ka', 'فا': 'fa', 'ها': 'ha',
        
        // Extended Arabic letters (for other languages using Arabic script)
        'چ': 'ch', 'پ': 'p', 'ژ': 'zh', 'گ': 'g', 'ڤ': 'v', 'ڨ': 'g', 'ک': 'k',
        'ی': 'y', 'ے': 'e', 'ں': 'n', 'ڑ': 'r', 'ٹ': 't', 'ڈ': 'd', 'ڑ': 'r',
        'ھ': 'h', 'ۃ': 'h', 'ۂ': 'h', 'ۓ': 'e', 'ۍ': 'ey', 'ې': 'e', 'ځ': 'dz',
        
        // Diacritics and markers
        'َ': 'a', 'ُ': 'u', 'ِ': 'i', 'ً': 'an', 'ٌ': 'un', 'ٍ': 'in',
        'ْ': '', 'ّ': '', 'ٰ': 'a', 'ٱ': 'a', 'ٲ': 'a', 'ٳ': 'a', 'ٴ': "'",
        'ٵ': 'a', 'ٶ': 'w', 'ٷ': 'u', 'ٸ': 'y', 'ٹ': 't', 'ٺ': 't', 'ٻ': 'b',
        
        // Numbers (Eastern Arabic-Indic)
        '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', 
        '٦': '6', '٧': '7', '٨': '8', '٩': '9',
        
        // Extended numbers (Persian/Urdu variants)
        '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5',
        '۶': '6', '۷': '7', '۸': '8', '۹': '9',
        
        // Punctuation and symbols
        '،': ', ', '؛': '; ', '؟': '?', '«': '"', '»': '"', '؍': '%',
        '؎': '%o', '؏': '%oo', 'ؐ': '', 'ؑ': '', '؞': '***', '؟': '?',
        '؀': '&', '؁': '', '؂': '', '؃': '', '؄': '', '؅': '', '؆': '',
        '؇': '', '؈': '', '؉': '', '؊': '', '؋': 'af', '؍': '%'
    },
    
    russian: {
        // Lowercase Cyrillic
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
        'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
        'ъ': "'", 'ы': 'y', 'ь': "'", 'э': 'e', 'ю': 'yu', 'я': 'ya',
        
        // Uppercase Cyrillic
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo',
        'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
        'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
        'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch',
        'Ъ': "'", 'Ы': 'Y', 'Ь': "'", 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya',
        
        // Extended Cyrillic (for other Slavic languages)
        'ђ': 'dj', 'ѓ': 'gj', 'є': 'ie', 'ѕ': 'dz', 'і': 'i', 'ї': 'yi', 'ј': 'j',
        'љ': 'lj', 'њ': 'nj', 'ћ': 'c', 'ќ': 'kj', 'ў': 'u', 'џ': 'dz',
        'Ђ': 'Dj', 'Ѓ': 'Gj', 'Є': 'Ie', 'Ѕ': 'Dz', 'І': 'I', 'Ї': 'Yi', 'Ј': 'J',
        'Љ': 'Lj', 'Њ': 'Nj', 'Ћ': 'C', 'Ќ': 'Kj', 'Ў': 'U', 'Џ': 'Dz',
        
        // Old Cyrillic and rare letters
        'ѐ': 'e', 'ё': 'yo', 'ѝ': 'i', 'ҁ': 'c', 'ҋ': 'n', 'ҍ': 'r', 'ҏ': 'p',
        'ґ': 'g', 'ғ': 'gh', 'ҕ': 'gh', 'җ': 'zh', 'ҙ': 'z', 'қ': 'q', 'ҝ': 'k',
        'ҟ': 'k', 'ҡ': 'q', 'ң': 'ng', 'ҥ': 'ng', 'ҧ': 'p', 'ҩ': 'h', 'ҫ': 's',
        'ҭ': 't', 'ү': 'u', 'ұ': 'u', 'ҳ': 'h', 'ҵ': 'ts', 'ҷ': 'ch', 'ҹ': 'ch',
        'һ': 'h', 'ҽ': 'e', 'ҿ': 'ch', 'ӏ': 'i', 'ӑ': 'a', 'ӓ': 'a', 'ӕ': 'ae',
        
        // Numbers (if in Cyrillic context)
        '№': 'No.', '₽': 'rub'
    },
    
    japanese: {
        // Hiragana (basic syllables)
        'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
        'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
        'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
        'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
        'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
        'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
        'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
        'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
        'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
        'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
        'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
        'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
        'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
        'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
        'わ': 'wa', 'ゐ': 'wi', 'ゑ': 'we', 'を': 'wo', 'ん': 'n',
        
        // Hiragana combinations with small characters
        'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
        'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
        'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
        'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
        'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
        'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
        'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
        'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
        'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
        'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
        'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
        
        // Small hiragana
        'ぁ': 'a', 'ぃ': 'i', 'ぅ': 'u', 'ぇ': 'e', 'ぉ': 'o',
        'っ': 'tsu', 'ゃ': 'ya', 'ゅ': 'yu', 'ょ': 'yo', 'ゎ': 'wa',
        
        // Katakana (basic syllables)
        'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
        'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
        'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go',
        'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
        'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo',
        'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
        'ダ': 'da', 'ヂ': 'ji', 'ヅ': 'zu', 'デ': 'de', 'ド': 'do',
        'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
        'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
        'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo',
        'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po',
        'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
        'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
        'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
        'ワ': 'wa', 'ヰ': 'wi', 'ヱ': 'we', 'ヲ': 'wo', 'ン': 'n',
        
        // Katakana combinations
        'キャ': 'kya', 'キュ': 'kyu', 'キョ': 'kyo',
        'シャ': 'sha', 'シュ': 'shu', 'ショ': 'sho',
        'チャ': 'cha', 'チュ': 'chu', 'チョ': 'cho',
        'ニャ': 'nya', 'ニュ': 'nyu', 'ニョ': 'nyo',
        'ヒャ': 'hya', 'ヒュ': 'hyu', 'ヒョ': 'hyo',
        'ミャ': 'mya', 'ミュ': 'myu', 'ミョ': 'myo',
        'リャ': 'rya', 'リュ': 'ryu', 'リョ': 'ryo',
        'ギャ': 'gya', 'ギュ': 'gyu', 'ギョ': 'gyo',
        'ジャ': 'ja', 'ジュ': 'ju', 'ジョ': 'jo',
        'ビャ': 'bya', 'ビュ': 'byu', 'ビョ': 'byo',
        'ピャ': 'pya', 'ピュ': 'pyu', 'ピョ': 'pyo',
        
        // Extended katakana for foreign words
        'ヴ': 'vu', 'ヴァ': 'va', 'ヴィ': 'vi', 'ヴェ': 've', 'ヴォ': 'vo',
        'ウィ': 'wi', 'ウェ': 'we', 'ウォ': 'wo',
        'ティ': 'ti', 'トゥ': 'tu', 'ディ': 'di', 'ドゥ': 'du',
        'ファ': 'fa', 'フィ': 'fi', 'フェ': 'fe', 'フォ': 'fo',
        'ツァ': 'tsa', 'ツィ': 'tsi', 'ツェ': 'tse', 'ツォ': 'tso',
        'シェ': 'she', 'ジェ': 'je', 'チェ': 'che',
        'イェ': 'ye', 'クァ': 'kwa', 'グァ': 'gwa',
        
        // Small katakana
        'ァ': 'a', 'ィ': 'i', 'ゥ': 'u', 'ェ': 'e', 'ォ': 'o',
        'ッ': 'tsu', 'ャ': 'ya', 'ュ': 'yu', 'ョ': 'yo', 'ヮ': 'wa',
        
        // Special katakana symbols
        'ー': '-', '・': '·', 'ヽ': "'", 'ヾ': '"',
        
        // Punctuation
        '。': '.', '、': ', ', '？': '?', '！': '!', '：': ': ', '；': '; ',
        '「': '"', '」': '"', '『': "'", '』': "'", '（': '(', '）': ')',
        '［': '[', '］': ']', '｛': '{', '｝': '}', '〈': '<', '〉': '>',
        '《': '<<', '》': '>>', '【': '[', '】': ']', '〔': '(', '〕': ')',
        '〜': '~', '※': '*', '〇': 'o', '〒': 'T', '々': '"', '〻': '"'
    },
    
    chinese: {
        // Common characters with pinyin transliteration
        '你': 'ni', '好': 'hao', '我': 'wo', '是': 'shi', '的': 'de', '在': 'zai',
        '有': 'you', '他': 'ta', '她': 'ta', '它': 'ta', '们': 'men', '不': 'bu',
        '了': 'le', '上': 'shang', '下': 'xia', '中': 'zhong', '国': 'guo',
        '人': 'ren', '大': 'da', '小': 'xiao', '来': 'lai', '去': 'qu',
        '说': 'shuo', '话': 'hua', '看': 'kan', '听': 'ting', '吃': 'chi',
        '喝': 'he', '水': 'shui', '茶': 'cha', '饭': 'fan', '肉': 'rou',
        '菜': 'cai', '钱': 'qian', '买': 'mai', '卖': 'mai', '学': 'xue',
        '校': 'xiao', '老': 'lao', '师': 'shi', '学': 'xue', '生': 'sheng',
        '书': 'shu', '车': 'che', '路': 'lu', '家': 'jia', '门': 'men',
        '开': 'kai', '关': 'guan', '走': 'zou', '跑': 'pao', '坐': 'zuo',
        
        // Extended vocabulary
        '爱': 'ai', '出': 'chu', '也': 'ye', '会': 'hui', '可': 'ke', '以': 'yi',
        '这': 'zhe', '那': 'na', '什': 'shen', '么': 'me', '时': 'shi', '候': 'hou',
        '地': 'di', '方': 'fang', '年': 'nian', '月': 'yue', '日': 'ri', '天': 'tian',
        '今': 'jin', '明': 'ming', '昨': 'zuo', '晚': 'wan', '早': 'zao', '午': 'wu',
        '很': 'hen', '多': 'duo', '少': 'shao', '几': 'ji', '个': 'ge', '只': 'zhi',
        '一': 'yi', '二': 'er', '三': 'san', '四': 'si', '五': 'wu', '六': 'liu',
        '七': 'qi', '八': 'ba', '九': 'jiu', '十': 'shi', '百': 'bai', '千': 'qian',
        '万': 'wan', '亿': 'yi', '零': 'ling', '第': 'di', '次': 'ci', '回': 'hui',
        
        // Family and relationships
        '爸': 'ba', '妈': 'ma', '儿': 'er', '女': 'nv', '子': 'zi', '孩': 'hai',
        '男': 'nan', '女': 'nv', '朋': 'peng', '友': 'you', '同': 'tong', '事': 'shi',
        '老': 'lao', '板': 'ban', '妻': 'qi', '夫': 'fu', '婚': 'hun', '姻': 'yin',
        
        // Colors
        '红': 'hong', '黄': 'huang', '蓝': 'lan', '绿': 'lv', '白': 'bai', '黑': 'hei',
        '灰': 'hui', '紫': 'zi', '粉': 'fen', '橙': 'cheng', '棕': 'zong',
        
        // Body parts
        '头': 'tou', '眼': 'yan', '睛': 'jing', '鼻': 'bi', '嘴': 'zui', '耳': 'er',
        '朵': 'duo', '手': 'shou', '脚': 'jiao', '腿': 'tui', '心': 'xin', '脑': 'nao',
        
        // Food and drink
        '米': 'mi', '面': 'mian', '包': 'bao', '汤': 'tang', '鸡': 'ji', '鸭': 'ya',
        '鱼': 'yu', '虾': 'xia', '蟹': 'xie', '果': 'guo', '苹': 'ping', '梨': 'li',
        '香': 'xiang', '蕉': 'jiao', '葡': 'pu', '萄': 'tao', '酒': 'jiu', '咖': 'ka',
        '啡': 'fei', '牛': 'niu', '奶': 'nai', '糖': 'tang', '盐': 'yan', '醋': 'cu',
        
        // Nature
        '山': 'shan', '河': 'he', '海': 'hai', '湖': 'hu', '树': 'shu', '花': 'hua',
        '草': 'cao', '鸟': 'niao', '狗': 'gou', '猫': 'mao', '马': 'ma', '羊': 'yang',
        '猪': 'zhu', '鸡': 'ji', '鸭': 'ya', '鱼': 'yu', '虫': 'chong', '蛇': 'she',
        
        // Weather
        '雨': 'yu', '雪': 'xue', '风': 'feng', '云': 'yun', '雷': 'lei', '电': 'dian',
        '阳': 'yang', '光': 'guang', '冷': 'leng', '热': 're', '暖': 'nuan', '凉': 'liang',
        
        // Directions
        '东': 'dong', '南': 'nan', '西': 'xi', '北': 'bei', '左': 'zuo', '右': 'you',
        '前': 'qian', '后': 'hou', '里': 'li', '外': 'wai', '内': 'nei', '边': 'bian',
        
        // Actions
        '做': 'zuo', '工': 'gong', '作': 'zuo', '睡': 'shui', '觉': 'jiao', '起': 'qi',
        '床': 'chuang', '洗': 'xi', '澡': 'zao', '刷': 'shua', '牙': 'ya', '穿': 'chuan',
        '衣': 'yi', '服': 'fu', '脱': 'tuo', '戴': 'dai', '帽': 'mao', '鞋': 'xie',
        
        // Transportation
        '飞': 'fei', '机': 'ji', '火': 'huo', '船': 'chuan', '自': 'zi', '行': 'xing',
        '摩': 'mo', '托': 'tuo', '地': 'di', '铁': 'tie', '公': 'gong', '交': 'jiao',
        
        // Technology
        '电': 'dian', '脑': 'nao', '手': 'shou', '机': 'ji', '电': 'dian', '视': 'shi',
        '网': 'wang', '络': 'luo', '游': 'you', '戏': 'xi', '音': 'yin', '乐': 'le',
        
        // Punctuation
        '，': ', ', '。': '.', '？': '?', '！': '!', '：': ': ', '；': '; ',
        '\u201C': '"', '\u201D': '"', '\u2018': "'", '\u2019': "'", '（': '(', '）': ')',
        '【': '[', '】': ']', '《': '<<', '》': '>>', '、': ', ', '·': '·'
    },
    
    korean: {
        // Basic Hangul consonants and vowels
        'ㄱ': 'g', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄹ': 'r', 'ㅁ': 'm', 'ㅂ': 'b', 'ㅅ': 's',
        'ㅇ': '', 'ㅈ': 'j', 'ㅊ': 'ch', 'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h',
        'ㄲ': 'kk', 'ㄸ': 'tt', 'ㅃ': 'pp', 'ㅆ': 'ss', 'ㅉ': 'jj',
        'ㅏ': 'a', 'ㅓ': 'eo', 'ㅗ': 'o', 'ㅜ': 'u', 'ㅡ': 'eu', 'ㅣ': 'i',
        'ㅑ': 'ya', 'ㅕ': 'yeo', 'ㅛ': 'yo', 'ㅠ': 'yu', 'ㅒ': 'yae', 'ㅖ': 'ye',
        'ㅘ': 'wa', 'ㅙ': 'wae', 'ㅚ': 'oe', 'ㅝ': 'wo', 'ㅞ': 'we', 'ㅟ': 'wi', 'ㅢ': 'ui',
        
        // Common Korean syllables and words
        '안': 'an', '녕': 'nyeong', '하': 'ha', '세': 'se', '요': 'yo', '감': 'gam', '사': 'sa',
        '합': 'hap', '니': 'ni', '다': 'da', '는': 'neun', '을': 'eul', '를': 'reul',
        '이': 'i', '가': 'ga', '에': 'e', '서': 'seo', '와': 'wa', '과': 'gwa', '또': 'tto',
        '네': 'ne', '아': 'a', '어': 'eo', '오': 'o', '우': 'u', '으': 'eu', '의': 'ui',
        
        // Numbers
        '하': 'ha', '나': 'na', '둘': 'dul', '셋': 'set', '넷': 'net', '다': 'da', '섯': 'seot',
        '여': 'yeo', '섯': 'seot', '일': 'il', '곱': 'gop', '여': 'yeo', '덟': 'deol',
        '아': 'a', '홉': 'hop', '열': 'yeol'
    },
    
    hindi: {
        // Devanagari script
        'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ii', 'उ': 'u', 'ऊ': 'uu', 'ए': 'e',
        'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'अं': 'am', 'अः': 'ah',
        'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
        'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
        'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
        'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
        'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
        'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va', 'श': 'sha',
        'ष': 'sha', 'स': 'sa', 'ह': 'ha', 'क्ष': 'ksha', 'त्र': 'tra', 'ज्ञ': 'gya',
        
        // Diacritics (matras)
        'ा': 'aa', 'ि': 'i', 'ी': 'ii', 'ु': 'u', 'ू': 'uu', 'े': 'e',
        'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'm', 'ः': 'h', '्': '',
        
        // Numbers
        '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5',
        '६': '6', '७': '7', '८': '8', '९': '9'
    },
    
    greek: {
        // Modern Greek alphabet
        'Α': 'A', 'Β': 'V', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'I',
        'Θ': 'Th', 'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N', 'Ξ': 'X',
        'Ο': 'O', 'Π': 'P', 'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y', 'Φ': 'F',
        'Χ': 'Ch', 'Ψ': 'Ps', 'Ω': 'O',
        'α': 'a', 'β': 'v', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'i',
        'θ': 'th', 'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'x',
        'ο': 'o', 'π': 'p', 'ρ': 'r', 'σ': 's', 'ς': 's', 'τ': 't', 'υ': 'y',
        'φ': 'f', 'χ': 'ch', 'ψ': 'ps', 'ω': 'o',
        
        // Diacritics
        'ά': 'a', 'έ': 'e', 'ή': 'i', 'ί': 'i', 'ό': 'o', 'ύ': 'y', 'ώ': 'o',
        'ΐ': 'i', 'ΰ': 'y', 'Ά': 'A', 'Έ': 'E', 'Ή': 'I', 'Ί': 'I', 'Ό': 'O',
        'Ύ': 'Y', 'Ώ': 'O'
    },
    
    hebrew: {
        // Hebrew alphabet
        'א': "'", 'ב': 'b', 'ג': 'g', 'ד': 'd', 'ה': 'h', 'ו': 'v', 'ז': 'z',
        'ח': 'ch', 'ט': 't', 'י': 'y', 'כ': 'k', 'ל': 'l', 'מ': 'm', 'ן': 'n',
        'נ': 'n', 'ס': 's', 'ע': "'", 'פ': 'p', 'ץ': 'ts', 'צ': 'ts', 'ק': 'q',
        'ר': 'r', 'ש': 'sh', 'ת': 't', 'ך': 'k', 'ם': 'm', 'ף': 'f',
        
        // Final forms
        'ך': 'kh', 'ם': 'm', 'ן': 'n', 'ף': 'f', 'ץ': 'ts',
        
        // Nikud (vowel points)
        'ַ': 'a', 'ָ': 'a', 'ֶ': 'e', 'ֵ': 'e', 'ִ': 'i', 'ֹ': 'o', 'ֻ': 'u',
        'ְ': '', 'ֲ': 'a', 'ֱ': 'e', 'ֳ': 'o', 'ּ': '', 'ׁ': '', 'ׂ': ''
    },
    
    thai: {
        // Thai consonants
        'ก': 'k', 'ข': 'kh', 'ค': 'kh', 'ง': 'ng', 'จ': 'j', 'ฉ': 'ch', 'ช': 'ch',
        'ซ': 's', 'ญ': 'y', 'ด': 'd', 'ต': 't', 'ถ': 'th', 'ท': 'th', 'ธ': 'th',
        'น': 'n', 'บ': 'b', 'ป': 'p', 'ผ': 'ph', 'ฝ': 'f', 'พ': 'ph', 'ฟ': 'f',
        'ภ': 'ph', 'ม': 'm', 'ย': 'y', 'ร': 'r', 'ล': 'l', 'ว': 'w', 'ศ': 's',
        'ษ': 's', 'ส': 's', 'ห': 'h', 'ฬ': 'l', 'อ': '', 'ฮ': 'h',
        
        // Thai vowels
        'ะ': 'a', 'า': 'aa', 'ิ': 'i', 'ี': 'ii', 'ึ': 'ue', 'ื': 'uue',
        'ุ': 'u', 'ู': 'uu', 'เ': 'e', 'แ': 'ae', 'โ': 'o', 'ใ': 'ai', 'ไ': 'ai',
        
        // Thai numbers
        '๐': '0', '๑': '1', '๒': '2', '๓': '3', '๔': '4', '๕': '5',
        '๖': '6', '๗': '7', '๘': '8', '๙': '9'
    }
};

function pureTransliterate(text, language) {
    const map = transliterationMaps[language];
    if (!map) return text;
    
    // Character-by-character transliteration
    return text.split('').map(char => {
        // Return transliterated character or original if no mapping
        return map[char] || char;
    }).join('');
}

function detectLanguage(text) {
    // Arabic script (Arabic, Persian, Urdu, etc.)
    if (/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text)) return 'arabic';
    
    // Cyrillic script (Russian, Bulgarian, Serbian, etc.)
    if (/[\u0400-\u04FF\u0500-\u052F\u2DE0-\u2DFF\uA640-\uA69F]/.test(text)) return 'russian';
    
    // Japanese scripts (Hiragana, Katakana, Kanji)
    if (/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(text)) return 'japanese';
    
    // Chinese script (Simplified and Traditional)
    if (/[\u4E00-\u9FFF\u3400-\u4DBF]/.test(text)) return 'chinese';
    
    // Korean script (Hangul)
    if (/[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/.test(text)) return 'korean';
    
    // Devanagari script (Hindi, Sanskrit, Nepali, etc.)
    if (/[\u0900-\u097F]/.test(text)) return 'hindi';
    
    // Greek script
    if (/[\u0370-\u03FF\u1F00-\u1FFF]/.test(text)) return 'greek';
    
    // Hebrew script
    if (/[\u0590-\u05FF\uFB1D-\uFB4F]/.test(text)) return 'hebrew';
    
    // Thai script
    if (/[\u0E00-\u0E7F]/.test(text)) return 'thai';
    
    return null;
}

function processTextNode(textNode) {
    const originalText = textNode.textContent.trim();
    if (originalText.length === 0) return;
    
    const language = detectLanguage(originalText);
    if (!language) return;
    
    const parent = textNode.parentElement;
    if (!parent || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') return;
    
    // Skip if already processed
    if (parent.dataset.transliterated) return;
    
    console.log(`🔤 Transliterating ${language}: "${originalText}"`);
    
    // Pure phonetic transliteration
    const transliteratedText = pureTransliterate(originalText, language);
    
    // Only proceed if text actually changed
    if (transliteratedText === originalText) {
        console.log(`⚠️ No transliteration needed for: "${originalText}"`);
        return;
    }
    
    // Replace the text content directly
    textNode.textContent = transliteratedText;
    
    // Mark as processed and add visual indicator
    parent.dataset.transliterated = 'true';
    parent.dataset.originalLanguage = language;
    parent.dataset.originalText = originalText;
    parent.style.backgroundColor = '#FFF3E0';
    parent.style.borderLeft = '4px solid #FF9800';
    parent.style.paddingLeft = '8px';
    parent.style.borderRadius = '2px';
    parent.style.fontStyle = 'italic';
    parent.title = `Transliterated from ${language.toUpperCase()}: "${originalText}" → "${transliteratedText}"`;
    
    console.log(`✅ Transliterated: "${originalText}" → "${transliteratedText}"`);
}

function scanAndTransliterate() {
    if (!document.body) {
        setTimeout(scanAndTransliterate, 100);
        return;
    }
    
    console.log('🔤 Scanning page for transliteration...');
    
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: (node) => {
                const parent = node.parentElement;
                if (!parent) return NodeFilter.FILTER_REJECT;
                if (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') return NodeFilter.FILTER_REJECT;
                if (parent.dataset.transliterated) return NodeFilter.FILTER_REJECT;
                if (node.textContent.trim().length === 0) return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );
    
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }
    
    let transliteratedCount = 0;
    textNodes.forEach(textNode => {
        const beforeText = textNode.textContent;
        processTextNode(textNode);
        if (textNode.parentElement && textNode.parentElement.dataset.transliterated) {
            transliteratedCount++;
        }
    });
    
    console.log(`✅ Transliteration complete. Processed ${transliteratedCount} text elements.`);
    
    // Add notification if any text was transliterated
    if (transliteratedCount > 0) {
        showTransliterationNotification(transliteratedCount);
    }
}

function showTransliterationNotification(count) {
    const notification = document.createElement('div');
    notification.innerHTML = `🔤 Transliteration: Converted ${count} text(s) to Latin script`;
    notification.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: linear-gradient(45deg, #FF9800, #F57C00);
        color: white;
        padding: 12px 18px;
        border-radius: 8px;
        z-index: 999999;
        font-size: 14px;
        font-family: Arial, sans-serif;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        font-weight: bold;
        border: 2px solid #E65100;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 4000);
}

// Start processing
console.log('🚀 Starting pure transliteration system...');

// Extension state management
let extensionEnabled = true;
let observer = null;

function initializeExtension() {
    if (extensionEnabled) {
        scanAndTransliterate();
        startObserver();
    }
}

function startObserver() {
    if (observer) {
        observer.disconnect();
    }
    
    observer = new MutationObserver((mutations) => {
        if (!extensionEnabled) return;
        
        let hasNewText = false;
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.TEXT_NODE || 
                        (node.nodeType === Node.ELEMENT_NODE && node.textContent.trim())) {
                        hasNewText = true;
                    }
                });
            }
        });
        
        if (hasNewText) {
            setTimeout(() => {
                if (extensionEnabled) {
                    scanAndTransliterate();
                }
            }, 100);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
}

function stopExtension() {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
    console.log('🛑 Extension stopped - Transliteration paused');
}

function startExtension() {
    extensionEnabled = true;
    initializeExtension();
    console.log('🟢 Extension started - Real-time transliteration active');
}

// Listen for messages from background/popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('📨 Content script received message:', request.action);
    
    switch (request.action) {
        case 'toggleTransliterator':
            extensionEnabled = request.enabled;
            if (extensionEnabled) {
                startExtension();
            } else {
                stopExtension();
            }
            sendResponse({ success: true, enabled: extensionEnabled });
            break;
            
        case 'getStatus':
            sendResponse({ enabled: extensionEnabled });
            break;
            
        case 'clearCache':
            // Remove all transliteration markers
            document.querySelectorAll('[data-transliterated]').forEach(element => {
                element.removeAttribute('data-transliterated');
                element.style.removeProperty('border-bottom');
                element.style.removeProperty('cursor');
            });
            console.log('🗑️ Cache cleared');
            sendResponse({ success: true });
            break;
            
        default:
            console.warn('⚠️ Unknown message action:', request.action);
    }
});

// Initialize extension
initializeExtension();
export const profileCreatedBy = ['Self', 'Parents', 'Sibling', 'Relative', 'Friend'];

export const maritalStatus = ['Unmarried', 'Widow / Widower', 'Divorced', 'Separated'];

export const gender = ['Male', 'Female'];

export const physicalStatus = ['Normal', 'Physically challenged'];

const getHeights = () => {
	const _heights = [];
	for (let i = 3; i < 8; i++) {
		for (let j = 0; j < 11; j++) {
			_heights.push(`${i} feet ${j ? j + ' inches' : ''}`);
		}
	}
	return _heights;
};

export const heights = getHeights();

export const denominations = [
	'Adventist',
	'Anglican / Episcopal',
	'Apostolic',
	'Assyrian',
	'Assembly of God (AG)',
	'Baptist',
	'Born Again',
	'Brethren',
	'Calvinist',
	'Catholic',
	'Church of God',
	'Church of South India (CSI)',
	'Church of Christ',
	'Church of North India',
	'Congregational',
	'East Indian Catholic',
	'Evangelical',
	'Knanaya',
	'Knanaya Catholic',
	'Knanaya Jacobite',
	'Jacobite',
	"Jehovah's Witnesses",
	'Latin Catholic',
	'Latter day saints',
	'Lutheran',
	'Malankara',
	'Malabar Independent Syrian Church',
	'Marthoma',
	'Melkite',
	'Mennonite',
	'Methodist',
	'Moravian',
	'Orthodox',
	'Pentecostal',
	'Protestant',
	'Presbyterian',
	'Reformed Baptist',
	'Reformed Presbyterian',
	'Seventh-day Adventist',
	'St. Thomas Evangelical',
	'Syro Malabar',
	'Syrian Catholic',
	'Syrian Jacobite',
	'Syrian Orthodox',
	'Others'
];

export const divisions = [
	"Don't know division",
	"Don't wish to specify",
	'Adi Dravidar',
	'Anglo Indian',
	'Chettiar',
	'Garo',
	'Goan',
	'Gounder',
	'Kamma',
	'Kapu',
	'Khasi',
	'Knanaya',
	'Kuki',
	'Madiga',
	'Mahar',
	'Mala',
	'Mangalorean',
	'Matang',
	'Mizo',
	'Mudaliar',
	'Mukkuvar',
	'Nadar',
	'Naga',
	'Naidu',
	'Oraon / Kurukh',
	'Padmashali',
	'Pallar / Devendrakula Vellalar',
	'Paravar / Bharathar / Fernando',
	'Parkavakulam / Udayar',
	'Pillai',
	'Pulayar / Cherumar',
	'Rajaka / Vannar',
	'Reddy',
	'Sambavar',
	'SC',
	'Setti Balija',
	'ST',
	'Thevar / Mukkulathor',
	'Vaniya Chettiar',
	'Vanniya Kula Kshatriyar',
	'Vellalar',
	'Vishwakarma',
	'Yadavar',
	'Intercaste',
	'Others'
];

export const languages = [
	'Assamese',
	'Bengali',
	'English',
	'Gujarati',
	'Hindi',
	'Kannada',
	'Konkani',
	'Malayalam',
	'Marathi',
	'Marwari',
	'Odiya',
	'Punjabi',
	'Sindhi',
	'Tamil',
	'Telugu',
	'Urdu',
	'Angika',
	'Arunachali',
	'Awadhi',
	'Badaga',
	'Bhojpuri',
	'Bihari',
	'Brij',
	'Chatisgarhi',
	'Dogri',
	'French',
	'Garhwali',
	'Garo',
	'Haryanvi',
	'Himachali/Pahari',
	'Kanauji',
	'Kashmiri',
	'Khandesi',
	'Khasi',
	'Koshali',
	'Kumoani',
	'Kutchi',
	'Ladacki',
	'Lepcha',
	'Magahi',
	'Maithili',
	'Manipuri',
	'Miji',
	'Monpa',
	'Nepali',
	'Nicobarese',
	'Rajasthani',
	'Sanskrit',
	'Santhali',
	'Sourashtra',
	'Tripuri',
	'Tulu'
];

export const eatingHabits = ['Vegetarian', 'Non-vegetarian', 'Eggetarian', 'Vegan'];

export const smokingHabits = ['Non-smoker', 'Light / Social smoker', 'Regular smoker'];

export const drinkingHabits = ['Non-drinker', 'Light / Social drinker', 'Regular drinker'];

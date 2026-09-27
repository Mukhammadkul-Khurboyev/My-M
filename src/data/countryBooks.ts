import { Book, AuthorProfile } from '../types/book';

export const COUNTRY_BOOKS_MAP: Record<string, { books: Book[]; authors: AuthorProfile[] }> = {
  UZB: {
    authors: [
      {
        nameUz: "Abdulla Qodiriy",
        years: "1894 – 1938",
        bioUz: "O'zbek romanchiligining asoschisi, buyuk jadid adibi va ma'rifatparvari. Uning qalamiga mansub 'O'tkan kunlar' va 'Mehrobdan chayon' romanlari o'zbek milliy nasrining cho'qqisi hisoblanadi.",
        notableAwards: ["Alisher Navoiy nomidagi Davlat mukofoti", "Mustaqillik ordeni"]
      },
      {
        nameUz: "Zahiriddin Muhammad Bobur",
        years: "1483 – 1530",
        bioUz: "Temuriy shahzoda, Boburiylar imperiyasi asoschisi, buyuk shoir va davlat arbobi. Uning 'Boburnoma' asari jahon memuar adabiyotining tengsiz durdonasidir.",
        notableAwards: ["Jahon adabiyoti xazinasi durdonasi"]
      },
      {
        nameUz: "Oybek (Muso Toshmuhammad o'g'li)",
        years: "1905 – 1968",
        bioUz: "O'zbekiston xalq yozuvchisi, akademik. 'Navoiy' va 'Qutlug' qon' romanlari muallifi, Alisher Navoiy shaxsini badiiy kashf etgan atoqli adib.",
        notableAwards: ["Hamza nomidagi Davlat mukofoti"]
      },
      {
        nameUz: "O'tkir Hoshimov",
        years: "1941 – 2013",
        bioUz: "O'zbekiston xalq yozuvchisi. Inson ruhiyatining nozik qirralari, ona mehri va vijdon masalalarini qalamga olgan sevimli adib.",
        notableAwards: ["O'zbekiston Davlat mukofoti", "Mehnat shuhrati ordeni"]
      }
    ],
    books: [
      {
        id: "uzb-otkan-kunlar",
        titleUz: "O'tkan kunlar",
        titleOriginal: "O'tkan kunlar",
        authorUz: "Abdulla Qodiriy",
        authorEn: "Abdulla Qadiri",
        publicationYear: 1925,
        genreUz: "Tarixiy-ijtimoiy roman",
        pagesCount: 384,
        coverImage: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)",
        rating: 5.0,
        synopsisUz: "O'zbek adabiyotidagi ilk roman bo'lib, XIX asr o'rtalaridagi Qo'qon xonligi davridagi murakkab ijtimoiy-siyosiy muhit, xalq hayoti hamda Otabek va Kumushbibining pokiza, fojiali muhabbati tasvirlangan. Asar milliy o'zlik, millat birligi va jaholatga qarshi ma'rifat g'oyalari bilan sug'orilgan.",
        famousQuoteUz: "Moziyga qaytib ish ko'rish xayrlidir, deydilar. Shuningdek, o'tkan kunlarni ko'zdan kechirish ham har bir millat uchun ibratlidir...",
        literarySignificanceUz: "O'zbek milliy romanchiligiga poydevor qo'ygan, o'zbek adabiy tilining badiiy imkoniyatlarini butun go'zalligi bilan namoyon etgan shoh asar.",
        excerptUz: "1264-nchi hijriy, dalv oyining 17-nchisi, qishki kunlarning biri. Toshkentning 'Sarbon' karvonsaroyiga Marg'ilondan bir yosh yigit tushdi. Usti-boshi sayohat changi bilan qoplangan bo'lsa ham, qaddi-qomatining kelishganligi, qosh-ko'zining qoraligi va kiyinishidagi sarishtalik uning asilzoda bir xonadonga mansub ekanini yaqqol ko'rsatib turar edi. Bu yigit — Otabek edi..."
      },
      {
        id: "uzb-mehrobdan-chayon",
        titleUz: "Mehrobdan chayon",
        titleOriginal: "Mehrobdan chayon",
        authorUz: "Abdulla Qodiriy",
        authorEn: "Abdulla Qadiri",
        publicationYear: 1928,
        genreUz: "Tarixiy roman",
        pagesCount: 320,
        coverImage: "linear-gradient(135deg, #831843 0%, #312e81 100%)",
        rating: 4.9,
        synopsisUz: "Qo'qon xoni Xudoyorxon davridagi saroy fitnalari, poraxo'rlik va ikkiyuzlamachilikka qarshi kurashgan mard yoshlar — Anvar va Ra'noning fidokorona sevgisi hikoya qilinadi. Qodiriy mehrob — din peshvolari va xon saroyi ichidagi 'chayon' — razolat va xiyonatni fosh etadi.",
        famousQuoteUz: "Adolat yo'q yurtda saroylar qanchalik baland qurilmasin, u poydevorsiz imorat kabi bir kun qulagusi muqarrardir.",
        literarySignificanceUz: "Adibning ikkinchi yirik romani bo'lib, shaxs erki, sadoqat va adolat g'oyalarining yuksak badiiy talqinidir.",
        excerptUz: "Mirzo Anvar saroy mirzoligi lavozimida xizmat qilsa-da, yuragi hamisha xalq bilan birga edi. U o'zining pok niyati, halolligi bilan ko'plab amaldorlarning hasadiga uchradi. Ra'noning xon haramiga olinishi xabari esa uning hayotini ostin-ustun qilib yubordi..."
      },
      {
        id: "uzb-boburnoma",
        titleUz: "Boburnoma",
        titleOriginal: "Vaqoe (Boburnoma)",
        authorUz: "Zahiriddin Muhammad Bobur",
        authorEn: "Zahir al-Din Muhammad Babur",
        publicationYear: 1530,
        genreUz: "Tarixiy-memuar qomus",
        pagesCount: 560,
        coverImage: "linear-gradient(135deg, #78350f 0%, #451a03 100%)",
        rating: 5.0,
        synopsisUz: "Bobur Mirzoning Farg'ona vodiysidagi bolalik yillari, Samarqand uchun qonli janglar, Kobulni zabt etishi va Hindistonda qudratli Boburiylar davlatiga asos solishigacha bo'lgan sarguzashtlarga to'la hayoti. Kitob O'rta Osiyo, Afg'oniston va Hindistonning tabiati, xalqlari, madaniyati va o'sha davr siyosatini aniq ilmiy nigoh bilan yoritadi.",
        famousQuoteUz: "Tole' yo'qi jonimga balolig' bo'ldi, Har ishnikim ayladim, xatolig' bo'ldi. O'z erni qo'yib, Hind sori yuzlandim, Yo Rab, netayin, ne yuz qarolig' bo'ldi...",
        literarySignificanceUz: "Jahonning o'nlab tillariga tarjima qilingan, jahon memuar adabiyotining eng yorqin namunasi sanaladi.",
        excerptUz: "Sakkiz yuz to'qson to'qqizinchi yili ramazon oyida o'n ikki yoshimda Farg'ona viloyatida podshoh bo'ldim. Farg'ona viloyati beshinchi iqlimdandir. To'rt tarafi tog'lar bilan o'ralgan, g'arbi Xo'jand daryosidir. Oq suvlari ko'p, mevasi mo'l, ayniqsa qovun va anori juda mashhurdir..."
      },
      {
        id: "uzb-yulduzli-tunlar",
        titleUz: "Yulduzli tunlar (Bobur)",
        titleOriginal: "Yulduzli tunlar",
        authorUz: "Pirimqul Qodirov",
        authorEn: "Pirimqul Qodirov",
        publicationYear: 1978,
        genreUz: "Tarixiy epopeya",
        pagesCount: 544,
        coverImage: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)",
        rating: 4.9,
        synopsisUz: "Temuriy shahzoda Zahiriddin Muhammad Boburning murakkab qismati, vatanni tark etish fojiasi va Hindistonda yangi qudratli saltanat barpo etish yo'lidagi kurashlari tasvirlangan tengsiz roman. Boburning shoh va shoir sifatidagi ichki iztiroblari chuqur psixologik mahorat bilan ochib beriladi.",
        famousQuoteUz: "Yulduzlar qanchalik yorug' bo'lmasin, ularning barchasi qorong'u tun bag'rida charaqlaydi...",
        literarySignificanceUz: "O'zbek tarixiy nasrining eng o'qimishli, qalbni larzaga soluvchi asarlaridan biri.",
        excerptUz: "Andijon qal'asi ustida porlayotgan yulduzlar go'yo yosh Boburning yelkasiga tushayotgan ulkan mas'uliyatni eslatib turardi. Otasi Umarshayx Mirzoning kutilmagan vafotidan so'ng taxtga o'tirgan o'n ikki yoshli o'spirin oldida butun Turkiston xalqi taqdiri turardi..."
      },
      {
        id: "uzb-navoiy",
        titleUz: "Navoiy",
        titleOriginal: "Navoiy",
        authorUz: "Oybek",
        authorEn: "Oybek",
        publicationYear: 1944,
        genreUz: "Biografik-tarixiy roman",
        pagesCount: 416,
        coverImage: "linear-gradient(135deg, #134e4a 0%, #042f2e 100%)",
        rating: 4.8,
        synopsisUz: "XV asr Xuroson va Hirot muhiti, Husayn Boyqaro saltanati va buyuk mutafakkir Alisher Navoiyning xalqparvarlik faoliyati, ijodiy dahosi va saroydagi fitnalarga qarshi kurashi aks ettirilgan.",
        famousQuoteUz: "Naf'ing agar xalqqa beshakdurur, Bilki, bu naf' o'zingga ko'prakdurur...",
        literarySignificanceUz: "Alisher Navoiy hayoti va davrini eng mukammal badiiy tahlil qilgan tarixiy roman.",
        excerptUz: "Hirot ustida erta tong quyoshi o'zining oltin nurlarini sochmoqda edi. Alisher Navoiy bog'ida o'tirib, 'Xamsa' dostonining so'nggi sahifalarini ko'zdan kechirar, ko'nglida xalq osoyishtaligi va madaniyat gullab-yashnashi haqidagi ulug'vor o'ylar charx urardi..."
      },
      {
        id: "uzb-dunyoning-ishlari",
        titleUz: "Dunyoning ishlari",
        titleOriginal: "Dunyoning ishlari",
        authorUz: "O'tkir Hoshimov",
        authorEn: "Utkir Khoshimov",
        publicationYear: 1982,
        genreUz: "Qissalar to'plami / Lirik nasr",
        pagesCount: 288,
        coverImage: "linear-gradient(135deg, #701a75 0%, #4a044e 100%)",
        rating: 5.0,
        synopsisUz: "Ona siymosi, mehri va cheksiz fidoyiligiga bag'ishlangan, inson qalbining eng nozik torlarini chertuvchi lirik qissalar to'plami. Har bir o'zbek kitobxoni sevib mutolaa qiladigan samimiy asar.",
        famousQuoteUz: "Dunyodagi barcha onalar bir-biriga o'xshaydi: ularning barchasi o'z farzandi uchun jonini fido qilishga tayyor...",
        literarySignificanceUz: "O'zbek lirik nasrining durdonasi, ona qalbining madhiyasi.",
        excerptUz: "Onam oddiy ayol edi. O'qimagan, ammo dunyodagi barcha donishmandlardan aqlliroq edi. U kishi gapirganda ko'zlaridan mehr yog'ilib turar, uning non yopishlari, hovli supurishlari va bizni duo qilishlarida butun olamning siri yashiringandek edi..."
      }
    ]
  },
  RUS: {
    authors: [
      {
        nameUz: "Lev Tolstoy",
        years: "1828 – 1910",
        bioUz: "Jahon adabiyotining ulug' dahosi, 'Urush va Tinchlik', 'Anna Karenina' kabi monumental asarlar muallifi.",
        notableAwards: ["Nobel mukofotiga bir necha bor nomzod"]
      },
      {
        nameUz: "Fyodor Dostoyevskiy",
        years: "1821 – 1881",
        bioUz: "Inson psixologiyasi va qalb iztiroblarining tengsiz tadqiqotchisi, 'Jinoyat va Jazo', 'Aka-uka Karamazovlar' muallifi.",
        notableAwards: ["Jahon psixologik romanchiligi cho'qqisi"]
      },
      {
        nameUz: "Mixail Bulgakov",
        years: "1891 – 1940",
        bioUz: "Tasavvuf, satira va chuqur falsafani uyg'unlashtirgan buyuk yozuvchi, 'Usta va Margarita' asari muallifi.",
        notableAwards: ["Jahon mumtoz adabiyoti"]
      }
    ],
    books: [
      {
        id: "rus-urush-va-tinchlik",
        titleUz: "Urush va Tinchlik",
        titleOriginal: "Война и мир",
        authorUz: "Lev Tolstoy",
        authorEn: "Leo Tolstoy",
        publicationYear: 1869,
        genreUz: "Epopeya-roman",
        pagesCount: 1225,
        coverImage: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        rating: 5.0,
        synopsisUz: "1812 yilgi Napoleon urushlari fonida Rossiya jamiyati, aristokratiyasi, Pyer Bezuxov, Andrey Bolkonskiy va Natasha Rostova taqdirlari, xalq ruhi va insoniyat falsafasi mujassamlashgan jahon adabiyotidagi eng buyuk epik roman.",
        famousQuoteUz: "Hamma insoniyatni o'zgartirishni o'ylaydi, ammo hech kim o'zini o'zgartirish haqida o'ylamaydi.",
        literarySignificanceUz: "Jahon adabiyoti tarixidagi eng monumental epopeya.",
        excerptUz: "1805 yil iyul oyi. Peterburg saroyining eng mashhur xonimlaridan biri Anna Pavlovna Sherer uyida kechki ziyofat bermoqda edi. Mehmonlar orasida Napoleonning Yevropadagi yurishlari va yaqinlashayotgan urush haqidagi xavotirli gap-so'zlar aylanar edi..."
      },
      {
        id: "rus-jinoyat-va-jazo",
        titleUz: "Jinoyat va Jazo",
        titleOriginal: "Преступление и наказание",
        authorUz: "Fyodor Dostoyevskiy",
        authorEn: "Fyodor Dostoevsky",
        publicationYear: 1866,
        genreUz: "Psixologik-falsafiy roman",
        pagesCount: 576,
        coverImage: "linear-gradient(135deg, #450a0a 0%, #1c1917 100%)",
        rating: 5.0,
        synopsisUz: "Qashshoq talaba Rodion Raskolnikovning o'zini 'favqulodda shaxs' deb hisoblab, sudxo'r kampirni o'ldirishi va shundan keyin boshlanadigan qalb azoblari, vijdon so'roqlari hamda ruhiy najot topishi haqidagi tengsiz durdona.",
        famousQuoteUz: "Go'zallik dunyoni qutqaradi. Qalb poklanishi esa faqat iztiroblar orqali keladi.",
        literarySignificanceUz: "Psixologik realizm va inson ruhiyatini tadqiq etishda jahon adabiyotining cho'qqisi.",
        excerptUz: "Iyul oyining jazirama kunlaridan birida, kechki payt, o'zining tor xonasidan chiqqan yosh yigit ko'chaga qarab sekin yo'l oldi. Uning vujudida g'ayritabiiy hayajon va qo'rquv bor edi. Cho'ntagida qattiq qisilgan bolta turardi..."
      },
      {
        id: "rus-usta-va-margarita",
        titleUz: "Usta va Margarita",
        titleOriginal: "Мастер и Маргарита",
        authorUz: "Mixail Bulgakov",
        authorEn: "Mikhail Bulgakov",
        publicationYear: 1967,
        genreUz: "Tasavvufiy-falsafiy roman",
        pagesCount: 480,
        coverImage: "linear-gradient(135deg, #2e1065 0%, #09090b 100%)",
        rating: 4.9,
        synopsisUz: "Moskvaga shayton — Voland va uning g'aroyib mulozimlarining tashrifi, Usta va Margaritaning cheksiz sadoqatli muhabbati hamda qadimgi Yershalaimda Pontiy Pilat va Iyeshua Ga-Notsri muloqotlari uyg'unlashgan ko'p qatlamli shoh asar.",
        famousQuoteUz: "Qo'lyozmalar yonmaydi! Sevgi esa hatto o'limdan ham kuchlidir.",
        literarySignificanceUz: "XX asr jahon nasrining eng mistik va o'qimishli romani.",
        excerptUz: "Moskvada, Patriarx ko'llari bo'yida ikki fuqaro — Mixail Aleksandrovich Berlioz va shoir Ivan Bezdomniy bahslashib o'tirishar edi. To'satdan ularning oldida g'alati kiyingan chet ellik professor paydo bo'ldi..."
      }
    ]
  },
  GBR: {
    authors: [
      {
        nameUz: "George Orwell (Eric Arthur Blair)",
        years: "1903 – 1950",
        bioUz: "Ingliz publitsisti va yozuvchisi, totalitarizm va erkinlik masalalarini chuqur yoritgan '1984' va 'Molxona' asarlari muallifi.",
        notableAwards: ["XX asrning eng ta'sirli siyosiy yozuvchisi"]
      },
      {
        nameUz: "Arthur Conan Doyle",
        years: "1859 – 1930",
        bioUz: "Mashhur xufiya detektiv Sherlok Xolms va doktor Vatson personajlari orqali jahon detektiv adabiyotini yangi bosqichga olib chiqqan adib.",
        notableAwards: ["Ritsarlik unvoni egasi"]
      },
      {
        nameUz: "William Shakespeare",
        years: "1564 – 1616",
        bioUz: "Ingliz dramaturgiyasining quyoshi, 'Gamlet', 'Otello', 'Romeo va Julietta' kabi o'lmas dramalar muallifi.",
        notableAwards: ["Jahon adabiyotining buyuk dramaturgi"]
      }
    ],
    books: [
      {
        id: "gbr-1984",
        titleUz: "1984",
        titleOriginal: "Nineteen Eighty-Four",
        authorUz: "George Orwell",
        authorEn: "George Orwell",
        publicationYear: 1949,
        genreUz: "Antiutopik roman",
        pagesCount: 328,
        coverImage: "linear-gradient(135deg, #09090b 0%, #27272a 100%)",
        rating: 5.0,
        synopsisUz: "Totalitar boshqaruv, fikrlash erkinligining yo'q qilinishi, 'Katta Og'a' (Big Brother) nazorati ostidagi dunyo va shaxs erkini saqlab qolishga uringan Uinston Smitning fojiali kurashi.",
        famousQuoteUz: "Urush — bu tinchlik. Erkinlik — bu qullik. Bilimsizlik — bu kuchdir. Katta Og'a seni kuzatmoqda!",
        literarySignificanceUz: "Zamonaviy dunyoda eng ko'p iqtibos keltiriladigan, ogohlantiruvchi antiutopik asar.",
        excerptUz: "Aprel oyining sovuq va musaffo kuni edi, soatlar esa o'n uch marta bong urdi. Uinston Smit bo'rondan qochib, 'G'alaba' uylarining shisha eshigidan ichkariga shoshildi..."
      },
      {
        id: "gbr-sherlok-xolms",
        titleUz: "Sherlok Xolms Sarguzashtlari",
        titleOriginal: "The Adventures of Sherlock Holmes",
        authorUz: "Arthur Conan Doyle",
        authorEn: "Arthur Conan Doyle",
        publicationYear: 1892,
        genreUz: "Klassik detektiv",
        pagesCount: 360,
        coverImage: "linear-gradient(135deg, #1c1917 0%, #292524 100%)",
        rating: 4.9,
        synopsisUz: "Baker Street 221B manzilida yashovchi tengsiz deduksiya ustasi Sherlok Xolms va uning sadoqatli do'sti doktor Vatson tomonidan yechilgan eng sirli va xavfli jinoyatlar silsilasi.",
        famousQuoteUz: "Barcha imkonsiz variantlarni chiqarib tashlaganingizda, qolgan yagona variant qanchalik haqiqatga to'g'ri kelmasin, aynan u haqiqat bo'lib chiqadi.",
        literarySignificanceUz: "Klassik detektiv janrining eng sevimli etaloni.",
        excerptUz: "Sherlok Xolms uchun u doimo 'O'sha Ayol' bo'lib qolaveradi. Men uning bu ayol haqida boshqa biron nom bilan gapirganini kam eshitganman..."
      },
      {
        id: "gbr-gamlet",
        titleUz: "Gamlet",
        titleOriginal: "The Tragedy of Hamlet, Prince of Denmark",
        authorUz: "William Shakespeare",
        authorEn: "William Shakespeare",
        publicationYear: 1603,
        genreUz: "Tragediya",
        pagesCount: 220,
        coverImage: "linear-gradient(135deg, #3b0764 0%, #1e1b4b 100%)",
        rating: 5.0,
        synopsisUz: "Daniya shahzodasi Gamletning otasining xiyonatkorona qotilligi uchun intiqom olishi, shubha, vafodorlik, aqldan ozish va inson vujudining fojialari haqidagi o'lmas pyesa.",
        famousQuoteUz: "Bo'lmoq yo bo'lmaslik — mana masala! Qaysi biri qalb uchun sharafliroq: bedod falakning tosh-u paykonlariga chidamoqmi yoki isyon ko'tarmoqmi?",
        literarySignificanceUz: "Jahon teatr san'atining shoh asari.",
        excerptUz: "Elsinor qal'asi devorlari uzra sovuq tun cho'kkan. Qorovullar tunda g'alati arvoh — marhum qirol sharpasini ko'rganliklarini aytib, shahzoda Gamletni chaqirishga qaror qilishdi..."
      }
    ]
  },
  FRA: {
    authors: [
      {
        nameUz: "Alexandre Dumas (Dyuma)",
        years: "1802 – 1870",
        bioUz: "Fransuz sarguzasht adabiyotining otasi, 'Graf Monte-Kristo' va 'Uch mushketyor' romanlari orqali butun dunyoni maftun etgan adib.",
        notableAwards: ["Fransiya milliy faxriy legioni"]
      },
      {
        nameUz: "Victor Hugo (Viktor Gyugo)",
        years: "1802 – 1885",
        bioUz: "Buyuk gumanist yozuvchi, 'Xo'rlanganlar' va 'Parij Bibi Maryam ibodatxonasi' epik romanlari muallifi.",
        notableAwards: ["Fransuz adabiyotining piri"]
      },
      {
        nameUz: "Antoine de Saint-Exupéry",
        years: "1900 – 1944",
        bioUz: "Uchuvchi va faylasuf yozuvchi, 'Kichik Shahzoda' qissasi orqali insonparvarlikning eng sof ramzini yaratgan.",
        notableAwards: ["Fransiya Akademiyasi Katta mukofoti"]
      }
    ],
    books: [
      {
        id: "fra-graf-monte-kristo",
        titleUz: "Graf Monte-Kristo",
        titleOriginal: "Le Comte de Monte-Cristo",
        authorUz: "Alexandre Dumas",
        authorEn: "Alexandre Dumas",
        publicationYear: 1844,
        genreUz: "Sarguzasht-tarixiy roman",
        pagesCount: 1100,
        coverImage: "linear-gradient(135deg, #1e1b4b 0%, #0369a1 100%)",
        rating: 5.0,
        synopsisUz: "Begunoh bo'la turib If qal'asiga 14 yil qamalgan dengizchi Edmon Dantesning zindondan qochishi, xazina topib 'Graf Monte-Kristo' sifatida o'ziga xiyonat qilgan xoinlardan adolatli o'ch olishi haqidagi unutilmas asar.",
        famousQuoteUz: "Insoniy donolikning bari mana shu ikki so'zda mujassam: Kutmoq va Umid qilmoq!",
        literarySignificanceUz: "Jahon sarguzasht nasrining eng ko'p o'qiladigan va ekranlashtirilgan durdonasi.",
        excerptUz: "1815 yil 24 fevral kuni Notr-Dam-de-la-Gard qorovul minorasi uch ustunli 'Fir'avn' kemasining Marsel bandargohiga kirib kelayotganini xabar qildi. Kema boshqaruvida yosh va iste'dodli Edmon Dantes turardi..."
      },
      {
        id: "fra-kichik-shahzoda",
        titleUz: "Kichik Shahzoda",
        titleOriginal: "Le Petit Prince",
        authorUz: "Antoine de Saint-Exupéry",
        authorEn: "Antoine de Saint-Exupery",
        publicationYear: 1943,
        genreUz: "Falsafiy ertak-qissa",
        pagesCount: 112,
        coverImage: "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)",
        rating: 5.0,
        synopsisUz: "Saxroi Kabirga qulagan uchuvchining B-612 mitti asteroididan sayohatga chiqqan Kichik Shahzoda bilan uchrashuvi. Asar orqali do'stlik, mehr, mas'uliyat va bolalikning beg'uborligi falsafasi tarannum etiladi.",
        famousQuoteUz: "Faqat qalb bilangina aniq ko'rish mumkin. Eng asosiy narsalar ko'zga ko'rinmaydi. Sen o'zing o'rgatgan narsalar uchun doim mas'ulsan!",
        literarySignificanceUz: "Dunyodagi eng ko'p tillarga (500 dan ortiq) tarjima qilingan durdona asar.",
        excerptUz: "Olti yoshimda bir kuni ajoyib kitobda ibtidoiy o'rmonlar haqidagi rasmni ko'rib qoldim. Unda yirtqich hayvonni butunicha yutayotgan bahaybat bo'g'ma ilon tasvirlangan edi..."
      },
      {
        id: "fra-xorlanganlar",
        titleUz: "Xo'rlanganlar (Les Misérables)",
        titleOriginal: "Les Misérables",
        authorUz: "Victor Hugo",
        authorEn: "Victor Hugo",
        publicationYear: 1862,
        genreUz: "Ijtimoiy epopeya",
        pagesCount: 1400,
        coverImage: "linear-gradient(135deg, #374151 0%, #111827 100%)",
        rating: 5.0,
        synopsisUz: "Bir burda non o'g'irlagani uchun 19 yil katorgada azob chekkan Jan Valjan, uning poklanishi, begunoh qizaloq Kozettani tarbiyalashi hamda qonun himoyachisi Javerning murosasiz ta'qibi haqidagi buyuk insoniylik manifesti.",
        famousQuoteUz: "Qorong'ulikni faqat yorug'lik, nafratni esa faqat sevgi yenga oladi.",
        literarySignificanceUz: "Fransuz adabiyotining eng yuksak insonparvarlik yodgorligi.",
        excerptUz: "1815 yilda Jan Valjan Diny shahriga kirib keldi. Uning qo'lida sariq pasport bor edi — bu uning sobiq mahbus ekanligini bildirardi. Hech qaysi mehmonxona uni qabul qilmadi, faqat saxiy yepiskop Miriel unga o'z eshigini ochdi..."
      }
    ]
  },
  USA: {
    authors: [
      {
        nameUz: "Ernest Hemingway",
        years: "1899 – 1961",
        bioUz: "Nobel va Pulitser mukofotlari sovrindori, ixcham va qudratli 'Aysberg' nasriy uslubi asoschisi.",
        notableAwards: ["Nobel mukofoti (1954)", "Pulitser mukofoti (1953)"]
      },
      {
        nameUz: "F. Scott Fitzgerald",
        years: "1896 – 1940",
        bioUz: "'Jaz davri' (Jazz Age) kuychisi, 'Buyuk Getsbi' kabi Amerika orzusining yaltiroq va fojiali tomonlarini ochib bergan adib.",
        notableAwards: ["Amerika mumtoz nasri yetakchisi"]
      },
      {
        nameUz: "Harper Lee",
        years: "1926 – 2016",
        bioUz: "'Mazaxchini o'ldirish' romani bilan irqiy tengsizlik va insoniy vijdonni eng ta'sirli ifodalagan amerikalik yozuvchi ayol.",
        notableAwards: ["Pulitser mukofoti (1961)", "Prezident Ozodlik medali"]
      }
    ],
    books: [
      {
        id: "usa-chol-va-dengiz",
        titleUz: "Chol va Dengiz",
        titleOriginal: "The Old Man and the Sea",
        authorUz: "Ernest Hemingway",
        authorEn: "Ernest Hemingway",
        publicationYear: 1952,
        genreUz: "Qissa / Qahramonlik balladasi",
        pagesCount: 128,
        coverImage: "linear-gradient(135deg, #0284c7 0%, #082f49 100%)",
        rating: 5.0,
        synopsisUz: "Qari kubalik baliqchi Santyagoning 84 kunlik omadsizlikdan so'ng ochiq dengizda bahaybat marlin balig'i va akulalarga qarshi mardonavor, yakka kurashi. Inson irodasining yengilmasligi haqidagi afsonaviy madhiya.",
        famousQuoteUz: "Inson yengilish uchun yaratilmagan. Insonni yo'q qilish mumkin, ammo uni mag'lub etib bo'lmaydi!",
        literarySignificanceUz: "Hemingwayga Nobel mukofotini keltirgan shoh asar.",
        excerptUz: "U Golfstrim oqimida yolg'iz o'zi qayiqda baliq ovlayotgan qari chol edi va mana sakson to'rt kundan beri bitta ham baliq tutolmagandi. Uning ko'zlaridan tashqari hamma a'zosi qarigan edi; uning ko'zlari esa dengiz kabi moviy, quvnoq va yengilmas edi..."
      },
      {
        id: "usa-buyuk-getsbi",
        titleUz: "Buyuk Getsbi",
        titleOriginal: "The Great Gatsby",
        authorUz: "F. Scott Fitzgerald",
        authorEn: "F. Scott Fitzgerald",
        publicationYear: 1925,
        genreUz: "Lirik-psixologik roman",
        pagesCount: 208,
        coverImage: "linear-gradient(135deg, #d97706 0%, #451a03 100%)",
        rating: 4.8,
        synopsisUz: "1920-yillardagi Nyu-York, hashamatli kechalar, afsonaviy boy Jey Getsbining o'zining yagona sevgilisi Deyzi Byukenen uchun tikkan hayoti va 'Amerika orzusi'ning ichki bo'shlig'i fojiasi.",
        famousQuoteUz: "Getsbi uning qalbida porlagan yashil chiroqqa, kelajakning baxtli tonglariga ishondi...",
        literarySignificanceUz: "XX asr Amerika adabiyotining eng nafis marvaridi.",
        excerptUz: "Yoshroq va tajribasizroq bo'lgan kezlarda otam menga bir maslahat bergan edi: 'Birovni tanqid qilmoqchi bo'lsang, dunyodagi hamma ham sen kabi qulay sharoitda tug'ilmaganini esda tut'..."
      },
      {
        id: "usa-mazaxchini-oldirish",
        titleUz: "Mazaxchini o'ldirish",
        titleOriginal: "To Kill a Mockingbird",
        authorUz: "Harper Lee",
        authorEn: "Harper Lee",
        publicationYear: 1960,
        genreUz: "Ijtimoiy-tarbiyaviy roman",
        pagesCount: 384,
        coverImage: "linear-gradient(135deg, #15803d 0%, #14532d 100%)",
        rating: 4.9,
        synopsisUz: "Amerikaning janubiy qismidagi adolatsiz ayblovga uchragan begunoh qora tanli yigitni himoya qilgan mard advokat Attikus Finch va uning bolalari ko'zi bilan ko'rilgan adolat va mehr hikoyasi.",
        famousQuoteUz: "Mazaxchi qushlar hech narsani buzmaydi, faqat odamlar uchun chiroyli qo'shiq aytadi. Shuning uchun mazaxchini o'ldirish gunohdir.",
        literarySignificanceUz: "Insoniylik, vijdon va bolalar nigohidagi tenglik haqidagi qadriyat asari.",
        excerptUz: "Attikus bizga dedi: 'Ov qilsangiz qarg'alarni oting, lekin unutmang, mazaxchi qushni o'ldirish — katta gunohdir'. Chunki ular bog'larni buzmaydi, shunchaki o'z qo'shig'i bilan olamni xushnud etadi..."
      }
    ]
  },
  TUR: {
    authors: [
      {
        nameUz: "Orhan Pamuk",
        years: "1952 – hozirgacha",
        bioUz: "Nobel mukofoti sohibi (2006), Sharq va G'arb madaniyatlari to'qnashuvini mahorat bilan tasvirlagan buyuk turk adibi.",
        notableAwards: ["Nobel mukofoti (2006)"]
      },
      {
        nameUz: "Reshat Nuri Guntekin",
        years: "1889 – 1956",
        bioUz: "Turk realizmining buyuk namoyondasi, 'Choliqushi' romani orqali butun dunyoda millionlab qalblarni zabt etgan.",
        notableAwards: ["Turkiya xalq maorifi arbobi"]
      }
    ],
    books: [
      {
        id: "tur-choliqushi",
        titleUz: "Choliqushi (Çalıkuşu)",
        titleOriginal: "Çalıkuşu",
        authorUz: "Reshat Nuri Guntekin",
        authorEn: "Resat Nuri Guntekin",
        publicationYear: 1922,
        genreUz: "Lirik-tarbiyaviy roman",
        pagesCount: 460,
        coverImage: "linear-gradient(135deg, #be185d 0%, #831843 100%)",
        rating: 5.0,
        synopsisUz: "Sho'x va erkatoy Feridaning amakivachchasi Kamronga bo'lgan samimiy sevgisi, to'y arafasidagi xiyonat tufayli Anadoluning chekka qishloqlariga o'qituvchi bo'lib ketishi hamda qat'iy sabri va sof muhabbatining g'alabasi.",
        famousQuoteUz: "Yurak sevgan insonidan qochsa ham, uning har bir zarbi o'sha inson nomi bilan uradi...",
        literarySignificanceUz: "Turk adabiyotining eng o'qimishli va qadrli muhabbat dostoni.",
        excerptUz: "Meni Choliqushi deb atashardi. Chunki bolaligimda daraxtlarga tirmashib chiqar, bir joyda tinch turolmas edim. Lekin hayot menga Anadoluning eng chekka qishloqlarida qashshoq bolalarga ma'rifat ulashishdek muqaddas burch yukladi..."
      },
      {
        id: "tur-mening-ismim-qirmizi",
        titleUz: "Mening ismim Qirmizi",
        titleOriginal: "Benim Adım Kırmızı",
        authorUz: "Orhan Pamuk",
        authorEn: "Orhan Pamuk",
        publicationYear: 1998,
        genreUz: "Tarixiy-falsafiy detektiv",
        pagesCount: 520,
        coverImage: "linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)",
        rating: 4.8,
        synopsisUz: "1591 yili Istanbulda Usmoniylar saroy miniatyurachilari o'rtasidagi sirli qotillik, san'at falsafasi, Sharq va G'arb nigohi to'qnashuvi haqidagi teran asar.",
        famousQuoteUz: "Men o'likman, bir quduqning tubida yotibman... va o'z o'limim haqida sizga so'zlab beraman.",
        literarySignificanceUz: "Orhan Pamukni xalqaro maydonda eng yuksak e'tirofga olib chiqqan roman.",
        excerptUz: "Hozir men bir o'likman, quduq tubidagi jasadman. Meni o'ldirgan qotil esa oramizda yuribdi. Meni nega o'ldirishdi? Chunki biz chizayotgan kitob miniatyuralari dunyoqarashlarni o'zgartirib yuborishi mumkin edi..."
      }
    ]
  },
  KGZ: {
    authors: [
      {
        nameUz: "Chingiz Aytmatov",
        years: "1928 – 2008",
        bioUz: "Qirg'iziston xalq yozuvchisi, jahon adabiyotining ulkan mutafakkiri. Insoniyat vijdoni, ekologiya va xotira mavzularini yuksak cho'qqiga ko'targan.",
        notableAwards: ["Davlat mukofotlari", "Jahon tinchlik mukofotlari"]
      }
    ],
    books: [
      {
        id: "kgz-asrga-tatigulik-kun",
        titleUz: "Asrga tatigulik kun",
        titleOriginal: "И дольше века длится день",
        authorUz: "Chingiz Aytmatov",
        authorEn: "Chinghiz Aitmatov",
        publicationYear: 1980,
        genreUz: "Falsafiy-ijtimoiy roman",
        pagesCount: 384,
        coverImage: "linear-gradient(135deg, #b45309 0%, #78350f 100%)",
        rating: 5.0,
        synopsisUz: "Sario'zak dashtidagi Bo'ronli temiryo'l bekatida yashovchi Yedigeyning do'sti Qozong'apni ko'mish safari fonida 'Mankurt' afsonasi, inson xotirasi, kosmik sivilizatsiyalar va zamonaviy jamiyat fojialari yoritiladi.",
        famousQuoteUz: "Inson o'z o'tmishini, o'z onasini unutsa, u mankurtga aylanadi. Mankurtlik esa qullikning eng tuban ko'rinishidir!",
        literarySignificanceUz: "Jahon adabiyotiga 'Mankurt' tushunchasini olib kirgan va butun insoniyatni ogohlantirgan asar.",
        excerptUz: "Bu joylarda poyezdlar sharqdan g'arbga, g'arbdan sharqqa qarab yeldek o'tib turardi... Sario'zak dashtining o'rtasida Bo'ronli bekati bamisoli cheksiz ummon o'rtasidagi yolg'iz oroldek edi..."
      },
      {
        id: "kgz-oq-kema",
        titleUz: "Oq kema",
        titleOriginal: "Белый пароход",
        authorUz: "Chingiz Aytmatov",
        authorEn: "Chinghiz Aitmatov",
        publicationYear: 1970,
        genreUz: "Falsafiy qissa",
        pagesCount: 224,
        coverImage: "linear-gradient(135deg, #0369a1 0%, #0c4a6e 100%)",
        rating: 4.9,
        synopsisUz: "Issiqko'l sohilidagi yetti yoshli yetim bolakay, uning durbin bilan ko'radigan Oq kemasi va shoxdor Ona Bug'u haqidagi ertagi hamda kattalar olamidagi shafqatsizlik bilan to'qnashuvi.",
        famousQuoteUz: "Bolalik vijdoni bamisoli daryodagi oq tosh: u loyqa suvlarda ham o'z pokligini saqlab qoladi.",
        literarySignificanceUz: "Mehr va shafqatsizlik o'rtasidagi fojiani eng chuqur ochib bergan qissa.",
        excerptUz: "Uning ikkita ertagi bor edi: biri o'ziniki bo'lib, unga hech kim ishonmasdi; ikkinchisi esa bobosi aytib bergan ertak edi. U har kuni tog' ustiga chiqib, durbinda uzoqdagi moviy Issiqko'lda suzib ketayotgan Oq kemani tomosha qilardi..."
      },
      {
        id: "kgz-jamila",
        titleUz: "Jamila",
        titleOriginal: "Джамиля",
        authorUz: "Chingiz Aytmatov",
        authorEn: "Chinghiz Aitmatov",
        publicationYear: 1958,
        genreUz: "Lirik sevgi qissasi",
        pagesCount: 120,
        coverImage: "linear-gradient(135deg, #be123c 0%, #4c0519 100%)",
        rating: 4.9,
        synopsisUz: "Urush davridagi qirg'iz ovulida yosh Jamila va frontdan yaralanib qaytgan xokisor Doniyor o'rtasidagi samimiy muhabbat. Mashhur fransuz yozuvchisi Lui Aragon bu asarni 'Dunyodagi eng go'zal sevgi qissasi' deb atagan.",
        famousQuoteUz: "Haqiqiy muhabbat inson qalbini tubanlikdan yuksakka, ozodlik sari olib chiquvchi qanotdir.",
        literarySignificanceUz: "Aytmatovni jahonga tanitgan ilk lirik qissa.",
        excerptUz: "Ovulimiz tog' etagida joylashgan. Urush yillarida hamma erkaklar frontga ketgan, butun og'irlik ayollar va keksalar zimmasiga tushgan edi. O'shanda Doniyorning g'amgin va sehrli qo'shig'i butun dashtni larzaga solgan edi..."
      }
    ]
  },
  JPN: {
    authors: [
      {
        nameUz: "Haruki Murakami",
        years: "1949 – hozirgacha",
        bioUz: "Zamonaviy yapon va jahon adabiyotining eng mashhur yozuvchisi, magik realizm va yolg'izlik mavzulari ustasi.",
        notableAwards: ["Frans Kafka mukofoti", "Yersiz Quddus mukofoti"]
      },
      {
        nameUz: "Yasunari Kawabata",
        years: "1899 – 1972",
        bioUz: "Yaponiyaning birinchi Nobel mukofoti laureati (1968), yapon qalbining nozik lirikasi kuychisi.",
        notableAwards: ["Nobel mukofoti (1968)"]
      }
    ],
    books: [
      {
        id: "jpn-norvegiya-ormoni",
        titleUz: "Norvegiya o'rmoni",
        titleOriginal: "ノルウェイの森 (Norwegian Wood)",
        authorUz: "Haruki Murakami",
        authorEn: "Haruki Murakami",
        publicationYear: 1987,
        genreUz: "Psixologik-lirik roman",
        pagesCount: 384,
        coverImage: "linear-gradient(135deg, #15803d 0%, #064e3b 100%)",
        rating: 4.8,
        synopsisUz: "Toru Vatanabening 1960-yillardagi Tokio talabalik yillari, do'stining o'limi, Naoko va Midori bilan murakkab munosabatlari va insoniy yolg'izlikning ta'sirchan musiqiy tasviri.",
        famousQuoteUz: "O'lim hayotning aksi emas, balki uning ajralmas bir qismidir.",
        literarySignificanceUz: "Murakamini global miqyosdagi adabiy yulduzga aylantirgan asar.",
        excerptUz: "Samolyot Gamburg aeroportiga qo'nayotganda karnaylardan The Beatles guruhining 'Norwegian Wood' qo'shig'i ohista eshitila boshladi. Shu zahoti o'tmish xotiralari qalbimni larzaga soldi..."
      },
      {
        id: "jpn-qorli-olka",
        titleUz: "Qorli o'lka",
        titleOriginal: "雪国 (Yukiguni)",
        authorUz: "Yasunari Kawabata",
        authorEn: "Yasunari Kawabata",
        publicationYear: 1948,
        genreUz: "Nozik lirik roman",
        pagesCount: 180,
        coverImage: "linear-gradient(135deg, #64748b 0%, #334155 100%)",
        rating: 4.7,
        synopsisUz: "Tokiolik havaskor san'atshunos Shimamura va tog'li qorli kurortdagi geysha Komako o'rtasidagi sovuq qor bag'rida alanga olgan pok muhabbat.",
        famousQuoteUz: "Poyezd uzun tunneldan chiqishi bilan oppoq qorli o'lka boshlandi. Tungi qorong'ulik ostida yer yuzi oppoq choyshabga burkangan edi...",
        literarySignificanceUz: "Muallifga Nobel mukofotini keltirgan yapon estetikasi cho'qqisi.",
        excerptUz: "Poyezd uzun tunneldan chiqishi bilanoq qarshimizda qorli o'lka namoyon bo'ldi. Kecha qorong'uligi yer yuzidagi oppoq qor bilan nurlanib turardi..."
      }
    ]
  }
};

/**
 * Returns library books and authors for any country with rich fallback
 */
export function getCountryBooks(countryId: string, countryNameUz: string): { books: Book[]; authors: AuthorProfile[] } {
  const normalized = countryId.toUpperCase().trim();
  if (COUNTRY_BOOKS_MAP[normalized]) {
    return COUNTRY_BOOKS_MAP[normalized];
  }

  // Curated fallback book collection for any sovereign nation
  return {
    authors: [
      {
        nameUz: `${countryNameUz} xalq donishmandlari`,
        years: "Klassik davr",
        bioUz: `${countryNameUz} xalqining boy folklori, epik dostonlari va jahonga tanilgan adabiy an'analarini yaratgan so'z ustalari.`,
        notableAwards: ["Xalq merosi oltin xazinasi"]
      }
    ],
    books: [
      {
        id: `${normalized.toLowerCase()}-doston`,
        titleUz: `${countryNameUz} Xalq Dostonlari va Rivoyatlari`,
        titleOriginal: `Folklore & Epic of ${countryNameUz}`,
        authorUz: "Xalq ijodiyoti",
        authorEn: "Folk Epic Heritage",
        publicationYear: 1850,
        genreUz: "Milliy doston va rivoyatlar",
        pagesCount: 320,
        coverImage: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        rating: 4.8,
        synopsisUz: `${countryNameUz} xalqining ko'p asrlik orzu-umidlari, qahramonliklari, donishmandligi va milliy an'analarini o'zida jamlagan nodir durdonalar majmuasi.`,
        famousQuoteUz: "Dono so'z qalbga ozuqa, xalq xotirasiga mayoqdir.",
        literarySignificanceUz: "Milliy madaniyat va adabiyotning ildizlarini o'rganishda asosiy manba.",
        excerptUz: `Qadim zamonlarda, ushbu go'zal yurt zaminida o'z xalqining or-nomusi, tinchligi va erkinligi uchun kurashgan mard insonlar yashab o'tgan edi. Ularning jasorati avlodlar qalbida ertak va afsonalarga aylanib, bugungi kungacha yetib keldi...`
      },
      {
        id: `${normalized.toLowerCase()}-klassik`,
        titleUz: `${countryNameUz} Klassik Badiiy Nasri`,
        titleOriginal: `Classic Prose of ${countryNameUz}`,
        authorUz: "Klassik adiblar",
        authorEn: "Classic Writers",
        publicationYear: 1935,
        genreUz: "Ijtimoiy-falsafiy roman",
        pagesCount: 290,
        coverImage: "linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)",
        rating: 4.7,
        synopsisUz: `${countryNameUz} adabiyotining XX asrdagi eng yorqin sahifalari: xalq hayoti, shaxs erki va milliy yuksalish mavzulari yuksak badiiylik bilan aks ettirilgan.`,
        famousQuoteUz: "Har bir kitob — yangi olam sari ochilgan sehrli eshikdir.",
        literarySignificanceUz: "Mamlakatning zamonaviy adabiy tafakkuri rivojiga katta hissa qo'shgan.",
        excerptUz: `Tong shamoli shahar ko'chalari uzra mayin esar, ko'chalarda yangi kun boshlanayotgan edi. Qahramonimiz qo'lidagi eski kitob varaqlarini sekin ochib, uzoq o'ylarga toldi...`
      }
    ]
  };
}

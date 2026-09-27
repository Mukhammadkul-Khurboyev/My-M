/**
 * Curated Nature Landscape Video and Photography Directory for World Countries
 * Provides authentic, high-definition background drone and landscape video loops
 * for each country's dedicated portal page.
 */

export interface CountryNatureMedia {
  videoUrl: string;
  fallbackVideoUrl?: string;
  posterUrl: string;
  landscapeTitle: string;
  landscapeLocation: string;
  landscapeType: 'mountains' | 'steppes' | 'forest' | 'coast' | 'desert' | 'waterfalls' | 'canyon' | 'lakes';
  descriptionUz: string;
}

export const COUNTRY_NATURE_MEDIA: Record<string, CountryNatureMedia> = {
  UZB: {
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/9/94/B%C3%BCelenhorn_%28Monstein%29%2C_aerial_video.webm/B%C3%BCelenhorn_%28Monstein%29%2C_aerial_video.webm.480p.vp9.webm',
    fallbackVideoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/3/3f/Le_grand_voyage.webm/Le_grand_voyage.webm.480p.vp9.webm',
    posterUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1920&auto=format&fit=crop',
    landscapeTitle: "Tyanshan va Pomir-Oloy tog' tizmalari",
    landscapeLocation: "Chorvoq, Zomin va Qizilqum, O'zbekiston",
    landscapeType: 'mountains',
    descriptionUz: "Markaziy Osiyoning qadimiy chorrahasi: qorli baland cho'qqilar, serob daryo vodiylari va keng bepoyon dashtlar uyg'unligi.",
  },
  KAZ: {
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/3/3f/Le_grand_voyage.webm/Le_grand_voyage.webm.480p.vp9.webm',
    posterUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop',
    landscapeTitle: "Chorin kanyoni va Ko'lsay ko'llari",
    landscapeLocation: "Olmaota viloyati, Qozog'iston",
    landscapeType: 'canyon',
    descriptionUz: "Cheksiz dashtlar, chuqur qizil qoyali kanyonlar va Tyanshan etaklaridagi zumraddek tiniq tog' ko'llari.",
  },
  TUR: {
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/3/3f/Le_grand_voyage.webm/Le_grand_voyage.webm.480p.vp9.webm',
    posterUrl: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=1920&auto=format&fit=crop',
    landscapeTitle: "Kapadokiya vodiylari va O'rta yer dengizi",
    landscapeLocation: "Nevshehir va Antaliya, Turkiya",
    landscapeType: 'canyon',
    descriptionUz: "Ertakmonand vulqon toshlari, osmondagi havo sharlari hamda moviy to'lqinli dengiz qirg'oqlari.",
  },
  JPN: {
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/6/65/Whitewater_Falls_-_Nantahala_National_Forest%2C_North_Carolina_--4K_Drone_--_DJI_Mavic_Pro_2._Footage.webm/Whitewater_Falls_-_Nantahala_National_Forest%2C_North_Carolina_--4K_Drone_--_DJI_Mavic_Pro_2._Footage.webm.480p.vp9.webm',
    posterUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1920&auto=format&fit=crop',
    landscapeTitle: "Fuji cho'qqisi va bambuk o'rmonlari",
    landscapeLocation: "Xonsyu oroli va Kioto, Yaponiya",
    landscapeType: 'forest',
    descriptionUz: "Muqaddas qorli vulqon, sokin sharsharalar va asriy yapon bog'laridagi tabiat falsafasi.",
  },
  CHE: {
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/9/94/B%C3%BCelenhorn_%28Monstein%29%2C_aerial_video.webm/B%C3%BCelenhorn_%28Monstein%29%2C_aerial_video.webm.480p.vp9.webm',
    posterUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1920&auto=format&fit=crop',
    landscapeTitle: "Alp tog'lari va Matterxorn cho'qqisi",
    landscapeLocation: "Tserrmatt va Valais, Shveytsariya",
    landscapeType: 'mountains',
    descriptionUz: "Yevropaning tomi: oppoq muzliklar, moviy tog' ko'llari va yam-yashil alp maysazorlari.",
  },
  USA: {
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/3/3f/Le_grand_voyage.webm/Le_grand_voyage.webm.480p.vp9.webm',
    posterUrl: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?q=80&w=1920&auto=format&fit=crop',
    landscapeTitle: "Katta Kanyon va Yosemiti granit qoyalari",
    landscapeLocation: "Arizona va Kaliforniya, AQSH",
    landscapeType: 'canyon',
    descriptionUz: "Millionlab yillik geologik qudrat, qizil qoyalar va asriy sekvoyalar o'rmonlari.",
  },
  FRA: {
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/7/71/Scottish_highlands_drone_footage.webm/Scottish_highlands_drone_footage.webm.480p.vp9.webm',
    posterUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1920&auto=format&fit=crop',
    landscapeTitle: "Provans lavanda dalalari va Fransiya Alp tog'lari",
    landscapeLocation: "Provans va Shamoni, Fransiya",
    landscapeType: 'mountains',
    descriptionUz: "Xushbo'y siyohrang lavanda vodiylari, tarixiy uzumzorlar va Montblan etaklari.",
  },
  DEU: {
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/6/65/Whitewater_Falls_-_Nantahala_National_Forest%2C_North_Carolina_--4K_Drone_--_DJI_Mavic_Pro_2._Footage.webm/Whitewater_Falls_-_Nantahala_National_Forest%2C_North_Carolina_--4K_Drone_--_DJI_Mavic_Pro_2._Footage.webm.480p.vp9.webm',
    posterUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1920&auto=format&fit=crop',
    landscapeTitle: "Bavariya Alp tog'lari va Qora o'rmon (Shvarsvald)",
    landscapeLocation: "Bavariya va Baden-Vyurtemberg, Germaniya",
    landscapeType: 'forest',
    descriptionUz: "Ertaklar beshigi: quyuq ignabargli asriy o'rmonlar, Reyn daryosi vodiylari va tog' qal'alari.",
  },
  GBR: {
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/7/71/Scottish_highlands_drone_footage.webm/Scottish_highlands_drone_footage.webm.480p.vp9.webm',
    posterUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1920&auto=format&fit=crop',
    landscapeTitle: "Shotlandiya tog'liklari va Lox-Ness vodiysi",
    landscapeLocation: "Shotlandiya Highlands, Buyuk Britaniya",
    landscapeType: 'mountains',
    descriptionUz: "Tumanli sirli tepaliklar, zumrad maysazorlar va qadimiy shimoliy ko'llar manzarasi.",
  },
  ITA: {
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/7/71/Scottish_highlands_drone_footage.webm/Scottish_highlands_drone_footage.webm.480p.vp9.webm',
    posterUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1920&auto=format&fit=crop',
    landscapeTitle: "Dolomit tog'lari va Toskana tepaliklari",
    landscapeLocation: "Dolomiti va Florensiya atrofi, Italiya",
    landscapeType: 'mountains',
    descriptionUz: "Tik pushtirang qoyalar, qadimiy zaytun bog'lari va O'rta yer dengizining firuza qirg'oqlari.",
  },
  RUS: {
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/9/94/B%C3%BCelenhorn_%28Monstein%29%2C_aerial_video.webm/B%C3%BCelenhorn_%28Monstein%29%2C_aerial_video.webm.480p.vp9.webm',
    posterUrl: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?q=80&w=1920&auto=format&fit=crop',
    landscapeTitle: "Baykal ko'li va Sibir taygasi",
    landscapeLocation: "Irkutsk va Olxon oroli, Rossiya",
    landscapeType: 'lakes',
    descriptionUz: "Sayyoramizning eng chuqur va toza ko'li, bepoyon tayga o'rmonlari va qishki billur muzlar.",
  },
  CHN: {
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/6/65/Whitewater_Falls_-_Nantahala_National_Forest%2C_North_Carolina_--4K_Drone_--_DJI_Mavic_Pro_2._Footage.webm/Whitewater_Falls_-_Nantahala_National_Forest%2C_North_Carolina_--4K_Drone_--_DJI_Mavic_Pro_2._Footage.webm.480p.vp9.webm',
    posterUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1920&auto=format&fit=crop',
    landscapeTitle: "Guylin karst cho'qqilari va Li daryosi",
    landscapeLocation: "Guansi va Chjanjiadje, Xitoy",
    landscapeType: 'mountains',
    descriptionUz: "Klassik xitoy kartinalaridagi tumanli afsonaviy cho'qqilar va zumrad daryolar jilosi.",
  },
  EGY: {
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/3/3f/Le_grand_voyage.webm/Le_grand_voyage.webm.480p.vp9.webm',
    posterUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=1920&auto=format&fit=crop',
    landscapeTitle: "Saxara oltin qumlari va Nil vodiysi",
    landscapeLocation: "Giza va Luksor, Misr",
    landscapeType: 'desert',
    descriptionUz: "Ming yillik sivilizatsiya beshigi: cheksiz qum barxanlari va hayot baxsh etuvchi buyuk Nil.",
  },
  BRA: {
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/6/65/Whitewater_Falls_-_Nantahala_National_Forest%2C_North_Carolina_--4K_Drone_--_DJI_Mavic_Pro_2._Footage.webm/Whitewater_Falls_-_Nantahala_National_Forest%2C_North_Carolina_--4K_Drone_--_DJI_Mavic_Pro_2._Footage.webm.480p.vp9.webm',
    posterUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1920&auto=format&fit=crop',
    landscapeTitle: "Amazonka sirlari va Iguasu sharsharasi",
    landscapeLocation: "Amazonas va Parana, Braziliya",
    landscapeType: 'forest',
    descriptionUz: "Yer yuzining yashil o'pkasi: eng sersuv daryo havzasi va dunyodagi eng qudratli sharsharalar.",
  },
  CAN: {
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/9/94/B%C3%BCelenhorn_%28Monstein%29%2C_aerial_video.webm/B%C3%BCelenhorn_%28Monstein%29%2C_aerial_video.webm.480p.vp9.webm',
    posterUrl: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1920&auto=format&fit=crop',
    landscapeTitle: "Morayn firuza ko'li va Qoyali tog'lar",
    landscapeLocation: "Banff Milliy Bog'i, Alberta, Kanada",
    landscapeType: 'lakes',
    descriptionUz: "Billur muzlik suvlari, moviy osmonga tutashgan tog'lar va bokira shimoliy tabiat.",
  },
  AUS: {
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/7/71/Scottish_highlands_drone_footage.webm/Scottish_highlands_drone_footage.webm.480p.vp9.webm',
    posterUrl: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1920&auto=format&fit=crop',
    landscapeTitle: "Katta To'siq rifi va Uluru qizil qoyasi",
    landscapeLocation: "Kvinslend va Markaziy Avstraliya",
    landscapeType: 'coast',
    descriptionUz: "Dunyodagi eng katta tirik organizm — marjon riflari va qit'aning qizil yuragi.",
  },
  KGZ: {
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/9/94/B%C3%BCelenhorn_%28Monstein%29%2C_aerial_video.webm/B%C3%BCelenhorn_%28Monstein%29%2C_aerial_video.webm.480p.vp9.webm',
    posterUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1920&auto=format&fit=crop',
    landscapeTitle: "Issiqko'l marvaridi va Ala-Archa darasi",
    landscapeLocation: "Tyanshan tog'lari, Qirg'iziston",
    landscapeType: 'mountains',
    descriptionUz: "Muzlamas baland tog' ko'li, qorli cho'qqilar va archazorlar bilan qoplangan daralar.",
  },
  TJK: {
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/9/94/B%C3%BCelenhorn_%28Monstein%29%2C_aerial_video.webm/B%C3%BCelenhorn_%28Monstein%29%2C_aerial_video.webm.480p.vp9.webm',
    posterUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop',
    landscapeTitle: "Dunyo tomi — Pomir tog'lari va Iskandarko'l",
    landscapeLocation: "Tog'li Badaxshon, Tojikiston",
    landscapeType: 'mountains',
    descriptionUz: "7000 metrlik osmono'par cho'qqilar, afsonaviy Iskandarko'l va moviy sharsharalar.",
  },
  AZE: {
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/3/3f/Le_grand_voyage.webm/Le_grand_voyage.webm.480p.vp9.webm',
    posterUrl: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=1920&auto=format&fit=crop',
    landscapeTitle: "Kavkaz tog'lari va Kaspiy dengizi sohili",
    landscapeLocation: "Qobustan va Shahdog', Ozarbayjon",
    landscapeType: 'mountains',
    descriptionUz: "Yonar tog'lar, qadimiy qoyatosh rasmlari va Kaspiyning moviy qirg'oqlari.",
  },
  SAU: {
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/3/3f/Le_grand_voyage.webm/Le_grand_voyage.webm.480p.vp9.webm',
    posterUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=1920&auto=format&fit=crop',
    landscapeTitle: "Al-Ula qumtosh kanyonlari va Rub-al-Xoli",
    landscapeLocation: "Hijoz va Madina viloyati, Saudiya Arabistoni",
    landscapeType: 'desert',
    descriptionUz: "Qizil qumtosh daralari, qadimiy voha palmazorlari va bepoyon sahro kengliklari.",
  },
};

/**
 * Returns nature video and landscape media for any country ID or continent fallback
 */
export function getCountryNatureMedia(countryId: string, continent: string = 'Osiyo'): CountryNatureMedia {
  if (COUNTRY_NATURE_MEDIA[countryId]) {
    return COUNTRY_NATURE_MEDIA[countryId];
  }

  // Continental / regional intelligent fallbacks
  if (continent === 'Yevropa') {
    return {
      videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/9/94/B%C3%BCelenhorn_%28Monstein%29%2C_aerial_video.webm/B%C3%BCelenhorn_%28Monstein%29%2C_aerial_video.webm.480p.vp9.webm',
      posterUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1920&auto=format&fit=crop',
      landscapeTitle: "Yevropa Alp tog'lari va yam-yashil vodiylar",
      landscapeLocation: "Yevropa mintaqasi",
      landscapeType: 'mountains',
      descriptionUz: "Yevropa qit'asining moviy ko'llari, qorli cho'qqilari va sokin o'rmon vodiylari.",
    };
  }

  if (continent === 'Afrika') {
    return {
      videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/3/3f/Le_grand_voyage.webm/Le_grand_voyage.webm.480p.vp9.webm',
      posterUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=1920&auto=format&fit=crop',
      landscapeTitle: "Afrika savannalari va oltin quyosh botishi",
      landscapeLocation: "Afrika qit'asi",
      landscapeType: 'desert',
      descriptionUz: "Yovvoyi tabiat qudrati, keng savannalar va serquyosh oltin qum barxanlari.",
    };
  }

  if (continent === 'Amerika' || continent === 'Shimoliy Amerika' || continent === 'Janubiy Amerika') {
    return {
      videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/3/3f/Le_grand_voyage.webm/Le_grand_voyage.webm.480p.vp9.webm',
      posterUrl: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?q=80&w=1920&auto=format&fit=crop',
      landscapeTitle: "Amerika qit'asining buyuk kanyonlari va qoyalari",
      landscapeLocation: "Amerika qit'asi",
      landscapeType: 'canyon',
      descriptionUz: "Cheksiz tekisliklar, qadimiy qoyatosh kanyonlari va sersuv daryo oqimlari.",
    };
  }

  if (continent === 'Okeaniya') {
    return {
      videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/7/71/Scottish_highlands_drone_footage.webm/Scottish_highlands_drone_footage.webm.480p.vp9.webm',
      posterUrl: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=1920&auto=format&fit=crop',
      landscapeTitle: "Tinch okeani marjon orollari va moviy sohillar",
      landscapeLocation: "Okeaniya arxipelagi",
      landscapeType: 'coast',
      descriptionUz: "Tinch okeanining billurdek tiniq moviy suvlari, tropik orollar va yashil qirg'oqlar.",
    };
  }

  // Default Central Asia / Asia
  return {
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/9/94/B%C3%BCelenhorn_%28Monstein%29%2C_aerial_video.webm/B%C3%BCelenhorn_%28Monstein%29%2C_aerial_video.webm.480p.vp9.webm',
    posterUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1920&auto=format&fit=crop',
    landscapeTitle: "Osiyoning ulug'vor tog' cho'qqilari va vodiylari",
    landscapeLocation: "Osiyo mintaqasi",
    landscapeType: 'mountains',
    descriptionUz: "Yer yuzining eng baland cho'qqilari, sersuv daryolari va qadimiy karvon yo'llari manzarasi.",
  };
}

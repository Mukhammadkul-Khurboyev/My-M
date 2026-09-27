export interface CountryHighlight {
  name: string;
  description: string;
  type: 'unesco' | 'nature' | 'city' | 'history';
}

export interface CountryData {
  id: string; // ISO 3166-1 alpha-3, e.g. "UZB"
  iso2: string; // "UZ"
  nameUz: string; // "O'zbekiston"
  nameEn: string; // "Uzbekistan"
  officialNameUz: string; // "O'zbekiston Respublikasi"
  capitalUz: string; // "Toshkent"
  capitalEn: string; // "Tashkent"
  continent: 'Osiyo' | 'Yevropa' | 'Afrika' | 'Shimoliy Amerika' | 'Janubiy Amerika' | 'Okeaniya' | 'Antarktida';
  subregionUz: string; // "Markaziy Osiyo"
  lat: number;
  lng: number;
  population: number;
  areaKm2: number;
  currency: {
    nameUz: string; // "O'zbek so'mi"
    code: string; // "UZS"
    symbol: string; // "so'm"
  };
  languagesUz: string[]; // ["O'zbek tili"]
  governmentUz: string; // "Prezidentlik respublikasi"
  dialingCode: string; // "+998"
  tld: string; // ".uz"
  timezones: string[]; // ["UTC+5"]
  utcOffsetHours: number; // 5 (for live clock calculation)
  gdpNominal: string; // "$90.4 mlrd"
  gdpPerCapita: string; // "$2,500"
  highestPoint: {
    nameUz: string; // "Hazrat Sulton cho'qqisi"
    elevationMeters: number; // 4643
  };
  climateUz: string; // "Keskin kontinental, issiq yoz va sovuq qish"
  borders: string[]; // IDs or names of neighboring countries e.g. ["KAZ", "KGZ", "TJK", "TKM", "AFG"]
  flagEmoji: string; // "🇺🇿"
  flagUrl?: string;
  coatOfArmsSymbol?: string;
  nationalDishUz: string; // "Palov (Osh)"
  nationalSymbolUz: string; // "Humokush (Humo qushi)"
  descriptionUz: string; // Detailed encyclopedic prose in Uzbek
  highlights: CountryHighlight[];
  interestingFactsUz: string[];
}

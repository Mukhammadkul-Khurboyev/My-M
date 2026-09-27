import { CountryData } from '../types/country';
import { COUNTRIES_DATA, getCountryDetails } from './countriesData';
import { isPointInFeature, getFeatureCentroid } from '../utils/geo';

export interface WorldCountryIndexItem {
  id: string; // ISO 3166-1 alpha-3
  iso2: string;
  nameUz: string;
  nameEn: string;
  capitalUz: string;
  continent: string;
  lat: number;
  lng: number;
  population?: number;
  flagEmoji: string;
}

// Global cached features from world-polygons.json
let cachedGeoJson: any = null;
let cachedCountryList: WorldCountryIndexItem[] = [];

// Helper to convert ISO2 to flag emoji
export function iso2ToFlag(iso2: string): string {
  if (!iso2 || iso2.length !== 2) return "🌐";
  const codePoints = iso2
    .toUpperCase()
    .split("")
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

// Translations dictionary for common countries in Uzbek
const UZ_NAMES: Record<string, { nameUz: string; capitalUz: string; continent: string }> = {
  UZB: { nameUz: "O'zbekiston", capitalUz: "Toshkent", continent: "Osiyo" },
  KAZ: { nameUz: "Qozog'iston", capitalUz: "Ostona", continent: "Osiyo" },
  KGZ: { nameUz: "Qirg'iziston", capitalUz: "Bishkek", continent: "Osiyo" },
  TJK: { nameUz: "Tojikiston", capitalUz: "Dushanbe", continent: "Osiyo" },
  TKM: { nameUz: "Turkmaniston", capitalUz: "Ashxobod", continent: "Osiyo" },
  RUS: { nameUz: "Rossiya", capitalUz: "Moskva", continent: "Yevropa" },
  CHN: { nameUz: "Xitoy", capitalUz: "Pekin", continent: "Osiyo" },
  USA: { nameUz: "Amerika Qo'shma Shtatlari (AQSH)", capitalUz: "Vashington", continent: "Shimoliy Amerika" },
  DEU: { nameUz: "Germaniya", capitalUz: "Berlin", continent: "Yevropa" },
  GBR: { nameUz: "Buyuk Britaniya", capitalUz: "London", continent: "Yevropa" },
  FRA: { nameUz: "Fransiya", capitalUz: "Parij", continent: "Yevropa" },
  TUR: { nameUz: "Turkiya", capitalUz: "Anqara", continent: "Osiyo" },
  JPN: { nameUz: "Yaponiya", capitalUz: "Tokio", continent: "Osiyo" },
  KOR: { nameUz: "Janubiy Koreya", capitalUz: "Seul", continent: "Osiyo" },
  PRK: { nameUz: "Shimoliy Koreya", capitalUz: "Pxenyan", continent: "Osiyo" },
  IND: { nameUz: "Hindiston", capitalUz: "Yangi Dehli", continent: "Osiyo" },
  SAU: { nameUz: "Saudiya Arabistoni", capitalUz: "Ar-Riyod", continent: "Osiyo" },
  ARE: { nameUz: "Birlashgan Arab Amirliklari (BAA)", capitalUz: "Abu-Dabi", continent: "Osiyo" },
  QAT: { nameUz: "Qatar", capitalUz: "Doha", continent: "Osiyo" },
  KWT: { nameUz: "Quvayt", capitalUz: "Al-Quvayt", continent: "Osiyo" },
  IRN: { nameUz: "Eron", capitalUz: "Tehron", continent: "Osiyo" },
  IRQ: { nameUz: "Iroq", capitalUz: "Bag'dod", continent: "Osiyo" },
  SYR: { nameUz: "Suriya", capitalUz: "Damashq", continent: "Osiyo" },
  AFG: { nameUz: "Afg'oniston", capitalUz: "Qobul", continent: "Osiyo" },
  PAK: { nameUz: "Pokiston", capitalUz: "Islomobod", continent: "Osiyo" },
  BGD: { nameUz: "Bangladesh", capitalUz: "Dakka", continent: "Osiyo" },
  IDN: { nameUz: "Indoneziya", capitalUz: "Jakarta", continent: "Osiyo" },
  MYS: { nameUz: "Malayziya", capitalUz: "Kuala-Lumpur", continent: "Osiyo" },
  SGP: { nameUz: "Singapur", capitalUz: "Singapur", continent: "Osiyo" },
  THA: { nameUz: "Tailand", capitalUz: "Bangkok", continent: "Osiyo" },
  VNM: { nameUz: "Vyetnam", capitalUz: "Xanoy", continent: "Osiyo" },
  PHL: { nameUz: "Filippin", capitalUz: "Manila", continent: "Osiyo" },
  AZE: { nameUz: "Ozarbayjon", capitalUz: "Boku", continent: "Osiyo" },
  GEO: { nameUz: "Gruziya", capitalUz: "Tbilisi", continent: "Osiyo" },
  ARM: { nameUz: "Armaniston", capitalUz: "Yerevan", continent: "Osiyo" },
  UKR: { nameUz: "Ukraina", capitalUz: "Kiyev", continent: "Yevropa" },
  BLR: { nameUz: "Belarus", capitalUz: "Minsk", continent: "Yevropa" },
  POL: { nameUz: "Polsha", capitalUz: "Varshava", continent: "Yevropa" },
  ITA: { nameUz: "Italiya", capitalUz: "Rim", continent: "Yevropa" },
  ESP: { nameUz: "Ispaniya", capitalUz: "Madrid", continent: "Yevropa" },
  PRT: { nameUz: "Portugaliya", capitalUz: "Lissabon", continent: "Yevropa" },
  NLD: { nameUz: "Niderlandiya", capitalUz: "Amsterdam", continent: "Yevropa" },
  BEL: { nameUz: "Belgiya", capitalUz: "Bryussel", continent: "Yevropa" },
  CHE: { nameUz: "Shveysariya", capitalUz: "Bern", continent: "Yevropa" },
  AUT: { nameUz: "Avstriya", capitalUz: "Vena", continent: "Yevropa" },
  SWE: { nameUz: "Shvetsiya", capitalUz: "Stokgolm", continent: "Yevropa" },
  NOR: { nameUz: "Norvegiya", capitalUz: "Oslo", continent: "Yevropa" },
  FIN: { nameUz: "Finlandiya", capitalUz: "Xelsinki", continent: "Yevropa" },
  DNK: { nameUz: "Daniya", capitalUz: "Kopengagen", continent: "Yevropa" },
  GRC: { nameUz: "Gretsiya", capitalUz: "Afina", continent: "Yevropa" },
  CZE: { nameUz: "Chexiya", capitalUz: "Praga", continent: "Yevropa" },
  HUN: { nameUz: "Vengriya", capitalUz: "Budapesht", continent: "Yevropa" },
  ROU: { nameUz: "Ruminiya", capitalUz: "Buxarest", continent: "Yevropa" },
  BGR: { nameUz: "Bolgariya", capitalUz: "Sofiya", continent: "Yevropa" },
  SRB: { nameUz: "Serbiya", capitalUz: "Belgrad", continent: "Yevropa" },
  HRV: { nameUz: "Xorvatiya", capitalUz: "Zagreb", continent: "Yevropa" },
  IRL: { nameUz: "Irlandiya", capitalUz: "Dublin", continent: "Yevropa" },
  EGY: { nameUz: "Misr", capitalUz: "Qohira", continent: "Afrika" },
  MAR: { nameUz: "Marokash", capitalUz: "Rabot", continent: "Afrika" },
  DZA: { nameUz: "Jazoir", capitalUz: "Jazoir", continent: "Afrika" },
  TUN: { nameUz: "Tunis", capitalUz: "Tunis", continent: "Afrika" },
  NGA: { nameUz: "Nigeriya", capitalUz: "Abuja", continent: "Afrika" },
  ZAF: { nameUz: "Janubiy Afrika Respublikasi", capitalUz: "Pretoriya", continent: "Afrika" },
  KEN: { nameUz: "Keniya", capitalUz: "Nayrobi", continent: "Afrika" },
  ETH: { nameUz: "Efiopiya", capitalUz: "Addis-Abeba", continent: "Afrika" },
  GHA: { nameUz: "Gana", capitalUz: "Akkra", continent: "Afrika" },
  TZA: { nameUz: "Tanzaniya", capitalUz: "Dodoma", continent: "Afrika" },
  CAN: { nameUz: "Kanada", capitalUz: "Ottava", continent: "Shimoliy Amerika" },
  MEX: { nameUz: "Meksika", capitalUz: "Mexiko", continent: "Shimoliy Amerika" },
  CUB: { nameUz: "Kuba", capitalUz: "Gavana", continent: "Shimoliy Amerika" },
  BRA: { nameUz: "Braziliya", capitalUz: "Brazilia", continent: "Janubiy Amerika" },
  ARG: { nameUz: "Argentina", capitalUz: "Buenos-Ayres", continent: "Janubiy Amerika" },
  COL: { nameUz: "Kolumbiya", capitalUz: "Bogota", continent: "Janubiy Amerika" },
  CHL: { nameUz: "Chili", capitalUz: "Santyago", continent: "Janubiy Amerika" },
  PER: { nameUz: "Peru", capitalUz: "Lima", continent: "Janubiy Amerika" },
  VEN: { nameUz: "Venesuela", capitalUz: "Karakas", continent: "Janubiy Amerika" },
  AUS: { nameUz: "Avstraliya", capitalUz: "Kanberra", continent: "Okeaniya" },
  NZL: { nameUz: "Yangi Zelandiya", capitalUz: "Vellington", continent: "Okeaniya" },
  MNG: { nameUz: "Mo'g'uliston", capitalUz: "Ulan-Bator", continent: "Osiyo" }
};

/**
 * Initializes countries list from GeoJSON features
 */
export async function loadGeoJsonAndCountries(): Promise<{ geoJson: any; countries: WorldCountryIndexItem[] }> {
  if (cachedGeoJson && cachedCountryList.length > 0) {
    return { geoJson: cachedGeoJson, countries: cachedCountryList };
  }

  try {
    const res = await fetch('/data/world-polygons.json');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    cachedGeoJson = data;

    const items: WorldCountryIndexItem[] = [];

    // First include curated countries from COUNTRIES_DATA
    for (const [id, c] of Object.entries(COUNTRIES_DATA)) {
      items.push({
        id: c.id,
        iso2: c.iso2,
        nameUz: c.nameUz,
        nameEn: c.nameEn,
        capitalUz: c.capitalUz,
        continent: c.continent,
        lat: c.lat,
        lng: c.lng,
        population: c.population,
        flagEmoji: c.flagEmoji,
      });
    }

    // Now index remaining features from GeoJSON
    for (const f of data.features || []) {
      const id = (f.properties?.id || '').trim();
      const iso2 = (f.properties?.iso2 || '').trim();
      const nameEn = (f.properties?.name || '').trim();
      if (!id || id === '-99' || !nameEn) continue;

      // Skip if already in list
      if (items.some(it => it.id === id || it.iso2 === iso2)) continue;

      const centroid = getFeatureCentroid(f);
      const uzInfo = UZ_NAMES[id] || {
        nameUz: nameEn,
        capitalUz: "Poytaxt",
        continent: "Osiyo"
      };

      items.push({
        id,
        iso2: iso2 || id.slice(0, 2),
        nameUz: uzInfo.nameUz,
        nameEn,
        capitalUz: uzInfo.capitalUz,
        continent: uzInfo.continent,
        lat: centroid.lat,
        lng: centroid.lng,
        flagEmoji: iso2ToFlag(iso2),
      });
    }

    cachedCountryList = items;
    return { geoJson: data, countries: items };
  } catch (err) {
    console.error("Failed to load world-polygons.json, fallback to embedded:", err);
    const fallbackItems = Object.values(COUNTRIES_DATA).map(c => ({
      id: c.id,
      iso2: c.iso2,
      nameUz: c.nameUz,
      nameEn: c.nameEn,
      capitalUz: c.capitalUz,
      continent: c.continent,
      lat: c.lat,
      lng: c.lng,
      population: c.population,
      flagEmoji: c.flagEmoji,
    }));
    cachedCountryList = fallbackItems;
    return { geoJson: { type: "FeatureCollection", features: [] }, countries: fallbackItems };
  }
}

/**
 * Finds country feature in GeoJSON containing the given point [lng, lat]
 */
export function findCountryAtLatLng(lat: number, lng: number): WorldCountryIndexItem | null {
  if (!cachedGeoJson || !cachedGeoJson.features) return null;

  const point: [number, number] = [lng, lat];
  for (const feature of cachedGeoJson.features) {
    if (isPointInFeature(point, feature)) {
      const id = feature.properties?.id;
      const found = cachedCountryList.find(c => c.id === id);
      if (found) return found;
      // Fallback: create item
      return {
        id: id || 'UNKNOWN',
        iso2: feature.properties?.iso2 || '',
        nameUz: UZ_NAMES[id]?.nameUz || feature.properties?.name || 'Davlat',
        nameEn: feature.properties?.name || 'Country',
        capitalUz: UZ_NAMES[id]?.capitalUz || 'Poytaxt',
        continent: UZ_NAMES[id]?.continent || 'Osiyo',
        lat,
        lng,
        flagEmoji: iso2ToFlag(feature.properties?.iso2),
      };
    }
  }

  // If not directly inside a polygon (e.g. clicked near coast), find closest within small threshold
  let minDistance = 6.0; // max ~6 degrees distance threshold
  let closest: WorldCountryIndexItem | null = null;

  for (const c of cachedCountryList) {
    const dLat = c.lat - lat;
    const dLng = c.lng - lng;
    const dist = Math.sqrt(dLat * dLat + dLng * dLng);
    if (dist < minDistance) {
      minDistance = dist;
      closest = c;
    }
  }

  return closest;
}

/**
 * Returns full detailed country dossier
 */
export function getFullCountryData(id: string, nameFallback?: string): CountryData {
  return getCountryDetails(id, nameFallback);
}

/**
 * Returns a random country for exploration mode
 */
export function getRandomCountry(): WorldCountryIndexItem {
  const list = cachedCountryList.length > 0 ? cachedCountryList : Object.values(COUNTRIES_DATA).map(c => ({
    id: c.id,
    iso2: c.iso2,
    nameUz: c.nameUz,
    nameEn: c.nameEn,
    capitalUz: c.capitalUz,
    continent: c.continent,
    lat: c.lat,
    lng: c.lng,
    population: c.population,
    flagEmoji: c.flagEmoji,
  }));
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

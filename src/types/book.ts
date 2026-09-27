export interface Book {
  id: string;
  titleUz: string;
  titleOriginal: string;
  authorUz: string;
  authorEn: string;
  publicationYear: number;
  genreUz: string;
  pagesCount: number;
  coverImage: string; // CSS gradient cover / SVG or URL
  coverBgColor?: string;
  synopsisUz: string; // Detailed plot & literary context
  excerptUz: string; // Excerpt for in-app reading preview
  famousQuoteUz: string;
  literarySignificanceUz: string;
  rating: number; // e.g. 4.9
  audioDurationSeconds?: number;
  narratorUz?: string;
}

export interface AuthorProfile {
  nameUz: string;
  years: string;
  avatarText?: string;
  bioUz: string;
  notableAwards?: string[];
}

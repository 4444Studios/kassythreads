/** Studio constants shared across marketing surfaces. */

export const STUDIO = {
  name: "Kassy Threads",
  wordmark: "KASSY THREADS",
  city: "El Monte",
  state: "CA",
  address: "10138 Garvey Avenue, Suite F1, El Monte, CA 91733",
  addressShort: "El Monte, CA",
  booksyRating: 5.0,
  booksyReviewCount: 391,
  booksyUrl:
    "https://booksy.com/en-us/436276_kassy-threads-llc_hair-removal_101871_south-el-monte",
  instagramHandle: "@kassythreads",
  instagramUrl: "https://www.instagram.com/kassythreads/",
} as const;

export const ANNOUNCEMENT =
  `${STUDIO.booksyRating} ★ · ${STUDIO.booksyReviewCount} Reviews · ${STUDIO.addressShort}` as const;

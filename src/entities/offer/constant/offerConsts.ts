export const offerFilterValues = [
  'popular-desc',
  'price-asc',
  'price-desc',
  'top-desc',
] as const;

export type OfferFilterType = (typeof offerFilterValues)[number];

export const OFFER_FILTER_OPTIONS: Array<{
  label: string;
  value: OfferFilterType;
}> = [
  { label: 'Popular', value: 'popular-desc' },
  { label: 'Price: low to high', value: 'price-asc' },
  { label: 'Price: high to low', value: 'price-desc' },
  { label: 'Top rated first', value: 'top-desc' },
];

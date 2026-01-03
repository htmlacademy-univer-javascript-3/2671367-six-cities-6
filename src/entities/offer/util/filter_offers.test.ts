import { describe, it, expect } from 'vitest';
import { offers } from '../../../mocks/offers';
import { filterOffers, isOfferFilterType } from './filterOffers';

describe('filterOffers', () => {
  it('returns the same array for "popular-desc"', () => {
    const result = filterOffers(offers, 'popular-desc');
    expect(result).toEqual(offers);
    expect(result).not.toBe(offers);
  });

  it('sorts by price ascending', () => {
    const result = filterOffers(offers, 'price-asc');
    expect(result.map((o) => o.id)).toEqual(['2', '1', '3', '4']);
  });

  it('sorts by price descending', () => {
    const result = filterOffers(offers, 'price-desc');
    expect(result.map((o) => o.id)).toEqual(['4', '3', '1', '2']);
  });

  it('sorts by rating descending', () => {
    const result = filterOffers(offers, 'top-desc');
    expect(result.map((o) => o.id)).toEqual(['4', '1', '3', '2']);
  });
});

describe('isOfferFilterType', () => {
  it('returns true for valid filter type', () => {
    expect(isOfferFilterType('price-asc')).toBe(true);
  });

  it('returns false for invalid filter type', () => {
    expect(isOfferFilterType('unknown')).toBe(false);
  });
});

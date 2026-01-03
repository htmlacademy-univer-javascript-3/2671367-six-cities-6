import { offers } from '../../../mocks/offers';
import { CityName } from '../../city';
import {
  toggleFavoriteOffers,
  calculateFavoritesCount,
} from './favorite-offers';

describe('toggleFavoriteOffers', () => {
  it('toggles isFavorite for matching offer', () => {
    const result = toggleFavoriteOffers(offers, '1');

    expect(result[0].isFavorite).toBe(true);
    expect(result[1].isFavorite).toBe(true);
  });

  it('does not mutate original array', () => {
    const result = toggleFavoriteOffers(offers, '1');

    expect(result).not.toBe(offers);
    expect(result[0]).not.toBe(offers[0]);
  });
});

describe('calculateFavoritesCount', () => {
  it('counts all offers across cities', () => {
    const data = {
      [CityName.Paris]: offers.slice(0, 2),
      [CityName.Cologne]: offers.slice(2, 3),
    };

    expect(calculateFavoritesCount(data)).toBe(3);
  });

  it('returns 0 for empty object', () => {
    expect(calculateFavoritesCount({})).toBe(0);
  });
});

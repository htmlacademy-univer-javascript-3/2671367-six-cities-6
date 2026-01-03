import { describe, it, expect } from 'vitest';
import { getCityName } from './city-selector';
import { StateSchema } from '../../../app/providers/store';

describe('city selectors', () => {
  const mockState: StateSchema = {
    city: {
      name: 'Paris',
    },
  } as unknown as StateSchema;

  it('getCityName returns current city name', () => {
    expect(getCityName(mockState)).toBe('Paris');
  });
});

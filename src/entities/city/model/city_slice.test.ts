import { cityReducer, cityActions } from './city_slice';
import { FALLBACK_CITY } from '../constant/city_consts';
import type { CityState } from './city_state';

describe('city reducer', () => {
  it('should return initial state', () => {
    const state = cityReducer(undefined, { type: 'unknown' });
    expect(state.name).toBe(FALLBACK_CITY);
  });

  it('setCity should change city name when valid', () => {
    const next = cityReducer(undefined, cityActions.setCity('Paris'));
    expect(next.name.toLowerCase()).toBe('paris');
  });

  it('resetCity should set fallback', () => {
    const state = { name: 'Paris' } as unknown as CityState;
    const next = cityReducer(state, cityActions.resetCity());
    expect(next.name).toBe(FALLBACK_CITY);
  });
});

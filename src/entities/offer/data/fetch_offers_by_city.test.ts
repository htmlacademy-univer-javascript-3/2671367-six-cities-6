import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchOffersByCity } from './fetchOffersByCity';
import type { AxiosInstance } from 'axios';
import { Offer } from '..';
import { CityName } from '../../city';
import { offers } from '../../../mocks/offers';
import {
  StateSchema,
  ThunkExtraArg,
} from '../../../app/providers/store/model/stateInterfaces';
import { AnyAction } from '@reduxjs/toolkit';
import { ServerError } from '../../../interface/interface';
import { mockedUseAppDispatch } from '../../../setupTests';
import * as filterUtils from '../util/filterOffers';

const mockLocation = { search: '' };
vi.stubGlobal('window', { location: mockLocation });
vi.mock('../util/filterOffers');

const mockedIsOfferFilterType = vi.mocked(filterUtils.isOfferFilterType);
const mockedFilterOffers = vi.mocked(filterUtils.filterOffers);

beforeEach(() => {
  mockedIsOfferFilterType.mockReset();
  mockedFilterOffers.mockReset();
});

describe('fetchOffersByCity', () => {
  let mockOffer: Offer;
  let mockApi: AxiosInstance;
  let mockErrorHandler: (error: unknown) => ServerError;
  let dispatch: ReturnType<typeof mockedUseAppDispatch>;
  let getState: () => StateSchema;
  let extra: ThunkExtraArg;

  beforeEach(() => {
    mockOffer = offers[0];

    mockApi = { get: vi.fn() } as unknown as AxiosInstance;
    mockErrorHandler = vi.fn().mockImplementation(() => ({
      errorType: 'UNEXPECTED_ERROR',
      message: 'Error fetching offers',
      details: [],
    }));
    dispatch = vi.fn();
    getState = vi.fn();
    extra = { api: mockApi, errorHandler: mockErrorHandler };
    mockLocation.search = '';
  });

  it('should fetch and filter offers by city', async () => {
    const mockOffers: Offer[] = [
      {
        ...mockOffer,
        id: '1',
        city: { ...mockOffer.city, name: CityName.Paris },
      },
      {
        ...mockOffer,
        id: '2',
        city: { ...mockOffer.city, name: CityName.Cologne },
      },
      {
        ...mockOffer,
        id: '3',
        city: { ...mockOffer.city, name: CityName.Paris },
      },
    ];

    mockApi.get = vi.fn().mockResolvedValue({ data: mockOffers });

    const thunk = fetchOffersByCity(CityName.Paris);
    const result = (await thunk(dispatch, getState, extra)) as AnyAction;

    expect(mockApi.get).toHaveBeenCalledWith('/offers');
    expect(result.type).toBe('offer/fetchOffersByCity/fulfilled');
    expect(result.payload).toHaveLength(2);
    expect(
      (
        result as {
          type: string;
          payload: Offer[];
        }
      ).payload.every((o: Offer) => o.city.name === CityName.Paris)
    ).toBe(true);
  });

  it('should apply sorting from URL params if valid', async () => {
    mockLocation.search = '?sort-by=price-low';

    const mockOffers: Offer[] = [
      { ...mockOffer, id: '1', price: 200 },
      { ...mockOffer, id: '2', price: 100 },
    ];

    mockApi.get = vi.fn().mockResolvedValue({ data: mockOffers });

    mockedIsOfferFilterType.mockReturnValue(true);
    mockedFilterOffers.mockReturnValue(mockOffers);

    const thunk = fetchOffersByCity(CityName.Paris);
    const result = (await thunk(dispatch, getState, extra)) as {
      type: string;
      payload: Offer[];
    };

    expect(result.type).toBe('offer/fetchOffersByCity/fulfilled');
    expect(result.payload).toEqual(mockOffers);
  });

  it('should ignore invalid sort parameter', async () => {
    mockLocation.search = '?sort-by=invalid';

    const mockOffers: Offer[] = [
      {
        ...mockOffer,
        id: '1',
        city: { ...mockOffer.city, name: CityName.Paris },
      },
      {
        ...mockOffer,
        id: '2',
        city: { ...mockOffer.city, name: CityName.Cologne },
      },
    ];

    mockApi.get = vi.fn().mockResolvedValue({ data: mockOffers });

    const thunk = fetchOffersByCity(CityName.Paris);
    const result = (await thunk(dispatch, getState, extra)) as {
      type: string;
      payload: Offer[];
    };

    expect(result.type).toBe('offer/fetchOffersByCity/fulfilled');
    expect(result.payload).toEqual([
      mockOffers[0], // только Paris
    ]);
  });

  it('should return empty array if no offers match city', async () => {
    const mockOffers: Offer[] = [
      { ...mockOffer, city: { ...mockOffer.city, name: CityName.Cologne } },
    ];
    mockApi.get = vi.fn().mockResolvedValue({ data: mockOffers });

    const thunk = fetchOffersByCity(CityName.Paris);
    const result = (await thunk(dispatch, getState, extra)) as AnyAction;

    expect(result.type).toBe('offer/fetchOffersByCity/fulfilled');
    expect(result.payload).toEqual([]);
  });

  it('should handle API error', async () => {
    const error = new Error('Network error');
    mockApi.get = vi.fn().mockRejectedValue(error);

    const thunk = fetchOffersByCity(CityName.Paris);
    const result = (await thunk(dispatch, getState, extra)) as AnyAction;

    expect(mockErrorHandler).toHaveBeenCalledWith(error);
    expect(result.type).toBe('offer/fetchOffersByCity/rejected');
    expect(result.payload).toEqual({
      errorType: 'UNEXPECTED_ERROR',
      message: 'Error fetching offers',
      details: [],
    });
  });

  it('should reject if response data is null', async () => {
    mockApi.get = vi.fn().mockResolvedValue({ data: null });

    const thunk = fetchOffersByCity(CityName.Paris);
    const result = (await thunk(dispatch, getState, extra)) as AnyAction;

    expect(result.type).toBe('offer/fetchOffersByCity/rejected');
    expect(result.payload).toEqual({
      errorType: 'UNEXPECTED_ERROR',
      message: 'Error fetching offers',
      details: [],
    });
  });
});

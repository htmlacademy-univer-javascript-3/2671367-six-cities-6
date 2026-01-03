import { describe, it, expect, vi, afterEach } from 'vitest';

vi.mock('../../shared/hooks/useMap', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    setView: vi.fn(),
  })),
}));

vi.mock('leaflet', () => {
  class MockMap {
    setView = vi.fn().mockReturnThis();
    addLayer = vi.fn();
    removeLayer = vi.fn();
    constructor() {}
  }

  class Marker {
    addTo = vi.fn();
    constructor() {}
  }

  class Icon {
    constructor() {}
  }

  class TileLayer {
    addTo = vi.fn();
    constructor() {}
  }

  function layerGroup() {
    return {
      addTo: vi.fn().mockReturnThis(),
      remove: vi.fn(),
    };
  }

  function tileLayer() {
    return new TileLayer();
  }

  return {
    Map: MockMap,
    Marker,
    Icon,
    TileLayer,
    layerGroup,
    tileLayer,
  };
});

import Map from './map';
import { offers } from '../../mocks/offers';
import { renderWithProviders } from '../../tests/render-with-providers';

afterEach(() => vi.clearAllMocks());

describe('Map component', () => {
  it('renders map container', () => {
    const { container } = renderWithProviders(
      <Map
        location={{ latitude: 1, longitude: 2 }}
        offers={offers}
        selectedOfferId={undefined}
        className="c"
      />
    );

    expect(container.querySelector('.c')).toBeInTheDocument();
  });
});

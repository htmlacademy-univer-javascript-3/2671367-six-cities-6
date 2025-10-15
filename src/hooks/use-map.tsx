import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { Map, TileLayer } from 'leaflet';
import { City } from '../types/offersTypes';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);
  const ZOOM = 12;

  useEffect(() => {
    if (mapRef.current && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: { lat: city.lat, lng: city.lng },
        zoom: ZOOM,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      );

      instance.addLayer(layer);
      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  useEffect(() => {
    if (map) {
      map.setView({ lat: city.lat, lng: city.lng }, ZOOM);
    }
  }, [map, city]);

  return map;
}

export default useMap;

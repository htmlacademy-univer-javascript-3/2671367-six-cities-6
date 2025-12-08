import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import { MapProps } from '../../interface/interface';
import useMap from '../../shared/hooks/useMap';
import { URL_MARKER_DEFAULT } from './mapConst';

const locationIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// const locationCurrentIcon = new Icon({
//   iconUrl: URL_MARKER_CURRENT,
//   iconSize: [40, 40],
//   iconAnchor: [20, 40],
// });

function Map({
  location,
  offers,
  selectedOfferId,
  className,
}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (!map) {
      return;
    }

    const markerLayer = layerGroup().addTo(map);

    offers.forEach((offer) => {
      const marker = new Marker(
        [offer.location.latitude, offer.location.longitude],
        {
          icon: locationIcon,
        }
      );
      marker.addTo(markerLayer);
    });

    return () => {
      markerLayer.remove();
    };
  }, [map, offers, selectedOfferId]);

  return (
    <div
      className={className}
      ref={mapRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default Map;

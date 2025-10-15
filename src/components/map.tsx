import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../hooks/use-map';
import { URL_MARKER_LOCATION } from '../consts';
import 'leaflet/dist/leaflet.css';
import { MapProps } from '../interface/interrface';

const locationIcon = new Icon({
  iconUrl: URL_MARKER_LOCATION,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({
  city,
  offers,
  selectedOfferId,
  className,
}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (!map) {
      return;
    }

    const markerLayer = layerGroup().addTo(map);

    offers.forEach((offer) => {
      const marker = new Marker({
        lat: offer.location.lat,
        lng: offer.location.lng,
      });

      marker.setIcon(locationIcon).addTo(markerLayer);
    });

    return () => {
      map.removeLayer(markerLayer);
    };
  }, [map, offers, selectedOfferId]);

  return <div className={className} ref={mapRef} />;
}

export default Map;

import { useEffect, useState, useRef, useCallback } from 'react';
import { Pin, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import type { Marker } from '@googlemaps/markerclusterer';

export const Markers = () => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  // クリックしたピンをmap中心にする処理
  const handleClick = useCallback((ev: google.maps.MapMouseEvent) => {
    if (!map) return;
    if (!ev.latLng) return;
    map.panTo(ev.latLng);
  }, []);

  return (
    <>
      {locations.map((poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          ref={(marker) => setMarkerRef(marker, poi.key)}
          clickable={true}
          onClick={handleClick}
        >
          <Pin
            background={'#FBBC04'}
            glyphColor={'#000'}
            borderColor={'#000'}
          />
        </AdvancedMarker>
      ))}
    </>
  );
};

type Poi = { key: string; location: google.maps.LatLngLiteral };
const locations: Poi[] = [
  {
    key: '大名古屋ビルヂング',
    location: { lat: 35.171995133394624, lng: 136.8845281004906 },
  },
  {
    key: 'ファミリーマート 那古野南店',
    location: { lat: 35.17503499009273, lng: 136.88717275857925 },
  },
  {
    key: 'ビックカメラ 名古屋駅西店',
    location: { lat: 35.17026632178306, lng: 136.87958747148514 },
  },
  {
    key: 'アニメイト名古屋',
    location: { lat: 35.168010150900905, lng: 136.88077837228775 },
  },
  {
    key: 'Zepp Nagoya',
    location: { lat: 35.16335399687701, lng: 136.8847319483757 },
  },
];

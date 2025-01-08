import { useEffect, useState, useRef, useCallback, memo } from 'react';
import { AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import type { Marker } from '@googlemaps/markerclusterer';
import iconImage from '../assets/icons/map_icon.svg';
import {
  allCarPorteAtom,
  isOpenInfoWindowAtom,
  selectInfoWindowAtom,
} from './atom/globalState.ts';
import { IAllCarPort } from '../../globals';
import { useAtomValue, useSetAtom } from 'jotai/index';

const Markers = () => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);
  const setSelectInfoWindow = useSetAtom(selectInfoWindowAtom);
  const setIsOpenInfoWindow = useSetAtom(isOpenInfoWindowAtom);
  const allCarPorte = useAtomValue(allCarPorteAtom);

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
  const handleClick = useCallback(
    (ev: google.maps.MapMouseEvent, carport: IAllCarPort) => {
      if (!map) return;
      if (!ev.latLng) return;
      console.log('ev.latLng', ev.latLng);
      map.panTo(ev.latLng);
      setSelectInfoWindow(carport);
      // 一旦閉じてから開く
      setIsOpenInfoWindow(false);
      setTimeout(() => {
        setIsOpenInfoWindow(true);
      }, 0); // 最短の遅延
    },
    [map, setSelectInfoWindow, setIsOpenInfoWindow]
  );

  return (
    <>
      {allCarPorte &&
        allCarPorte.map((data) => (
          <AdvancedMarker
            key={data.latitude}
            position={{
              lat: Number(data.latitude),
              lng: Number(data.longitude),
            }}
            ref={(marker) => setMarkerRef(marker, data.address)}
            clickable={true}
            onClick={(ev) => handleClick(ev, data)}
          >
            <img src={iconImage} width={50} height={50} alt="car_icon" />
          </AdvancedMarker>
        ))}
    </>
  );
};

export default memo(Markers);

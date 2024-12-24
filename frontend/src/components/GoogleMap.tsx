'use client';

import {
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
  APIProvider,
} from '@vis.gl/react-google-maps';

import Markers from './Markers.tsx';
import { useAtomValue, useSetAtom } from 'jotai/index';
import {
  isOpenInfoWindowAtom,
  locationAtom,
  prevLocationAtom,
  selectInfoWindowAtom,
} from './atom/globalState.ts';
import reactIcon from '../assets/react.svg';
import { useAtom } from 'jotai';
import { Button, Flex, Float, Text } from '@yamada-ui/react';
import { useMemo } from 'react';
import { MdLocationPin } from 'react-icons/md';

export default function GoogleMap() {
  const selectInfoWindow = useAtomValue(selectInfoWindowAtom);
  const [isOpenInfoWindow, setIsOpenInfoWindow] = useAtom(isOpenInfoWindowAtom);
  const [location, setLocation] = useAtom(locationAtom);
  const setPrevLocation = useSetAtom(prevLocationAtom);

  const map = useMap();

  const GOOGLE_API_KEY =
    import.meta.env.VITE_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY;

  type positionType = { lat: number; lng: number };

  const position: positionType = useMemo(() => {
    return {
      lat: location.latitude,
      lng: location.longitude,
    };
  }, [location.latitude, location.longitude]);

  function handleGetGeolocation() {
    getGeolocation(null);
  }

  //位置情報取得、ステートに保持
  function getGeolocation(calledTiming: string | null): void {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    function success(pos: GeolocationPosition) {
      const crd = pos.coords;
      // 不要な routes api の呼び出しを回避するための処理
      if (!calledTiming) {
        setPrevLocation(location);
      }
      setLocation({ latitude: crd.latitude, longitude: crd.longitude });
      console.log('getGeolocation: ', map);
      map?.panTo({ lat: crd.latitude, lng: crd.longitude });
    }
    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  return (
    <APIProvider apiKey={GOOGLE_API_KEY}>
      <div style={{ height: 'calc(100vh - 80px)', width: '100%' }}>
        <Map
          defaultZoom={18}
          defaultCenter={position}
          mapId="da37f3254c6a6d1c"
          disableDefaultUI={true}
        ></Map>
        <AdvancedMarker
          position={position}
          // onClick={() => setOpen(true)}
        ></AdvancedMarker>
        <Markers />

        {isOpenInfoWindow && (
          <InfoWindow
            position={selectInfoWindow}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            options={{
              // pinが隠れるので上にオフセットさせる
              pixelOffset: new google.maps.Size(0, -50),
            }}
            onClose={() => setIsOpenInfoWindow(false)}
          >
            <Flex alignItems="center" gap="3">
              <img src={reactIcon} width={40} height={40} alt="car_icon" />
              <Text>ここに車両名を入れる</Text>
            </Flex>
            <p>{`selectInfoWindow: ${selectInfoWindow?.lat} / ${selectInfoWindow?.lng}`}</p>
          </InfoWindow>
        )}
        <Float offset="xl" placement="center-end">
          <Button
            onClick={handleGetGeolocation}
            rounded="100%"
            width="60px"
            height="60px"
            fontSize="4xl"
            marginBottom="10"
            border="solid #F3F7F7 2px"
          >
            <MdLocationPin color="blue" />
          </Button>
        </Float>
      </div>
    </APIProvider>
  );
}

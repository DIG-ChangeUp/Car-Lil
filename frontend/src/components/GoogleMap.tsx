'use client';

import {
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from '@vis.gl/react-google-maps';

import Markers from './Markers.tsx';
import { useAtomValue, useSetAtom } from 'jotai/index';
import {
  isOpenInfoWindowAtom,
  locationAtom,
  prevLocationAtom,
  selectInfoWindowAtom,
  viewModeAtom,
} from './atom/globalState.ts';
import { useAtom } from 'jotai';
import { Button, Container, Flex, Float, Text } from '@yamada-ui/react';
import { useMemo } from 'react';
import { MdNavigation } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function GoogleMap() {
  const selectInfoWindow = useAtomValue(selectInfoWindowAtom);
  const [isOpenInfoWindow, setIsOpenInfoWindow] = useAtom(isOpenInfoWindowAtom);
  const [location, setLocation] = useAtom(locationAtom);
  const setPrevLocation = useSetAtom(prevLocationAtom);
  const viewMode = useAtomValue(viewModeAtom);
  const navigate = useNavigate();

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
      map?.panTo({ lat: crd.latitude, lng: crd.longitude });
    }
    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  function handleNavigate() {
    navigate('/tenantConfirmReservation');
  }

  const map = useMap();

  return (
    <div style={{ height: 'calc(100vh - 80px)', width: '100%' }}>
      <Map
        defaultZoom={18}
        defaultCenter={position}
        mapId="da37f3254c6a6d1c"
        disableDefaultUI={true}
      ></Map>
      <AdvancedMarker
        position={position}
        // onClick={handleGetGeolocation}
      ></AdvancedMarker>
      <Markers />
      {isOpenInfoWindow && selectInfoWindow && (
        <InfoWindow
          position={{
            lat: Number(selectInfoWindow.latitude),
            lng: Number(selectInfoWindow.longitude),
          }}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          options={{
            // pinが隠れるので上にオフセットさせる
            pixelOffset: new google.maps.Size(0, -50),
          }}
          onClose={() => setIsOpenInfoWindow(false)}
        >
          <Flex alignItems="center" gap="3">
            <img
              src="../../public/carImages/alphard.jpg"
              width={40}
              height={40}
              alt="car_icon"
            />
            <Text>{selectInfoWindow.car_name}</Text>
          </Flex>
          <p>{selectInfoWindow.address}</p>
          <Container minWidth="200px">
            <Button rounded="full" onClick={handleNavigate}>
              利用する
            </Button>
          </Container>
        </InfoWindow>
      )}
      {viewMode === 'map' && (
        <Float offset="xl" placement="end-end">
          <Button
            onClick={handleGetGeolocation}
            rounded="100%"
            width="60px"
            height="60px"
            fontSize="4xl"
            marginBottom="10"
            transform="rotate(45deg)"
            bg="black"
            opacity="0.5"
          >
            <MdNavigation color="white" />
          </Button>
        </Float>
      )}
    </div>
  );
}

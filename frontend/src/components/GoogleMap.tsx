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
  mapSelectPointData,
  prevLocationAtom,
  selectInfoWindowAtom,
  viewModeAtom,
} from './atom/globalState.ts';
import { useAtom } from 'jotai';
import { Button, Container, Flex, Float, Text } from '@yamada-ui/react';
import { MdNavigation } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { ILocation } from '../../globals';

export default function GoogleMap() {
  const selectInfoWindow = useAtomValue(selectInfoWindowAtom);
  const [isOpenInfoWindow, setIsOpenInfoWindow] = useAtom(isOpenInfoWindowAtom);
  const [currLocation, setCurrLocation] = useAtom(locationAtom);
  const setPrevLocation = useSetAtom(prevLocationAtom);
  const viewMode = useAtomValue(viewModeAtom);
  const [atomMapSelectPointData, setAtomMapSelectPointData] =
    useAtom(mapSelectPointData);
  const navigate = useNavigate();
  const map = useMap();

  const MIDLAND_POSITION = { lat: 35.1704169, lng: 136.8849973 };
  const position = currLocation ? currLocation : MIDLAND_POSITION;

  //位置情報取得、ステートに保持
  function getGeolocation(): void {
    const options = {
      enableHighAccuracy: false, // 精度の高い位置精度の場合はtrue ただし通信が遅いのでfalseを採用
      timeout: 5000, // 位置情報が取得できない場合のタイムアウト（ms）、デフォルトはinfinityなので取得できるまでになる
      maximumAge: 30000, // 設定ms前までの取得値を利用する
    };
    function success(pos: GeolocationPosition) {
      const crd = pos.coords;
      const latestLocation = { lat: crd.latitude, lng: crd.longitude };
      if (currLocation) {
        setPrevLocation(currLocation);
        setCurrLocation(latestLocation);
      } else {
        setCurrLocation(latestLocation);
      }
      handlePanTo(latestLocation);
    }
    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  function handleNavigate() {
    if (selectInfoWindow) {
      navigate(
        `/emptyData/${selectInfoWindow.carport_id}/${selectInfoWindow.carport_id}`
      );
    }
  }

  // クリックしたピンをmap中心にする処理
  const handlePanTo = useCallback(
    (latestLocation: ILocation) => {
      if (!map) return;
      // 一旦閉じてから
      setIsOpenInfoWindow(false);
      map.panTo(new google.maps.LatLng(latestLocation.lat, latestLocation.lng));
    },
    [map, setIsOpenInfoWindow]
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  function handleClickedMapPoint(e) {
    setAtomMapSelectPointData({
      zoom: e.map.zoom,
      latLng: {
        lat: e.detail.latLng.lat,
        lng: e.detail.latLng.lng,
      },
    });
  }

  console.log('click event: ', atomMapSelectPointData);

  return (
    <div style={{ height: 'calc(100vh - 80px)', width: '100%' }}>
      <Map
        defaultZoom={18}
        defaultCenter={position}
        mapId="da37f3254c6a6d1c"
        disableDefaultUI={true}
        onClick={(e) => handleClickedMapPoint(e)}
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
              src={`${import.meta.env.VITE_ORIGIN_API_URL}/images/${selectInfoWindow.image1}`}
              width={40}
              height={30}
              object-fit="cover"
              alt="car_icon"
            />
            <Text>{selectInfoWindow.car_name}</Text>
          </Flex>
          <p>{selectInfoWindow.address}</p>
          <Container minWidth="200px">
            <Button
              rounded="full"
              backgroundColor="#289FAB"
              color="#FEFEFE"
              onClick={handleNavigate}
            >
              利用する
            </Button>
          </Container>
        </InfoWindow>
      )}
      {viewMode === 'map' && (
        <Float offset="xl" placement="end-end">
          <Button
            onClick={getGeolocation}
            rounded="100%"
            width="60px"
            height="60px"
            fontSize="4xl"
            marginBottom="10"
            transform="rotate(45deg)"
            colorScheme="blackAlpha"
            opacity="1"
          >
            <MdNavigation color="white" />
          </Button>
        </Float>
      )}
    </div>
  );
}

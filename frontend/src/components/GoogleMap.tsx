// 'use client';

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
  // mapSelectPointData,
  prevLocationAtom,
  selectInfoWindowAtom,
  viewModeAtom,
} from './atom/globalState.ts';
import { useAtom } from 'jotai';
import { Button, Float, HStack, Text } from '@yamada-ui/react';
import { MdNavigation } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ILocation } from '../../globals';

import { TimeBarIndicator, ITimeZone } from './TimeBarIndicator.tsx';
import { useCallback } from 'react';

const ownerRentalTime: ITimeZone = {
  strTime: '07:00',
  endTime: '23:00',
};

const bookingTime: ITimeZone[] = [
  {
    strTime: '14:00',
    endTime: '16:00',
  },
];

export default function GoogleMap() {
  const selectInfoWindow = useAtomValue(selectInfoWindowAtom);
  const [isOpenInfoWindow, setIsOpenInfoWindow] = useAtom(isOpenInfoWindowAtom);
  const [currLocation, setCurrLocation] = useAtom(locationAtom);
  const setPrevLocation = useSetAtom(prevLocationAtom);
  const viewMode = useAtomValue(viewModeAtom);
  // const setAtomMapSelectPointData = useSetAtom(mapSelectPointData);
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

  // map event残し
  // function handleClickedMapPoint(e: MapMouseEvent | null) {
  //   if (!e || !e.detail.latLng) return;
  //   if (e.map.getZoom() === undefined) return;
  //   setAtomMapSelectPointData({
  //     zoom: e.map.getZoom(),
  //     latLng: {
  //       lat: e.detail.latLng.lat,
  //       lng: e.detail.latLng.lng,
  //     },
  //   });
  // }

  return (
    <div style={{ height: 'calc(100vh - 80px)', width: '100%' }}>
      <Map
        defaultZoom={18}
        defaultCenter={position}
        mapId="da37f3254c6a6d1c"
        disableDefaultUI={true} //Map上のストリートViewなどのボタンを非表示にする
        reuseMaps={true} // Map表示するたびにapiリクエストするのを防ぐ
        // onClick={(e) => handleClickedMapPoint(e)}
      ></Map>
      <AdvancedMarker
        position={position}
        // onClick={handleGetGeolocation}
      ></AdvancedMarker>
      <Markers />
      {isOpenInfoWindow && selectInfoWindow && (
        // infoWindowのカスタム表示については以下を参照
        // https://visgl.github.io/react-google-maps/docs/api-reference/components/info-window
        <InfoWindow
          pixelOffset={[0, -50]}
          position={{
            lat: Number(selectInfoWindow.latitude),
            lng: Number(selectInfoWindow.longitude),
          }}
          onClose={() => setIsOpenInfoWindow(false)}
          headerContent={
            <Text fontSize={'16px'} fontWeight={'bold'}>
              {selectInfoWindow.car_name}
            </Text>
          }
          minWidth={320}
        >
          <HStack mb={2}>
            <img
              src={`${import.meta.env.VITE_ORIGIN_API_URL}/images/${selectInfoWindow.image1}`}
              width={80}
              height={60}
              object-fit="cover"
              alt="car_icon"
            />
            <Text>{selectInfoWindow.address}</Text>
          </HStack>
          <TimeBarIndicator
            ownerRentalTime={ownerRentalTime}
            bookingTime={bookingTime}
          />
          <Button
            w={'100%'}
            rounded="full"
            backgroundColor="#289FAB"
            color="#FEFEFE"
            onClick={handleNavigate}
          >
            利用する
          </Button>
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

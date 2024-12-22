'use client';

import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { Markers } from './Markers.tsx';
import { useAtomValue } from 'jotai/index';
import {
  isOpenInfoWindowAtom,
  locationAtom,
  selectInfoWindowAtom,
} from './atom/globalState.ts';
import reactIcon from '../assets/react.svg';
import { useAtom } from 'jotai';
import { Flex, Text } from '@yamada-ui/react';

export default function GoogleMap() {
  const location = useAtomValue(locationAtom);
  const selectInfoWindow = useAtomValue(selectInfoWindowAtom);
  const [isOpenInfoWindow, setIsOpenInfoWindow] = useAtom(isOpenInfoWindowAtom);
  type positionType = { lat: number; lng: number };

  const position: positionType = {
    lat: location.latitude,
    lng: location.longitude,
  };

  const GOOGLE_API_KEY =
    import.meta.env.VITE_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY;

  console.log('location: ', selectInfoWindow);

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
      </div>
    </APIProvider>
  );
}

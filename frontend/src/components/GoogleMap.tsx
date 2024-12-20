'use client';

import { useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from '@vis.gl/react-google-maps';
import { Markers } from './Markers.tsx';
import { useAtomValue } from 'jotai/index';
import { locationAtom } from './atom/globalState.ts';

export default function GoogleMap() {
  const location = useAtomValue(locationAtom);
  type positionType = { lat: number; lng: number };

  const position: positionType = {
    lat: location.latitude,
    lng: location.longitude,
  };
  const [open, setOpen] = useState<boolean>(false);

  const GOOGLE_API_KEY =
    import.meta.env.VITE_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY;

  return (
    <APIProvider apiKey={GOOGLE_API_KEY}>
      <div style={{ height: '80vh', width: '100%' }}>
        <Map
          defaultZoom={18}
          defaultCenter={position}
          mapId="da37f3254c6a6d1c"
        ></Map>
        <AdvancedMarker
          position={position}
          onClick={() => setOpen(true)}
        ></AdvancedMarker>
        <Markers />

        {open && (
          <InfoWindow
            position={position}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            options={{
              // pinが隠れるので上にオフセットさせる
              pixelOffset: new google.maps.Size(0, -40),
            }}
            onClose={() => setOpen(false)}
          >
            <p>ミッドランド</p>
          </InfoWindow>
        )}
      </div>
    </APIProvider>
  );
}

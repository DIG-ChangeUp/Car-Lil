import { atom, useAtom } from 'jotai/index';
import { useEffect } from 'react';

type Position = {
  latitude: number | null;
  longitude: number | null;
};
type Carports = {
  id: number;
  car_id: number;
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
};
type ResponseBody = {
  data: [];
};
type ResponseContents = {
  ok: boolean;
  body: ResponseBody;
};

const positionAtom = atom<Position>({ latitude: null, longitude: null });
const distanceDataAtom = atom<[]>([]);
//   {
//   id: null,
//   car_id: null,
//   address: '',
//   latitude: null,
//   longitude: null,
//   distance: null,
// }
// );

export function PositionTest() {
  const [currentPosition, setCurrentPosition] = useAtom(positionAtom);
  const [distanceData, setDistanceData] = useAtom(distanceDataAtom);
  useEffect(() => {
    function executeGetGeolocation() {
      getGeolocation();
    }
    executeGetGeolocation();
  }, []);

  //位置情報をサーバ側にPOSTでリクエスト、距離データが返る
  async function getDataAroundCurrentPosition(position: Position) {
    if (position.latitude !== null && position.longitude !== null) {
      // @ts-ignore
      const response: ResponseContents = await fetch('/api/distance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPosition: currentPosition }),
      });
      if (response.ok) {
        setDistanceData(response.body.data);
      }
    } else {
      alert('位置情報がまだ取得できていません。');
    }
  }

  //位置情報取得、ステートに保持
  function getGeolocation(): void {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    function success(pos: any) {
      const crd = pos.coords;
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      setCurrentPosition({ latitude: crd.latitude, longitude: crd.longitude });
    }
    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  return (
    <div>
      <h1>current position</h1>
      <div>latitude:{currentPosition.latitude}</div>
      <div>longitude{currentPosition.longitude}</div>
      <div>↓ボタンだよ↓</div>
      <button
        style={{ backgroundColor: 'lightcyan' }}
        onClick={() => getDataAroundCurrentPosition(currentPosition)}
      >
        [位置情報送信 → データが返る]
      </button>
      {/*<div>*/}
      {/*  <div>*/}
      {/*    distanceData.length === 0 ? (<></>) : (*/}
      {/*    {distanceData.map((data: Carports, index: number) => {*/}
      {/*      return (*/}
      {/*        <div key={index}>*/}
      {/*          <div>{index + 1}番目に近い場所</div>*/}
      {/*          <div>{data.distance}</div>*/}
      {/*        </div>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*    )*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}

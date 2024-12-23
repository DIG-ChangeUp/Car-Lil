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
  //確認用
  useEffect(() => {
    console.log('lengthOfDistanceData:', distanceData.length);
  }, [distanceData]);

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
        // @ts-ignore
        const jsonResponse = await response.json();
        console.log('response.body-----', jsonResponse);
        setDistanceData(jsonResponse.data);
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
    function success(pos: GeolocationPosition) {
      const crd = pos.coords;
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      setCurrentPosition({ latitude: crd.latitude, longitude: crd.longitude });
    }
    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  return !currentPosition.latitude ? (
    <>
      <h1>位置情報がまだ取得できていない</h1>
    </>
  ) : (
    <div>
      <h1>＜現在位置＞</h1>
      <div>latitude（緯度）: {currentPosition.latitude}</div>
      <div>longitude（経度）: {currentPosition.longitude}</div>
      <br></br>
      <div>↓ボタンだよ↓</div>
      <button
        style={{ backgroundColor: 'lightcyan' }}
        onClick={() => getDataAroundCurrentPosition(currentPosition)}
      >
        [位置情報送信ボタン]
      </button>
      <br></br>
      <div>
        {distanceData.length === 0 ? (
          <></>
        ) : (
          distanceData.map((data: Carports, index: number) => {
            return (
              <div key={index}>
                <div>◾️{index + 1}番目に近い場所との直線距離</div>
                <div>→ {data.distance} km</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

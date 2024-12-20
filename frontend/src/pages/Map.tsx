import { auth } from '../components/auth/firebase';
import { useNavigate } from 'react-router-dom';
import { UseAuthContext } from '../components/AuthContext.tsx';
import { useEffect, useState } from 'react';
import GoogleMap from '../components/GoogleMap.tsx';
import { Button } from '@yamada-ui/react';
import { getGeolocation } from '../components/geolocation.ts';

import axios from 'axios';
//import { google } from '@googlemaps/google-maps-services-js';

import { ICarPort } from '../../globals';
import { useAtomValue, useSetAtom } from 'jotai/index';
import { locationAtom } from '../components/atom/globalState.ts';

const Map = () => {
  const navigate = useNavigate();
  const { user } = UseAuthContext();
  const location = useAtomValue(locationAtom);
  const setLocation = useSetAtom(locationAtom);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log('ログアウト エラー');
    }
  };

  // userが存在しない場合にリダイレクト
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]); // user または navigate が変更された場合にのみ実行

  /* =================================================================
   * 駐車場情報読み込み
   * ================================================================= */

  const [carPortList, setCarPortList] = useState<ICarPort[]>([]);

  useEffect(() => {
    (async () => {
      await getCarPortList();
      await getRootDistance();
      const userPosition = getGeolocation();
      setLocation(userPosition);
    })();
  }, []);

  async function getCarPortList() {
    const API_URL = import.meta.env.VITE_ORIGIN_API_URL + '/distance';
    const _resultCarPortList = await fetch(API_URL);
    const _aryCarPortList = await _resultCarPortList.json();
    setCarPortList(_aryCarPortList.data as ICarPort[]);
  }
  async function getRootDistance() {
    const origin = '城西小学校';
    const destination = '名古屋駅';
    const request = {
      origin,
      destination,
      key: import.meta.env.VITE_GOOGLE_API_KEY,
      mode: 'driving', // 移動手段を指定 (driving, walking, bicyclingなど)
    };

    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/directions/json',
        { params: request }
      );
      const distance = response.data.routes[0].legs[0].distance.text;
      console.log('距離:', distance);
      // ここで、取得した距離を画面に表示するなどの処理を行う
    } catch (error) {
      console.error('Error:', error);
    }
  }

  if (!user) {
    // navigateによるリダイレクトが完了するまで何もレンダリングしない
    return null;
  }

  console.log('location: ', location);

  return (
    <div>
      <h1>ホームページ</h1>
      {carPortList.map((carPort) => {
        return (
          <div key={carPort.id}>
            <p>{carPort.address}</p>
            <p>{carPort.distance}</p>
          </div>
        );
      })}

      <Button onClick={handleLogout}>ログアウト</Button>
      <GoogleMap />
    </div>
  );
};

export default Map;

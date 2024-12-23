import { auth } from '../components/auth/firebase';
import { useNavigate } from 'react-router-dom';
import { UseAuthContext } from '../components/AuthContext.tsx';
import { useEffect, useState } from 'react';
import GoogleMap from '../components/GoogleMap.tsx';
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Float,
  Text,
  ZStack,
} from '@yamada-ui/react';
import { getGeolocation } from '../components/geolocation.ts';
import { MdLogout } from 'react-icons/md';
import { MdLocationPin } from 'react-icons/md';

import axios from 'axios';
//import { google } from '@googlemaps/google-maps-services-js';

import { ICarPort } from '../../globals';
import { useAtomValue, useSetAtom } from 'jotai/index';
import { locationAtom } from '../components/atom/globalState.ts';
import Footer from '../components/Footer.tsx';

const Map = () => {
  const navigate = useNavigate();
  const { user } = UseAuthContext();
  const location = useAtomValue(locationAtom);
  const setLocation = useSetAtom(locationAtom);
  const [viewMode, setViewMode] = useState('map');

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
      handleGetGeolocation();
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

  function handleViewModeClick(mode: string) {
    setViewMode(mode);
  }

  function handleGetGeolocation() {
    console.log('handleGetGeolocationが動いた！');
    const userPosition = getGeolocation();
    setLocation(userPosition);
  }

  console.log('location: ', location);
  console.log('carPortList: ', carPortList);

  return (
    <>
      <Center height="calc(100vh - 80px)" maxWidth="100vw">
        <ZStack width="100%">
          {/*{carPortList.map((carPort) => {*/}
          {/*  return (*/}
          {/*    <div key={carPort.id}>*/}
          {/*      <p>{carPort.address}</p>*/}
          {/*      <p>{carPort.distance}</p>*/}
          {/*    </div>*/}
          {/*  );*/}
          {/*})}*/}
          <Box height="calc(100vh - 80px)" width="100%">
            <GoogleMap />
            <Float offset="xl" placement="end-start">
              <Button
                onClick={handleLogout}
                rounded="100%"
                width="60px"
                height="60px"
                fontSize="4xl"
                marginBottom="10"
                border="solid #F3F7F7 2px"
              >
                <MdLogout />
              </Button>
            </Float>
            <Float offset="xl" placement="end-end">
              <Button
                onClick={handleGetGeolocation}
                rounded="100%"
                width="60px"
                height="60px"
                fontSize="4xl"
                marginBottom="10"
                marginRight="10"
                border="solid #F3F7F7 2px"
              >
                <MdLocationPin color="blue" />
              </Button>
            </Float>
          </Box>
          <Center w="100%">
            <Box
              width="180px"
              height="80px"
              bg="#F3F7F7"
              rounded="20px"
              boxShadow="0px 0px 15px -5px #777777"
            >
              <Text textAlign="center" marginTop="6px" fontWeight="bold">
                表示切替え
              </Text>
              <Center>
                <ButtonGroup
                  variant="outline"
                  w="160px"
                  marginTop="3px"
                  border="solid #c9c9c9 1px"
                  rounded="12px"
                >
                  <Button
                    colorScheme="gray"
                    w="80px"
                    color={viewMode === 'map' ? 'black' : '#c9c9c9'}
                    bg={viewMode === 'map' ? 'gray.100' : 'none'}
                    border={viewMode === 'map' ? 'solid black 1px' : 'none'}
                    onClick={() => handleViewModeClick('map')}
                  >
                    Map
                  </Button>
                  <Button
                    colorScheme="gray"
                    w="80px"
                    color={viewMode === 'list' ? 'black' : '#c9c9c9'}
                    bg={viewMode === 'list' ? 'gray.100' : 'none'}
                    border={viewMode === 'list' ? 'solid black 1px' : 'none'}
                    onClick={() => handleViewModeClick('list')}
                  >
                    List
                  </Button>
                </ButtonGroup>
              </Center>
            </Box>
          </Center>
        </ZStack>
      </Center>
      <Footer />
    </>
  );
};

export default Map;

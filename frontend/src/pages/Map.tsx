import { auth } from '../components/auth/firebase';
import { useNavigate } from 'react-router-dom';
import { UseAuthContext } from '../components/AuthContext.tsx';
import { useEffect, useState } from 'react';
import GoogleMap from '../components/GoogleMap.tsx';
import { APIProvider } from '@vis.gl/react-google-maps';

import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Float,
  ZStack,
} from '@yamada-ui/react';
import { MdLogout } from 'react-icons/md';

import { useAtom, useSetAtom } from 'jotai/index';
import {
  allCarPorteAtom,
  locationAtom,
  prevLocationAtom,
  viewModeAtom,
} from '../components/atom/globalState.ts';
import Footer from '../components/Footer.tsx';
import DistanceCardList from '../components/DistanceCardList.tsx';

const Map = () => {
  const navigate = useNavigate();
  const { user } = UseAuthContext();
  const [viewMode, setViewMode] = useAtom(viewModeAtom);
  const [distanceData, setDistanceData] = useState<DistanceData[]>([]);
  const [location, setLocation] = useAtom(locationAtom);
  const [prevLocation, setPrevLocation] = useAtom(prevLocationAtom);
  const setAllCarPorte = useSetAtom(allCarPorteAtom);

  const GOOGLE_API_KEY =
    import.meta.env.VITE_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY;

  type DistanceData = {
    routes: Route[];
  };

  type Route = {
    legs: Leg[];
  };

  type Leg = {
    end_address: string;
    distance: Distance;
  };

  type Distance = {
    text: string;
    value: number;
  };

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

  useEffect(() => {
    getGeolocation('first');
    getCars();
  }, []);

  if (!user) {
    // navigateによるリダイレクトが完了するまで何もレンダリングしない
    return null;
  }

  async function getCars() {
    const response = await fetch('/api/allCarports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPosition: location }),
    });
    if (response.ok) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const jsonResponse = await response.json();
      setAllCarPorte(jsonResponse.data);
    }
  }

  function handleViewModeClick(mode: 'map' | 'list') {
    setViewMode(mode);
    if (mode === 'list') {
      getGeolocation(null);
      if (JSON.stringify(location) !== JSON.stringify(prevLocation)) {
        getDataAroundCurrentPosition(location);
      }
    }
  }

  //位置情報をサーバ側にPOSTでリクエスト、距離データが返る
  type location = {
    latitude: number | null;
    longitude: number | null;
  };
  async function getDataAroundCurrentPosition(position: location) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const response: ResponseContents = await fetch('/api/distance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPosition: position }),
    });
    if (response.ok) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const jsonResponse = await response.json();
      setDistanceData(jsonResponse.data);
    }
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
    }
    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  return (
    <>
      <APIProvider apiKey={GOOGLE_API_KEY}>
        <Center height="calc(100vh - 80px)" maxWidth="100vw">
          <ZStack width="100%">
            <Box height="calc(100vh - 80px)" width="100%">
              {viewMode === 'map' ? (
                <GoogleMap />
              ) : (
                <DistanceCardList distanceData={distanceData} />
              )}
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
            </Box>
            <Center w="100%">
              <ButtonGroup
                variant="outline"
                w="160px"
                h="40px"
                marginTop="3px"
                border="solid #c9c9c9 1px"
                rounded="full"
                boxShadow="0px 0px 15px -5px #777777"
                bg="white"
              >
                <Button
                  colorScheme="gray"
                  w="80px"
                  h="40px"
                  color={viewMode === 'map' ? 'black' : '#c9c9c9'}
                  bg={viewMode === 'map' ? 'gray.100' : 'none'}
                  border={viewMode === 'map' ? 'solid black 1px' : 'none'}
                  onClick={() => handleViewModeClick('map')}
                  rounded="full"
                >
                  Map
                </Button>
                <Button
                  colorScheme="gray"
                  w="80px"
                  h="40px"
                  color={viewMode === 'list' ? 'black' : '#c9c9c9'}
                  bg={viewMode === 'list' ? 'gray.100' : 'none'}
                  border={viewMode === 'list' ? 'solid black 1px' : 'none'}
                  onClick={() => handleViewModeClick('list')}
                  rounded="full"
                >
                  List
                </Button>
              </ButtonGroup>
            </Center>
          </ZStack>
        </Center>
      </APIProvider>

      <Footer />
    </>
  );
};

export default Map;

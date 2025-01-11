import { useNavigate } from 'react-router-dom';
import { UseAuthContext } from '../components/AuthContext.tsx';
import { useCallback, useEffect, useState } from 'react';
import GoogleMap from '../components/GoogleMap.tsx';
import { APIProvider } from '@vis.gl/react-google-maps';

import { Box, Button, ButtonGroup, Center, ZStack } from '@yamada-ui/react';

import { useAtom, useSetAtom } from 'jotai/index';
import {
  allCarPorteAtom,
  distanceDataAtom,
  locationAtom,
  prevLocationAtom,
  viewModeAtom,
} from '../components/atom/globalState.ts';
import Footer from '../components/Footer.tsx';
import DistanceCardList from '../components/DistanceCardList.tsx';
import MyLoading from '../components/MyLoading.tsx';

const Map = () => {
  const navigate = useNavigate();
  const { authUser } = UseAuthContext();
  const [viewMode, setViewMode] = useAtom(viewModeAtom);
  const [distanceData, setDistanceData] = useAtom(distanceDataAtom);
  const [currLocation, setCurrLocation] = useAtom(locationAtom);
  const setPrevLocation = useSetAtom(prevLocationAtom);
  const [atomAllCarPorte, setAtomAllCarPorte] = useAtom(allCarPorteAtom);
  const [isLoading, setIsLoading] = useState(false);

  const GOOGLE_API_KEY =
    import.meta.env.VITE_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY;

  // userが存在しない場合にリダイレクト
  useEffect(() => {
    if (!authUser) navigate('/login');
  }, [authUser, navigate]);

  useEffect(() => {
    getGeolocation();
  }, []);

  const getCars = useCallback(async () => {
    if (!currLocation) return;
    const response = await fetch('/api/allCarports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPosition: currLocation }),
    });
    if (response.ok) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const jsonResponse = await response.json();
      setAtomAllCarPorte(jsonResponse.data);
    }
  }, [currLocation, setAtomAllCarPorte]);

  useEffect(() => {
    if (atomAllCarPorte.length < 1) {
      setIsLoading(true);
      (async () => {
        await getCars();
        setIsLoading(false);
      })();
    }
  }, [atomAllCarPorte, getCars]);

  // navigateによるリダイレクトが完了するまで何もレンダリングしない
  if (!authUser) return null;

  async function handleViewModeClick(mode: 'map' | 'list') {
    setViewMode(mode);
    if (mode === 'list') {
      if (distanceData.length >= 1) return;

      const response = await fetch('/api/distance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPosition: currLocation }),
      });
      if (response.ok) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const jsonResponse = await response.json();
        setDistanceData(jsonResponse.data);
        console.log('Get: ', jsonResponse.data);
      }
    }
  }

  //位置情報取得、ステートに保持
  function getGeolocation(): void {
    setIsLoading(true);
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
      setIsLoading(false);
    }
    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      setIsLoading(false);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  //TODO:Google route api へのリクエストロジック修正が必要
  const hiddenMode = false;

  if (isLoading) return <MyLoading />;

  return (
    <>
      <APIProvider apiKey={GOOGLE_API_KEY}>
        <Center height="calc(100vh - 80px)" maxWidth="100vw">
          <ZStack width="100%">
            <Box height="calc(100vh - 80px)" width="100%">
              {viewMode === 'map' ? <GoogleMap /> : <DistanceCardList />}
            </Box>
            <Center w="100%">
              {hiddenMode ? null : (
                <ButtonGroup
                  variant="outline"
                  w="160px"
                  h="40px"
                  marginTop="3px"
                  // border="solid #c9c9c9 1px"
                  rounded="full"
                  boxShadow="0px 0px 15px -5px #777777"
                  bg="white"
                >
                  <Button
                    colorScheme="#289FAB"
                    w="80px"
                    h="40px"
                    color={viewMode === 'map' ? 'white' : '#c9c9c9'}
                    bg={viewMode === 'map' ? 'primary' : 'none'}
                    onClick={() => handleViewModeClick('map')}
                    border="none"
                    rounded="full"
                  >
                    Map
                  </Button>
                  <Button
                    colorScheme="#289FAB"
                    w="80px"
                    h="40px"
                    color={viewMode === 'list' ? 'white' : '#c9c9c9'}
                    bg={viewMode === 'list' ? '#primary' : 'none'}
                    onClick={() => handleViewModeClick('list')}
                    border="none"
                    rounded="full"
                  >
                    List
                  </Button>
                </ButtonGroup>
              )}
            </Center>
          </ZStack>
        </Center>
      </APIProvider>

      <Footer isOwnerMode={false} activeMenu={0} />
    </>
  );
};

export default Map;

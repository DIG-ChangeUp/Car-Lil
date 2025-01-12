import { useNavigate } from 'react-router-dom';
import { UseAuthContext } from '../components/AuthContext.tsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import GoogleMap from '../components/GoogleMap.tsx';
import { APIProvider } from '@vis.gl/react-google-maps';

import { Box, Center, Flex, ZStack } from '@yamada-ui/react';

import { useAtom, useSetAtom } from 'jotai/index';
import {
  allCarPorteAtom,
  distanceDataAtom,
  locationAtom,
  viewModeAtom,
} from '../components/atom/globalState.ts';
import Footer from '../components/Footer.tsx';
import DistanceCardList from '../components/DistanceCardList.tsx';
import MyLoading from '../components/MyLoading.tsx';

const Map = () => {
  const navigate = useNavigate();
  const { authUser } = UseAuthContext();
  const [viewMode, setViewMode] = useAtom(viewModeAtom);
  const setDistanceData = useSetAtom(distanceDataAtom);
  const [currLocation, setCurrLocation] = useAtom(locationAtom);
  const [atomAllCarPorte, setAtomAllCarPorte] = useAtom(allCarPorteAtom);
  const [isLoading, setIsLoading] = useState(false);
  const getDistanceApiRequestTime = useRef<Date | null>(null);

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
      if (checkRequestTiming()) return;
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
        getDistanceApiRequestTime.current = new Date();
      }
    }
  }

  function checkRequestTiming() {
    const currentTime = new Date();
    if (getDistanceApiRequestTime.current === null) return false;
    const timeDiff =
      currentTime.getTime() - getDistanceApiRequestTime.current.getTime();
    return timeDiff <= 5 * 60 * 1000; // 5分以内は実行しない
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
      setCurrLocation(latestLocation);
      setIsLoading(false);
    }
    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      setIsLoading(false);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

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
              <Flex
                w="160px"
                h="36px"
                marginTop="3px"
                border="none"
                rounded="full"
                boxShadow="0px 0px 15px -5px #777777"
                bg="white"
              >
                <Box
                  textAlign="center"
                  lineHeight="36px"
                  // colorScheme={'primary'}
                  w="80px"
                  h="36px"
                  color={viewMode === 'map' ? 'white' : '#c9c9c9'}
                  bg={viewMode === 'map' ? '#289fab' : 'none'}
                  onClick={() => handleViewModeClick('map')}
                  border="none"
                  rounded="full"
                >
                  Map
                </Box>
                <Box
                  textAlign="center"
                  lineHeight="36px"
                  // colorScheme={'primary'}
                  w="80px"
                  h="36px"
                  color={viewMode === 'list' ? 'white' : '#c9c9c9'}
                  bg={viewMode === 'list' ? '#289fab' : 'none'}
                  onClick={() => handleViewModeClick('list')}
                  border="none"
                  rounded="full"
                >
                  List
                </Box>
              </Flex>
            </Center>
          </ZStack>
        </Center>
      </APIProvider>

      <Footer isOwnerMode={false} activeMenu={0} />
    </>
  );
};

export default Map;

import { useNavigate } from 'react-router-dom';
import { UseAuthContext } from '../components/AuthContext.tsx';
import { useEffect } from 'react';
import GoogleMap from '../components/GoogleMap.tsx';
import { APIProvider } from '@vis.gl/react-google-maps';

import { Box, Button, ButtonGroup, Center, ZStack } from '@yamada-ui/react';

import { useAtom } from 'jotai/index';
import {
  distanceDataAtom,
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
  const [distanceData, setDistanceData] = useAtom(distanceDataAtom);
  const [location, setLocation] = useAtom(locationAtom);
  const [prevLocation, setPrevLocation] = useAtom(prevLocationAtom);

  const GOOGLE_API_KEY =
    import.meta.env.VITE_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY;

  // userが存在しない場合にリダイレクト
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]); // user または navigate が変更された場合にのみ実行

  if (!user) {
    // navigateによるリダイレクトが完了するまで何もレンダリングしない
    return null;
  }

  async function handleViewModeClick(mode: 'map' | 'list') {
    setViewMode(mode);
    if (mode === 'list') {
      getGeolocation(null);
      // 位置情報の変更がなければ、apiへの再取得はしない
      if (JSON.stringify(location) !== JSON.stringify(prevLocation)) {
        //位置情報をサーバ側にPOSTでリクエスト、距離データが返る
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await fetch('/api/distance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ currentPosition: location }),
        });
        if (response.ok) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const jsonResponse = await response.json();
          setDistanceData(jsonResponse.data);
        }
      }
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
            </Box>
            <Center w="100%">
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
                  bg={viewMode === 'map' ? '#289FAB' : 'none'}
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
                  bg={viewMode === 'list' ? '#289FAB' : 'none'}
                  onClick={() => handleViewModeClick('list')}
                  border="none"
                  rounded="full"
                >
                  List
                </Button>
              </ButtonGroup>
            </Center>
          </ZStack>
        </Center>
      </APIProvider>

      <Footer isOwnerMode={false} activeMenu={0} />
    </>
  );
};

export default Map;

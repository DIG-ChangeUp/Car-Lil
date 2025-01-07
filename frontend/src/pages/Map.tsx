import { useNavigate } from 'react-router-dom';
import { UseAuthContext } from '../components/AuthContext.tsx';
import { useEffect } from 'react';
import GoogleMap from '../components/GoogleMap.tsx';
import { APIProvider } from '@vis.gl/react-google-maps';

import { Box, Button, ButtonGroup, Center, ZStack } from '@yamada-ui/react';

import { useAtom, useAtomValue } from 'jotai/index';
import {
  diffDistanceAtom,
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
  const currLocation = useAtomValue(locationAtom);
  const prevLocation = useAtomValue(prevLocationAtom);
  const diffDistance = useAtomValue(diffDistanceAtom);

  const MAX_ROUTE_API_REQUEST = 3;

  const GOOGLE_API_KEY =
    import.meta.env.VITE_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY;

  // userが存在しない場合にリダイレクト
  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);
  // navigateによるリダイレクトが完了するまで何もレンダリングしない
  if (!user) return null;

  async function handleViewModeClick(mode: 'map' | 'list') {
    setViewMode(mode);
    if (mode === 'list') {
      // Google Route apiへの再取得しないための早期リターン
      if (JSON.stringify(currLocation) === JSON.stringify(prevLocation)) return;
      if (diffDistance === null) return;
      if (diffDistance < MAX_ROUTE_API_REQUEST) return;

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

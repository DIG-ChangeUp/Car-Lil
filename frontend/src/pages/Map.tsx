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
  Card,
  Center,
  Container,
  Float,
  HStack,
  ScrollArea,
  Spacer,
  Text,
  VStack,
  ZStack,
} from '@yamada-ui/react';
import { MdLogout } from 'react-icons/md';
import { MdLocationPin } from 'react-icons/md';

import { useAtom } from 'jotai/index';
import { locationAtom } from '../components/atom/globalState.ts';
import Footer from '../components/Footer.tsx';

const Map = () => {
  const navigate = useNavigate();
  const { user } = UseAuthContext();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [distanceData, setDistanceData] = useState<DistanceData[]>([]);
  const [location, setLocation] = useAtom(locationAtom);

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
    getGeolocation();
  }, []);

  if (!user) {
    // navigateによるリダイレクトが完了するまで何もレンダリングしない
    return null;
  }

  function handleViewModeClick(mode: 'map' | 'list') {
    setViewMode(mode);
  }

  function handleGetGeolocation() {
    getGeolocation();
    getDataAroundCurrentPosition(location);
    setLocation(location);
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
  function getGeolocation(): void {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    function success(pos: GeolocationPosition) {
      const crd = pos.coords;
      setLocation({ latitude: crd.latitude, longitude: crd.longitude });
    }
    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  const GOOGLE_API_KEY =
    import.meta.env.VITE_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY;

  return (
    <>
      <APIProvider apiKey={GOOGLE_API_KEY}>
        <Center height="calc(100vh - 80px)" maxWidth="100vw">
          <ZStack width="100%">
            <Box height="calc(100vh - 80px)" width="100%">
              {viewMode === 'map' ? (
                <GoogleMap />
              ) : (
                <Container marginTop="90px">
                  <ScrollArea h="calc(100vh - 80px - 120px)" w="100%">
                    <Container>
                      {distanceData.map((distance, index) => {
                        return (
                          <Card
                            marginTop="3px"
                            key={index + 1}
                            sx={{
                              padding: '3',
                            }}
                            backgroundColor="#F3F7F7"
                          >
                            <HStack>
                              <VStack>
                                <Text fontSize="14px">
                                  {
                                    distance.routes[0].legs[0].end_address
                                      .replace('日本、', '')
                                      .split(' ')[1]
                                  }
                                </Text>
                                <HStack>
                                  <Text>
                                    {distance.routes[0].legs[0].distance.text}
                                  </Text>
                                  <Spacer />
                                  <Text>
                                    {distance.routes[0].legs[0].distance.text}
                                  </Text>
                                </HStack>
                              </VStack>
                              <Button rounded="full" w="50px" h="46px">
                                予約
                              </Button>
                            </HStack>
                          </Card>
                        );
                      })}
                    </Container>
                  </ScrollArea>
                </Container>
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
              {viewMode === 'map' && (
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
              )}
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
        <Footer />
      </APIProvider>
    </>
  );
};

export default Map;

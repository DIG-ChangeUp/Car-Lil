import {
  Box,
  Button,
  Card,
  Container,
  HStack,
  Image,
  Text,
} from '@yamada-ui/react';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import {
  // userDataAtom,//正規データ用
  selectedCarDataAtom,
  shareDataAtom,
} from '../components/atom/globalState.ts';
import { useSetAtom, useAtomValue } from 'jotai';

import { useNavigate } from 'react-router-dom';
import {
  IShare,
  // IUser//正規データ用
} from '../../globals';
import { useEffect } from 'react';
import { UseAuthContext } from '../components/AuthContext.tsx';

const OwnerSelectCar = () => {
  const navigate = useNavigate();
  const { authUser } = UseAuthContext();
  const setSelectedCarData = useSetAtom(selectedCarDataAtom);
  // const userData = useAtomValue(userDataAtom);//正規データ用
  const shareData: IShare = useAtomValue(shareDataAtom);

  // userが存在しない場合にリダイレクト
  useEffect(() => {
    if (!authUser) navigate('/login');
  }, [authUser, navigate]);

  // navigateによるリダイレクトが完了するまで何もレンダリングしない
  if (!authUser) return null;

  // !!!発表のdemo用データ--------------------
  type Demo = {
    user_id: number;
    carport_id: number;
    share_car_id: number;
    user_type: string;
    car_name: string;
    maker: string | '';
    car_type: string;
    capacity: number;
    share_prise: number;
    share_state: string;
    image_1: string;
    image_2: string;
  };
  type DemoData = Demo[];
  const demoData: DemoData = [
    {
      user_id: 1,
      carport_id: 1,
      share_car_id: 1,
      user_type: 'オーナー',
      car_name: 'ヤリス',
      maker: 'トヨタ',
      car_type: 'コンパクト',
      capacity: 5,
      share_prise: 330,
      share_state: '待機',
      image_1: 'yaris_Ext.png',
      image_2: 'yaris_Int.png',
    },
  ];

  return (
    <>
      <Header routePath={''} headerTitle={'貸出車両選択'} />
      <Container
        w="100%"
        h="calc(100vh - 130px)"
        minW="300px"
        maxW="400px"
        m="0 auto"
      >
        <Text
          sx={{
            mt: 2,
            fontSize: 'xl',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          登録車両を選択してください
        </Text>
        <Box
          mx="4"
          borderRadius="10"
          overflow="auto"
          boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
        >
          {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
          {/*@ts-ignore*/}
          {/*{userData.map((data: IUser, index: number) => {//正規データ用*/}
          {demoData.map((data: Demo, index: number) => {
            return (
              <Card
                key={index + 1}
                sx={{
                  padding: '5',
                  marginX: 'auto',
                  bg: '#F3F7F7',
                }}
              >
                <Text>{`登録車両 ${index + 1}`}</Text>
                <HStack gap={'2%'} my={'2'}>
                  <Image
                    src={`${import.meta.env.VITE_ORIGIN_API_URL}/ownerCarImages/${data.image_1}`}
                    alt={'car'}
                    w={'49%'}
                  />
                  <Image
                    src={`${import.meta.env.VITE_ORIGIN_API_URL}/ownerCarImages/${data.image_2}`}
                    alt={'car'}
                    w={'49%'}
                  />
                </HStack>

                <HStack
                  gap={'0'}
                  // mb={'2'}
                  // pb={'1'}
                  borderBottom={'1px solid #D9D9D9'}
                >
                  <Text w={'30%'}>メーカー</Text>
                  <Text w={'3%'}>:</Text>
                  <Text>{data.maker}</Text>
                </HStack>

                <HStack
                  gap={'0'}
                  // mb={'2'}
                  // pb={'1'}
                  borderBottom={'1px solid #D9D9D9'}
                >
                  <Text w={'30%'}>車名</Text>
                  <Text w={'3%'}>:</Text>
                  <Text>{data.car_name}</Text>
                </HStack>

                <HStack
                  gap={'0'}
                  // mb={'2'}
                  // pb={'1'}
                  borderBottom={'1px solid #D9D9D9'}
                >
                  <Text w={'30%'}>タイプ</Text>
                  <Text w={'3%'}>:</Text>
                  <Text>{data.car_type}</Text>
                </HStack>

                <HStack
                  gap={'0'}
                  // mb={'2'}
                  // pb={'1'}
                  borderBottom={'1px solid #D9D9D9'}
                >
                  <Text w={'30%'}>乗車定員</Text>
                  <Text w={'3%'}>:</Text>
                  <Text>{data.capacity}</Text>
                </HStack>

                <HStack
                  gap={'0'}
                  mb={'4'}
                  pb={'1'}
                  borderBottom={'1px solid #D9D9D9'}
                >
                  <Text w={'30%'}>貸出料金</Text>
                  <Text w={'3%'}>:</Text>
                  <Text>{data.share_prise}円 / 15分</Text>
                </HStack>
                <Button
                  h="45"
                  bg="#289FAB"
                  color="#FEFEFE"
                  onClick={() => {
                    setSelectedCarData(data);
                    shareData.user_id = data.user_id;
                    shareData.carport_id = data.carport_id;
                    shareData.share_car_id = data.share_car_id;
                    navigate('/ownerSelectDay');
                  }}
                >
                  日時選択へ進む
                </Button>
              </Card>
            );
          })}
        </Box>
      </Container>
      <Footer isOwnerMode={true} activeMenu={-1} />
    </>
  );
};

export default OwnerSelectCar;

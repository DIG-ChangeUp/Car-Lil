import {
  Button,
  Card,
  Container,
  HStack,
  Image,
  ScrollArea,
  Separator,
  Text,
} from '@yamada-ui/react';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import {
  // userDataAtom,//正規データ用
  selectedCarDataAtom,
  shareDataAtom,
  // User,//正規データ用
  Share,
} from '../components/atom/globalState.ts';
import { useSetAtom, useAtomValue } from 'jotai';

import { useNavigate } from 'react-router-dom';

const OwnerSelectCar = () => {
  const navigate = useNavigate();
  const setSelectedCarData = useSetAtom(selectedCarDataAtom);
  // const userData = useAtomValue(userDataAtom);//正規データ用
  const shareData: Share = useAtomValue(shareDataAtom);

  // !!!demo用データ--------------------
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
      car_name: 'アクア',
      maker: 'TOYOTA',
      car_type: 'コンパクトカー',
      capacity: 5,
      share_prise: 330,
      share_state: '待機',
      image_1: 'yaris_Ext.png',
      image_2: 'yaris_Int.png',
    },
  ];

  return (
    <>
      <Header isOwnerMode={true} headerTitle={''} />
      <Container h="calc(100vh - 180px)">
        <Text
          sx={{
            marginY: 3,
            fontSize: 'xl',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          登録車両を選択してください
        </Text>
        <ScrollArea h="calc(100vh - 180px)" w="100%">
          <Container>
            {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
            {/*@ts-ignore*/}
            {/*{userData.map((data: User, index: number) => {//正規データ用*/}
            {demoData.map((data: Demo, index: number) => {
              return (
                <Container key={index + 1}>
                  <Card
                    sx={{
                      padding: '5',
                      backgroundColor: '#F3F7F7',
                    }}
                  >
                    <Text>{`登録車両 ${index + 1}`}</Text>
                    <HStack w="180" h="100">
                      <Image
                        src="../../src/assets/CarImages/Crown_Ext.png"
                        sx={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                      <Image
                        src="../../src/assets/CarImages/Crown_Int.png"
                        sx={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    </HStack>
                    <Text>メーカー：{data.maker}</Text>
                    <Separator />
                    <Text>車名：{data.car_name}</Text>
                    <Separator />
                    <Text>タイプ：{data.car_type}</Text>
                    <Separator />
                    <Text>定員：{data.capacity}</Text>
                    <Separator />
                    <Text>貸出料金：{data.share_prise}</Text>
                    <Button
                      backgroundColor="#289FAB"
                      color="#FEFEFE"
                      onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        setSelectedCarData(data);
                        shareData.user_id = data.user_id;
                        shareData.carport_id = data.carport_id;
                        shareData.share_car_id = data.share_car_id;
                        navigate('/calendar');
                      }}
                    >
                      日時選択へ進む
                    </Button>
                  </Card>
                </Container>
              );
            })}
          </Container>
        </ScrollArea>
      </Container>
      <Footer isOwnerMode={true} activeMenu={-1} />
    </>
  );
};

export default OwnerSelectCar;

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
  selectedDataAtom,
  shareDataAtom,
  User,
  Share,
  UserData,
} from '../components/atom/globalState.ts';
import { useSetAtom, useAtomValue } from 'jotai';

import { useNavigate } from 'react-router-dom';

const OwnerSelectCar = () => {
  const navigate = useNavigate();
  const setSelectedData = useSetAtom(selectedDataAtom);
  const demoData: UserData[] = [
    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      maker: 'トヨタ',
      car_name: 'クラウン',
      car_type: 'セダン',
      capacity: 5,
      share_prise: 330,
    },
    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      maker: 'ホンダ',
      car_name: 'N-B0X',
      car_type: '軽自動車',
      capacity: 4,
      share_prise: 330,
    },
    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      maker: 'トヨタ',
      car_name: 'ノア',
      car_type: 'ワンボックス',
      capacity: 7,
      share_prise: 330,
    },
  ];
  const shareData: Share = useAtomValue(shareDataAtom);

  return (
    <>
      <Header isOwnerMode={true} headerTitle={''} />
      <Container h="calc(100vh - 180px)">
        <Text marginY="20">登録車両を選択してください</Text>
        <ScrollArea h="calc(100vh - 180px)" w="100%">
          <Container>
            {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
            {/*@ts-ignore*/}
            {demoData.map((data: User, index: number) => {
              return (
                <Container key={index + 1}>
                  <Card
                    sx={{
                      padding: '5',
                      backgroundColor: '#F3F7F7',
                    }}
                  >
                    <Text>{`登録車両 ${index + 1}`}</Text>
                    <HStack height="100">
                      <Image src="../../src/assets/react.svg" />
                      <Image src="../../src/assets/react.svg" />
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
                        setSelectedData(data);
                        shareData.user_id = data.user_id;
                        shareData.carport_id = data.carport_id;
                        shareData.share_car_id = data.share_car_id;
                        console.log('shareData-----', shareData);
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
      <Footer isOwnerMode={true} activeMenu={0} />
    </>
  );
};

export default OwnerSelectCar;

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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
  userDataAtom,
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
  const userData: UserData[] = useAtomValue(userDataAtom);
  const shareData: Share = useAtomValue(shareDataAtom);

  return (
    <>
      <Header />
      <Container h="calc(100vh - 180px)">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/ownerTop"
              color="#4C70E5"
              textDecoration="underline"
            >
              オーナーページ
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink fontSize="larger">貸出車両選択</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <ScrollArea h="calc(100vh - 180px)" w="100%">
          <Container>
            {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
            {/*@ts-ignore*/}
            {userData.map((data: User, index: number) => {
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
      <Footer isOwnerMode={true} activeMenu={-1} />
    </>
  );
};

export default OwnerSelectCar;

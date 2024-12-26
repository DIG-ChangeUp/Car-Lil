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
///////!!!テスト用、share_carsデータがテストデータ決め打ち
import { Car, ShareCar, cars, shareCars } from './sampleData.tsx';
///////
import { useNavigate } from 'react-router-dom';

const OwnerSelectCar = () => {
  const navigate = useNavigate();

  ///////!!!テスト用、オーナーID決め打ち
  const ownerId = 8;
  ///////
  const carsData: Car[] = [];
  const carsOfUser1: ShareCar[] = shareCars.filter(
    (shareCar) => shareCar.user_id === ownerId
  );

  cars.forEach((car: Car) => {
    carsOfUser1.forEach((carOfUser1) => {
      if (car.id === carOfUser1.car_id) {
        carsData.push(car);
      }
    });
  });

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
            {carsData.map((car, index) => {
              return (
                <Container key={index + 1}>
                  <Card
                    sx={{
                      padding: '5',
                    }}
                    backgroundColor="#F3F7F7"
                  >
                    <Text>{`登録車両 ${index + 1}`}</Text>
                    <HStack height="100">
                      <Image src="../../src/assets/react.svg" />
                      <Image src="../../src/assets/react.svg" />
                    </HStack>
                    <Text>{`メーカー：${car.maker}`}</Text>
                    <Separator />
                    <Text>{`車名：${car.car_name}`}</Text>
                    <Separator />
                    <Text>{`タイプ：${car.car_type}`}</Text>
                    <Separator />
                    <Text>{`定員：${car.capacity}`}</Text>
                    <Separator />
                    <Text>{`貸出料金：330円`}</Text>
                    <Button
                      backgroundColor="#289FAB"
                      color="#FEFEFE"
                      onClick={() => {
                        navigate('/ownerConfirmation');
                      }}
                    >
                      確認画面へ進む
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

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
import { Car, ShareCar, cars, shareCars } from './sampleData.tsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { atom, useAtom } from 'jotai/index';
const carDataAtom = atom<object>({});
// const selectedKeyAtom = atom<number>(0);
const OwnerSelectCar = () => {
  const navigate = useNavigate();
  const [selectedCarDataAtom, setSelectedCarDataAtom] = useAtom(carDataAtom);
  // const [selectedKeyOfContainerAtom, setSelectedKeyOfContainerAtom] =
  //   useAtom(selectedKeyAtom);
  useEffect(() => {
    console.log('selectedCarDataAtom:', selectedCarDataAtom);
  }, [selectedCarDataAtom]);

  const ownerId = 8;
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

  // function getKeyOfContainer(keyOfContainer: number) {
  //   setSelectedKeyOfContainerAtom(keyOfContainer);
  // }

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
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="/ownerSelectCar" fontSize="larger">
              貸出車両選択
            </BreadcrumbLink>
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
                        setSelectedCarDataAtom({
                          maker: car.maker,
                          car_name: car.car_name,
                          car_type: car.car_type,
                          capacity: car.capacity,
                          prise: 330,
                        });
                        // navigate('/次の確認画面のルート');
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
      <Footer />
    </>
  );
};

export default OwnerSelectCar;

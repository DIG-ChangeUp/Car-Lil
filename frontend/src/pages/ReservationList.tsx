import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import dayjs from 'dayjs';

import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Container,
  HStack,
  ScrollArea,
  Spacer,
  Text,
  VStack,
} from '@yamada-ui/react';
import { useNavigate } from 'react-router-dom';

const ReservationList = () => {
  const [reservationData, setReservationData] = useState<ReservationData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getReservationData() {
      const response = await fetch('/api/reservations/tenant/2');
      if (response.ok) {
        const jsonResponse = await response.json();
        setReservationData(jsonResponse.data);
      }
    }
    getReservationData();
  }, []);
  console.log('getReservationData: ', reservationData);

  return (
    <>
      <Header isOwnerMode={false} headerTitle={'予約一覧'} />
      <Container h="calc(100vh - 180px)" centerContent>
        <ScrollArea w="100%" h="90%">
          {reservationData.map((reservation) => {
            return (
              <Card
                marginTop="3px"
                key={reservation.id}
                sx={{
                  padding: '3',
                }}
                backgroundColor="#F3F7F7"
                w="100%"
                marginBottom="10px"
              >
                <HStack>
                  <VStack>
                    <Text fontSize="14px">{reservation.address}</Text>
                    <Text fontSize="xl" fontWeight="bold">
                      {reservation.car_name}
                    </Text>
                    <Text>{`利用開始予定  ${dayjs(reservation.rent_at).format('YYYY-MM-DD HH:mm:ss')}`}</Text>
                  </VStack>
                </HStack>
              </Card>
            );
          })}
        </ScrollArea>
        <HStack w="100%" h="10%">
          <Spacer />
          <Button
            sx={{
              w: 180,
              h: 45,
              fontSize: 'xl',
              backgroundColor: '#F4F4F5',
              marginRight: '10px',
            }}
            onClick={() => {
              navigate('/map');
            }}
          >
            戻る
          </Button>
        </HStack>
      </Container>
      <Footer isOwnerMode={false} activeMenu={0} />
    </>
  );
};

export default ReservationList;

type ReservationData = {
  id: number;
  user_id: number;
  share_car_id: number;
  carport_id: number;
  share_state: string;
  reserved_at: string;
  rent_at: string;
  rented_at: string | null;
  return_at: string;
  returned_at: string | null;
  evaluation: string | null;
  is_refueled: boolean | null;
  is_washed: boolean | null;
  car_id: number;
  share_prise: number;
  car_name: string;
  maker: string;
  car_type: string;
  image1: string;
  image2: string;
  capacity: number;
  address: string;
  latitude: string;
  longitude: string;
};

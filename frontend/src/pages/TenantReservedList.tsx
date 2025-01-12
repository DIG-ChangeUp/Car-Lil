import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import dayjs from 'dayjs';

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  HStack,
  Text,
  VStack,
} from '@yamada-ui/react';
import { useNavigate } from 'react-router-dom';
import { UseAuthContext } from '../components/AuthContext.tsx';

const TenantReservedList = () => {
  const [reservationData, setReservationData] = useState<ReservationData[]>([]);
  const navigate = useNavigate();
  const { authUser } = UseAuthContext();
  const [filteredReservationsData, setFilteredReservationsData] = useState<
    ReservationData[]
  >([]);

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    } else {
      (async () => {
        const response = await fetch('/api/reservations/tenant/2');
        if (response.ok) {
          const jsonResponse = await response.json();
          setReservationData(jsonResponse.data);
        }
      })();
    }
  }, []);

  useEffect(() => {
    filterDataBySelectedDays();
  }, [reservationData]);

  // 確認用
  useEffect(() => {
    console.log('reservationData---', reservationData);
  }, [reservationData]);

  //テナントの予約データが今日の日付以降のもので絞り込む
  function filterDataBySelectedDays() {
    const today = new Date().toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const resultArr: ReservationData[] = [];
    reservationData.filter((data) => {
      if (Date.parse(data.rent_at) >= Date.parse(today)) {
        resultArr.push(data);
      }
    });
    setFilteredReservationsData(resultArr);
  }
  // navigateによるリダイレクトが完了するまで何もレンダリングしない
  if (!authUser) return null;

  return (
    <>
      <Header isOwnerMode={false} routePath={''} headerTitle={'予約一覧'} />
      <Container h="calc(100vh - 130px)" centerContent>
        <Box w="100%" h="90%" overflow="auto">
          {filteredReservationsData.map((reservation) => {
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
        </Box>
        <HStack w="100%" h="10%" justifyContent="start">
          <Button
            sx={{
              w: 180,
              h: 45,
              fontSize: 'xl',
              backgroundColor: '#F4F4F5',
            }}
            onClick={() => {
              navigate('/map');
            }}
          >
            戻る
          </Button>
        </HStack>
      </Container>
      <Footer isOwnerMode={false} activeMenu={1} />
    </>
  );
};

export default TenantReservedList;

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

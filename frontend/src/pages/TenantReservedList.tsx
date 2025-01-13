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
        <ScrollArea w="100%" h="90%">
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
      <Footer isOwnerMode={false} activeMenu={1} />
    </>
  );
};

export default TenantReservedList;

type ReservationData = {
  id: number;
  share_car_id: number;
  reserved_at: string;
  rent_at: string;
  owner_user_id: number;
  car_name: string;
  address: string;
};

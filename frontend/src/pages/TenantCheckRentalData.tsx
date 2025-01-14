import {
  Box,
  Button,
  Card,
  Container,
  HStack,
  Image,
  Separator,
  Text,
  VStack,
} from '@yamada-ui/react';
import Footer from '../components/Footer.tsx';
import Header from '../components/Header.tsx';
import { useNavigate } from 'react-router-dom';
import { atomCheckRentalData } from '../atoms/atomRentalTime.ts';
import { useAtomValue } from 'jotai';
import dayjs from 'dayjs';
import { UseAuthContext } from '../components/AuthContext.tsx';
import { useEffect } from 'react';

const TenantCheckRentalData = () => {
  const navigate = useNavigate();
  const { authUser } = UseAuthContext();
  const rentalData = useAtomValue(atomCheckRentalData);

  // userが存在しない場合にリダイレクト
  useEffect(() => {
    if (!authUser) navigate('/login');
  }, [authUser, navigate]);

  // navigateによるリダイレクトが完了するまで何もレンダリングしない
  if (!authUser) return null;

  //表示用のデータを準備
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const startDate = new Date(rentalData.start_rental_date).toISOString();
  const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD HH:mm');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const endDate = new Date(rentalData.end_rental_date).toISOString();
  const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD HH:mm');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const hour: number = rentalData.rental_time / 60;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const price: number = (rentalData.share_price * rentalData.rental_time) / 15;

  //新規予約を登録
  type Reservations = {
    user_id: number | null;
    share_car_id: number | null;
    carport_id: number | null;
    share_state: string | null;
    reserved_at: string | null;
    rent_at: string;
    rented_at: string | null;
    return_at: string;
    returned_at: string | null;
    evaluation: string | null;
    is_refueled: boolean | null;
    is_washed: boolean | null;
  };
  const submitData: Reservations = {
    user_id: 5,
    share_car_id: 1,
    carport_id: 1,
    share_state: '予約',
    reserved_at: '2025-01-01T0:00:00',
    rent_at: startDate,
    rented_at: null,
    return_at: endDate,
    returned_at: null,
    evaluation: null,
    is_refueled: null,
    is_washed: null,
  };

  async function addNewReservation(data: Reservations) {
    await fetch('/api/addNewReservation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    // if (response.ok) {
    //   const jsonResponse = await response.json();
    //   console.log(jsonResponse);
    // }
  }

  return (
    <>
      <Header
        isOwnerMode={true}
        routePath={'reservedList'}
        headerTitle={'予約確定'}
      />
      <Container h="calc(100vh - 130px)">
        <Text as={'h2'} fontSize={'16px'} fontWeight={'bolder'}>
          {rentalData.carport_address}
        </Text>
        <Box mx="3">
          <Card
            sx={{
              p: 3,
              bg: '#F3F7F7',
            }}
          >
            {/*登録車両情報*/}
            <Text>登録車両1</Text>
            <Box sx={{ mb: 5, px: 4, fontSize: 'sm', border: 'none' }}>
              <HStack
                sx={{
                  w: '100%',
                  h: 90,
                  justifyContent: 'space-around',
                  px: 1,
                  my: 2,
                }}
              >
                <Image
                  src={`${import.meta.env.VITE_ORIGIN_API_URL}/images/${rentalData.car_image_url1}`}
                  sx={{ maxWidth: '48%', maxHeight: '100%' }}
                />
                <Image
                  src={`${import.meta.env.VITE_ORIGIN_API_URL}/images/${rentalData.car_image_url2}`}
                  sx={{ maxWidth: '48%', maxHeight: '100%' }}
                />
              </HStack>
              <Text>メーカー：{rentalData.car_maker}</Text>
              <Separator />
              <Text>車名：{rentalData.car_name}</Text>
              <Separator />
              <Text>タイプ：{rentalData.car_type}</Text>
              <Separator />
              <Text>定員：{rentalData.car_capacity}</Text>
              <Separator />
              <Text>貸出料金：{rentalData.share_price}円 / 15分</Text>
              <Separator />
            </Box>
            {/*予約日時・金額*/}
            <Text>予約日時・金額</Text>
            <Card
              sx={{
                h: 105,
                mt: 1,
                px: 4,
                py: 3,
                fontSize: 'xs',
                backgroundColor: '#FFFFFF',
              }}
            >
              <VStack>
                <HStack
                  sx={{
                    h: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text>利用開始日時</Text>
                  <Text
                    sx={{
                      w: 120,
                      m: 'md',
                      px: 1,
                      backgroundColor: '#F3F7F7',
                      textAlign: 'right',
                      marginRight: 7,
                      borderRadius: 5,
                    }}
                  >
                    {formattedStartDate}
                  </Text>
                </HStack>
                <HStack
                  sx={{
                    h: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text>返却予定日時</Text>
                  <Text
                    sx={{
                      w: 120,
                      m: 'md',
                      px: 1,
                      backgroundColor: '#F3F7F7',
                      textAlign: 'right',
                      marginRight: 7,
                      borderRadius: 5,
                    }}
                  >
                    {formattedEndDate}
                  </Text>
                </HStack>
                <HStack
                  sx={{
                    h: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text>利用時間</Text>
                  <HStack>
                    <Text
                      sx={{
                        px: 1,
                        w: 120,
                        backgroundColor: '#F3F7F7',
                        textAlign: 'right',
                        borderRadius: 5,
                      }}
                    >
                      {hour}
                    </Text>
                    <Text>Ｈ</Text>
                  </HStack>
                </HStack>
                <HStack
                  sx={{
                    h: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text>利用料金</Text>
                  <HStack>
                    <Text
                      sx={{
                        px: 1,
                        w: 120,
                        backgroundColor: '#F3F7F7',
                        textAlign: 'right',
                        borderRadius: 5,
                      }}
                    >
                      {price}
                    </Text>
                    <Text>円</Text>
                  </HStack>
                </HStack>
              </VStack>
            </Card>
          </Card>
        </Box>

        {/*ボタン*/}
        <HStack justifyContent="center" mx="3">
          <Button
            sx={{
              w: 180,
              h: 45,
              fontSize: 'xl',
              bg: '#F4F4F5',
              mr: 1,
            }}
            onClick={() => {
              navigate(
                `/emptyData/${rentalData.carport_id}/${rentalData.share_car_id}`
              );
            }}
          >
            キャンセル
          </Button>
          <Button
            sx={{
              w: 180,
              h: 45,
              fontSize: 'xl',
              bg: '#289FAB',
              color: '#FEFEFE',
              ml: 1,
            }}
            onClick={async () => {
              await addNewReservation(submitData);
              navigate('/tenantCompleteRentalData');
            }}
          >
            確定
          </Button>
        </HStack>
      </Container>
      <Footer isOwnerMode={true} activeMenu={0} />
    </>
  );
};

export default TenantCheckRentalData;

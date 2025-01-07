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

const TenantCheckRentalData = () => {
  const navigate = useNavigate();

  const rentalData = useAtomValue(atomCheckRentalData);
  //表示用のデータを準備
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const startDate = new Date(rentalData.start_rental_date).toISOString();
  const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD HH:mm');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const endDate = new Date(rentalData.end_rental_date).toISOString();
  const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD HH:mm:');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const hour: number = rentalData.rental_time / 60;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const price: number = (rentalData.share_price * rentalData.rental_time) / 15;

  //新規予約を登録
  //!!!TODO:テスト用予約データのため修正
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
    rent_at: '2025-01-20T10:00:00',
    rented_at: null,
    return_at: '2025-01-20T16:00:00',
    returned_at: null,
    evaluation: null,
    is_refueled: null,
    is_washed: null,
  };
  async function addNewReservation(data: Reservations) {
    const response = await fetch('/api/addNewReservation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
    }
  }

  return (
    <>
      <Header isOwnerMode={false} headerTitle={'予約確定'} />
      <Container h="calc(100vh - 180px)">
        <Text fontSize="xl" fontWeight="bold">
          予約内容
        </Text>
        <Container>
          <Card
            sx={{
              padding: 3,
              backgroundColor: '#F3F7F7',
            }}
          >
            {/*登録車両情報*/}
            <Text>登録車両</Text>
            <br></br>
            <Card sx={{ padding: '5', fontSize: 'sm' }}>
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
              <br></br>
              <Text>メーカー：</Text>
              <Separator />
              <Text>車名：{rentalData.car_name}</Text>
              <Separator />
              <Text>タイプ：{rentalData.car_type}</Text>
              <Separator />
              <Text>定員：{rentalData.car_capacity}</Text>
              <Separator />
              <Text>貸出料金：{rentalData.share_price}</Text>
            </Card>
            <br></br>
            {/*予約日時・金額*/}
            <Text>予約日時・金額</Text>
            <br></br>
            <Card
              sx={{
                h: 186,
                padding: 3,
                fontSize: 'sm',
                backgroundColor: '#FFFFFF',
              }}
            >
              <VStack>
                <HStack
                  sx={{
                    h: 7,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text>利用開始日時</Text>
                  <Box
                    sx={{
                      w: 155,
                      m: 'md',
                      backgroundColor: '#F3F7F7',
                      textAlign: 'center',
                      marginRight: 11,
                    }}
                  >
                    {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                    {/*@ts-ignore*/}
                    {formattedStartDate}
                  </Box>
                </HStack>
                <HStack
                  sx={{
                    h: 7,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text>返却予定日時</Text>
                  <Box
                    sx={{
                      w: 155,
                      m: 'md',
                      backgroundColor: '#F3F7F7',
                      textAlign: 'center',
                      marginRight: 11,
                    }}
                  >
                    {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                    {/*@ts-ignore*/}
                    {formattedEndDate}
                  </Box>
                </HStack>
                <HStack
                  sx={{
                    h: 7,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text>利用時間</Text>
                  <HStack>
                    <Box
                      sx={{
                        w: 120,
                        m: 'md',
                        backgroundColor: '#F3F7F7',
                        textAlign: 'right',
                      }}
                    >
                      {hour}
                    </Box>
                    <Text>H</Text>
                  </HStack>
                </HStack>
                <HStack
                  sx={{
                    h: 7,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text>利用料金</Text>
                  <HStack>
                    <Box
                      sx={{
                        w: 120,
                        m: 'md',
                        backgroundColor: '#F3F7F7',
                        textAlign: 'right',
                      }}
                    >
                      {price}
                    </Box>
                    <Text>円</Text>
                  </HStack>
                </HStack>
              </VStack>
            </Card>
          </Card>

          {/*ボタン*/}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              sx={{
                w: 180,
                h: 45,
                fontSize: 'xl',
                backgroundColor: '#F4F4F5',
                marginRight: '10px',
              }}
              onClick={() => {
                //TODO:キャンセル時の遷移先にパラメータを渡す
                // navigate('/emptyData/:car_port_id/:share_car_id');
              }}
            >
              キャンセル
            </Button>
            <Button
              sx={{
                w: 180,
                h: 45,
                fontSize: 'xl',
                backgroundColor: '#289FAB',
                color: '#FEFEFE',
                marginLeft: '10px',
              }}
              onClick={async () => {
                //!!!TODO:テスト用予約データのため修正
                await addNewReservation(submitData);
                navigate('/tenantCompleteShareData');
              }}
            >
              確定
            </Button>
          </Box>
        </Container>
      </Container>
      <Footer isOwnerMode={true} activeMenu={-1} />
    </>
  );
};

export default TenantCheckRentalData;

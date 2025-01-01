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
// import { useNavigate } from 'react-router-dom';

const TenantConfirmReservation = () => {
  // const navigate = useNavigate();

  //新規予約を登録
  //!!!テスト用予約データ
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
  const testData = {
    user_id: 8,
    share_car_id: 1,
    carport_id: 1,
    share_state: '予約',
    reserved_at: '2025-01-01 0:00:00',
    rent_at: '2025-01-11 11:00:00',
    rented_at: null,
    return_at: '2025-01-11 19:00:00',
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
      alert(jsonResponse.text);
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
              <Text>車名：</Text>
              <Separator />
              <Text>タイプ：</Text>
              <Separator />
              <Text>定員：</Text>
              <Separator />
              <Text>貸出料金：</Text>
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
                      w: 160,
                      m: 'md',
                      backgroundColor: '#F3F7F7',
                      textAlign: 'center',
                      marginRight: 11,
                    }}
                  >
                    仮2025-01-17-13-00{' '}
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
                      w: 160,
                      m: 'md',
                      backgroundColor: '#F3F7F7',
                      textAlign: 'center',
                      marginRight: 11,
                    }}
                  >
                    仮2025-01-17-17-00
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
                      仮4.0
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
                      仮1320
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
                // navigate('/');
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
                //!!!テストデータ挿入のため本番で修正-------
                //!!!また遷移先ページも本番で指定する
                await addNewReservation(testData);
                // navigate('/');
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

export default TenantConfirmReservation;

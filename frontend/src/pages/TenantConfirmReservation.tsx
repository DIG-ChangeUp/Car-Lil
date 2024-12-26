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

  return (
    <Container>
      <Header />
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
            <HStack height="100">
              <Image src="../../src/assets/react.svg" />
              <Image src="../../src/assets/react.svg" />
            </HStack>
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
              h: 185,
              padding: 3,
              fontSize: 'sm',
              backgroundColor: '#FFFFFF',
            }}
          >
            <VStack>
              <HStack
                sx={{ h: 7, display: 'flex', justifyContent: 'space-between' }}
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
                  2025-01-17-13-00{' '}
                </Box>
              </HStack>
              <HStack
                sx={{ h: 7, display: 'flex', justifyContent: 'space-between' }}
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
                  2025-01-17-17-00
                </Box>
              </HStack>
              <HStack
                sx={{ h: 7, display: 'flex', justifyContent: 'space-between' }}
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
                    4.0
                  </Box>
                  <Text>H</Text>
                </HStack>
              </HStack>
              <HStack
                sx={{ h: 7, display: 'flex', justifyContent: 'space-between' }}
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
                    1320
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
            onClick={() => {
              // navigate('/');
            }}
          >
            確定
          </Button>
        </Box>
      </Container>
      <Footer isOwnerMode={true} activeMenu={-1} />
    </Container>
  );
};

export default TenantConfirmReservation;

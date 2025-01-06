import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Text,
  VStack,
  Wrap,
} from '@yamada-ui/react';
import { useNavigate } from 'react-router-dom';
import { Share } from '../components/atom/globalState.ts';

//!!!データ保存のテスト用データ
const testData: Share = {
  user_id: 5,
  carport_id: 3,
  share_car_id: 1,
  start_at: '2025-01-06 10:00:00',
  end_at: '2025-01-06 16:00:00',
};

export default function OwnerConfirmation() {
  const navigate = useNavigate();

  async function submitShareData(data: Share) {
    const response: Response = await fetch('/api/addNewShareData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // !!!テスト用------------
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log('登録されたシェアデータ-----', jsonResponse.data);
    }
  }

  return (
    <>
      <Header isOwnerMode={true} headerTitle={''} />
      <Container sx={{ h: 'calc(100vh - 180px)' }}>
        <Breadcrumb sx={{ paddingTop: '5' }}>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/ownerTop"
              color="#4C70E5"
              textDecoration="underline"
            >
              トップ
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/ownerSelectCar"
              color="#4C70E5"
              textDecoration="underline"
            >
              貸出車両選択
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink sx={{ fontSize: 'larger' }}>
              貸出設定の確認
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <br></br>
        <Container>
          <Text
            sx={{
              w: 320,
              textAlign: 'left',
              fontWeight: 'bold',
              margin: 'auto',
            }}
          >
            貸出設定
          </Text>
          <Wrap
            sx={{
              w: 320,
              marginX: 'auto',
              padding: 3,
              alignItems: 'stretch',
              display: 'flex',
              justifyContent: 'left',
            }}
          >
            <Box
              sx={{
                w: 85,
                margin: 1,
                textAlign: 'center',
                verticalAlign: 'middle',
                borderRadius: 10,
                backgroundColor: '#F1C40F',
              }}
            >
              日付１
            </Box>
            <Box
              sx={{
                w: 85,
                margin: 1,
                textAlign: 'center',
                verticalAlign: 'middle',
                borderRadius: 10,
                backgroundColor: '#F1C40F',
              }}
            >
              日付２
            </Box>
            <Box
              sx={{
                w: 85,
                margin: 1,
                textAlign: 'center',
                verticalAlign: 'middle',
                borderRadius: 10,
                backgroundColor: '#F1C40F',
              }}
            >
              日付３
            </Box>
          </Wrap>
          <VStack
            sx={{
              w: 320,
              h: 'auto',
              backgroundColor: '#F3F7F7',
              margin: 'auto',
              paddingX: 8,
              paddingY: 4,
              borderRadius: '10px',
              flexShrink: 1,
            }}
          >
            <Text>車両：</Text>
            <Text>料金：</Text>
            <Text>開始：</Text>
            <Text>終了：</Text>
          </VStack>
        </Container>
        <Container sx={{ textAlign: 'center' }}>
          <Text fontWeight="bold">
            貸出設定を確定します<p></p>よろしいですか？
          </Text>
          <br></br>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              sx={{
                w: 140,
                h: 45,
                fontSize: 'xl',
                backgroundColor: '#F4F4F5',
                margin: '0 10px',
              }}
              onClick={() => {
                navigate('/selectTime');
              }}
            >
              戻る
            </Button>
            <Button
              sx={{
                w: 140,
                h: 45,
                fontSize: 'xl',
                backgroundColor: '#289FAB',
                color: '#FEFEFE',
                margin: '0 10px',
              }}
              onClick={async () => {
                // !!!引数はテスト用------
                await submitShareData(testData);
                navigate('/ownerRegistrationCompleted');
              }}
            >
              はい
            </Button>
          </Box>
        </Container>
      </Container>
      <Footer isOwnerMode={true} activeMenu={-1} />
    </>
  );
}

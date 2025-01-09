import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Text,
  VStack,
  Wrap,
} from '@yamada-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  shareDataAtom,
  selectedDateAndTimesAtom,
  selectedCarDataAtom,
} from '../components/atom/globalState.ts';
import { useAtomValue } from 'jotai';
import dayjs from 'dayjs';
import { IShare } from '../../globals';
import { UseAuthContext } from '../components/AuthContext.tsx';
import { useEffect } from 'react';

export default function OwnerCheckShareData() {
  const navigate = useNavigate();
  const { authUser } = UseAuthContext();
  const shareData = useAtomValue(shareDataAtom);
  const selectedCarData = useAtomValue(selectedCarDataAtom);
  const atomSelectedDateAndTime = useAtomValue(selectedDateAndTimesAtom);
  const submitData: IShare[] = [];

  // userが存在しない場合にリダイレクト
  useEffect(() => {
    if (!authUser) navigate('/login');
  }, [authUser, navigate]);

  // navigateによるリダイレクトが完了するまで何もレンダリングしない
  if (!authUser) return null;

  atomSelectedDateAndTime.map((singleDay) => {
    return submitData.push({
      user_id: shareData.user_id,
      carport_id: shareData.carport_id,
      share_car_id: shareData.share_car_id,
      start_at: `${singleDay.date}T${singleDay.start_at}`,
      end_at: `${singleDay.date}T${singleDay.end_at}`,
    });
  });

  async function submitShareData(data: IShare) {
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
      <Header
        isOwnerMode={true}
        routePath={'ownerSelectTime'}
        headerTitle={''}
      />
      <Container sx={{ h: 'calc(100vh - 130px)', overflow: 'auto' }}>
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
              alignItems: 'stretch',
              display: 'flex',
              justifyContent: 'left',
            }}
          >
            <HStack
              justifyContent="start"
              marginTop="6"
              px="6"
              h="40px"
              wrap="wrap"
              overflow="auto"
            >
              {atomSelectedDateAndTime.map((singleDay, index) => {
                return (
                  <Box
                    key={index}
                    rounded="full"
                    bg="yellow.500"
                    px="3"
                    py="1"
                    w="75px"
                  >
                    <Center>{dayjs(singleDay.date).format('M/D')}</Center>
                  </Box>
                );
              })}
            </HStack>
          </Wrap>
          <VStack
            sx={{
              w: 320,
              h: 'auto',
              backgroundColor: '#F3F7F7',
              margin: 'auto',
              paddingX: 8,
              paddingY: 3,
              borderRadius: '10px',
              flexShrink: 1,
            }}
          >
            <Text>車両：{selectedCarData.car_name}</Text>

            <Text>料金：{selectedCarData.share_prise}円/ 15分</Text>
            <Text>開始：{atomSelectedDateAndTime[0].start_at}</Text>
            <Text>終了：{atomSelectedDateAndTime[0].end_at}</Text>
          </VStack>
        </Container>
        <Container sx={{ textAlign: 'center' }}>
          <Text fontWeight="bold">
            貸出設定を確定します
            <br />
            よろしいですか？
          </Text>
          <HStack sx={{ justifyContent: 'center' }}>
            <Button
              sx={{
                w: 170,
                h: 45,
                fontSize: 'xl',
                backgroundColor: '#F4F4F5',
                marginX: '3px',
              }}
              onClick={() => {
                navigate('/selectTime');
              }}
            >
              キャンセル
            </Button>
            <Button
              sx={{
                w: 170,
                h: 45,
                fontSize: 'xl',
                backgroundColor: '#289FAB',
                color: '#FEFEFE',
                marginX: '3px',
              }}
              onClick={async () => {
                await Promise.all(
                  submitData.map(async (data) => {
                    await submitShareData(data);
                  })
                );
                navigate('/ownerCompleteShareData');
              }}
            >
              はい
            </Button>
          </HStack>
        </Container>
      </Container>
      <Footer isOwnerMode={true} activeMenu={0} />
    </>
  );
}

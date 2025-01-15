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
    await fetch('/api/addNewShareData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    // if (response.ok) {
    //   const jsonResponse = await response.json();
    //   console.log('登録されたシェアデータ-----', jsonResponse.data);
    // }
  }

  return (
    <>
      <Header routePath={'ownerSelectTime'} headerTitle={'新規貸出設定'} />
      <Center
        py="10"
        px="4"
        h="calc(100vh - 130px)"
        minW="300px"
        maxW="400px"
        m="0 auto"
      >
        <VStack>
          <Box>
            <HStack
              justifyContent="start"
              marginTop="6"
              px="6"
              h="80px"
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
            <VStack
              h="200px"
              bg="#F3F7F7"
              rounded="20"
              mt="6"
              py="10px"
              px="40px"
            >
              <Text lineHeight="33px">車両：{selectedCarData.car_name}</Text>
              <Text lineHeight="33px">
                料金：{selectedCarData.share_prise}円/ 15分
              </Text>
              <Text lineHeight="33px">
                開始：{atomSelectedDateAndTime[0].start_at}
              </Text>
              <Text lineHeight="33px">
                終了：{atomSelectedDateAndTime[0].end_at}
              </Text>
            </VStack>
          </Box>
          <Container textAlign="center">
            <Text fontWeight="bold">
              貸出設定を確定します
              <br />
              よろしいですか？
            </Text>
            <HStack justifyContent="center">
              <Button
                h="45"
                w="170"
                fontSize="xl"
                bg="#F4F4F5"
                mx="3px"
                onClick={() => {
                  navigate('/ownerSelectTime');
                }}
              >
                キャンセル
              </Button>
              <Button
                h="45"
                w="170"
                fontSize="xl"
                bg="primary"
                color="#FEFEFE"
                mx="3px"
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
        </VStack>
      </Center>
      <Footer isOwnerMode={true} activeMenu={0} />
    </>
  );
}

import { useAtomValue } from 'jotai';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
// UTCプラグインを読み込み
dayjs.extend(utc);
// timezoneプラグインを読み込み
dayjs.extend(timezone);
import {
  Box,
  Button,
  Center,
  Container,
  ScrollArea,
  Text,
  VStack,
} from '@yamada-ui/react';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import {
  currentShareDataAtom,
  selectedDateAtom,
} from '../components/atom/globalState.ts';
import { useNavigate } from 'react-router-dom';
import 'dayjs/locale/ja';
import CustomCalendar from '../components/CustomCalendar.tsx';
import { useEffect } from 'react';
import BorrowDateTable from '../components/BorrowDateTable.tsx';
import { useSetAtom } from 'jotai/index';
import { UseAuthContext } from '../components/AuthContext.tsx';

const OwnerSelectDay = () => {
  const atomSelectedDate = useAtomValue(selectedDateAtom);
  const setAtomCurrentShareData = useSetAtom(currentShareDataAtom);
  const navigate = useNavigate();
  const { authUser } = UseAuthContext();

  // demo用固定のcar_id で登録
  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    } else {
      (async () => {
        const response = await fetch('/api/share/1');
        if (response.ok) {
          const jsonResponse = await response.json();
          setAtomCurrentShareData(jsonResponse.data);
        }
      })();
    }
  }, [authUser, navigate]);

  // navigateによるリダイレクトが完了するまで何もレンダリングしない
  if (!authUser) return null;

  return (
    <>
      <Header
        isOwnerMode={true}
        routePath={'ownerSelectCar'}
        headerTitle={''}
      />
      <Container h="calc(100vh - 130px)" centerContent>
        <Box w="100%" h="calc(100% - 100px)">
          <Center>
            <CustomCalendar />
          </Center>
          <Container>
            <Text textAlign="center">貸出予定一覧</Text>
            <ScrollArea h="140" innerProps={{ as: VStack, gap: 'md' }}>
              <BorrowDateTable />
            </ScrollArea>
          </Container>
        </Box>
        <VStack w="100%" h="100px">
          <Text
            textAlign="center"
            color={atomSelectedDate.length > 0 ? 'white' : 'black'}
          >
            カレンダーから日付を選択してください
          </Text>
          <Button
            colorScheme="primary"
            variant="solid"
            onClick={() => navigate('/ownerSelectTime')}
            isDisabled={atomSelectedDate.length < 1}
          >
            時間指定に進む
          </Button>
        </VStack>
      </Container>
      <Footer isOwnerMode={true} activeMenu={-1} />
    </>
  );
};

export default OwnerSelectDay;

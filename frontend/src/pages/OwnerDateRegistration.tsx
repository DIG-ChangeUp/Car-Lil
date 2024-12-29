import { useAtom, useAtomValue } from 'jotai';
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
  borrowDateAtom,
  rentalDateAndTimesAtom,
  rentalDaysAtom,
  rentalEndTimeAtom,
  rentalStartTimeAtom,
} from '../components/atom/globalState.ts';
import { useNavigate } from 'react-router-dom';
import 'dayjs/locale/ja';
import CustomCalendar from '../components/CustomCalendar.tsx';
import { useEffect } from 'react';
import BorrowDateTable from '../components/BorrowDateTable.tsx';
import { useSetAtom } from 'jotai/index';

const OwnerDateRegistration = () => {
  const rentalDays = useAtomValue(rentalDaysAtom);
  const [rentalDateAndTimes, setRentalDateAndTimes] = useAtom(
    rentalDateAndTimesAtom
  );
  const rentalStartTime = useAtomValue(rentalStartTimeAtom);
  const rentalEndTime = useAtomValue(rentalEndTimeAtom);
  const setBorrowDate = useSetAtom(borrowDateAtom);

  const navigate = useNavigate();

  function makeRentalData() {
    type rentalData = {
      date: string;
      start_at: string | null;
      end_at: string | null;
    };
    const rentalData: rentalData[] = [];
    rentalDays.forEach((rentalDay) => {
      rentalData.push({
        date: rentalDay,
        start_at: rentalStartTime,
        end_at: rentalEndTime,
      });
    });
    setRentalDateAndTimes(rentalData);
    navigate('/selectTime');
  }

  console.log('rentalDays: ', rentalDays);
  console.log('rentalDateAndTimes: ', rentalDateAndTimes);

  // 🚨🚨🚨🚨🚨 注意！固定のshare_car_idでデータを取得しているので修正が必要！
  useEffect(() => {
    (async () => {
      const response = await fetch('/api/share/1');
      if (response.ok) {
        const jsonResponse = await response.json();
        setBorrowDate(jsonResponse.data);
      }
    })();
  }, []);

  return (
    <>
      <Header isOwnerMode={true} headerTitle={''} />
      <Container h="calc(100vh - 180px)" centerContent>
        <Box w="100%" h="85%">
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
        <VStack w="100%" h="15%">
          <Text
            textAlign="center"
            color={rentalDays.length > 0 ? 'white' : 'black'}
          >
            カレンダーから日付を選択してください
          </Text>
          <Button
            colorScheme="primary"
            variant="solid"
            onClick={makeRentalData}
            isDisabled={rentalDays.length < 1}
          >
            時間指定に進む
          </Button>
        </VStack>
      </Container>
      <Footer isOwnerMode={true} activeMenu={-1} />
    </>
  );
};

export default OwnerDateRegistration;

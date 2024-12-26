import { useAtom, useAtomValue } from 'jotai';
import { Calendar } from '@yamada-ui/calendar';
import {
  Button,
  Container,
  NativeTable,
  ScrollArea,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@yamada-ui/react';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import {
  rentalDateAndTimesAtom,
  rentalDaysAtom,
  rentalEndTimeAtom,
  rentalStartTimeAtom,
} from '../components/atom/globalState.ts';

const OwnerDateRegistration = () => {
  const [rentalDays, setRentalDays] = useAtom(rentalDaysAtom);
  const [rentalDateAndTimes, setRentalDateAndTimes] = useAtom(
    rentalDateAndTimesAtom
  );
  const rentalStartTime = useAtomValue(rentalStartTimeAtom);
  const rentalEndTime = useAtomValue(rentalEndTimeAtom);

  function dateFormat(date: Date): string {
    return date
      .toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .split('/')
      .join('-');
  }

  function descTimeSort(a: string, b: string) {
    return a < b ? 1 : -1;
  }

  function createDays(days: Date[]) {
    const formattedDays: string[] = [];
    days.forEach((day) => {
      formattedDays.push(dateFormat(day));
    });

    formattedDays.sort((a: string, b: string) => descTimeSort(a, b));
    setRentalDays(formattedDays);
  }

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
  }

  console.log('rentalDays: ', rentalDays);
  console.log('rentalDateAndTimes: ', rentalDateAndTimes);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() - 1);

  return (
    <>
      <Header isOwnerMode={true} headerTitle={''} />
      <Container h="calc(100vh - 180px)" centerContent>
        <Calendar
          locale="ja"
          dateFormat="YYYY年 MM月"
          fontSize="1xl"
          excludeDate={(date) => date < tomorrow}
          firstDayOfWeek="sunday" // 日曜始まり
          variant="subtle"
          defaultValue={[]}
          today
          onChange={(value) => createDays(value)}
          // value={selectDate}
        />
        <Container>
          <ScrollArea h="140" innerProps={{ as: VStack, gap: 'md' }}>
            <TableContainer>
              <NativeTable variant="striped">
                <Thead>
                  <Tr>
                    <Th>車両</Th>
                    <Th>貸出可能日時</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  <Tr>
                    <Td>ヤリス</Td>
                    <Td>12月26日 10:30-16:00</Td>
                  </Tr>
                  <Tr>
                    <Td>ヤリス</Td>
                    <Td>12月26日 10:30-16:00</Td>
                  </Tr>
                  <Tr>
                    <Td>ヤリス</Td>
                    <Td>12月26日 10:30-16:00</Td>
                  </Tr>
                  <Tr>
                    <Td>{'ハイラックスサーフ'.substring(0, 7) + '...'}</Td>
                    <Td>12月26日 10:30-16:00</Td>
                  </Tr>
                  <Tr>
                    <Td>ヤリス</Td>
                    <Td>12月26日 10:30-16:00</Td>
                  </Tr>
                  <Tr>
                    <Td>ヤリス</Td>
                    <Td>12月26日 10:30-16:00</Td>
                  </Tr>
                  <Tr>
                    <Td>ヤリス</Td>
                    <Td>12月26日 10:30-16:00</Td>
                  </Tr>
                  <Tr>
                    <Td>ヤリス</Td>
                    <Td>12月26日 10:30-16:00</Td>
                  </Tr>
                </Tbody>
              </NativeTable>
            </TableContainer>
          </ScrollArea>
        </Container>
        <Container>
          <Button
            colorScheme="primary"
            variant="solid"
            onClick={makeRentalData}
          >
            時間指定に進む
          </Button>
          {rentalDays.length > 0 || (
            <Text textAlign="center">カレンダーから日付を選択してください</Text>
          )}
        </Container>
      </Container>
      <Footer isOwnerMode={true} activeMenu={-1} />
    </>
  );
};

export default OwnerDateRegistration;

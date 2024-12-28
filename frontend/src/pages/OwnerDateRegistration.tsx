import { useAtom, useAtomValue } from 'jotai';
import {
  Box,
  Button,
  Center,
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
import { useNavigate } from 'react-router-dom';
import 'dayjs/locale/ja';
import CustomCalendar from '../components/CustomCalendar.tsx';

const OwnerDateRegistration = () => {
  const rentalDays = useAtomValue(rentalDaysAtom);
  const [rentalDateAndTimes, setRentalDateAndTimes] = useAtom(
    rentalDateAndTimesAtom
  );
  const rentalStartTime = useAtomValue(rentalStartTimeAtom);
  const rentalEndTime = useAtomValue(rentalEndTimeAtom);
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

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() - 1);

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
              <TableContainer>
                <NativeTable variant="striped">
                  <Thead>
                    <Tr>
                      <Th>日付</Th>
                      <Th>開始</Th>
                      <Th></Th>
                      <Th>終了</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    <Tr>
                      <Td fontSize="16px">12月26日</Td>
                      <Td fontSize="16px">10:30</Td>
                      <Td fontSize="16px">~</Td>
                      <Td fontSize="16px">14:30</Td>
                    </Tr>
                    <Tr>
                      <Td fontSize="16px">12月26日</Td>
                      <Td fontSize="16px">10:30</Td>
                      <Td fontSize="16px">~</Td>
                      <Td fontSize="16px">14:30</Td>
                    </Tr>
                    <Tr>
                      <Td fontSize="16px">12月26日</Td>
                      <Td fontSize="16px">10:30</Td>
                      <Td fontSize="16px">~</Td>
                      <Td fontSize="16px">14:30</Td>
                    </Tr>
                    <Tr>
                      <Td fontSize="16px">12月26日</Td>
                      <Td fontSize="16px">10:30</Td>
                      <Td fontSize="16px">~</Td>
                      <Td fontSize="16px">14:30</Td>
                    </Tr>
                    <Tr>
                      <Td fontSize="16px">12月26日</Td>
                      <Td fontSize="16px">10:30</Td>
                      <Td fontSize="16px">~</Td>
                      <Td fontSize="16px">14:30</Td>
                    </Tr>
                  </Tbody>
                </NativeTable>
              </TableContainer>
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

import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Select,
  Separator,
  Spacer,
  Switch,
  Text,
  VStack,
  Option,
} from '@yamada-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAtom, useAtomValue } from 'jotai/index';
import 'dayjs/locale/ja';
import {
  rentalDateAndTimesAtom,
  rentalDaysAtom,
} from '../components/atom/globalState.ts';
import dayjs from 'dayjs';
import { useState } from 'react';

const OwnerSelectTime = () => {
  const rentalDays = useAtomValue(rentalDaysAtom);
  const [startHourValue, setStartHourValue] = useState<string>('10');
  const [startMinutesValue, setStartMinutesValue] = useState<string>('00');
  const [endHourValue, setEndHourValue] = useState<string>('18');
  const [endMinutesValue, setEndMinutesValue] = useState<string>('00');
  const [rentalDateAndTimes, setRentalDateAndTimes] = useAtom(
    rentalDateAndTimesAtom
  );

  const navigate = useNavigate();

  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, '0')
  );
  const minutes = ['00', '15', '30', '45'];

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
        start_at: startHourValue + ':' + startMinutesValue,
        end_at: endHourValue + ':' + endMinutesValue,
      });
    });
    setRentalDateAndTimes(rentalData);
    navigate('/ownerConfirmation');
  }

  console.log('rentalDateAndTimes: ', rentalDateAndTimes);

  return (
    <>
      <Header isOwnerMode={true} headerTitle={''} />
      <Container h="calc(100vh - 180px)" centerContent>
        <Box w="100%" h="calc(100% - 100px)">
          <HStack justifyContent="start" marginTop="6" px="6" h="40px">
            {rentalDays.map((rentalDay) => {
              return (
                <Box
                  key={rentalDay}
                  rounded="full"
                  bg="yellow.500"
                  px="3"
                  py="1"
                  w="75px"
                >
                  <Center>{dayjs(rentalDay).format('M/D')}</Center>
                </Box>
              );
            })}
          </HStack>
          <Center>
            <Container h="200" bg="blackAlpha.50" rounded="20" marginTop="6">
              <HStack justifyContent="space-between">
                <Text>終日</Text>
                <Spacer />
                <Switch></Switch>
              </HStack>
              <Separator />
              <HStack justifyContent="space-between">
                <Text w="200px">開始</Text>
                <Spacer />
                <Select
                  bg="white"
                  w="180px"
                  value={startHourValue}
                  onChange={setStartHourValue}
                >
                  {hours.map((hour) => {
                    return (
                      <Option key={hour} value={hour}>
                        {hour}
                      </Option>
                    );
                  })}
                </Select>
                <Text>:</Text>
                <Select
                  bg="white"
                  w="180px"
                  value={startMinutesValue}
                  onChange={setStartMinutesValue}
                >
                  {minutes.map((minute) => {
                    return (
                      <Option key={minute} value={minute}>
                        {minute}
                      </Option>
                    );
                  })}
                </Select>
              </HStack>
              <Separator />
              <HStack justifyContent="space-between">
                <Text w="200px">終了</Text>
                <Spacer />
                <Select
                  bg="white"
                  w="180px"
                  value={endHourValue}
                  onChange={setEndHourValue}
                >
                  {hours.map((hour) => {
                    return (
                      <Option key={hour} value={hour}>
                        {hour}
                      </Option>
                    );
                  })}
                </Select>
                <Text>:</Text>
                <Select
                  bg="white"
                  w="180px"
                  value={endMinutesValue}
                  onChange={setEndMinutesValue}
                >
                  {minutes.map((minute) => {
                    return (
                      <Option key={minute} value={minute}>
                        {minute}
                      </Option>
                    );
                  })}
                </Select>
              </HStack>
            </Container>
          </Center>
        </Box>
        <VStack w="100%" h="100px">
          <Button
            marginTop="6"
            onClick={() => {
              makeRentalData();
              navigate('/ownerConfirmation');
            }}
          >
            確認画面に進む
          </Button>
        </VStack>
      </Container>
      <Footer isOwnerMode={true} activeMenu={-1} />
    </>
  );
};

export default OwnerSelectTime;

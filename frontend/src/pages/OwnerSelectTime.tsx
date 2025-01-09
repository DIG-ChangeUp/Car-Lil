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
import { useAtomValue, useSetAtom } from 'jotai/index';
import 'dayjs/locale/ja';
import {
  selectedDateAndTimesAtom,
  selectedDateAtom,
} from '../components/atom/globalState.ts';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { IRentalDateAndTime } from '../../globals';
import { UseAuthContext } from '../components/AuthContext.tsx';

const OwnerSelectTime = () => {
  const atomSelectedDate = useAtomValue(selectedDateAtom);
  const [startHourValue, setStartHourValue] = useState<string>('00');
  const [startMinutesValue, setStartMinutesValue] = useState<string>('00');
  const [endHourValue, setEndHourValue] = useState<string>('00');
  const [endMinutesValue, setEndMinutesValue] = useState<string>('00');
  const [isToggleOn, setIsToggleOn] = useState<boolean>(false);
  const [validationMsg, setValidationMsg] = useState<string>('');
  const [fontColor, setFontColor] = useState<string>('#0C0C0C');
  const setAtomSelectedDateAndTimes = useSetAtom(selectedDateAndTimesAtom);

  const navigate = useNavigate();
  const { authUser } = UseAuthContext();

  // userが存在しない場合にリダイレクト
  useEffect(() => {
    if (!authUser) navigate('/login');
  }, [authUser, navigate]);
  //トグルの状態が変わったタイミングでドロップダウンの時、分を変更
  useEffect(() => {
    switchTimesByToggleButton();
  }, [isToggleOn]);

  useEffect(() => {
    timeValidation(
      startHourValue,
      startMinutesValue,
      endHourValue,
      endMinutesValue
    );
  }, [startHourValue, startMinutesValue, endHourValue, endMinutesValue]);

  // navigateによるリダイレクトが完了するまで何もレンダリングしない
  if (!authUser) return null;

  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, '0')
  );
  const minutes = ['00', '15', '30', '45'];

  //貸出データの配列を作成
  function makeRentalData() {
    const rentalData: IRentalDateAndTime[] = [];
    atomSelectedDate.forEach((rentalDay) => {
      rentalData.push({
        date: rentalDay,
        start_at: startHourValue + ':' + startMinutesValue,
        end_at: endHourValue + ':' + endMinutesValue,
      });
    });
    setAtomSelectedDateAndTimes(rentalData);
    navigate('/ownerConfirmation');
  }
  //終日設定のトグルボタンのON/OFFでドロップダウンの時、分を切り替え
  function switchTimesByToggleButton() {
    if (isToggleOn) {
      setStartHourValue('00');
      setStartMinutesValue('00');
      setEndHourValue('23');
      setEndMinutesValue('45');
    } else {
      setStartHourValue('00');
      setStartMinutesValue('00');
      setEndHourValue('00');
      setEndMinutesValue('00');
    }
  }
  //貸出時間の設定が適切かをチェック、適切な場合のみ次のページに移動
  function timeValidation(
    startHr: string,
    startMin: string,
    endHr: string,
    endMin: string
  ) {
    const defaultMessage: string = '貸出開始と終了の時刻を選択してください';
    const errorMessage1: string = '貸出開始時間が終了時間を超過しています';
    const errorMessage2: string = '貸出可能時間は15分以上で設定してください';
    const registrableMessage: string = '指定の時間で登録可能です';

    const startTime: number = Number(startHr) * 60 + Number(startMin);
    const endTime: number = Number(endHr) * 60 + Number(endMin);

    //時刻未選択または全て00の場合
    if (!startTime && !endTime) {
      setFontColor('#0C0C0C');
      setValidationMsg(defaultMessage);
      //開始時刻が終了時刻を超過している場合
    } else if (startTime > endTime) {
      setFontColor('#FF0404');
      setValidationMsg(errorMessage1);
      //開始時刻と終了時刻が同じ場合
    } else if (startTime === endTime) {
      setFontColor('#FF0404');
      setValidationMsg(errorMessage2);
      //登録可能な時刻の場合
    } else {
      setFontColor('#289FAB');
      setValidationMsg(registrableMessage);
    }
  }

  return (
    <>
      <Header
        isOwnerMode={true}
        routePath={'ownerSelectDay'}
        headerTitle={''}
      />
      <Container h="calc(100vh - 130px)" centerContent>
        <Box w="100%" h="calc(100% - 100px)">
          <HStack
            justifyContent="start"
            marginTop="6"
            px="6"
            h="80px"
            wrap="wrap"
            overflow="auto"
          >
            {atomSelectedDate.map((rentalDay) => {
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
                <Switch
                  onChange={() => {
                    setIsToggleOn(!isToggleOn);
                  }}
                ></Switch>
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
          <Text
            sx={{
              textAlign: 'center',
              color: fontColor,
            }}
          >
            {validationMsg}
          </Text>
          <Button
            marginTop="6"
            onClick={() => {
              if (validationMsg === '指定の時間で登録可能です') {
                makeRentalData();
                navigate('/ownerCheckShareData');
              }
            }}
            sx={{
              bg: '#289FAB',
              color: '#FEFEFE',
            }}
          >
            確認画面に進む
          </Button>
        </VStack>
      </Container>
      <Footer isOwnerMode={true} activeMenu={0} />
    </>
  );
};

export default OwnerSelectTime;

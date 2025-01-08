import { useEffect, useState } from 'react';

import { useSetAtom } from 'jotai';
import { atomCheckRentalData} from '../atoms/atomRentalTime.ts';

import { Box, Button, Text, Center, HStack, Image, Select, SelectItem, ScrollArea } from '@yamada-ui/react';
import { useNavigate, useParams } from "react-router-dom";

import { ICheckRentalData, IRentalData } from '../../globals';
import { ITimeZone, TimeBarIndicator } from '../components/TimeBarIndicator.tsx';
import Footer from '../components/Footer.tsx';

const aryWeekday:string[] = ['日','月','火','水','木','金','土'];

const arySelectableHours: SelectItem[] = [
  {label: '--', value: '--'},
  {label: '00', value: '00'},
  {label: '01', value: '01'},
  {label: '02', value: '02'},
  {label: '03', value: '03'},
  {label: '04', value: '04'},
  {label: '05', value: '05'},
  {label: '06', value: '06'},
  {label: '07', value: '07'},
  {label: '08', value: '08'},
  {label: '09', value: '09'},
  {label: '10', value: '10'},
  {label: '11', value: '11'},
  {label: '12', value: '12'},
  {label: '13', value: '13'},
  {label: '14', value: '14'},
  {label: '15', value: '15'},
  {label: '16', value: '16'},
  {label: '17', value: '17'},
  {label: '18', value: '18'},
  {label: '19', value: '19'},
  {label: '20', value: '20'},
  {label: '21', value: '21'},
  {label: '22', value: '22'},
  {label: '23', value: '23'}
]

const arySelectableMinutes: SelectItem[] = [
  {label: '--', value: '--'},
  {label: '00', value: '00'},
  {label: '15', value: '15'},
  {label: '30', value: '30'},
  {label: '45', value: '45'}
]

const errMsg_01:string = 'レンタル時間をすべて入力してください';
const errMsg_02:string = 'レンタル時間の終了時間が開始時間より前です';
const errMsg_03:string = 'レンタル時間は最低15分です';
const errMsg_04:string = '指定時間は貸出可能時間外です';
const errMsg_05:string = '指定時間内に貸出中の時間が含まれます';
const errMsg_06:string = '本日は貸出できません';

const aryErrorMessages:string[] = [
  errMsg_01,
  errMsg_02,
  errMsg_03,
  errMsg_04,
  errMsg_05,
  errMsg_06
]

export function TenantEmptyData() {
  const navigate = useNavigate();
  const pathParams = useParams();

  const setCheckRentalData = useSetAtom(atomCheckRentalData);

  const [currentRentalData, setCurrentRentalData] = useState<IRentalData>();
  const [currentRentalDate, setCurrentRentalDate] = useState<string>();
  const [currentYear, setCurrentYear] = useState<number>(0);
  const [currentMonth, setCurrentMonth] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<number>(0);
  const [rentalTime, setRentalTime] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const _apiUrl = import.meta.env.VITE_ORIGIN_API_URL + '/api/rentalData';

      const _carPortId = Number(pathParams.car_port_id);
      const _shareCarId = Number(pathParams.share_car_id);
      const _sendParams = {
        method : "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({
          car_port_id: _carPortId,
          share_car_id: _shareCarId
        })
      };

      const fetchResult = await fetch(_apiUrl, _sendParams);
      const _resultJSON = await fetchResult.json();
      const _resultRentalData:IRentalData = _resultJSON.data as IRentalData;

      const _rentalDate = new Date(_resultRentalData.rental_date);

      const _month = _rentalDate.getMonth() + 1;
      const _date = _rentalDate.getDate();
      const _weekDay = _rentalDate.getDay();
      const _currentRentalDate = `${_month}月${_date}日 (${aryWeekday[_weekDay]})`;

      setCurrentYear(_rentalDate.getFullYear());
      setCurrentMonth(_rentalDate.getMonth());
      setCurrentDate(_rentalDate.getDate());

      setCurrentRentalDate(_currentRentalDate);
      setCurrentRentalData(_resultRentalData);
    })()
  }, [pathParams.car_port_id, pathParams.share_car_id]);


  const [selectStrHours, setSelectStrHours] = useState<string>('--');
  function handlerSelectedStrHours(value: string){
    setSelectStrHours(value);
  }

  const [selectStrMinutes, setSelectStrMinutes] = useState<string>('--');
  function handlerSelectedStrMinutes(value: string){
    setSelectStrMinutes(value);
  }

  const [selectEndHours, setSelectEndHours] = useState<string>('--');
  function handlerSelectedEndHours(value: string){
    setSelectEndHours(value);
  }

  const [selectEndMinutes, setSelectEndMinutes] = useState<string>('--');
  function handlerSelectedEndMinutes(value: string){
    setSelectEndMinutes(value);
  }

  const [isErrorRentalTimeSetting, setIsErrorRentalTimeSetting] = useState<boolean>(true);
  const [msgErrorRentalTimeSetting, setMsgErrorRentalTimeSetting] = useState<string>(aryErrorMessages[0]);
  const [msgRentalTime, setMsgRentalTime] = useState<string>('');

  /**
   * レンタル時間の設定が正しいかチェック
   */
  useEffect(() => {
    checkRentalTimeSetting();

    function checkRentalTimeSetting() {
      const ownerRentalTime:ITimeZone | null | undefined = currentRentalData?.owner_rental_time;
      const bookingTime:ITimeZone[] | undefined = currentRentalData?.booking_time;

      // 初期エラーチェック
      if(ownerRentalTime === undefined || bookingTime === undefined || ownerRentalTime === null) {
        setIsErrorRentalTimeSetting(true);
        setMsgErrorRentalTimeSetting(aryErrorMessages[6]);
        return false;
      }

      // レンタル時間未入力チェック
      if(selectStrHours === '--' || selectStrMinutes === '--' || selectEndHours === '--' || selectEndMinutes === '--') {
        setIsErrorRentalTimeSetting(true);
        setMsgErrorRentalTimeSetting(aryErrorMessages[0]);
        return false;
      }
      
      const strHours = Number(selectStrHours);
      const strMinutes = Number(selectStrMinutes);
      const endHours = Number(selectEndHours);
      const endMinutes = Number(selectEndMinutes);

      // オーナーが指定した貸出時間内かどうかのチェック
      const strTime = strHours * 60 + strMinutes;
      const endTime = endHours * 60 + endMinutes;

      const ownerStrTime = Number(ownerRentalTime.strTime.split(':')[0]) * 60 + Number(ownerRentalTime.strTime.split(':')[1]);
      const ownerEndTime = Number(ownerRentalTime.endTime.split(':')[0]) * 60 + Number(ownerRentalTime.endTime.split(':')[1]);

      if(strTime < ownerStrTime || ownerEndTime < endTime) {
        setIsErrorRentalTimeSetting(true);
        setMsgErrorRentalTimeSetting(aryErrorMessages[3]);
        return false;
      }

      // 予約済み時間帯との重複チェック
      const _aryReservationTime: number[] = new Array(96).fill(0);
      const _strIndex = strMinutes / 15 + (strHours * 4);
      const _endIndex = endMinutes / 15 + (endHours * 4);

      for (let i = 0; i < _aryReservationTime.length; i++) {
        if(_strIndex <= i && i < _endIndex){
          _aryReservationTime[i] = 1;
        }
      }

      for (let i = 0; i < bookingTime.length; i++) {
        const _bookingTimeZone:ITimeZone = bookingTime[i];

        const _srtHours = Number(_bookingTimeZone.strTime.split(':')[0]);
        const _strMinutes = Number(_bookingTimeZone.strTime.split(':')[1]);
        const _strBookingIndex = _strMinutes / 15 + (_srtHours * 4);

        const _endHours = Number(_bookingTimeZone.endTime.split(':')[0]);
        const _endMinutes = Number(_bookingTimeZone.endTime.split(':')[1]);
        const _endBookingIndex = _endMinutes / 15 + (_endHours * 4);

        const _aryBookingTime: number[] = new Array(96).fill(0);

        for (let j = 0; j < _aryBookingTime.length; j++) {
          if(_strBookingIndex <= j && j < _endBookingIndex){
            _aryBookingTime[j] = 1;
          }
        }

        const _aryCheckTime: number[] = new Array(96).fill(0);

        for(let j = 0; j < _aryCheckTime.length; j++) {
          _aryCheckTime[j] = _aryReservationTime[j] + _aryBookingTime[j];
        }

        let _isOverlap:boolean = false;
        for(let j = 0; j < _aryCheckTime.length; j++) {
          if(_aryCheckTime[j] > 1) {
            _isOverlap = true;
            break;
          }
        }

        if(_isOverlap) {
          setIsErrorRentalTimeSetting(true);
          setMsgErrorRentalTimeSetting(aryErrorMessages[4]);
          return false;
        }
      }

      // 終了時間が開始時間より前になっていないかチェック
      if(strTime >= endTime) {
        setIsErrorRentalTimeSetting(true);
        setMsgErrorRentalTimeSetting(aryErrorMessages[1]);
        return false;
      }

      // 最低15分以上入力されているかチェック
      if(endTime - strTime < 15) {
        setIsErrorRentalTimeSetting(true);
        setMsgErrorRentalTimeSetting(aryErrorMessages[2]);
        return false;
      }

      const _rentalTime:number = endTime - strTime;
      setRentalTime(_rentalTime? _rentalTime : 0);
      if (_rentalTime < 60) {
        setMsgRentalTime(`利用予定時間：${_rentalTime}分`);
      } else {
        const hours:number = Math.floor(_rentalTime / 60);
        const minutes:number = _rentalTime % 60;
        setMsgRentalTime(`利用予定時間：${hours}時間${minutes}分`);
      }

      setIsErrorRentalTimeSetting(false);
      setMsgErrorRentalTimeSetting('');

      return true;
    }

  }, [selectStrHours, selectStrMinutes, selectEndHours, selectEndMinutes, currentRentalData?.owner_rental_time, currentRentalData?.booking_time]);

  function handlerClickCancel() {
    navigate('/map');
  }

  function handlerClickReservation() {

    if(currentRentalDate !== undefined) {

      const _strHours = Number(selectStrHours);
      const _strMinutes = Number(selectStrMinutes);
      const _strTime = new Date(currentYear, currentMonth, currentDate, _strHours, _strMinutes);

      const _endHours = Number(selectEndHours);
      const _endMinutes = Number(selectEndMinutes);
      const _endTime = new Date(currentYear, currentMonth, currentDate, _endHours, _endMinutes);

      const _checkRentalData:ICheckRentalData = {
        carport_id: currentRentalData?.carport_id,
        carport_address: currentRentalData?.carport_address,
        share_car_id: currentRentalData?.share_car_id,
        share_price: currentRentalData?.share_price,
        car_id: currentRentalData?.car_id,
        car_maker: currentRentalData?.car_maker,
        car_name: currentRentalData?.car_name,
        car_type: currentRentalData?.car_type,
        car_capacity: currentRentalData?.car_capacity,
        car_image_url1: currentRentalData?.car_image_url1,
        car_image_url2: currentRentalData?.car_image_url2,
        start_rental_date: _strTime,
        end_rental_date: _endTime,
        rental_time: rentalTime
      }

      setCheckRentalData(_checkRentalData);

      navigate('/tenantCheckRentalData')
    }
  }

  return(
    <>
      <Box bg={'#F3F7F7'} w={'100%'} pt={'8'} pb={6}>
        <Center>
          <Text as={'h1'} fontSize={'18px'} fontWeight={'bolder'}>空き状況確認</Text>
        </Center>
      </Box>

      <ScrollArea w={'100%'} h="calc(100vh - 180px)" px={'6'} py={'2'}>

        <Text as={'h2'} fontSize={'16px'} fontWeight={'bolder'} mb={'2'}>{currentRentalData?.carport_address}</Text>

        <Box bg={'#F3F7F7'} w={'100%'} borderRadius={'8'} px={'4'} py={'2'}>
          <Text as={'h3'} fontSize={'16px'} mb={'4'}>登録車両1</Text>

          <HStack gap={'2%'} mb={'4'}>
            <Image src={import.meta.env.VITE_ORIGIN_API_URL + '/Images/' + currentRentalData?.car_image_url1} alt={'car'} w={'49%'} />
            <Image src={import.meta.env.VITE_ORIGIN_API_URL + '/Images/' + currentRentalData?.car_image_url2} alt={'car'} w={'49%'} />
          </HStack>

          <HStack gap={'0'} mb={'2'} pb={'1'} borderBottom={'1px solid #D9D9D9'}>
            <Text w={'30%'}>メーカー</Text>
            <Text w={'3%'}>:</Text>
            <Text>{currentRentalData?.car_maker}</Text>
          </HStack>

          <HStack gap={'0'} mb={'2'} pb={'1'} borderBottom={'1px solid #D9D9D9'}>
            <Text w={'30%'}>車名</Text>
            <Text w={'3%'}>:</Text>
            <Text>{currentRentalData?.car_name}</Text>
          </HStack>

          <HStack gap={'0'} mb={'2'} pb={'1'} borderBottom={'1px solid #D9D9D9'}>
            <Text w={'30%'}>タイプ</Text>
            <Text w={'3%'}>:</Text>
            <Text>{currentRentalData?.car_type}</Text>
          </HStack>

          <HStack gap={'0'} mb={'2'} pb={'1'} borderBottom={'1px solid #D9D9D9'}>
            <Text w={'30%'}>乗車定員</Text>
            <Text w={'3%'}>:</Text>
            <Text>{currentRentalData?.car_capacity}</Text>
          </HStack>

          <HStack gap={'0'} mb={'4'} pb={'1'} borderBottom={'1px solid #D9D9D9'}>
            <Text w={'30%'}>貸出料金</Text>
            <Text w={'3%'}>:</Text>
            <Text>{currentRentalData?.share_price}円 / 15分</Text>
          </HStack>

          <Center mb={'2'}>
            <Box bg={'white'} borderRadius={'12'} px={'8'} py={'1'}>
              {currentRentalDate}
            </Box>
          </Center>

          <Box py={'2'} borderBottom={'1px solid #A2A2A2'} mb={'2'}>
              <TimeBarIndicator
                ownerRentalTime={currentRentalData?.owner_rental_time}
                bookingTime={currentRentalData?.booking_time}
              />
          </Box>

          <HStack gap={'0'} mb={'4'} pb={'2'} borderBottom={'1px solid #A2A2A2'}>
            <Text w={'30%'} fontSize={'lg'}>開始</Text>
            <Select size='lg' w={'30%'} items={arySelectableHours} value={selectStrHours} onChange={(value:string) => handlerSelectedStrHours(value)} />
            <Center w={'10%'} >:</Center>
            <Select size='lg' w={'30%'} items={arySelectableMinutes} value={selectStrMinutes} onChange={(value:string) => handlerSelectedStrMinutes(value)}  />
          </HStack>

          <HStack gap={'0'} mb={'4'} pb={'2'} borderBottom={'1px solid #A2A2A2'}>
            <Text w={'30%'} fontSize={'lg'}>終了</Text>
            <Select size='lg' w={'30%'} items={arySelectableHours} value={selectEndHours} onChange={(value:string) => handlerSelectedEndHours(value)} />
            <Center w={'10%'} >:</Center>
            <Select size='lg' w={'30%'} items={arySelectableMinutes} value={selectEndMinutes} onChange={(value:string) => handlerSelectedEndMinutes(value)}  />
          </HStack>

          {!isErrorRentalTimeSetting &&
            <Box mb={'2'}>
              <Text align={'right'}>{msgRentalTime}</Text>
            </Box>
          }
        </Box>

        {isErrorRentalTimeSetting &&
          <Center mb={'2'}>
            <Text color={'red'}>{msgErrorRentalTimeSetting}</Text>
          </Center>
        }

        <HStack gap={'4'} mb={'10'}>
          <Button w={'50%'} h={'4em'} bg={'#AAAAAA'} onClick={handlerClickCancel}>キャンセル</Button>
          {!isErrorRentalTimeSetting &&
            <Button w={'50%'} h={'4em'} bg={'#289FAB'} color={'white'} onClick={handlerClickReservation}>予約する</Button>
          }
        </HStack>

      </ScrollArea>

      <Footer isOwnerMode={false} activeMenu={0} />
    </>
  );
}
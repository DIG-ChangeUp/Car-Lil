import { useEffect, useState } from 'react';

import { Box, Button, Text, Center, HStack, Image, Select, SelectItem, ScrollArea } from '@yamada-ui/react';
import { useNavigate } from "react-router-dom";

import { ITimeZone, TimeBarIndicator } from '../components/TimeBarIndicator.tsx';
import Footer from '../components/Footer.tsx';

const ownerRentalTime:ITimeZone = {
  strTime: '07:00',
  endTime: '23:00'
}

const bookingTime:ITimeZone[] = [
  {
    strTime: '13:00',
    endTime: '20:00'
  },
]

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
const errMsg_05:string = '指定時間は貸出中です';

const aryErrorMessages:string[] = [
  errMsg_01,
  errMsg_02,
  errMsg_03,
  errMsg_04,
  errMsg_05
]

export function UserCheckReservationAvailability() {
  const navigate = useNavigate();

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

      const strTime = strHours * 60 + strMinutes;
      const endTime = endHours * 60 + endMinutes;

      const ownerStrTime = Number(ownerRentalTime.strTime.split(':')[0]) * 60 + Number(ownerRentalTime.strTime.split(':')[1]);
      const ownerEndTime = Number(ownerRentalTime.endTime.split(':')[0]) * 60 + Number(ownerRentalTime.endTime.split(':')[1]);

      // オーナーが指定した貸出時間内かどうかのチェック
      if(strTime < ownerStrTime || ownerEndTime < endTime) {
        setIsErrorRentalTimeSetting(true);
        setMsgErrorRentalTimeSetting(aryErrorMessages[3]);
        return false;
      }

      // 予約済み時間帯との重複チェック
      for (let i = 0; i < bookingTime.length; i++) {
        const bookingStrTime = Number(bookingTime[i].strTime.split(':')[0]) * 60 + Number(bookingTime[i].strTime.split(':')[1]);
        const bookingEndTime = Number(bookingTime[i].endTime.split(':')[0]) * 60 + Number(bookingTime[i].endTime.split(':')[1]);

        if((strTime <= bookingStrTime && bookingStrTime < endTime) || (strTime < bookingEndTime && bookingEndTime <= endTime)) {
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

      const rentalTime:number = endTime - strTime;
      if (rentalTime < 60) {
        setMsgRentalTime(`利用予定時間：${rentalTime}分`);
      } else {
        const hours:number = Math.floor(rentalTime / 60);
        const minutes:number = rentalTime % 60;
        setMsgRentalTime(`利用予定時間：${hours}時間${minutes}分`);
      }

      setIsErrorRentalTimeSetting(false);
      setMsgErrorRentalTimeSetting('');

      return true;
    }

  }, [selectStrHours, selectStrMinutes, selectEndHours, selectEndMinutes]);



  function handlerClickCancel() {
    navigate('/');
  }


  return(
    <>
      <Box bg={'#F3F7F7'} w={'100%'} pt={'8'} pb={6}>
        <Center>
          <Text as={'h1'} fontSize={'18px'} fontWeight={'bolder'}>空き状況確認</Text>
        </Center>
      </Box>

      <ScrollArea w={'100%'} h="calc(100vh - 180px)" px={'6'} py={'2'}>

        <Text as={'h2'} fontSize={'16px'} fontWeight={'bolder'} mb={'2'}>駐車場住所</Text>

        <Box bg={'#F3F7F7'} w={'100%'} borderRadius={'8'} px={'4'} py={'2'}>
          <Text as={'h3'} fontSize={'16px'} mb={'4'}>登録車両1</Text>

          <HStack gap={'0'} mb={'4'}>
            <Image src={'../../src/assets/CarImages/Crown_Ext.png'} alt={'car'} w={'50%'} />
            <Image src={'../../src/assets/CarImages/Crown_Int.png'} alt={'car'} w={'50%'} />
          </HStack>

          <HStack gap={'0'} mb={'2'} pb={'1'} borderBottom={'1px solid #D9D9D9'}>
            <Text w={'20%'}>メーカー</Text>
            <Text w={'3%'}>:</Text>
            <Text>トヨタ</Text>
          </HStack>

          <HStack gap={'0'} mb={'2'} pb={'1'} borderBottom={'1px solid #D9D9D9'}>
            <Text w={'20%'}>車名</Text>
            <Text w={'3%'}>:</Text>
            <Text>クラウン</Text>
          </HStack>

          <HStack gap={'0'} mb={'4'} pb={'1'} borderBottom={'1px solid #D9D9D9'}>
            <Text w={'20%'}>タイプ</Text>
            <Text w={'3%'}>:</Text>
            <Text>セダン</Text>
          </HStack>

          <Center mb={'2'}>
            <Box bg={'white'} borderRadius={'12'} px={'8'} py={'1'}>
              12月19日 (木)
            </Box>
          </Center>

          <Box py={'2'} borderBottom={'1px solid #A2A2A2'} mb={'2'}>
            <TimeBarIndicator ownerRentalTime={ownerRentalTime} bookingTime={bookingTime}/>
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

        <HStack gap={'4'}>
          <Button w={'50%'} h={'4em'} bg={'#AAAAAA'} onClick={handlerClickCancel}>キャンセル</Button>
          {!isErrorRentalTimeSetting &&
            <Button w={'50%'} h={'4em'} bg={'#289FAB'} color={'white'}>予約</Button>
          }
        </HStack>

      </ScrollArea>

      <Footer isOwnerMode={false} activeMenu={0} />
    </>
  );
}
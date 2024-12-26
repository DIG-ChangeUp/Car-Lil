import { Box, Button, Text, Center, HStack, Image, Select, SelectItem, ScrollArea } from '@yamada-ui/react';
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
  {label: '00', value: '00'},
  {label: '15', value: '15'},
  {label: '30', value: '30'},
  {label: '45', value: '45'}
]

export function UserCheckReservationAvailability() {
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
            <Select size='lg' w={'30%'} items={arySelectableHours} />
            <Center w={'10%'} >:</Center>
            <Select size='lg' w={'30%'} items={arySelectableMinutes} />
          </HStack>

          <HStack gap={'0'} mb={'4'} pb={'2'} borderBottom={'1px solid #A2A2A2'}>
            <Text w={'30%'} fontSize={'lg'}>終了</Text>
            <Select size='lg' w={'30%'} items={arySelectableHours} />
            <Center w={'10%'} >:</Center>
            <Select size='lg' w={'30%'} items={arySelectableMinutes} />
          </HStack>

        </Box>

        <HStack gap={'4'}>
          <Button w={'50%'} h={'4em'} bg={'#AAAAAA'}>キャンセル</Button>
          <Button w={'50%'} h={'4em'} bg={'#289FAB'} color={'white'}>予約</Button>
        </HStack>

      </ScrollArea>

      <Footer isOwnerMode={false} activeMenu={0} />
    </>
  );
}
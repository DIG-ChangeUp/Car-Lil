import { Calendar } from '@yamada-ui/calendar';
import { Box, Center, Float, VStack } from '@yamada-ui/react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
// UTCプラグインを読み込み
dayjs.extend(utc);
// timezoneプラグインを読み込み
dayjs.extend(timezone);
import { useAtom, useAtomValue } from 'jotai/index';
import { currentShareDataAtom, selectedDateAtom } from './atom/globalState.ts';

const CustomCalendar = () => {
  const [atomSelectedDate, setAtomSelectedDate] = useAtom(selectedDateAtom);
  const atomCurrentShareData = useAtomValue(currentShareDataAtom);
  let borrows: string[] = [];
  // 本来はこの処理のみでOK
  atomCurrentShareData.forEach((borrow) => {
    borrows.push(dayjs(borrow.start_at).tz('Asia/Tokyo').format('YYYY-MM-DD'));
  });
  // demo day用に固定値を際代入、本来は必要ない
  borrows = [
    '2025-01-07',
    '2025-01-10',
    '2025-01-13',
    '2025-01-14',
    '2025-01-30',
    '2025-01-31',
  ];

  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

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
    return a > b ? 1 : -1;
  }

  function createDays(days: Date[]) {
    const formattedDays: string[] = [];
    days.forEach((day) => {
      formattedDays.push(dateFormat(day));
    });

    formattedDays.sort((a: string, b: string) => descTimeSort(a, b));
    setAtomSelectedDate(formattedDays);
  }

  return (
    <>
      <Calendar
        colorScheme={'primary'}
        maxSelectValues={5}
        locale="ja"
        dateFormat="YYYY年 MM月"
        fontSize="1xl"
        excludeDate={(date) => date < oneDayAgo}
        firstDayOfWeek="monday"
        variant="solid"
        defaultValue={[]}
        onChange={(value) => createDays(value)}
        dayProps={{
          h: 'auto',
          p: 2,
          _hover: {},
          _active: {},
          transitionProperty: 'none',
          component: ({ date, isSelected }) => (
            <VStack alignItems="center">
              <Center
                bg={isSelected ? 'green.200' : undefined}
                w={8}
                lineHeight={6}
                rounded="full"
                color={isSelected ? 'white' : undefined}
                transitionProperty="background"
                transitionDuration="normal"
                position="relative"
              >
                {date.getDate()}
                <Float offset={['6', '0']} placement="start-center">
                  {borrows.includes(dayjs(date).format('YYYY-MM-DD')) && (
                    <Box
                      w="1"
                      py="1"
                      px="1"
                      bg={
                        atomSelectedDate.includes(
                          dayjs(date).format('YYYY-MM-DD')
                        )
                          ? 'white'
                          : 'primary'
                      }
                      rounded="full"
                    ></Box>
                  )}
                </Float>
              </Center>
            </VStack>
          ),
        }}
      />
    </>
  );
};

export default CustomCalendar;

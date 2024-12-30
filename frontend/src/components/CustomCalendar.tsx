import { Calendar } from '@yamada-ui/calendar';
import { Box, Center, Float, VStack } from '@yamada-ui/react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
// UTCプラグインを読み込み
dayjs.extend(utc);
// timezoneプラグインを読み込み
dayjs.extend(timezone);
import { useAtomValue, useSetAtom } from 'jotai/index';
import { borrowDateAtom, rentalDaysAtom } from './atom/globalState.ts';

const CustomCalendar = () => {
  const setRentalDays = useSetAtom(rentalDaysAtom);
  const borrowDate = useAtomValue(borrowDateAtom);
  const borrows: string[] = [];
  borrowDate.forEach((borrow) => {
    borrows.push(dayjs(borrow.start_at).tz('Asia/Tokyo').format('YYYY-MM-DD'));
  });
  console.log('borrows: ', borrows);

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
    setRentalDays(formattedDays);
  }

  return (
    <>
      <Calendar
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
                bg={isSelected ? 'primary' : undefined}
                w={8}
                lineHeight={5}
                rounded="100px"
                color={isSelected ? 'white' : undefined}
                transitionProperty="background"
                transitionDuration="normal"
                position="relative"
              >
                {date.getDate()}
                <Float offset={['5.5', '0']} placement="start-center">
                  {borrows.includes(dayjs(date).format('YYYY-MM-DD')) && (
                    <Box w="1" py="1" px="1" bg="gray.200" rounded="full"></Box>
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

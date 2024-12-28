import { Calendar } from '@yamada-ui/calendar';
import { Box, Center, Float, VStack } from '@yamada-ui/react';
import dayjs from 'dayjs';
import { useSetAtom } from 'jotai/index';
import { rentalDaysAtom } from './atom/globalState.ts';

const CustomCalendar = () => {
  const date = dayjs();
  const date1 = date.add(1, 'day').format('YYYY-MM-DD');
  const date2 = date.add(2, 'day').format('YYYY-MM-DD');
  const date3 = date.add(3, 'day').format('YYYY-MM-DD');
  const date4 = date.add(4, 'day').format('YYYY-MM-DD');
  const dates = [date1, date2, date3, date4];

  const setRentalDays = useSetAtom(rentalDaysAtom);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() - 1);

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

  return (
    <>
      <Calendar
        locale="ja"
        dateFormat="YYYY年 MM月"
        fontSize="1xl"
        excludeDate={(date) => date < tomorrow}
        firstDayOfWeek="sunday" // 日曜始まり
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
                lineHeight={6}
                rounded="100px"
                color={isSelected ? 'white' : undefined}
                transitionProperty="background"
                transitionDuration="normal"
                position="relative"
              >
                {date.getDate()}
                <Float offset={['6.5', '0']} placement="start-center">
                  {dates.includes(dayjs(date).format('YYYY-MM-DD')) && (
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

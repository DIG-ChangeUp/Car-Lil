import { Calendar } from '@yamada-ui/calendar';
import { Box, Center, Float, VStack } from '@yamada-ui/react';
import dayjs from 'dayjs';

const SampleCalendar = () => {
  const date = dayjs();
  const date1 = date.add(1, 'day').format('YYYY-MM-DD');
  const date2 = date.add(2, 'day').format('YYYY-MM-DD');
  const date3 = date.add(3, 'day').format('YYYY-MM-DD');
  const date4 = date.add(4, 'day').format('YYYY-MM-DD');
  const dates = [date1, date2, date3, date4];

  // const tomorrow = dayjs(new Date()).add(1, 'day');

  console.log(dates);

  return (
    <>
      <Calendar
        locale="ja"
        dateFormat="YYYY年 MM月"
        fontSize="1xl"
        // excludeDate={(date) => date < tomorrow}
        firstDayOfWeek="sunday" // 日曜始まり
        variant="subtle"
        defaultValue={[]}
        today
        // onChange={(value) => createDays(value)}
        // value={selectDate}
        dayProps={{
          h: 'auto',
          p: 2,
          // _selected: {},
          _hover: {},
          _active: {},
          // _ripple: {
          //   display: 'none',
          // },
          transitionProperty: 'none',
          component: ({ date, isSelected }) => (
            <VStack alignItems="center">
              <Center
                bg={isSelected ? 'primary' : undefined}
                w={8}
                lineHeight={8}
                rounded="full"
                color={isSelected ? 'white' : undefined}
                transitionProperty="background"
                transitionDuration="normal"
                position="relative"
              >
                {date.getDate()}
                <Float offset={['8', '0']} placement="start-center">
                  {dates.includes(dayjs(date).format('YYYY-MM-DD')) && (
                    <Box
                      w="1"
                      py="1"
                      px="1"
                      bg="secondary"
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

export default SampleCalendar;

import { useState } from 'react';
import { Calendar } from '@yamada-ui/calendar';
import { Button, Container } from '@yamada-ui/react';
import DrumRoll from '../components/DrumRoll.tsx';

const OwnerDateRegistration = () => {
  const [selectDate, setSelectDate] = useState<string[]>([]);

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
    setSelectDate(formattedDays);
  }

  console.log(selectDate);

  return (
    <Container h="calc(100vh - 180px)" centerContent>
      <Calendar
        variant="subtle"
        defaultValue={[new Date()]}
        today
        onChange={(value) => createDays(value)}
        // value={selectDate}
      />
      {/*<Text>{`date:${dateFormat(selectDate[3])}`}</Text>*/}
      <DrumRoll />
      <Button colorScheme="primary" variant="solid">
        submit
      </Button>
    </Container>
  );
};

export default OwnerDateRegistration;

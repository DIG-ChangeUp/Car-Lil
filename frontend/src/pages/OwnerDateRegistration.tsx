import { useAtom, useAtomValue } from 'jotai';
import { Calendar } from '@yamada-ui/calendar';
import { Button, Container } from '@yamada-ui/react';
import DrumRoll from '../components/DrumRoll.tsx';
import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import {
  rentalDateAndTimesAtom,
  rentalDaysAtom,
  rentalEndTimeAtom,
  rentalStartTimeAtom,
} from '../components/atom/globalState.ts';

const OwnerDateRegistration = () => {
  const [rentalDays, setRentalDays] = useAtom(rentalDaysAtom);
  const [rentalDateAndTimes, setRentalDateAndTimes] = useAtom(
    rentalDateAndTimesAtom
  );
  const rentalStartTime = useAtomValue(rentalStartTimeAtom);
  const rentalEndTime = useAtomValue(rentalEndTimeAtom);

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
        start_at: rentalStartTime,
        end_at: rentalEndTime,
      });
    });
    setRentalDateAndTimes(rentalData);
  }

  console.log('rentalDays: ', rentalDays);
  console.log('rentalDateAndTimes: ', rentalDateAndTimes);

  return (
    <>
      <Header />
      <Container h="calc(100vh - 180px)" centerContent>
        <Calendar
          variant="subtle"
          defaultValue={[]}
          today
          onChange={(value) => createDays(value)}
          // value={selectDate}
        />
        {/*<Text>{`date:${dateFormat(selectDate[3])}`}</Text>*/}
        <DrumRoll />
        <Button colorScheme="primary" variant="solid" onClick={makeRentalData}>
          確認画面に進む
        </Button>
      </Container>
      <Footer />
    </>
  );
};

export default OwnerDateRegistration;

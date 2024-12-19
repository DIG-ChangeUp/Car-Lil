import React from 'react';
import { TimePicker } from 'react-time-picker-typescript';
import 'react-time-picker-typescript/dist/style.css';
import { useAtom } from 'jotai/index';
import { rentalEndTimeAtom, rentalStartTimeAtom } from './atom/globalState.ts';

const DrumRoll: React.FC = () => {
  const [rentalStartTime, setRentalStartTime] = useAtom(rentalStartTimeAtom);
  const [rentalEndTime, setRentalEndTime] = useAtom(rentalEndTimeAtom);

  const onChange1: (timeValue: string | null) => void = (
    timeValue: string | null
  ): void => {
    setRentalStartTime(timeValue);
  };
  const onChange2: (timeValue: string | null) => void = (
    timeValue: string | null
  ): void => {
    setRentalEndTime(timeValue);
  };

  return (
    <div>
      <TimePicker onChange={onChange1} value={rentalStartTime} />
      <TimePicker onChange={onChange2} value={rentalEndTime} />
    </div>
  );
};

export default DrumRoll;

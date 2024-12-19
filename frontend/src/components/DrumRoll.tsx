import React, { useState } from 'react';
import { TimePicker } from 'react-time-picker-typescript';
import 'react-time-picker-typescript/dist/style.css';

const DrumRoll: React.FC = () => {
  const [startTime, setStartTime] = useState<string | null>('10:00');
  const [endTime, setEndTime] = useState<string | null>('16:00');

  const onChange1: (timeValue: string | null) => void = (
    timeValue: string | null
  ): void => {
    setStartTime(timeValue);
  };
  const onChange2: (timeValue: string | null) => void = (
    timeValue: string | null
  ): void => {
    setEndTime(timeValue);
  };

  return (
    <div>
      <TimePicker onChange={onChange1} value={startTime} />
      <TimePicker onChange={onChange2} value={endTime} />
    </div>
  );
};

export default DrumRoll;

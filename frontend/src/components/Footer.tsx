import {
  MdMoreHoriz,
  MdNotificationsNone,
  MdOutlineCalendarMonth,
  MdOutlineDirectionsCar,
  MdOutlineListAlt,
  MdPersonOutline,
} from 'react-icons/md';
import { HStack } from '@yamada-ui/react';

export default function Footer() {
  return (
    <HStack justifyContent="space-between" h="80px" marginX="5">
      <MdOutlineCalendarMonth />
      <MdOutlineDirectionsCar />
      <MdOutlineListAlt />
      <MdPersonOutline />
      <MdNotificationsNone />
      <MdMoreHoriz />
    </HStack>
  );
}

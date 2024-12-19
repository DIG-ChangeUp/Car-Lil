import {
  MdMoreHoriz,
  MdNotificationsNone,
  MdOutlineCalendarMonth,
  MdOutlineDirectionsCar,
  MdOutlineListAlt,
  MdPersonOutline,
} from 'react-icons/md';
import { HStack, Text, VStack } from '@yamada-ui/react';

export default function Footer() {
  return (
    <HStack
      justifyContent="space-between"
      h="80px"
      paddingX="5"
      paddingBottom="3"
      fontSize="2xl"
      backgroundColor="#F3F7F7"
    >
      <VStack alignItems="center">
        <MdOutlineCalendarMonth />
        <Text fontSize="2xs">予約する</Text>
      </VStack>
      <VStack alignItems="center">
        <MdOutlineDirectionsCar />
        <Text fontSize="2xs">利用する</Text>
      </VStack>
      <VStack alignItems="center">
        <MdOutlineListAlt />
        <Text fontSize="2xs">予約一覧</Text>
      </VStack>
      <VStack alignItems="center">
        <MdPersonOutline />
        <Text fontSize="2xs">オーナー</Text>
      </VStack>
      <VStack alignItems="center">
        <MdNotificationsNone />
        <Text fontSize="2xs">通知</Text>
      </VStack>
      <VStack alignItems="center">
        <MdMoreHoriz />
        <Text fontSize="2xs">その他</Text>
      </VStack>
    </HStack>
  );
}

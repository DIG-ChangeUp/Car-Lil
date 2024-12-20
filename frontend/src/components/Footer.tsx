import {
  MdCarCrash,
  MdCurrencyYen,
  MdEditCalendar,
  MdMoreHoriz,
  MdNotificationsNone,
  MdOutlineRestore,
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
      sx={{ borderTop: '1px solid #D9D9D9' }}
    >
      <VStack alignItems="center">
        <MdEditCalendar />
        <Text fontSize="2xs">貸出設定</Text>
      </VStack>
      <VStack alignItems="center">
        <MdOutlineRestore />
        <Text fontSize="2xs">貸出履歴</Text>
      </VStack>
      <VStack alignItems="center">
        <MdCarCrash />
        <Text fontSize="2xs">車両情報</Text>
      </VStack>
      <VStack alignItems="center">
        <MdCurrencyYen />
        <Text fontSize="2xs">バック金額</Text>
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

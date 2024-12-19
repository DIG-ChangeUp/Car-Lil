import { Card, Container, HStack, Text, VStack } from '@yamada-ui/react';
import {
  MdEditCalendar,
  MdOutlineRestore,
  MdCarCrash,
  MdCurrencyYen,
} from 'react-icons/md';

export function OwnerSelectMenu() {
  // ◾️状態管理必要な情報
  // ・現在時刻
  // ・カレンダーの選択範囲
  // ・貸出開始時刻
  // ・貸出終了時刻
  // ・日付選択中かどうか＝＞ボタンの切り替えに必要
  // ・編集が完了したかどうか＝＞完了画面への切り替えに必要
  return (
    <Container h="calc(100vh - 180px)">
      <br></br>
      <Text fontSize="2xl" fontWeight="bold">
        オーナーページ
      </Text>
      <Container>
        <VStack alignItems="center" textAlign="center">
          <HStack>
            <Card
              w="180"
              h="180"
              alignItems="center"
              paddingTop="35"
              backgroundColor="#F3F7F7"
              sx={{ border: '1px solid #D9D9D9' }}
            >
              <MdEditCalendar size="50" />
              <Text fontSize="xl" paddingTop="2">
                貸出設定
              </Text>
            </Card>
            <Card
              w="180"
              h="180"
              alignItems="center"
              paddingTop="35"
              backgroundColor="#F3F7F7"
              sx={{ border: '1px solid #D9D9D9' }}
            >
              <MdOutlineRestore size="50" />
              <Text fontSize="xl" paddingTop="2">
                貸出履歴
              </Text>
            </Card>
          </HStack>
          <HStack>
            <Card
              w="180"
              h="180"
              alignItems="center"
              paddingTop="35"
              backgroundColor="#F3F7F7"
              sx={{ border: '1px solid #D9D9D9' }}
            >
              <MdCarCrash size="50" />
              <Text fontSize="xl" paddingTop="2">
                車両情報
              </Text>
            </Card>
            <Card
              w="180"
              h="180"
              alignItems="center"
              paddingTop="35"
              backgroundColor="#F3F7F7"
              sx={{ border: '1px solid #D9D9D9' }}
            >
              <MdCurrencyYen size="50" />
              <Text fontSize="xl" paddingTop="2">
                キャッシュバック<br></br>金額
              </Text>
            </Card>
          </HStack>
        </VStack>
      </Container>
    </Container>
  );
}

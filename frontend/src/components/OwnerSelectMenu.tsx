import './style.css';
import { Card, HStack, VStack } from '@yamada-ui/react';
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
    <div className="main-container">
      <h1>オーナーページ</h1>
      <div className="menu-cards">
        <VStack>
          <HStack>
            <Card className="menu-card">
              <MdEditCalendar className="menu-icon" />
              <div>貸出設定</div>
            </Card>
            <Card className="menu-card">
              <MdOutlineRestore className="menu-icon" />
              <p>貸出履歴</p>
            </Card>
          </HStack>
          <HStack>
            <Card className="menu-card">
              <MdCarCrash className="menu-icon" />
              <p>車両情報</p>
            </Card>
            <Card className="menu-card">
              <MdCurrencyYen className="menu-icon" />
              <p>キャッシュバック金額</p>
            </Card>
          </HStack>
        </VStack>
      </div>
    </div>
  );
}
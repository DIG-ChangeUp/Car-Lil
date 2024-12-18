import "./ownerSelectMenu.css"
import { Card } from "@yamada-ui/react"

export function OwnerSelectMenu(){

  // ◾️状態管理必要な情報
  // ・現在時刻
  // ・カレンダーの選択範囲
  // ・貸出開始時刻
  // ・貸出終了時刻
  // ・日付選択中かどうか＝＞ボタンの切り替えに必要
  // ・編集が完了したかどうか＝＞完了画面への切り替えに必要
  return (
    <div className="display-container">
      <h1>オーナーメニュー選択画面</h1>
      {/*メイン画面------------------------*/}
      <div className="main-container">
        {/*メニュー選択*/}
        <h1>オーナーページ</h1>
        <div className="menu-icons">
          <Card w="20" h="20">貸出設定</Card>
          <Card w="20" h="20">貸出履歴</Card>
          <Card w="20" h="20">車両情報</Card>
          <Card w="20" h="20">キャッシュバック金額</Card>
        </div>
        {/*編集完了画面*/}
        <div className="completed-editing-display">
          <div>✔️</div>
          <p>貸出可能日の編集が完了しました</p>
          <p>カレンダーに戻ります</p>
        </div>
      </div>
    </div>
  )
}

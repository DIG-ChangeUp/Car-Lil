# ER図

```mermaid
---
title: "Car-Lil ER図"
---
erDiagram

user_info {
    increments id PK "ユーザーID"
    string email "メールアドレス"
    string user_name "ユーザー名"
    string user_type "ユーザー区分…ユーザー、オーナー、管理者"
}

car_info {
    increments id PK "車両ID"
    string car_name "車名"
    string maker "メーカー"
    string type "車種区分"
    string photo_url "車両画像URL"
}

carport_info {
    increments id PK "駐車場ID"
    integer user_id FK "ユーザーID"
    string address "駐車場の住所"
    decimal(18, 15) latitude "緯度"
    decimal(18, 15) longitude "経度"
}

share_car_info {
    increments id PK "シェア車両ID"
    integer user_id FK "ユーザーID"
    integer car_id FK "車両ID"
    integer carport_id FK "駐車場ID"
    integer share_prise "シェア価格"
    string share_state "シェア状態…予約、貸出、返却"
}

reserve_info {
    integer user_id FK "ユーザーID"
    integer share_car_id FK "シェアカーID"
    integer carport_id FK "駐車場ID"
    string share_status "シェア状態…予約、貸出、返却"
    timestamp reserved_at "予約された日時"
    timestamp rent_at "借りる予定日時"
    timestamp rented_at "実際に借り始めた日時"
    timestamp return_at "返却予定日時"
    timestamp returned_at "返却完了日時"
    string evaluation "評価…良かった、悪かった、評価しない"
    boolean is_refueled "給油されたか"
    boolean is_washed "洗車されたか"
}

share_info {
    increments id PK "オーナーのシェア情報ID"
    integer user_id FK "ユーザーID"
    integer carport_id FK "駐車場ID"
    integer share_car_id FK "シェアカーID"
    timestamp start_date "貸し出せる時間帯の始まりの日時"
    timestamp end_date "貸し出せる時間帯の終わりの日時"
}

share_request_info {
    increments id PK "シェアリクエストID"
    integer user_id FK "ユーザーID"
    decimal(18, 15) latitude "緯度"
    decimal(18, 15) longitude "経度"
    string message "リクエスト時のメッセージ"
    timestamp created_at "リクエスト作成日時"
}

user_info ||--o{ carport_info : "1つのuser_infoは、0以上のcarport_infoを持つ"
user_info ||--o{ share_car_info : "1つのuser_infoは、0以上のshare_car_infoを持つ"
user_info ||--o{ reserve_info : "1つのuser_infoは、0以上のreserve_infoを持つ"
user_info ||--o{ share_info : "1つのuser_infoは、0以上のshare_infoを持つ"
user_info ||--o{ share_request_info : "1つのuser_infoは、0以上のshare_request_infoを持つ"

car_info ||--o{ share_car_info : "1つのcar_infoは、0以上のshare_car_infoを持つ"
car_info ||--o{ share_car_info : "1つのcar_infoは、0以上のshare_car_infoを持つ"

carport_info ||--o{ share_car_info : "carport_info、0以上のshare_car_infoを持つ"
carport_info ||--o{ share_info : "carport_info、0以上のshare_infoを持つ"

share_car_info ||--o{ reserve_info : "share_car_info、0以上のreserve_infoを持つ"
share_car_info ||--o{ share_info : "share_car_info、0以上のshare_infoを持つ"
```
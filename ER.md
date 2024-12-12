# ER図

```mermaid
---
title: "Car-Lil ER図"
---
erDiagram

user {
    increments id PK "ユーザーID"
    email
    user_name
    user_type
}

car {
    increments id PK 
    car_name
    maker
    type
    photo_url
}

share-car {
    id
    user_id
    car_id
    prise
    carport_id
    share_state
}

carport {
    id
    user_id
    address
    latitude
    longitude
}

reserve-info{
    share_car_id
    carport_id
    status "状態　予約、貸出、返却"
    reserved_at "予約された時刻"
    rent_at "借りる予定時刻"
    rented_at "実際に借り始めた時刻"
    return_at "返却予定時刻"
    returned_at "返却完了時刻"
    evaluation "評価　良い、悪い、評価しない"
    is_refueled "給油されたか"
    is_washed "洗車されたか"
}

share-info {
    id
    car_port_id
    share_car_id
    start_date_at
    end_date_at
}

share-request {
    id
    user-id
    latitude
    longitude
    message
    add_date
}
```
## データCRUD機能を設計

<details>
<summary>GET（取得）</summary>

- [ ] 全ユーザー情報: users
    - { id, user_name, email, user_type }
- [ ] 全駐車場情報: JOIN share_cars--users
    - { id, user_name, address, latitude, longitude }
- [ ] 一箇所の駐車場情報（データは上と同じ）
- [ ] 全シェアカー情報: JOIN share_cars--users--cars--carports
    - { id, share_prise, share_state, user_name, car_name, maker, car_type, photo_url, address, latitude, longitude }
- [ ] 一台のシェアカー情報（データは上と同じ）
- [ ] 全予約情報: JOIN reservations--users--share_cars--carports
    - { id, share_state, reserved_at, rent_at, rented_at, return_at, returned_at, evaluation, user_name, car_name, maker, car_type, photo_url, address, latitude, longitude }
- [ ] 一つの予約情報（データは上と同じ）
- [ ] 一人のオーナーの全シェア情報: JOIN share--users--carports--share_cars----cars
    - { id, start_at, end_at, user_name, address, latitude, longitude, share_prise, share_state, car_name, maker, car_type, photo_url }
- [ ] 一人のユーザーの全リクエスト情報: requests--users
    - { id, user_name, latitude, longitude, message, created_at }
</details>

<details>
<summary>POST（追加）</summary>

- [ ] （優先度: 高）一人のユーザー情報追加
  - frontから受け取るデータ: { email, user_name, user_type }
- [ ] （優先度: 高）一台のシェアカー情報追加
  - frontから受け取るデータ: { user_name, car_name, address, latitude, longitude, share_prise }
- [ ] （優先度: 高）一つの予約情報追加
  - frontから受け取るデータ: { user_name, car_name, address, latitude, longitude, rent_at, return_at }
- [ ] （優先度: 高）希望のシェア時間帯情報追加
  - frontから受け取るデータ: { user_name, car_name, start_at, end_at }
- [ ] （優先度: 高）一つのリクエスト情報追加
  - frontから受け取るデータ: { user_name, latitude, longitude, message }
</details>

<details>
<summary>PATCH（編集）</summary>

**!!!確認  今回は借りる、返却以外はに削除して新規でいい？**

- [ ] （優先度: 中）一人のユーザー情報編集
    - frontから受け取るデータ: { email, user_name, user_type }
- [ ] （優先度: 中）一台のシェアカー情報編集
  - frontから受け取るデータ: { user_name, car_name, address, latitude, longitude, share_prise }
- [ ] （優先度: 高）一つの予約情報編集（借りる時）
    - frontから受け取るデータ: { user_name, car_name, address, rented_at, }
- [ ] （優先度: 高）一つの予約情報編集（返す時）
    - frontから受け取るデータ: { user_name, car_name, address, returned_at }
- [ ] （優先度: 低）希望のシェア時間帯情報編集
    - frontから受け取るデータ: { user_name, car_name, start_at, end_at }
- [ ] （優先度: 低）一つのリクエスト情報編集
    - frontから受け取るデータ: { user_name, latitude, longitude, message }
</details>

<details>
<summary>DELETE（削除）</summary>

- [ ] （優先度: 低）一人のユーザー情報削除
  - DELETE users（users.idに当てはまるものを削除）
  - DELETE share_cars（share_cars.idに当てはまるものを削除）
  - DELETE reservations（reservations.idに当てはまるものを削除）
  - DELETE share（share.idに当てはまるものを削除）
  - DELETE requests（requests.idに当てはまるものを削除）
- [ ] 一箇所の駐車場情報削除
  - DELETE carports（carports.idに当てはまるものを削除）
  - DELETE share_cars（share_car_idに当てはまるもので且つcarport_idに当てはまるものを削除）
  - DELETE share（share_car_idに当てはまるものを削除）
- [ ] （優先度: 中）一台のシェアカー情報削除
  - DELETE share_cars（share_cars.idに当てはまるものを削除）
  - DELETE share（share_car_idに当てはまるものを削除）

- [ ] （優先度: 高）一つの予約情報削除
  - DELETE reservations（reservations.idに当てはまるものを削除）
  - PATCH share_cars（share_car_idに当てはまるもののshare_stateを変更）
- [ ] （優先度: 中）希望のシェア時間帯情報削除
  - DELETE share（share.idに当てはまるものを削除）
- [ ] （優先度: 中）一つのリクエスト情報削除
  - DELETE requests（requests.idに当てはまるものを削除）
</details>
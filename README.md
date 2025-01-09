Car-Lilアプリの開発リポジトリへようこそ！

このリポジトリは、DIGのデザインスプリントで提案されたカーシェアサービス「Car-Lil」を実装するためのリポジトリーです。

# アプリ概要
カーシェアサービス「Car-Lil」を提供するためのアプリです。

カーシェアサービスの基本である「車を借りる」部分だけではなく、Car-Lilの主要サービスである「車のオーナーとして、車を貸し出す」機能も提供します。

## オーナー機能
既に登録されている車を、何日の何時から何時まで貸し出すかを登録します。

貸出期間は、連続３日間、毎日7:00〜19:00のように、複数の日時を指定することができます。

## ユーザー機能
地図上から駐車場（各駐車場につき1台）を選択し、その駐車場に停まっている車を予約します。

# ER図
[ER図はこちらのリンク](./ER.md)からご確認ください。

# 開発環境構築

> [!IMPORTANT]
> Car-Lilアプリでは、以下の3つの外部サービスを利用しています。
> - Google Maps API
> - Firebase Authentication
> - OneSignal（プッシュ通知）
> 
>　必要に応じて各サービスのアカウントを取得し、APIキー等を取得して、.envファイルに記述する必要があります。

1. postgresqlのバージョン14をインストールします。

2. このリポジトリをクローンします。

3. クローンしたリポジトリに移動します。

4. postgresqlで`car_lil`という名前のデータベースを作成します。

5. `./backend/.env.sample`を参考に`./backend/.env`ファイルを作成します。

6. `./frontend/.env.sample`を参考に`./frontend/.env`ファイルを作成します。

7. プロジェクトのルートディレクトリに移動し、以下のコマンドを実行します。
    ```bash
    $ npm run build
    ```
   
# 利用技術など
- フロントエンド
  - React
  - TypeScript
  - Yamada-UI
  - Google Maps API
  - OneSignal
- バックエンド
  - Express
  - JavaScript
  - PostgreSQL
  - Firebase Authentication
  - Knex.js
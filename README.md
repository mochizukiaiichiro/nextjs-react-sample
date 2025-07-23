# nextjs-react-sample

SE職への応募に際し作成したポートフォリオ用のアプリケーションです。
Next.js の習得のため、ポートフォリオに加え実装方法や動作検証用のアプリも含むみます。

---

## 技術スタック

| 項目           | 使用技術                                      |
|----------------|-----------------------------------------------|
| フレームワーク | Next.js 15 / App Router                       |
| 言語           | TypeScript                                    |
| UI/Styling     | styled-components                             |
| DB             | better-sqlite3                                |
| API通信        | fetch API / RESTful                           |
| フォルダ構成   | 機能単位で分離されたアプリ構成（app1, app2, app3） |

---

## アプリケーション概要

実装アプリについて

### `app1`: 簡易メモアプリ（実装・動作証用）
モダンJavaScriptの基本から始めるReact実践の教科書からのソースコードの移植

概要
- 状態管理・イベント処理の基礎をNext.js環境下で再構築
- カスタムフックによるロジックの分離

### `app2`: API通信とデータ取得検証（実装・動作証用）
Next.jsのAPIの実装方法の検証や動作確認のためのアプリ

概要
- Next.js API Routesによる内部APIエンドポイントの構築
- 外部API（`jsonplaceholder.typicode.com/users`）との通信実装
- better-sqlite3 を用いた簡易DB操作（作成・読み出し）

### `app3`: ユーザー情報の検索と詳細表示（ポートフォリオ）
APIでのデータ取得とテーブルでの表示・検索・並び替えをするアプリ

概要
- ユーザー一覧データの取得 外部API（`jsonplaceholder.typicode.com/users`）からのユーザー情報取得
- 複数項目による条件検索
- テーブル列の並び替え
- ユーザー詳細ページへのリンク遷移（Dynamic Routing）
- 検索・並び替え結果の表示

実装ポイント
- カスタムフックによる責務分離
- 表示ロジックの分離

---

## 動的ページ生成の構成

このリポジトリでは、Next.js の App Router による `param-based dynamic routing` を活用し、複数アプリケーションを柔軟に切り替え可能な構成にしています。

### 該当ファイルと役割

| ファイル                         | 役割                                                                 |
|----------------------------------|----------------------------------------------------------------------|
| `src/lib/appMetaList.ts`         | 各アプリのメタ情報（ID・タイトル・説明）の一覧を定義                          |
| `src/lib/appComponentList.tsx`   | 各アプリIDと対応する JSX コンポーネントの一覧を定義                          |
| `src/app/[app]/page.tsx`         | パス引数 `app` に基づき、対象コンポーネントを検索・表示する動的ルーティング構成 |

### 実行イメージ

- `http://localhost:3000/app1` → メモアプリを表示  
- `http://localhost:3000/app2` → API検証アプリを表示  
- `http://localhost:3000/app3` → ユーザー検索アプリを表示

この構成により、**新しいアプリを定義する場合は、`appMetaList` と `appComponentList` に追記するだけでルーティングが自動生成されます**。

---

## 起動方法

```bash
# 依存インストール
npm install

# 開発サーバー起動
npm run dev

# アクセス
http://localhost:3000/
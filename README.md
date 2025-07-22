# nextjs-react-sample

ITエンジニア職への応募に際し、技術力・設計力・実装スタンスを可視化するために作成したポートフォリオ用のアプリケーションです。
Next.js をベースに複数の実装テーマに取り組み、基礎的な設計原則と責務分離を意識した構成を採用しています。

---

## 🔧 技術スタック

| 項目           | 使用技術                                      |
|----------------|-----------------------------------------------|
| フレームワーク | Next.js 15 / App Router                       |
| 言語           | TypeScript                                    |
| UI/Styling     | styled-components                             |
| DB             | better-sqlite3                                |
| API通信        | fetch API / RESTful                           |
| フォルダ構成   | 機能単位で分離されたアプリ構成（app1, app2, app3） |

---

## 📦 アプリケーション概要

このプロジェクトは `app1`, `app2`, `app3` の3つのアプリケーションを含み、それぞれ異なる技術テーマで構成されています。

### `app1`: 簡易メモアプリ
- モダンJavaScriptの基本から始めるReact実践の教科書からの移植
- 状態管理・イベント処理の基礎をNext.js環境下で再構築
- カスタムフックによるロジックの分離（`useMemoList`）

### `app2`: API通信とデータ取得検証
- Next.js API Routesによる内部APIエンドポイントの構築
- 外部API（`jsonplaceholder.typicode.com/users`）との通信実装
- better-sqlite3 を用いた簡易DB操作（作成・読み出し）

### `app3`: ユーザー情報の検索と詳細表示
- RESTful外部APIからのユーザー情報取得
- フィルタ検索機能（複数フィールドの部分一致）
- Next.js Dynamic Routing による詳細ページへの遷移
- カスタムフックによる責務分離（`useFetchUsers`, `useSearchUsers`, `useInitializeUsers`）

#### 💡 `app3`の設計ポイント

- **責務分離**
  - データ取得 → `useFetchUsers`
  - 初期化処理 → `useInitializeUsers`
  - 検索状態管理 → `useSearchUsers`
  - 表示UI → Appコンポーネント

- **再利用性とスケーラビリティ**
  - 検索ロジックはジェネリック化しやすい構成（検索キー管理、入力状態保持、イベント抽出）

- **型定義と整合性**
  - TypeScript による `UserMainInfo`, `UserDetailInfo`, `User` 型で安全性を確保

---

## 🧩 動的ページ生成の構成

このリポジトリでは、Next.js の App Router による `param-based dynamic routing` を活用し、複数アプリケーションを柔軟に切り替え可能な構成にしています。

### 🔗 該当ファイルと役割

| ファイル                         | 役割                                                                 |
|----------------------------------|----------------------------------------------------------------------|
| `src/lib/appMetaList.ts`         | 各アプリのメタ情報（ID・タイトル・説明）の一覧を定義                          |
| `src/lib/appComponentList.tsx`   | 各アプリIDと対応する JSX コンポーネントの一覧を定義                          |
| `src/app/[app]/page.tsx`         | パス引数 `app` に基づき、対象コンポーネントを検索・表示する動的ルーティング構成 |

### ✨ 実行イメージ

- `http://localhost:3000/app1` → メモアプリを表示  
- `http://localhost:3000/app2` → API検証アプリを表示  
- `http://localhost:3000/app3` → ユーザー検索アプリを表示

この構成により、**新しいアプリを定義する場合は、`appMetaList` と `appComponentList` に追記するだけでルーティングが自動生成されます**。

---

## 🚀 起動方法

```bash
# 依存インストール
npm install

# 開発サーバー起動
npm run dev

# アクセス
http://localhost:3000/

# Next.js React Sample

ユーザー検索機能を備えた Next.js × React のサンプルアプリです。  
TypeScript による型安全な設計と、検索条件の抽象化・UI連携の工夫を通じて、フルスタック開発の基礎力を高める構成になっています。

---

## 技術スタック

- Next.js
- React
- TypeScript
- better-sqlite3（ローカルDB）
- styled-components
- RESTful API設計

---

## 主な機能

- ユーザー一覧の表示と検索（name / username / email / phone / website）
- 検索条件の Map による一元管理と抽象化
- `keyof UserMainInfo` による型安全なフィールド制御
- JSXのループ生成によるフォーム構成の最適化
- リセット処理の統一と初期値の再利用
- SQLite によるローカルデータ管理

---

## ポイント

- 検索条件は `Map<keyof UserMainInfo, string>` で一元管理し、フィールド数が増えても拡張性を保てる構成に。
- JSX側は `searchKeys.map(...)` によるループ生成で保守性を向上。
- 型安全性を重視し、`keyof UserMainInfo` によるフィールド制限と抽象化を両立。
- 状態更新は `setSearch(new Map(...))` によって React の再レンダリングを保証。
- `SearchFieldChange()` の高階関数化により、複数フィールドの入力処理を統一。

---

## セットアップ

```bash
git clone https://github.com/mochizukiaiichiro/nextjs-react-sample.git
cd nextjs-react-sample
npm install
npm run dev
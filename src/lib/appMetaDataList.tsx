import { default as App1 } from "@/components/application/app1/App";
import { default as App2 } from "@/components/application/app2/App";
import { default as App3 } from "@/components/application/app3/App";
import { default as App4 } from "@/components/application/app4/App";
import { JSX } from "react";

export type AppMetaData = {
  id: string;
  name: string;
  title: string;
  description: string;
  enabled: boolean;
  component: JSX.Element;
};

export const appMetaDataList: AppMetaData[] = [
  {
    id: "app1",
    name: "App1",
    title: "簡易メモアプリ",
    description:
      "モダンJavaScriptの基本から始めるReact実践の教科書のサンプルアプリケーションをNext.jsに移植",
    enabled: true,
    component: <App1 />,
  },
  {
    id: "app2",
    name: "App2",
    title: "APIの実装と動作確認",
    description: "Next.jsのAPIの実装方法の調査や動作検証用のアプリケーション",
    enabled: true,
    component: <App2 />,
  },
  {
    id: "app3",
    name: "App3",
    title: "データ検索・詳細表示",
    description:
      "https://jsonplaceholder.typicode.com/usersから取得したデータの表示、詳細ページへの遷移、検索等をするアプリケーション",
    enabled: true,
    component: <App3 />,
  },
  {
    id: "app4",
    name: "App4",
    title: "フォーム動作確認",
    description:
      "フォームからデータベースへデータの登録を行う。またデータの取得を行うアプリケーション",
    enabled: true,
    component: <App4 />,
  },
];
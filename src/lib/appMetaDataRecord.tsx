import { ComponentType } from "react";

export type AppMetaData = {
  id: string;
  name: string;
  title: string;
  description: string;
  enabled: boolean;
  componentPath: () => Promise<{ default: ComponentType<any> }>
};

export const appMetaDataRecord: Record<string, AppMetaData> = {
  app1: {
    id: "app1",
    name: "App1",
    title: "簡易メモアプリ",
    description:
      "モダンJavaScriptの基本から始めるReact実践の教科書のサンプルアプリケーションをNext.jsに移植",
    enabled: true,
    componentPath: () => import("@/components/application/app1/App"),
  },
  app2: {
    id: "app2",
    name: "App2",
    title: "APIの実装と動作確認",
    description: "Next.jsのAPIの実装方法の調査や動作検証用のアプリケーション",
    enabled: true,
    componentPath: () => import("@/components/application/app2/App"),
  },
  app3: {
    id: "app3",
    name: "App3",
    title: "データ検索・詳細表示",
    description:
      "https://jsonplaceholder.typicode.com/usersから取得したデータの表示、詳細ページへの遷移、検索等をするアプリケーション",
    enabled: true,
    componentPath: () => import("@/components/application/app3/App"),
  },
  app4: {
    id: "app4",
    name: "App4",
    title: "フォーム動作確認",
    description:
      "入力フォームの表示やDB登録・データ取得",
    enabled: true,
    componentPath: () => import("@/components/application/app4/App"),
  },
};


export const enabledAppList = Object.values(appMetaDataRecord).filter(app => app.enabled);

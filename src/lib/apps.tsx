import { default as App1 } from "@/components/application/app1/App";
import { default as App2 } from "@/components/application/app2/App";
import { default as App3 } from "@/components/application/app3/App";

export const appList = [
  {
    id: "app1",
    name: "App1",
    title: "簡易メモアプリ",
    component: <App1 Id="app1" />,
  },
  {
    id: "app2",
    name: "App2",
    title: "APIの実装と動作確認",
    component: <App2 Id="app2" />,
  },
  {
    id: "app3",
    name: "App3",
    title: "データ検索・詳細表示",
    component: <App3 Id="app3" />,
  },
];

import { default as App1 } from "@/components/application/app1/App";
import { default as App2 } from "@/components/application/app2/App";
import { default as App3 } from "@/components/application/app3/App";

export const appList = [
  {
    id: "app1",
    name: "App1",
    title: "簡易メモアプリ",
    description: "モダンJavaScriptの基本から始めるReact実践の教科書のサンプルアプリケーションをNext.jsに移植",
    enabled:false,
    component: <App1 Id="app1" />,
  },
  {
    id: "app2",
    name: "App2",
    title: "APIの実装と動作確認",
    description: "Next.jsのAPIの実装方法や動作の調査用アプリケーション",
    enabled: false,
    component: <App2 Id="app2" />,
  },
  {
    id: "app3",
    name: "App3",
    title: "データ検索・詳細表示",
    description: "https://jsonplaceholder.typicode.com/usersから取得したデータを表示し詳細ページへの遷移、検索等をするアプリケーション",
    enabled: true,
    component: <App3 Id="app3" />,
  },
];

import { JSX } from "react";
import { default as App1 } from "@/components/application/app1/App";
import { default as App2 } from "@/components/application/app2/App";
import { default as App3 } from "@/components/application/app3/App";

type Props = {
    params: { app: string };
};

// アプリ名とコンポーネントのマッピング
const apps: Record<string, JSX.Element> = {
    app1: <App1 />,
    app2: <App2 />,
    app3: <App3 />,
};

export default async function HeaderAppPage({ params }: Props) {
    const { app } = await params;

    // 存在するアプリなら表示、なければエラーメッセージ
    return apps[app] ?? <div>未定義のアプリです: {app}</div>
}

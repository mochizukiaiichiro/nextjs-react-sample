import { JSX } from "react";
import { appList } from "@/lib/apps";

type Props = {
    params: { app: string };
};

// アプリ名とコンポーネントのマッピング
const apps = new Map<string, JSX.Element>();
appList.forEach(({ id, component }) => {
    apps.set(id, component);
});

export default async function HeaderAppPage({ params }: Props) {
    const { app } = await params;

    // 存在するアプリなら表示、なければエラーメッセージ
    return apps.get(app) ?? <div>未定義のアプリです: {app}</div>
}

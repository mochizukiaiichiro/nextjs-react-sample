import { JSX } from "react";
import { appList } from "@/lib/apps";
import { notFound } from "next/navigation";

type Props = {
    params: { app: string };
};

// パスとコンポーネントのマッピング
const apps = new Map<string, JSX.Element>();
appList.forEach(({ id, component }) => {
    apps.set(id, component);
});

// 静的生成対象のパラメータ
export async function generateStaticParams() {
    return appList.map(({ id }) => ({ app: id }));
}

export default async function HeaderAppPage({ params }: Props) {
    const { app } = await params;

    if (!apps.has(app)) {
        notFound();
    }

    return apps.get(app)!;
}

export async function generateMetadata({ params }: { params: { app: string } }) {
    const { app } = await params;
    const appMap = new Map(appList.map(appObj => [appObj.id, appObj]));
    const appData = appMap.get(app);

    if (!appData) {
        return {
            title: "ページが見つかりません",
            description: "指定されたアプリは存在しません。",
        };
    }
    return {
        title: appData.title,
        description: `${appData.title} の説明ページです。`,
    };
}
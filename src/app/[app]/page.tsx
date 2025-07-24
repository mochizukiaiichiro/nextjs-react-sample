import { JSX } from "react";
import { appComponentList } from "@/lib/appComponentList";
import { notFound } from "next/navigation";
import { appMetaList } from "@/lib/appMetaList";
import { Title } from "./Title";

type Props = {
    params: { app: string };
};

// パスとコンポーネントのマッピング
const apps = new Map<string, JSX.Element>();
appComponentList.forEach(({ id, component }) => {
    apps.set(id, component);
});

export default async function HeaderAppPage({ params }: Props) {
    const { app } = await params;

    if (!apps.has(app)) {
        notFound();
    }

    return (
        <>
            <Title Id={app} />
            {apps.get(app)!}
        </>
    )
}

// 静的生成対象のパラメータ
export async function generateStaticParams() {
    return appComponentList.map(({ id }) => ({ app: id }));
}

//メタ情報
export async function generateMetadata({ params }: Props ) {
    const { app } = await params;
    const appMap = new Map(appMetaList.map(app => [app.id, app]));
    const appData = appMap.get(app);

    if (!appData) {
        return {
            title: "ページが見つかりません",
            description: "指定されたアプリは存在しません。",
        };
    }
    return {
        title: appData.title,
        description: `${appData.description}`,
    };
}
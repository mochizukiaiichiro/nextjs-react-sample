import { notFound } from "next/navigation";
import { Title } from "./Title";
import { AppMetaData, appMetaDataList } from "@/lib/appMetaDataList";
import { Suspense } from "react";
import dynamic from "next/dynamic";

type Props = {
    params: { app: string };
};

// パスとコンポーネントのマッピング
const apps = new Map<string, AppMetaData>();
appMetaDataList.forEach(appMeatData => {
    apps.set(appMeatData.id, appMeatData);
});

export default async function HeaderAppPage({ params }: Props) {
    const { app } = await params;
    const importFn = apps.get(app)?.componentPath;

    if (!importFn) notFound();
    const Component = dynamic(importFn);

    return (
        <>
            <Suspense fallback={<p>読み込み中...</p>}>
                <Title app={app} />
                <Component />
            </Suspense>
        </>
    )
}

// 静的生成対象のパラメータ
export async function generateStaticParams() {
    return appMetaDataList.map(({ id }) => ({ app: id }));
}

//メタ情報
export async function generateMetadata({ params }: Props ) {
    const { app } = await params;

    if (!apps.has(app)) {
        return {
            title: "ページが見つかりません",
            description: "指定されたアプリは存在しません。",
        };
    }
    return {
        title: apps.get(app)?.title,
        description: `${apps.get(app)?.description}`,
    };
}
import { notFound } from "next/navigation";
import { AppMetaData, appMetaDataList } from "@/lib/appMetaDataList";
import dynamic from "next/dynamic";
import { Title } from "../../components/ui/Title";
import { Skeleton } from "../../components/ui/skeleton";

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
    const Component = dynamic(importFn, {
        loading: () => <Skeleton />,
    });

    return (
        <>
            <Title app={app} />
            <Component />
        </>
    )
}

// 静的生成対象のパラメータ
export async function generateStaticParams() {
    return appMetaDataList.map(({ id }) => ({ app: id }));
}

//メタ情報
export async function generateMetadata({ params }: Props) {
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
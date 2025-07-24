import { notFound } from "next/navigation";
import { AppMetaData, appMetaDataList } from "@/lib/appMetaDataList";
import dynamic from "next/dynamic";
import { Title } from "../../components/ui/Title";
import { Skeleton } from "../../components/ui/skeleton";

type Props = {
    params: { app: string };    //app1,app2,app3...
};

// メタデータをRecordに変換
const appMetaDataRecord: Record<string, AppMetaData> = appMetaDataList.reduce((acc, appMetaData) => {
    acc[appMetaData.id] = appMetaData;
    return acc;
}, {} as Record<string, AppMetaData>);

export default async function HeaderAppPage({ params }: Props) {
    const { app } = await params;
    const importFn = appMetaDataRecord[app].componentPath;

    if (!importFn) notFound();
    const Component = dynamic(importFn, {
        loading: () => <Skeleton />,
    });

    return (
        <>
            <Title app={app} appMetaDataRecord={appMetaDataRecord}  />
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

    if (!appMetaDataRecord[app]) {
        return {
            title: "ページが見つかりません",
            description: "指定されたアプリは存在しません。",
        };
    }
    return {
        title: appMetaDataRecord[app].title,
        description: `${appMetaDataRecord[app].description}`,
    };
}
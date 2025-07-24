import { notFound } from "next/navigation";
import { appMetaDataRecord, enabledAppIds } from "@/lib/appMetaDataRecord";
import dynamic from "next/dynamic";
import { Title } from "../../components/ui/Title";
import { Skeleton } from "../../components/ui/skeleton";

type Props = {
    params: { app: string };    //app1,app2,app3...
};

export default async function AppPage({ params }: Props) {
    const { app } = await params;
    const meta = appMetaDataRecord[app];

    if (!meta || !meta.enabled) notFound();
    const Component = dynamic(meta.componentPath, {
        loading: () => <Skeleton />,
    });

    return (
        <>
            <Title app={app} appMetaDataRecord={appMetaDataRecord} />
            <Component />
        </>
    )
}

// 静的生成対象のパラメータ
export async function generateStaticParams() {
    return enabledAppIds;
}

//ページのメタ情報
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
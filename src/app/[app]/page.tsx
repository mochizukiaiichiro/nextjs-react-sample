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

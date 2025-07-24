import { AppMetaData, appMetaDataList } from "@/lib/appMetaDataList";

const apps = new Map<string, AppMetaData>();
appMetaDataList.forEach(appMeatData => {
    apps.set(appMeatData.id, appMeatData);
});

export const Title = ({ app }: { app: string }) => {
    console.log(app);
    return (
        <>
            <h1>{apps.get(app)?.title ?? "タイトル未定"}</h1>
            <p>{apps.get(app)?.description}</p>
        </>
    )
}
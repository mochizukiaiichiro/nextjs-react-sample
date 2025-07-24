import { AppMetaData } from "@/lib/appMetaDataList";

type Props = {
    app: string;
    appMetaDataRecord: Record<string, AppMetaData>
}

export const Title = (props: Props) => {
    const{app,appMetaDataRecord }= props;
    return (
        <>
            <h1>{appMetaDataRecord[app].title ?? "タイトル未定"}</h1>
            <p>{appMetaDataRecord[app].description}</p>
        </>
    )
}
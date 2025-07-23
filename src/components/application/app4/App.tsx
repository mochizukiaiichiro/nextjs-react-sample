import { appMetaList } from "@/lib/appMetaList";

export const App = ({ Id }: { Id: string }) => {
  const app = new Map(appMetaList.map(app => [app.id, app])).get(Id);
    return (
        <>
            <h1>{app?.title ?? "タイトル未定"}</h1>
            <p>{app?.description}</p>
        </>
    )
}

export default App
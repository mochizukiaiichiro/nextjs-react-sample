"use client"

import { appMetaList } from "@/lib/appMetaList";
import { User } from "@/types/user";
import { useState } from "react";

type ApiResponse = { users: User[] } | { error: string };

export const App = ({ Id }: { Id: string }) => {
  const [data, setData] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [db, setDb] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const app = new Map(appMetaList.map(app => [app.id, app])).get(Id);

  const onClick1 = async () => {
    const res = await fetch("/api/app2");
    const { message } = await res.json();
    setData(message);
  }

  const onClick2 = async () => {
    try {
      const res = await fetch("/api/app2/users");
      const json: ApiResponse = await res.json();

      if ("error" in json) {
        setError(json.error);
        setUsers([]);
        return;
      }

      setUsers(json.users);
      setError(null);

    } catch (error) {
      setError("通信エラーが発生しました");
      setUsers([]);
    }
  }

  const onClick3 = async () => {
    const res = await fetch("/api/app2/db");
    const { users } = await res.json();
    setDb(users)
  }

  return (
    <>
      <h1>{app?.title ?? "タイトル未定"}</h1>
      <p>{app?.description}</p>
      <button onClick={onClick1}>データ取得</button>
      <p>{data}</p>
      <button onClick={onClick2}>外部APIからのデータ取得（jsonplaceholder/users）</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {users.map((user: User) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button onClick={onClick3}>データベースからのデータ取得</button>
      <ul>
        {db.map((db: any) => (
          <li key={db.id}>{db.name}</li>
        ))}
      </ul>
    </>
  )
}

export default App
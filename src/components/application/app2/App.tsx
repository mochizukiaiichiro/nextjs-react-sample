"use client"

import { User } from "@/types/user";
import { useState } from "react";

type ApiResponse = { users: User[] } | { error: string };

export const App = () => {
  const [data, setData] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [db, setDb] = useState([]);
  const [error, setError] = useState<string | null>(null);

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
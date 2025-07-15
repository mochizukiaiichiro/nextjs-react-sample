"use client"

import { useState } from "react";

export const App = () => {
  const [data, setData] = useState("");
  const [users, setUsers] = useState([]);
  const [db, setDb] = useState([]);

  const onClick1 = async () => {
    const res = await fetch("/api");
    const { message } = await res.json();
    setData(message);
  }

  const onClick2 = async () => {
    const res = await fetch("/api/users");
    const { data } = await res.json();
    setUsers(data)
  }

  const onClick3 = async () => {
    const res = await fetch("/api/db");
    const { users } = await res.json();
    setDb(users)
  }

  return (
    <>
      <h1>APIの実装と動作確認</h1>
      <button onClick={onClick1}>データ取得</button>
      <p>{data}</p>
      <button onClick={onClick2}>外部APIからのデータ取得（jsonplaceholder/users）</button>
      <ul>
        {users.map((user: any) => (
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
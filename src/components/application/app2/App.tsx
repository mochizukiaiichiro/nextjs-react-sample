"use client"

import { useState } from "react";

export const App = () => {
  const [data, setData] = useState("");
  const [users, setUsers] = useState("");

  const onClick1 = async () => {
    const res = await fetch("/api");
    const tmp = await res.json();
    setData(tmp.message);
  }

  const onClick2 = async () => {
    const res = await fetch("/api/users");
    const tmp = await res.json();
    const { data } = tmp;
    setUsers(data[0].name)
  }

  return (
    <>
      <h1>API動作確認</h1>
      <button onClick={onClick1}>データ取得</button>
      <p>{data}</p>
      <button onClick={onClick2}>jsonplaceholder/usersデータ取得</button>
      <p>{users}</p>
    </>
  )
}

export default App
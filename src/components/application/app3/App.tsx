"use client"

import { appMetaList } from "@/lib/appMetaList";
import { User } from "@/types/user";
import Link from "next/link";
import React, { ChangeEvent, useCallback, useState } from "react";
import styled from "styled-components"

type ApiResponse = { users: User[] } | { error: string };

const Table = styled.table`
  border: 1px solid #ccc;
  border-collapse: collapse;
  width: auto;

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
  thead {
    background-color: #f5f5f5;
  }
  thead th {
    color: #333;
    font-weight: bold;
  }
`

export const App = ({ Id }: { Id: string }) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const app = new Map(appMetaList.map(app => [app.id, app])).get(Id);

  React.useEffect(() => {
    userDataFetch();
  }, []);

  async function userDataFetch() {
    try {
      const res = await fetch("/api/users");  //https://jsonplaceholder.typicode.com/users
      const json: ApiResponse = await res.json();

      if ("error" in json) {
        setError(json.error);
        setAllUsers([]);
        setFilteredUsers([]);
        return;
      }

      setAllUsers(json.users);
      setFilteredUsers(json.users);
      setError(null);

    } catch (error) {
      setError("通信エラーが発生しました");
      setAllUsers([]);
      setFilteredUsers([]);
    }
  }

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  //検索
  const onClickSearchButton = useCallback(() => {
    if (name != "") {
      setFilteredUsers(allUsers.filter((value) => value.name.toLowerCase().includes(name.toLowerCase())));      // 大文字小文字の違いを吸収
    } else {
      setFilteredUsers(allUsers);
    }
  }, [filteredUsers, name])

  return (
    <>
      <h1>{app?.title ?? "タイトル未定"}</h1>
      <p>{app?.description}</p>
      <div>
        <label>name:</label>
        <input name="name" value={name} type="text" onChange={onChangeName} />
        <label>username:</label>
        <input name="username" value={name} type="text" onChange={onChangeName} />
      </div>
      <div>
        <label>email:</label>
        <input name="email" value={name} type="text" onChange={onChangeName} />
        <label>phone:</label>
        <input name="phone" value={name} type="text" onChange={onChangeName} />
      </div>
      <div>
        <input name="website" value={name} type="text" onChange={onChangeName} />
      </div>
      <button onClick={onClickSearchButton}>検索</button>
      <button onClick={onClickSearchButton}>リセット</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>username</th>
            <th>email</th>
            <th>phone</th>
            <th>website</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(({ id, name, username, email, phone, website }) => (
            <tr key={id}>
              <td><Link href={`/app3/users/${id}`}>{id}</Link></td>
              <td>{name}</td>
              <td>{username}</td>
              <td>{email}</td>
              <td>{phone}</td>
              <td>{website}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {name.length > 0 && filteredUsers.length === 0 && (<p>該当するユーザーが見つかりません</p>)}
    </>
  )
}

export default App
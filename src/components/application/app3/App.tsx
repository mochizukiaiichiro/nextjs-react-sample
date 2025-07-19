"use client"

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

export const App = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");

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
  },[filteredUsers,name])

  return (
    <>
      <h1>データ検索・詳細表示</h1>
      <label>name:</label>
      <input value={name} type="text" onChange={onChangeName} />
      <button onClick={onClickSearchButton}>検索</button>
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
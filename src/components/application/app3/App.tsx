"use client"

import { User } from "@/types/user";
import Link from "next/link";
import React, { useState } from "react";
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
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    userDataFetch();
  }, []);

  async function userDataFetch() {
    try {
      const res = await fetch("/api/users");  //https://jsonplaceholder.typicode.com/users
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

  return (
    <>
      <h1>外部APIからのデータフェッチ確認</h1>
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
          {users.map(({ id, name, username, email, phone, website }) => (
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

    </>
  )
}

export default App
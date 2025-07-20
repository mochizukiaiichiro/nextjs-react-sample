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
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
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
  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  }
  const onChangeWebsite = (e: ChangeEvent<HTMLInputElement>) => {
    setWebsite(e.target.value);
  }

  //検索
  const onClickSearchButton = useCallback(() => {
    if ([name, username, email, phone, website].some(array => Boolean(array))) {
      setFilteredUsers(allUsers.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase())
        && user.username.toLowerCase().includes(username.toLowerCase())
        && user.email.toLowerCase().includes(email.toLowerCase())
        && user.phone.toLowerCase().includes(phone.toLowerCase())
        && user.website.toLowerCase().includes(website.toLowerCase())
      ));
    } else {
      setFilteredUsers(allUsers);
    }
  }, [filteredUsers, name, username, email, phone, website])

  const onClickResetButton = () => {
    setName("");
    setUsername("");
    setEmail("");
    setPhone("");
    setWebsite("");
    setFilteredUsers(allUsers);
  };

  return (
    <>
      <h1>{app?.title ?? "タイトル未定"}</h1>
      <p>{app?.description}</p>
      <div>
        <p>検索項目</p>
        <div>
          <label>name:</label>
          <input name="name" value={name} type="text" onChange={onChangeName} />
          <label>username:</label>
          <input name="username" value={username} type="text" onChange={onChangeUsername} />
        </div>
        <div>
          <label>email:</label>
          <input name="email" value={email} type="text" onChange={onChangeEmail} />
          <label>phone:</label>
          <input name="phone" value={phone} type="text" onChange={onChangePhone} />
          <label>website:</label>
          <input name="website" value={website} type="text" onChange={onChangeWebsite} />
        </div>
        <div>
        </div>
        <button type="submit" onClick={onClickSearchButton}>検索</button>
        <button type="submit" onClick={onClickResetButton}>リセット</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
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
      <p>検索結果: {filteredUsers.length} 件</p>
      {name.length > 0 && filteredUsers.length === 0 && (<p>該当するユーザーが見つかりません</p>)}
    </>
  )
}

export default App
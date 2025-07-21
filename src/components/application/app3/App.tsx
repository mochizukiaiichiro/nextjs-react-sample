"use client"

import { appMetaList } from "@/lib/appMetaList";
import { User, UserMainInfo } from "@/types/user";
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
  const app = new Map(appMetaList.map(app => [app.id, app])).get(Id);

  const searchKeys = ["name", "username", "email", "phone", "website"] as const;
  const InitialTupleData: [keyof UserMainInfo, string][] = searchKeys.map((key) => [key, ""]);

  const MapInitialData = new Map(InitialTupleData);
  const [search, setSearch] = useState<Map<keyof UserMainInfo, string>>(MapInitialData);

  const SearchFieldChange = (key: keyof UserMainInfo) => (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(prev => {
      const updated = new Map(prev);
      updated.set(key, e.target.value);
      return updated;
    });
  };

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
    SearchFieldChange("name")(e);
  }

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    SearchFieldChange("username")(e);
  }
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    SearchFieldChange("email")(e);
  }
  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    SearchFieldChange("phone")(e);
  }
  const onChangeWebsite = (e: ChangeEvent<HTMLInputElement>) => {
    SearchFieldChange("website")(e);
  }

  // 検索ボタン
  const onClickSearchButton = useCallback(() => {
    let result = allUsers;
    searchKeys.forEach((searchKey) => {
      const value = search.get(searchKey);
      if (value) {
        result = result.filter(user =>          
          user[searchKey]?.toLowerCase().includes(value.toLowerCase()));
      } 
    })
    setFilteredUsers(result);
  }, [search])

  // リセットボタン
  const onClickResetButton = () => {
    setSearch(new Map(MapInitialData));
    setFilteredUsers(allUsers);
  };

  return (
    <>
      <h1>{app?.title ?? "タイトル未定"}</h1>
      <p>{app?.description}</p>
      <form onSubmit={(e) => { e.preventDefault(); onClickSearchButton(); }}>
        <p>検索項目</p>
        <div>
          <label htmlFor="name">name:</label>
          <input id="name" name="name" value={search.get("name") ?? ""} type="text" onChange={onChangeName} />
          <label htmlFor="username">username:</label>
          <input id="username" name="username" value={search.get("username") ?? ""} type="text" onChange={onChangeUsername} />
        </div>
        <div>
          <label htmlFor="email">email:</label>
          <input id="email" name="email" value={search.get("email") ?? ""} type="text" onChange={onChangeEmail} />
          <label htmlFor="phone">phone:</label>
          <input id="phone" name="phone" value={search.get("phone") ?? ""} type="text" onChange={onChangePhone} />
          <label htmlFor="website">website:</label>
          <input id="website" name="website" value={search.get("website") ?? ""} type="text" onChange={onChangeWebsite} />
        </div>
        <div>
        </div>
        <button type="submit" onClick={onClickSearchButton}>検索</button>
        <button type="button" onClick={onClickResetButton}>リセット</button>
      </form>
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
      <p>検索結果: {filteredUsers.length} 件</p>
      {filteredUsers.length === 0 && (<p>該当するユーザーが見つかりません</p>)}
    </>
  )
}

export default App
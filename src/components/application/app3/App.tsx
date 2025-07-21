"use client"

import { appMetaList } from "@/lib/appMetaList";
import { UserMainInfo } from "@/types/user";
import Link from "next/link";
import React, { ChangeEvent, useCallback, useState } from "react";
import styled from "styled-components"
import { useFetchUsers } from "./hooks/useFetchUsers";

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
  const { allUsers, filteredUsers, setFilteredUsers, error, userDataFetch} = useFetchUsers();
  const app = new Map(appMetaList.map(app => [app.id, app])).get(Id);

  type SearchKeys = keyof UserMainInfo;
  type SearchObj = Record<SearchKeys, string>;

  const searchKeys = ["name", "username", "email", "phone", "website"] as const;
  const searchUseSateInitData: SearchObj = Object.fromEntries(searchKeys.map((value) => [value, ""])) as SearchObj;
  const [search, setSearch] = useState<SearchObj>(searchUseSateInitData);

  const onChangeHandler = (key: SearchKeys) => (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(prev => ({
      ...prev,
      [key]: e.target.value
    }))
  }
  
  React.useEffect(() => {
    userDataFetch();
  }, []);
 
  // 検索ボタン
  const onClickSearchButton = useCallback(() => {
    let result = allUsers;
    searchKeys.forEach((searchKey) => {
      const value = search[searchKey];
      if (value) {
        result = result.filter(user =>
          user[searchKey]?.toLowerCase().includes(value.toLowerCase()));
      }
    })
    setFilteredUsers(result);
  }, [search])

  // リセットボタン
  const onClickResetButton = () => {
    setSearch(searchUseSateInitData);
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
          <input id="name" name="name" value={search.name} type="text" onChange={onChangeHandler("name")} />
          <label htmlFor="username">username:</label>
          <input id="username" name="username" value={search.username} type="text" onChange={onChangeHandler("username")} />
        </div>
        <div>
          <label htmlFor="email">email:</label>
          <input id="email" name="email" value={search.email} type="text" onChange={onChangeHandler("email")} />
          <label htmlFor="phone">phone:</label>
          <input id="phone" name="phone" value={search.phone} type="text" onChange={onChangeHandler("phone")} />
          <label htmlFor="website">website:</label>
          <input id="website" name="website" value={search.website} type="text" onChange={onChangeHandler("website")} />
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
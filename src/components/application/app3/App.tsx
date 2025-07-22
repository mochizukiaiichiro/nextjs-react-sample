"use client"

import Link from "next/link";
import React from "react";
import { appMetaList } from "@/lib/appMetaList";
import { useSearchUsers } from "./hooks/useSearchUsers";
import { useInitializeUsers } from "./hooks/useInitializeUsers";
import { Table } from "./style/styled-components";

export const App = ({ Id }: { Id: string }) => {
  const { allUsers, filteredUsers, error, setFilteredUsers } = useInitializeUsers();
  const { searchItems, onChangeSearchItemInput, onClickSearchButton, onClickResetButton } = useSearchUsers(allUsers, setFilteredUsers);
  const app = new Map(appMetaList.map(app => [app.id, app])).get(Id);

  return (
    <>
      <h1>{app?.title ?? "タイトル未定"}</h1>
      <p>{app?.description}</p>
      <form onSubmit={(e) => { e.preventDefault(); onClickSearchButton(); }}>
        <p>検索項目</p>
        <div>
          <label htmlFor="name">name:</label>
          <input id="name" name="name" value={searchItems.name} type="text" onChange={onChangeSearchItemInput("name")} />
          <label htmlFor="username">username:</label>
          <input id="username" name="username" value={searchItems.username} type="text" onChange={onChangeSearchItemInput("username")} />
        </div>
        <div>
          <label htmlFor="email">email:</label>
          <input id="email" name="email" value={searchItems.email} type="text" onChange={onChangeSearchItemInput("email")} />
          <label htmlFor="phone">phone:</label>
          <input id="phone" name="phone" value={searchItems.phone} type="text" onChange={onChangeSearchItemInput("phone")} />
          <label htmlFor="website">website:</label>
          <input id="website" name="website" value={searchItems.website} type="text" onChange={onChangeSearchItemInput("website")} />
        </div>
        <div>
        </div>
        <button type="submit">検索</button>
        <button type="button" onClick={onClickResetButton}>リセット</button>
      </form>
      <p>検索結果: {filteredUsers.length} 件</p>
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
      {filteredUsers.length === 0 && (<p>該当するユーザーが見つかりません</p>)}
    </>
  )
}

export default App
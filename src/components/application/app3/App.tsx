"use client"

import React from "react";
import { appMetaList } from "@/lib/appMetaList";
import { useSearchUsers } from "./hooks/useSearchUsers";
import { useInitializeUsers } from "./hooks/useInitializeUsers";
import { SearchList } from "./components/searchList";
import { SearchItemBox } from "./components/searchItemBox";
import { PageWrapper } from "./style/app3-styled-components";

export const App = ({ Id }: { Id: string }) => {
  const { allUsers, filteredUsers, error, setFilteredUsers } = useInitializeUsers();
  const { searchItems, onChangeSearchItemInput, onClickSearchButton, onClickResetButton } = useSearchUsers(allUsers, setFilteredUsers);
  const app = new Map(appMetaList.map(app => [app.id, app])).get(Id);

  return (
    <PageWrapper>
      <h1>{app?.title ?? "タイトル未定"}</h1>
      <p>{app?.description}</p>
      <p>検索項目</p>
      <SearchItemBox searchItems={searchItems}
        onClickSearchButton={onClickSearchButton}
        onClickResetButton={onClickResetButton}
        onChangeSearchItemInput={onChangeSearchItemInput} />
      <p>検索結果: {filteredUsers.length} 件</p>
      <SearchList filteredUsers={filteredUsers} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {filteredUsers.length === 0 && (<p>該当するユーザーが見つかりません</p>)}
    </PageWrapper>
  )
}

export default App
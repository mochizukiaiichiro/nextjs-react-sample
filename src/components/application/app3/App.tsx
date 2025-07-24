"use client"

import { useSearchUsers } from "./hooks/useSearchUsers";
import { useInitializeUsers } from "./hooks/useInitializeUsers";
import { SearchList } from "./components/searchList";
import { SearchItemBox } from "./components/searchItemBox";
import { PageWrapper } from "./style/app3-styled-components";
import { useSortUsers } from "./hooks/useSortUsers";

export const App = () => {
  const { allUsers, filteredUsers, error, setFilteredUsers } = useInitializeUsers();
  const { searchItems, onChangeSearchItemInput, onClickSearchButton, onClickResetButton } = useSearchUsers(allUsers, setFilteredUsers);
  const { sortKey, sortOrder, handleSort, sortedUsers } = useSortUsers(filteredUsers);

  return (
    <PageWrapper>
      <p>検索項目</p>
      <SearchItemBox searchItems={searchItems}
        onClickSearchButton={onClickSearchButton}
        onClickResetButton={onClickResetButton}
        onChangeSearchItemInput={onChangeSearchItemInput}
      />
      <p>検索結果: {filteredUsers.length} 件</p>
      <SearchList
        filteredUsers={sortedUsers}
        sortKey={sortKey}
        sortOrder={sortOrder}
        handleSort={handleSort}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {filteredUsers.length === 0 && (<p>該当するユーザーが見つかりません</p>)}
    </PageWrapper>
  )
}

export default App
import { User, UserMainInfo } from "@/types/user";
import { ChangeEvent, useCallback, useState } from "react";

export const useSearchUsers = (
  allUsers: User[],
  setFilteredUsers: (users: User[]) => void
) => {
  type SearchKeys = keyof UserMainInfo;
  type SearchObj = Record<SearchKeys, string>;
  const searchKeys = ["name", "username", "email", "phone", "website"] as const;

  const searchUseSateInitData: SearchObj = Object.fromEntries(
    searchKeys.map((value) => [value, ""])
  ) as SearchObj;

  const [search, setSearch] = useState<SearchObj>(searchUseSateInitData);

  const onChangeHandler =
    (key: SearchKeys) => (e: ChangeEvent<HTMLInputElement>) => {
      setSearch((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  // 検索ボタン
  const onClickSearchButton = useCallback(() => {
    let result = allUsers;
    searchKeys.forEach((searchKey) => {
      const value = search[searchKey];
      if (value) {
        result = result.filter((user) =>
          user[searchKey]?.toLowerCase().includes(value.toLowerCase())
        );
      }
    });
    setFilteredUsers(result);
  }, [search, allUsers]);

  // リセットボタン
  const onClickResetButton = () => {
    setSearch(searchUseSateInitData);
    setFilteredUsers(allUsers);
  };

  return {
    search,
    setSearch,
    onChangeHandler,
    onClickSearchButton,
    onClickResetButton,
  };
};

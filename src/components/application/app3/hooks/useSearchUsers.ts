import { User, UserMainInfo } from "@/types/user";
import { ChangeEvent, useCallback, useState } from "react";

export const useSearchUsers = (
  allUsers: User[],
  setFilteredUsers: (users: User[]) => void
) => {
  type SearchKeys = keyof UserMainInfo;
  type SearchObj = Record<SearchKeys, string>;
  const searchKeys = ["name", "username", "email", "phone", "website"] as const;

  const searchItemsInitData: SearchObj = Object.fromEntries(
    searchKeys.map((value) => [value, ""])
  ) as SearchObj;

  const [searchItems, setSearchItems] =
    useState<SearchObj>(searchItemsInitData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onChangeSearchItemInput =
    (key: SearchKeys) => (e: ChangeEvent<HTMLInputElement>) => {
      setSearchItems((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  // 検索ボタン
  const onClickSearchButton = useCallback(() => {
    setIsSubmitting(true);

    let result = allUsers;
    searchKeys.forEach((searchKey) => {
      const value = searchItems[searchKey];
      if (value) {
        result = result.filter((user) =>
          user[searchKey]?.toLowerCase().includes(value.toLowerCase())
        );
      }
    });
    setIsSubmitting(false);

    setFilteredUsers(result);
  }, [searchItems, allUsers]);

  // リセットボタン
  const onClickResetButton = () => {
    setSearchItems(searchItemsInitData);
    setFilteredUsers(allUsers);
  };

  return {
    searchItems,
    setSearchItems,
    onChangeSearchItemInput,
    onClickSearchButton,
    onClickResetButton,
    isSubmitting,
    setIsSubmitting,
  };
};

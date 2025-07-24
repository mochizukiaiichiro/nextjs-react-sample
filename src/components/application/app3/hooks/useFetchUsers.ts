import { User } from "@/types/user";
import { useCallback, useState } from "react";

export const useFetchUsers = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  type ApiResponse = { users: User[] } | { error: string };
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const userDataFetch = useCallback(async () => {
    try {
      const res = await fetch("/api/app2/users"); //https://jsonplaceholder.typicode.com/users
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
    setIsLoading(false);
  }, []);

  return {
    allUsers,
    setAllUsers,
    filteredUsers,
    setFilteredUsers,
    error,
    setError,
    userDataFetch,
    isLoading,
    setIsLoading,
  };
};

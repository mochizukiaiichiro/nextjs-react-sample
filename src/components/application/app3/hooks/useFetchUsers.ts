import { User } from "@/types/user";
import { useState } from "react";

export const useFetchUsers = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  type ApiResponse = { users: User[] } | { error: string };

  async function userDataFetch() {
    try {
      const res = await fetch("/api/users"); //https://jsonplaceholder.typicode.com/users
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

  return { allUsers, filteredUsers, setFilteredUsers, error, userDataFetch };
};

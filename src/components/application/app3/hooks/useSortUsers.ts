import { User } from "@/types/user";
import { useMemo, useState } from "react";

export const useSortUsers = (filteredUsers: User[]) => {
  const [sortKey, setSortKey] = useState<keyof User | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: keyof User) => {
    if (key === sortKey) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };
  
  const sortedUsers = useMemo(() => {
    if (!sortKey) return filteredUsers;
    return [...filteredUsers].sort((a, b) => {
      const valA = String(a[sortKey]).toLowerCase();
      const valB = String(b[sortKey]).toLowerCase();
      const compare = valA.localeCompare(valB);
      return sortOrder === "asc" ? compare : -compare;
    });
  }, [filteredUsers, sortKey, sortOrder]);

  return {
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,
    handleSort,
    sortedUsers,
  };
};

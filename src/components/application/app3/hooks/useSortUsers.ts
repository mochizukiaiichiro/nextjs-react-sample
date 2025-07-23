import { User } from "@/types/user";
import { useMemo, useState } from "react";

// フィールドごとの型分類を定義
const columnTypeMap: Partial<Record<keyof User, "string" | "number" | "date">> =
  {
    id: "number",
    name: "string",
    username: "string",
    email: "string",
    phone: "string",
    website: "string",
  };

// 比較関数（型ごとに分岐）
const compare = (
  a: User,
  b: User,
  key: keyof User,
  type: "string" | "number" | "date"
) => {
  const valA = a[key];
  const valB = b[key];

  if (type === "number") {
    return Number(valA) - Number(valB);
  }

  if (type === "date") {
    return new Date(String(valA)).getTime() - new Date(String(valB)).getTime();
  }

  return String(valA).localeCompare(String(valB));
};

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
    const type = columnTypeMap[sortKey] ?? "string";

    return [...filteredUsers].sort((a, b) => {
      const result = compare(a, b, sortKey, type);
      return sortOrder === "asc" ? result : -result;
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

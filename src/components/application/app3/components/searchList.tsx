import Link from "next/link"
import { Table } from "../style/app3-styled-components"
import { User } from "@/types/user"

type Props = {
    filteredUsers: User[]
    sortKey: keyof User | null;
    sortOrder: "asc" | "desc";
    handleSort: (key: keyof User) => void;
}

const columnKeys: (keyof User)[] = ["id", "name", "username", "email", "phone", "website"];

export const SearchList = (props: Props) => {
    const { filteredUsers, sortKey, sortOrder, handleSort } = props;
    return (
        <Table>
            <thead>
                <tr>
                    {columnKeys.map((key) => (
                        <th key={key} onClick={() => handleSort(key)} style={{ cursor: "pointer" }}>
                            {key}
                            {sortKey === key && (sortOrder === "asc" ? " 🔼" : " 🔽")}
                        </th>
                    ))}
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
    )
}
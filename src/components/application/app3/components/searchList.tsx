import Link from "next/link"
import { Table } from "../style/app3-styled-components"
import { User } from "@/types/user"

type Props = {
    filteredUsers: User[]
}

export const SearchList = ({ filteredUsers }: Props) => {
    return (
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
    )
}
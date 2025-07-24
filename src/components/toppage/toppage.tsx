"use client"
import Link from "next/link"
import { Table } from "./style/toppage-styled-components";
import { enabledAppList } from "@/lib/appMetaDataRecord";

export default function TopPage() {
  return (
    <>
      <h1>トップページ</h1>
      <Table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>説明</th>
          </tr>
        </thead>
        <tbody>
          {enabledAppList.map(({ id, title, description }, index) => (
            <tr key={index}>
              <td><Link href={`/${id}`}> {title}</Link></td>
              <td>{description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
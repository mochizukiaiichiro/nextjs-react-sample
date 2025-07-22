"use client"
import { appMetaList } from "@/lib/appMetaList";
import Link from "next/link"
import { Table } from "./style/home-styled-components";

export default function Home() {
  const tableList = appMetaList.filter(app => app.enabled);

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
          {tableList.map(({ id, title, description }, index) => (
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
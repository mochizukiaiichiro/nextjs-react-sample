"use client"
import { appMetaList } from "@/lib/appMetaList";
import Link from "next/link"
import styled from "styled-components"

const Table = styled.table`
  border: 1px solid #ccc;
  border-collapse: collapse;
  width: auto;

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
  thead {
    background-color: #f5f5f5;
  }
  thead th {
    color: #333;
    font-weight: bold;
  }
`

export default function Home() {
  const tableList = appMetaList.filter(app => app.enabled);

  return (
    <>
      <h1>トップページ</h1>
      <Table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>説明</th></tr>
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
"use client"
import { appList } from "@/lib/apps"
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

export default function Page() {
  return (
    <>
      <h1>トップページ</h1>
      <Table>
        <thead>
          <tr><th>タイトル</th></tr>
        </thead>
        <tbody>
          {appList.map(({ id, title }, index) => (
            <tr key={index}><td><Link href={`${id}`}> {title}</Link></td></tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
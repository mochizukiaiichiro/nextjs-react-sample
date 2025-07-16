"use client"
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
  const lists = [
    { path: "app1", title: "簡易メモアプリ" },
    { path: "app2", title: "APIの実装と動作確認" },
    { path: "app3", title: "外部APIからのデータフェッチ確認" },
  ]

  return (
    <>
      <h1>サンプルアプリ</h1>
      <Table>
        <thead>
          <tr><th>タイトル</th></tr>
        </thead>
        <tbody>
          {lists.map(({ title, path }, index) => (
            <tr key={index}><td><Link href={`/header/${path}`}> {title}</Link></td></tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
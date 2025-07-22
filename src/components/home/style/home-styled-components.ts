import styled from "styled-components";

export const Table = styled.table`
  border: 1px solid #ccc;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }

  /* タイトル列（1列目） */
  th:nth-child(1),
  td:nth-child(1) {
    width: auto;
    white-space: nowrap; /* 自動改行しない */
  }

  /* 説明列（2列目） */
  th:nth-child(2),
  td:nth-child(2) {
    width: 500px;
    white-space: normal;
  }

  thead {
    background-color: #f5f5f5;
  }
  thead th {
    color: #333;
    font-weight: bold;
  }
`;

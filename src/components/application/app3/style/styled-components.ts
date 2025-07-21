import styled from "styled-components";

export const Table = styled.table`
  border: 1px solid #ccc;
  border-collapse: collapse;
  width: auto;

  th,
  td {
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
`;

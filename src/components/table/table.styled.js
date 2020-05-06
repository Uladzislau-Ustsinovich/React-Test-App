import styled from "styled-components";

export const TableWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  table {
    border-spacing: 0;
    font-size: 20px;
    border: 2px solid ${({ theme }) => theme.tableBorder};
    margin-bottom: 40px;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0 20px;
      max-width: 250px;
      word-wrap: break-word;
      border-bottom: 2px solid ${({ theme }) => theme.tableBorder};
      border-right: 2px solid ${({ theme }) => theme.tableBorder};

      :last-child {
        border-right: 0;
      }
    }
  }
`;

export const Pagination = styled.div`
  text-align: center;
  span {
    font-size: 25px;
    padding: 0 20px;
  }
`;

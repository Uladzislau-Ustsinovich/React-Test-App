import styled from 'styled-components';

export const TableStyle = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
table {
    border-spacing: 0;
    font-size: 20px;
    border: 2px solid ${({theme}) => theme.tableBorder};
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
        border-bottom: 2px solid ${({theme}) => theme.tableBorder};
        border-right: 2px solid ${({theme}) => theme.tableBorder};

    :last-child {
            border-right: 0;
        }
    }
}
`

export const Pagination = styled.div`
  text-align: center;
  span {
    font-size: 25px;
    padding: 0 20px;
  }
`
import React, { useEffect, useState } from 'react'
import { DefaultColumnFilter, IndeterminateCheckbox } from './TableService'
import { useFilters, usePagination, useRowSelect, useSortBy, useTable } from 'react-table'
import { Pagination, TableWrapper } from './Table.styled'
import { ButtonStyled } from '../Button/ButtonStyled'
import { pageRowsCount } from '../../GitReposTable/gitReposTable.constants'

export const Table = ({ columns, data, selectedRowsSetHandler }) => {
  const [selectedRows, setSelectedRows] = useState([])

  const defaultColumn = {
    Filter: DefaultColumnFilter
  }

  useEffect(() => {
    selectedRowsSetHandler(selectedFlatRows)
  }, [selectedRows, selectedRowsSetHandler, selectedFlatRows])

  const checkBoxClickHandler = () => {
    setSelectedRows(selectedFlatRows)
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    selectedFlatRows,
    state: { pageIndex, selectedRowIds }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageSize: pageRowsCount }
    },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox
                onClick={checkBoxClickHandler}
                {...getToggleAllRowsSelectedProps()}
              />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox
                onClick={checkBoxClickHandler}
                {...row.getToggleRowSelectedProps()}
              />
            </div>
          )
        },
        ...columns
      ])
    }
  )

  return (
    <TableWrapper>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  <div>
                    <span {...column.getSortByToggleProps()}>{column.render('Header')}</span>
                  </div>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <Pagination>
        <ButtonStyled onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'Prev'}
        </ButtonStyled>

        <span>
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>

        <ButtonStyled onClick={() => nextPage()} disabled={!canNextPage}>
          {'Next'}
        </ButtonStyled>
      </Pagination>
    </TableWrapper>
  )
}

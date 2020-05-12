import React from 'react'
import { useFilters, usePagination, useRowSelect, useSortBy, useTable } from 'react-table'
import { Pagination, TableWrapper } from './table.styled'
import { PAGE_ROWS_COUNT } from '../../app/gitReposTable/gitReposTable.constants'
import { Button } from '../button/Button'

export const Table = ({ columns, data, selectedRowsSetHandler }) => {
  const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  })

  const DefaultColumnFilter = ({ column: { filterValue, preFilteredRows, setFilter } }) => {
    const count = preFilteredRows.length
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
        placeholder={`Search ${count} records...`}
      />
    )
  }

  const defaultColumn = {
    Filter: DefaultColumnFilter
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
      initialState: { pageSize: PAGE_ROWS_COUNT }
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
                onClick={selectedRowsSetHandler(selectedFlatRows)}
                {...getToggleAllRowsSelectedProps()}
              />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox
                onClick={selectedRowsSetHandler(selectedFlatRows)}
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
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'Prev'}
        </Button>

        <span>
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>

        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {'Next'}
        </Button>
      </Pagination>
    </TableWrapper>
  )
}

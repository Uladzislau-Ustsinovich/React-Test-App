import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchMembers} from "../../redux/action";
import {Modal} from "./Modal/Modal";
import {columns} from "./TableColumnsTitles";
import {DefaultColumnFilter, IndeterminateCheckbox} from "./TableService";
import {TableButtons} from "./TableButtons/TableButtons";
import {useFilters, usePagination, useRowSelect, useSortBy, useTable} from "react-table";
import {Pagination, TableStyle} from "./Table.styled";
import {Loader} from "../Loader/Loader";
import {ButtonStyled} from "./TableButtons/TableButtons.styled";


export const Table = () => {
    const dispatch = useDispatch();
    const [selectedRow, setSelectedRow] = useState({});
    const [isLoading, setLoading] = useState(false);

    const data = useSelector(state => state.gitRepos.data);

    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter,
        }),
        []
    );
    useEffect(() => {
        if (!data.length) {
            setLoading(true);
            dispatch(fetchMembers());
            setLoading(false);
        }
    }, []);

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
        state: {pageIndex, selectedRowIds},
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: {pageSize: 10},
        },
        useFilters,
        useSortBy,
        usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({getToggleAllRowsSelectedProps}) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({row}) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        }
    );


    if (isLoading) {
        return <Loader/>
    }

    return (
        <TableStyle>

            <TableButtons
                selectedFlatRows={selectedFlatRows}
                setSelectedRow={setSelectedRow}
            />

            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                <div>
                                    <span {...column.getSortByToggleProps()}>
                                        {column.render('Header')}
                                    </span>
                                </div>
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row);
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

            <Modal row={selectedRow}/>

        </TableStyle>
    )
};
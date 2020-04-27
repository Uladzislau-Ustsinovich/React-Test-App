import React, {useState, useEffect} from 'react'
import {useTable, usePagination, useSortBy, useFilters, useRowSelect} from "react-table";
import styles from "./Table.less"
import {useDispatch, useSelector} from "react-redux";
import {deleteRows, dublicateRows, fetchMembers, setEdit, showModal} from "../../redux/action";
import {Modal} from "./Modal/Modal";
import {columns} from "./TableColumnsTitles";

function DefaultColumnFilter({column: {filterValue, preFilteredRows, setFilter},}) {
    const count = preFilteredRows.length;
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


const IndeterminateCheckbox = React.forwardRef(
    ({indeterminate, ...rest}, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate]);

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        )
    }
);

export const Table = () => {
    const dispatch = useDispatch();
    const [selectedRow, editRow] = useState({});
    const [isLoading, setLoading] = useState(false);

    const data = useSelector(state => state.gitRepos.data);

    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter,
        }),
        []
    );
    useEffect(()=>{
        if(!data.length) {
            setLoading(true);
            dispatch(fetchMembers());
            setLoading(false);
        }
    },[]);

    // useEffect(()=>{
    //     if (selectedFlatRows.length != 1) {
    //         dispatch(setEdit(false));
    //         dispatch(showModal(false));
    //     }
    // });

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
            initialState: {pageSize: 6},
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

    const dublicateHandler = () => {
        const data = selectedFlatRows.map(d => d.original);
        dispatch(dublicateRows(data));
    };

    const deleteHandler = () => {
        const data = selectedFlatRows.map(d => d.original._id);
        dispatch(deleteRows(data));
    };

    const copyHandler = () => {
            localStorage.setItem("copy", JSON.stringify(selectedFlatRows[0].original));
    };

    const addHandler = () => {
        dispatch(showModal(true));
        dispatch(setEdit(false));
    };

    const editHandler = () => {
        dispatch(showModal(true));
        dispatch(setEdit(true));
        editRow(selectedFlatRows[0].original);
    };

    if (isLoading) {
        return <h2>Loading</h2>
    }

    return (
        <div>
            <button onClick={dublicateHandler}>Dublicate</button>
            <button onClick={deleteHandler}>Delete</button>
            <button onClick={addHandler}>Add</button>
            {selectedFlatRows.length === 1 &&
            <>
                <button onClick={copyHandler}>Copy</button>
                <button onClick={editHandler}>Edit</button>
            </>
            }
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                <div>
                                    <span {...column.getSortByToggleProps()}>
                                        {column.render('Header')}
                                        {column.isSorted ? column.isSortedDesc ? '🔽' : '🔼' : ''}
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

            <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
            <pre>
        <code>
          {JSON.stringify(
              {
                  selectedRowIds: selectedRowIds,
                  'selectedFlatRows[].original': selectedFlatRows.map(
                      d => d.original
                  ),
              },
              null,
              2
          )}
        </code>
      </pre>

            <div className="pagination">
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>

                <span>
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>

                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>

            </div>
            <Modal row = {selectedRow}/>
        </div>
    )
};
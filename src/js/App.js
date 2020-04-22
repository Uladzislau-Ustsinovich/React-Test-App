import React, {useEffect, useState, useMemo} from 'react'
import axios from 'axios'
import {Table} from "./components/Table/Table";
import {useDispatch, useSelector} from "react-redux";
import {fetchMembers} from "./redux/action";

function App() {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loading)
    const data = useSelector(state => state.data)

    useEffect(() => {
        dispatch(fetchMembers());
    }, []);

    const columns = React.useMemo(
        () => [
          //   {
          //       Header: () => null,
          //       id: 'expander',
          //       Cell: ({ row }) => (
          //           <span {...row.getToggleRowExpandedProps()}>
          //   {row.isExpanded ? '👇' : '👉'}
          // </span>
          //       ),
          //   },
            {
                Header: 'Facebook repos',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'name',
                    },
                    {
                        Header: 'Id',
                        accessor: 'id',
                    },
                    {
                        Header: 'Forks',
                        accessor: 'forks',
                    },
                    {
                        Header: 'Watchers',
                        accessor: 'watchers',
                    },
                    {
                        Header: 'Stars',
                        accessor: 'stargazers_count',
                    }
                ],
            }
        ],
        []
    )

    if (loading) {
        return <h2>Loading</h2>
    }
    return (
        <div>
            <Table columns={columns} data={data}/>
        </div>
    )
}

export default App

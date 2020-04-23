import React, {useEffect} from 'react'
import {Table} from "./components/Table/Table";
import {useDispatch, useSelector} from "react-redux";
import {fetchMembers} from "./redux/action";
import Charts from "./components/Charts/Charts";

function App() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.app.loading);
    const data = useSelector(state => state.data.data);

    useEffect(() => {
        dispatch(fetchMembers());
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Facebook repos',
                columns: [
                    {
                        Header: 'Id',
                        accessor: 'id',
                    },
                    {
                        Header: 'Name',
                        accessor: 'name',
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
            {/*<Charts/>*/}
        </div>
    )
}

export default App

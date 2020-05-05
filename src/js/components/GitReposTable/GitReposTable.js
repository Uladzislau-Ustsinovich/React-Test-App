import React, { useState, useEffect } from 'react'
import { Table } from '../Shareable/Table/Table'
import { TableButtons } from './TableButtons/TableButtons'
import { columns } from './tableColumnsTitles'
import { Loader } from '../Shareable/Loader/Loader'
import { fetchMembers } from './redux/action'
import { useDispatch, useSelector } from 'react-redux'
import { GitReposTableWrapper } from './gitReposTable.styled'
import { ManageGitReposModal } from './ManageGitReposModal/ManageGitReposModal'
import { gitReposDataSelector } from './redux/gitReposTable.selectors'

export const GitReposTable = () => {
  const dispatch = useDispatch()
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRow, setSelectedRow] = useState({}) // For edit button
  const [isLoading, setLoading] = useState(false)
  const [isModalShow, setModalShow] = useState(false)
  const [isEdit, setEdit] = useState(false)
  const data = useSelector(gitReposDataSelector)

  useEffect(() => {
    if (!data.length) {
      setLoading(true)
      dispatch(fetchMembers()).then(() => setLoading(false))
    }
  }, [data.length, dispatch])

  if (isLoading) {
    return <Loader />
  }

  return (
    <GitReposTableWrapper>
      <TableButtons
        selectedFlatRows={selectedRows}
        setSelectedRow={setSelectedRow}
        setModalShow={setModalShow}
        setEdit={setEdit}
      />

      <Table columns={columns} data={data} selectedRowsSetHandler={setSelectedRows} />

      {isModalShow && (
        <ManageGitReposModal
          row={selectedRow}
          setShowModal={setModalShow}
          setEdit={setEdit}
          isEdit={isEdit}
        />
      )}
    </GitReposTableWrapper>
  )
}

import React, { useState, useEffect } from 'react'
import { Table } from '../../components/table/Table'
import { GitReposTableButtons } from './tableButtons/GitReposTableButtons'
import { COLUMNS } from './gitReposTable.constants'
import { Loader } from '../../components/loader/Loader'
import { fetchMembers } from './state/gitReposTable.action'
import { useDispatch, useSelector } from 'react-redux'
import { GitReposTableWrapper } from './gitReposTable.styled'
import { ManageGitReposModal } from './manageGitReposModal/ManageGitReposModal'
import { gitReposDataSelector } from './state/gitReposTable.selectors'

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
      <GitReposTableButtons
        selectedFlatRows={selectedRows}
        setSelectedRow={setSelectedRow}
        setModalShow={setModalShow}
        setEdit={setEdit}
      />

      <Table columns={COLUMNS} data={data} selectedRowsSetHandler={setSelectedRows} />

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

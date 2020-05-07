import React, { useState, useEffect } from 'react'
import { Table } from '../../components/table/Table'
import { GitReposTableButtons } from './tableButtons/GitReposTableButtons'
import {COLUMN_TITLES} from './gitReposTable.constants'
import { Loader } from '../../components/loader/Loader'
import { fetchMembers } from './state/gitReposTable.action'
import { useDispatch, useSelector } from 'react-redux'
import { GitReposTableWrapper } from './gitReposTable.styled'
import { ManageGitReposModal } from './manageGitReposModal/ManageGitReposModal'
import { gitReposDataSelector } from './state/gitReposTable.selectors'

export const GitReposTable = () => {
  const dispatch = useDispatch()
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowForEdit, setSelectedRowForEdit] = useState({}) // For edit button
  const [isLoading, setLoading] = useState(false)
  const [isShowModal, setShowModal] = useState(false)
  const [isShowModalForEdit, setShowModalForEdit] = useState(false)
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
        setSelectedRow={setSelectedRowForEdit}
        setShowModal={setShowModal}
        setShowModalForEdit={setShowModalForEdit}
      />

      <Table columns={COLUMN_TITLES} data={data} selectedRowsSetHandler={setSelectedRows} />

      {isShowModal && (
        <ManageGitReposModal
          selectedRow={selectedRowForEdit}
          setShowModal={setShowModal}
          setShowModalForEdit={setShowModalForEdit}
          isShowModalForEdit={isShowModalForEdit}
        />
      )}
    </GitReposTableWrapper>
  )
}

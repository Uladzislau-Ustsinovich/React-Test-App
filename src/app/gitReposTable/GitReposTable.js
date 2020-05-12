import React, { useState } from 'react'
import { Table } from '../../components/table/Table'
import { GitReposTableButtons } from './tableButtons/GitReposTableButtons'
import { COLUMN_TITLES } from './gitReposTable.constants'
import { useSelector } from 'react-redux'
import { GitReposTableWrapper } from './gitReposTable.styled'
import { ManageGitReposModal } from './manageGitReposModal/ManageGitReposModal'
import { gitReposDataSelector } from '../gitRepos/state/gitRepos.selectors'

export const GitReposTable = () => {
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedRowForEdit, setSelectedRowForEdit] = useState({})
  const [isShowModal, setShowModal] = useState(false)
  const [isShowModalForEdit, setShowModalForEdit] = useState(false)
  const data = useSelector(gitReposDataSelector)

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

import React, { useState } from 'react'
import { Table } from '../../../components/table/Table'
import { GitReposTableButtons } from './tableButtons/GitReposTableButtons'
import { COLUMN_TITLES } from './gitReposTable.constants'
import { useSelector } from 'react-redux'
import { GitReposTableWrapper } from './gitReposTable.styled'
import { ManageGitReposModal } from './manageGitReposModal/ManageGitReposModal'
import { gitReposDataSelector } from '../state/gitRepos.selectors'

export const GitReposTable = () => {
  const [selectedRows, setSelectedRows] = useState([])
  const [isModalOpened, setModalOpen] = useState(false)
  const [isModalOpenedForEdit, setModalOpenForEdit] = useState(false)
  const data = useSelector(gitReposDataSelector)

  return (
    <GitReposTableWrapper>
      <GitReposTableButtons
        selectedFlatRows={selectedRows}
        setShowModal={setModalOpen}
        setShowModalForEdit={setModalOpenForEdit}
      />

      <Table columns={COLUMN_TITLES} data={data} selectedRowsSetHandler={setSelectedRows} />

      {isModalOpened && (
        <ManageGitReposModal
          selectedRows={selectedRows}
          setShowModal={setModalOpen}
          setShowModalForEdit={setModalOpenForEdit}
          isShowModalForEdit={isModalOpenedForEdit}
        />
      )}
    </GitReposTableWrapper>
  )
}

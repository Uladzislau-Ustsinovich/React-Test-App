import React from 'react'
import { deleteRows, dublicateRows } from '../../state/gitRepos.action'
import { useDispatch } from 'react-redux'
import { COPIED_GIT_REPOS_STORAGE_KEY } from '../gitReposTable.constants'
import { Button } from '../../../../components/button/Button'

export const GitReposTableButtons = ({
  selectedFlatRows,
  setSelectedRow,
  setShowModal,
  setShowModalForEdit
}) => {
  const dispatch = useDispatch()

  const dublicateHandler = () => {
    const data = selectedFlatRows.map(d => d.original._id)
    dispatch(dublicateRows(data))
  }

  const deleteHandler = () => {
    const data = selectedFlatRows.map(d => d.original._id)
    dispatch(deleteRows(data))
  }

  const copyHandler = () => {
    localStorage.setItem(COPIED_GIT_REPOS_STORAGE_KEY, JSON.stringify(selectedFlatRows[0].original))
  }

  const addHandler = () => {
    setShowModal(true)
    setShowModalForEdit(false)
  }

  const editHandler = () => {
    setShowModal(true)
    setShowModalForEdit(true)
    setSelectedRow(selectedFlatRows[0].original)
  }

  return (
    <div>
      <Button onClick={dublicateHandler}>Dublicate</Button>
      <Button onClick={deleteHandler}> Delete</Button>
      <Button onClick={addHandler}>Add</Button>
      {selectedFlatRows.length === 1 && (
        <>
          <Button onClick={copyHandler}>Copy</Button>
          <Button onClick={editHandler}>Edit</Button>
        </>
      )}
    </div>
  )
}

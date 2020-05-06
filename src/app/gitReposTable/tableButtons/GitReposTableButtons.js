import React from 'react'
import { deleteRows, dublicateRows } from '../state/gitReposTable.action'
import { useDispatch } from 'react-redux'
import {Button} from "../../../components/button/Button";
import {COPIED_GIT_REPO} from "../gitReposTable.constants";


export const GitReposTableButtons = ({ selectedFlatRows, setSelectedRow, setModalShow, setEdit }) => {
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
    localStorage.setItem(COPIED_GIT_REPO, JSON.stringify(selectedFlatRows[0].original))
  }

  const addHandler = () => {
    setModalShow(true)
    setEdit(false)
  }

  const editHandler = () => {
    setModalShow(true)
    setEdit(true)
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

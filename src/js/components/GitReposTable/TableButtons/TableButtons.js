import React from 'react'
import { deleteRows, dublicateRows } from '../redux/action'
import { useDispatch } from 'react-redux'
import { ButtonStyled } from '../../Shareable/Button/ButtonStyled'

export const TableButtons = ({ selectedFlatRows, setSelectedRow, setModalShow, setEdit }) => {
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
    localStorage.setItem('copiedGitRepo', JSON.stringify(selectedFlatRows[0].original))
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
      <ButtonStyled onClick={dublicateHandler}>Dublicate</ButtonStyled>
      <ButtonStyled onClick={deleteHandler}> Delete</ButtonStyled>
      <ButtonStyled onClick={addHandler}>Add</ButtonStyled>
      {selectedFlatRows.length === 1 && (
        <>
          <ButtonStyled onClick={copyHandler}>Copy</ButtonStyled>
          <ButtonStyled onClick={editHandler}>Edit</ButtonStyled>
        </>
      )}
    </div>
  )
}

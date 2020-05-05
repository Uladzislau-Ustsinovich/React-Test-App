import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ModalInputFields } from './ModalInputFields/ModalInputFields'
import { Modal } from '../../Shareable/Modal/Modal'
import { addRow, editRow } from '../redux/action'
import { checkFields } from './validation'
import { ButtonStyled } from '../../Shareable/Button/ButtonStyled'

const numberValues = ['id', 'forks', 'watchers', 'issues']

export const ManageGitReposModal = ({ row,setShowModal,setEdit,isEdit}) => {
  const dispatch = useDispatch()
  const [rowBuffer, setBuffer] = useState({})


  useEffect(() => {
    clearFields()
    if (row && isEdit) {
      pasteToRow(row)
    }
  }, [isEdit,clearFields, row])

  const pasteToRow = obj => {
    setBuffer({
      _id: obj._id,
      id: Number(obj.id),
      name: obj.name,
      forks: Number(obj.forks),
      watchers: Number(obj.watchers),
      issues: Number(obj.issues)
    })
  }

  const changeInputHandler = event => {
    if (numberValues.includes(event.target.name)) {
      setBuffer({
        ...rowBuffer,
        [event.target.name]: Number(event.target.value)
      })
    } else setBuffer({ ...rowBuffer, [event.target.name]: event.target.value })
  }

  const clearFields = () => {
    for (let key in rowBuffer) setBuffer(prev => ({ ...prev, ...{ [key]: '' } }))
    setBuffer(prev => ({ ...prev, ...{ _id: '' } }))
  }

  const submitHandler = () => {
    if (!checkFields(rowBuffer)) return
    dispatch(addRow(rowBuffer))
    clearFields()
    closeHandler()
  }

  const editHandler = () => {
    if (!checkFields(rowBuffer)) return
    dispatch(editRow(rowBuffer))
    closeHandler()
  }

  const pasteHandler = () => {
    const obj = JSON.parse(localStorage.getItem('copiedGitRepo'))
    pasteToRow(obj)
  }

  const closeHandler = () => {
    clearFields()
    setShowModal(false)
    setEdit(false)
  }

  return (
    <>
        <Modal closeHandler={closeHandler}>
          <ModalInputFields changeInputHandler={changeInputHandler} rowBuffer={rowBuffer} />
          <div className="modal__footer">
            {isEdit && <ButtonStyled onClick={editHandler}>Edit</ButtonStyled>}
            {!isEdit && <ButtonStyled onClick={submitHandler}>Submit</ButtonStyled>}
            <ButtonStyled onClick={pasteHandler}>Paste</ButtonStyled>
            <ButtonStyled onClick={clearFields}>Clear</ButtonStyled>
            <ButtonStyled onClick={closeHandler}>Close</ButtonStyled>
          </div>
        </Modal>
    </>
  )
}

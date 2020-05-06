import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ManageGitReposForm } from './ManageGitReposForm/ManageGitReposForm'
import { Modal } from '../../../components/modal/Modal'
import { addRow, editRow } from '../state/gitReposTable.action'
import { checkFields, pasteToRow } from '../gitReposTable.helpers'
import { Button } from '../../../components/button/Button'
import {COPIED_GIT_REPO} from "../gitReposTable.constants";

const numberValues = ['id', 'forks', 'watchers', 'issues']

export const ManageGitReposModal = ({ row, setShowModal, setEdit, isEdit }) => {
  const dispatch = useDispatch()
  const [rowBuffer, setBuffer] = useState({})

  useEffect(() => {
    clearFields()
    if (row && isEdit) {
      pasteToRow(setBuffer, row)
    }
  }, [isEdit, clearFields, row])

  const changeInputHandler = event => {
    if (numberValues.includes(event.target.name)) {
      setBuffer({
        ...rowBuffer,
        [event.target.name]: Number(event.target.value)
      })
    } else setBuffer({ ...rowBuffer, [event.target.name]: event.target.value })
  }

  const clearFields = () => {
    Object.keys(rowBuffer).forEach(key => setBuffer(prev => ({ ...prev, ...{ [key]: '' } })))
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
    const obj = JSON.parse(localStorage.getItem(COPIED_GIT_REPO))
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
        <ManageGitReposForm changeInputHandler={changeInputHandler} rowBuffer={rowBuffer} />
        <div className="modal__footer">
          {isEdit && <Button onClick={editHandler}>Edit</Button>}
          {!isEdit && <Button onClick={submitHandler}>Submit</Button>}
          <Button onClick={pasteHandler}>Paste</Button>
          <Button onClick={clearFields}>Clear</Button>
          <Button onClick={closeHandler}>Close</Button>
        </div>
      </Modal>
    </>
  )
}

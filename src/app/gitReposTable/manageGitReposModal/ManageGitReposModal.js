import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ManageGitReposForm } from './ManageGitReposForm/ManageGitReposForm'
import { Modal } from '../../../components/modal/Modal'
import { addRow, editRow } from '../state/gitReposTable.action'
import { checkFields, pasteToRow } from '../gitReposTable.helpers'
import { Button } from '../../../components/button/Button'
import { COPIED_GIT_REPO } from '../gitReposTable.constants'

const NUMBER_TYPE_FIELDS = ['id', 'forks', 'watchers', 'issues']

export const ManageGitReposModal = ({
  selectedRow,
  setShowModal,
  setShowModalForEdit,
  isShowModalForEdit
}) => {
  const dispatch = useDispatch()
  const [rowBuffer, setBuffer] = useState({})

  useEffect(() => {
    clearFields()
    if (selectedRow && isShowModalForEdit) {
      pasteToRow(setBuffer, selectedRow)
    }
  }, [isShowModalForEdit, clearFields, selectedRow])

  const changeInputHandler = event => {
    if (NUMBER_TYPE_FIELDS.includes(event.target.name)) {
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
    const obj = { ...JSON.parse(localStorage.getItem(COPIED_GIT_REPO)), _id: selectedRow._id }
    pasteToRow(setBuffer, obj)
  }

  const closeHandler = () => {
    clearFields()
    setShowModal(false)
    setShowModalForEdit(false)
  }

  return (
    <>
      <Modal closeHandler={closeHandler}>
        <ManageGitReposForm changeInputHandler={changeInputHandler} rowBuffer={rowBuffer} />

        {isShowModalForEdit && <Button onClick={editHandler}>Edit</Button>}
        {!isShowModalForEdit && <Button onClick={submitHandler}>Submit</Button>}
        <Button onClick={pasteHandler}>Paste</Button>
        <Button onClick={clearFields}>Clear</Button>
        <Button onClick={closeHandler}>Close</Button>
      </Modal>
    </>
  )
}

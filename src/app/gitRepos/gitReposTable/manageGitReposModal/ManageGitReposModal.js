import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { ManageGitReposForm } from './ManageGitReposForm/ManageGitReposForm'
import { Modal } from '../../../../components/modal/Modal'
import { addRow, editRow } from '../../state/gitRepos.action'
import { checkFields, pasteToRow } from '../gitReposTable.helpers'
import {
  COPIED_GIT_REPOS_STORAGE_KEY,
  INITIAL_ROW,
  MODAL_ERROR_MESSAGE,
  NUMBER_TYPE_OF_COLUMN,
  TABLE_COLUMNS
} from '../gitReposTable.constants'
import { ModalErrorMessage } from '../../../../components/modal/manageGitReposForm.styled'
import { Button } from '../../../../components/button/Button'

export const ManageGitReposModal = ({
  selectedRows,
  setShowModal,
  setShowModalForEdit,
  isShowModalForEdit
}) => {
  const dispatch = useDispatch()
  const [rowBuffer, setRowBuffer] = useState(INITIAL_ROW)
  const [errorMessage, setErrorMessage] = useState('')
  const [invalidFields, setInvalidFields] = useState([])

  useEffect(() => {
    const selectedEditRow = selectedRows[0].original

    clearFields()

    if (isShowModalForEdit) pasteToRow(setRowBuffer, selectedEditRow)
  }, [isShowModalForEdit, clearFields, selectedRows])

  const clearFields = useCallback(() => {
    Object.keys(rowBuffer).forEach(key => setRowBuffer(prev => ({ ...prev, [key]: '' })))
    setRowBuffer(prev => ({ ...prev, _id: '' }))
  })

  const invalidFieldsHandler = keysWithProblem => {
    setErrorMessage(MODAL_ERROR_MESSAGE)
    setInvalidFields(keysWithProblem)

    setTimeout(() => {
      setErrorMessage('')
      setInvalidFields([])
    }, 3000)
  }

  const changeInputHandler = event => {
    const keyOfInputField = event.target.name
    const inputFieldValue = event.target.value
    if (TABLE_COLUMNS[keyOfInputField].type === NUMBER_TYPE_OF_COLUMN) {
      setRowBuffer({
        ...rowBuffer,
        [keyOfInputField]: Number(inputFieldValue)
      })
    } else setRowBuffer({ ...rowBuffer, [keyOfInputField]: inputFieldValue })
  }

  const submitHandler = () => {
    if (checkFields(rowBuffer, invalidFieldsHandler)) return
    dispatch(addRow(rowBuffer))
    clearFields()
    closeHandler()
  }

  const editHandler = () => {
    if (checkFields(rowBuffer, invalidFieldsHandler)) return
    dispatch(editRow(rowBuffer))
    closeHandler()
  }

  const pasteHandler = () => {
    const obj = {
      ...JSON.parse(localStorage.getItem(COPIED_GIT_REPOS_STORAGE_KEY)),
      _id: selectedRow._id
    }
    pasteToRow(setRowBuffer, obj)
  }

  const closeHandler = () => {
    clearFields()

    setShowModal(false)
    setShowModalForEdit(false)
  }

  return (
    <Modal closeHandler={closeHandler}>
      <ManageGitReposForm
        changeInputHandler={changeInputHandler}
        rowBuffer={rowBuffer}
        invalidFields={invalidFields}
      />

      {isShowModalForEdit && <Button onClick={editHandler}>Edit</Button>}
      {!isShowModalForEdit && <Button onClick={submitHandler}>Submit</Button>}
      <Button onClick={pasteHandler}>Paste</Button>
      <Button onClick={clearFields}>Clear</Button>
      <Button onClick={closeHandler}>Close</Button>
      <ModalErrorMessage>{errorMessage}</ModalErrorMessage>
    </Modal>
  )
}

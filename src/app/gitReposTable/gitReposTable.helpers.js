import { TABLE_COLUMNS } from './gitReposTable.constants'

export const checkFields = (inputFields, invalidFieldsHandler) => {
  const invalidFields = Object.keys(inputFields).reduce((result, key) => {
    const isInvalid = TABLE_COLUMNS[key].validation(inputFields[key])
    if (isInvalid) return [...result, key]
    return result
  }, [])
  const isInvalidFieldsFound = !!invalidFields.length

  if (isInvalidFieldsFound) invalidFieldsHandler(invalidFields)

  return isInvalidFieldsFound
}

export const pasteToRow = (setRow, copiedRow) => {
  setRow({
    _id: copiedRow._id,
    id: Number(copiedRow.id),
    name: copiedRow.name,
    forks: Number(copiedRow.forks),
    watchers: Number(copiedRow.watchers),
    issues: Number(copiedRow.issues)
  })
}

const countOfFields = 6

export const checkFields = (inpitFields, invalidFieldsHandler) => {
  let hasProblem = false
  let fieldsWithProblems = []
  Object.keys(inpitFields).forEach(key => {
    if (fields[key].validation(inpitFields[key])) {
      fieldsWithProblems = [...fieldsWithProblems, key]
      hasProblem = true
      return false
    }
  })
  invalidFieldsHandler(fieldsWithProblems)
  return !(countOfFields !== Object.keys(inpitFields).length || hasProblem)
}

const fields = {
  _id: {
    validation(variable) {
      /* ¯\_(ツ)_/¯ */
    }
  },
  id: {
    validation(variable) {
      return validateNumber(variable)
    }
  },
  name: {
    validation(variable) {
      return validateString(variable)
    }
  },
  forks: {
    validation(variable) {
      return validateNumber(variable)
    }
  },
  watchers: {
    validation(variable) {
      return validateNumber(variable) || variable < 0
    }
  },
  issues: {
    validation(variable) {
      return validateNumber(variable)
    }
  }
}

const validateString = variable => !variable.trim()

const validateNumber = variable => isNaN(variable) || !variable.toString().trim()

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

import { NUMBER_TYPE_OF_COLUMN, STRING_TYPE_OF_COLUMN } from '../../constants/typesOfColumns'

export const PAGE_ROWS_COUNT = 7
export const COPIED_GIT_REPOS_STORAGE_KEY = 'copiedGitRepo'

const validateString = variable => !variable.trim()

const validateNumber = variable => isNaN(variable) || !variable.toString().trim()

export const TABLE_COLUMNS = {
  _id: {
    Header: '_Id',
    accessor: '_id',
    validation() {
      return false
    }
  },
  id: {
    Header: 'Id',
    accessor: 'id',
    type: NUMBER_TYPE_OF_COLUMN,
    validation(variable) {
      return validateNumber(variable)
    }
  },
  name: {
    Header: 'Name',
    accessor: 'name',
    type: STRING_TYPE_OF_COLUMN,
    validation(variable) {
      return validateString(variable)
    }
  },
  forks: {
    Header: 'Forks',
    accessor: 'forks',
    type: NUMBER_TYPE_OF_COLUMN,
    validation(variable) {
      return validateNumber(variable)
    }
  },
  watchers: {
    Header: 'Watchers',
    accessor: 'watchers',
    type: NUMBER_TYPE_OF_COLUMN,
    validation(variable) {
      return validateNumber(variable) || variable < 0
    }
  },
  issues: {
    Header: 'Issues',
    accessor: 'issues',
    type: NUMBER_TYPE_OF_COLUMN,
    validation(variable) {
      return validateNumber(variable)
    }
  }
}

export const COLUMN_TITLES = Object.keys(TABLE_COLUMNS).reduce((result, key) => {
  if (key !== '_id')
    return [
      ...result,
      {
        Header: TABLE_COLUMNS[key].Header,
        accessor: TABLE_COLUMNS[key].accessor
      }
    ]
  return result
}, [])

export const INITIAL_ROW = Object.keys(TABLE_COLUMNS).reduce(
  (result, key) => ({ ...result, [key]: '' }),
  { _id: '' }
)

export const MODAL_ERROR_MESSAGE = 'Please fill fields correctly'

import React from 'react'
import {
  ManageGitReposFormCell,
  ManageGitReposFormWrapper
} from '../../../../../components/modal/manageGitReposForm.styled'
import { READ_ONLY_TYPE_OF_COLUMN, TABLE_COLUMNS } from '../../gitReposTable.constants'

export const ManageGitReposForm = ({ changeInputHandler, rowBuffer, invalidFields }) => {
  const Cells = Object.keys(TABLE_COLUMNS).map(key => {
    if (TABLE_COLUMNS[key].type !== READ_ONLY_TYPE_OF_COLUMN)
      return (
        <ManageGitReposFormCell>
          <p>{TABLE_COLUMNS[key].Header}</p>
          <input
            type={TABLE_COLUMNS[key].type}
            placeholder={TABLE_COLUMNS[key].accessor}
            name={TABLE_COLUMNS[key].accessor}
            value={rowBuffer[key]}
            onChange={event => changeInputHandler(event)}
            style={
              invalidFields.includes(key) ? { borderColor: 'red' } : { borderColor: '#222831' }
            }
          />
        </ManageGitReposFormCell>
      )
  })
  return <ManageGitReposFormWrapper>{Cells}</ManageGitReposFormWrapper>
}

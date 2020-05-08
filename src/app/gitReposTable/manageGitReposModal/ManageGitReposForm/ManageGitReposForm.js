import React from 'react'
import {
  ManageGitReposFormCell,
  ManageGitReposFormWrapper
} from '../../../../components/modal/manageGitReposForm.styled'

export const ManageGitReposForm = ({ changeInputHandler, rowBuffer, invalidFields }) => {
  return (
    <ManageGitReposFormWrapper>
      <ManageGitReposFormCell>
        <p>id:</p>
        <input
          type="number"
          placeholder="id"
          name="id"
          value={rowBuffer.id}
          onChange={e => changeInputHandler(e)}
          style={invalidFields.includes('id') ? { borderColor: 'red' } : { borderColor: '#222831' }}
        />
      </ManageGitReposFormCell>
      <ManageGitReposFormCell>
        <p>name:</p>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={rowBuffer.name}
          onChange={e => changeInputHandler(e)}
          style={invalidFields.includes('name') ? { borderColor: 'red' } : { borderColor: '#222831' }}
        />
      </ManageGitReposFormCell>
      <ManageGitReposFormCell>
        <p>forks:</p>
        <input
          type="number"
          placeholder="forks"
          name="forks"
          value={rowBuffer.forks}
          onChange={e => changeInputHandler(e)}
          style={invalidFields.includes('forks') ? { borderColor: 'red' } : { borderColor: '#222831' }}
        />
      </ManageGitReposFormCell>
      <ManageGitReposFormCell>
        <p>watchers:</p>
        <input
          type="number"
          placeholder="watchers"
          name="watchers"
          value={rowBuffer.watchers}
          onChange={e => changeInputHandler(e)}
          style={invalidFields.includes('watchers') ? { borderColor: 'red' } : { borderColor: '#222831' }}
        />
      </ManageGitReposFormCell>
      <ManageGitReposFormCell>
        <p>issues:</p>
        <input
          type="number"
          placeholder="issues"
          name="issues"
          value={rowBuffer.issues}
          onChange={e => changeInputHandler(e)}
          style={invalidFields.includes('issues') ? { borderColor: 'red' } : { borderColor: '#222831' }}
        />
      </ManageGitReposFormCell>
    </ManageGitReposFormWrapper>
  )
}

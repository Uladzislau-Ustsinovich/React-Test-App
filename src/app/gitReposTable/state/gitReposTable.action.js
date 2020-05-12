import { ADD, DELETE, DUBLICATE, EDIT, SET_GIT_REPOS } from './gitReposTable.actionTypes'
import { v4 as uuidv4 } from 'uuid'
import fetcher from '../../../services/fetcher'
import { API_PATHS } from '../../../constants/apiPaths'

export const dublicateRows = data => ({
  type: DUBLICATE,
  payload: data
})

export const deleteRows = id => ({
  type: DELETE,
  payload: id
})

export const addRow = data => ({
  type: ADD,
  payload: data
})

export const editRow = data => ({
  type: EDIT,
  payload: data
})

export const fetchMembers = () => dispatch =>
  fetcher
    .get(API_PATHS.gitRepos)
    .then(res => {
      const resolvedData = res.map(i => ({
        _id: uuidv4(),
        id: i.id,
        name: i.name,
        forks: i.forks,
        watchers: i.watchers,
        issues: i.open_issues
      }))
      return dispatch({ type: SET_GIT_REPOS, payload: resolvedData })
    })
    .catch(e => console.log(e))

import { ADD, DELETE, DUBLICATE, EDIT, SET_GIT_REPOS } from './gitReposTable.actionTypes'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  data: []
}

export const gitReposTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case DUBLICATE: {
      const newData = [...state.data]

      action.payload.forEach(element => {
        const index = newData.findIndex(x => x._id === element)

        const newRow = { ...newData[index], _id: uuidv4() }

        newData.splice(index, 0, newRow)
      })

      return { ...state, data: newData }
    }

    case DELETE: {
      const newData = [...state.data]

      action.payload.forEach(element => {
        newData.splice(
          newData.findIndex(x => x._id === element),
          1
        )
      })

      return { ...state, data: newData }
    }

    case EDIT: {
      const newData = [...state.data]
      const rowToEditIndex = state.data.findIndex(x => x._id === action.payload._id)

      newData[rowToEditIndex] = action.payload

      return { ...state, data: newData }
    }

    case ADD: {
      action.payload._id = uuidv4()
      return { ...state, data: state.data.concat(action.payload) }
    }

    case SET_GIT_REPOS:
      return { ...state, data: action.payload }

    default:
      return state
  }
}

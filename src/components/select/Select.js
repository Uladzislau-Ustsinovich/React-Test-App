import React from 'react'
import { SelectStyled } from './select.styled'

export const Select = ({ setHandler, optionsArray }) => {
  const options = optionsArray.map(i => (
    <option value={i.value} key={i.value}>
      {i.title}
    </option>
  ))

  return <SelectStyled onChange={event => setHandler(event.target.value)}>{options}</SelectStyled>
}

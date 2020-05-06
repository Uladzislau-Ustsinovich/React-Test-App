import React from 'react'
import { SelectStyled } from './select.styled'

export const Select = ({ setHandler, optionsArray }) => {
  const options = optionsArray.map((i, ind) => (
    <option value={i.value} key={ind}>
      {i.title}
    </option>
  ))

  return <SelectStyled onChange={event => setHandler(event.target.value)}>{options}</SelectStyled>
}

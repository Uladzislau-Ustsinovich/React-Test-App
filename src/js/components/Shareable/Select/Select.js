import React from 'react'
import {SelectStyled} from "./Select.styled";

export const Select = ({ children, setHandler }) => {
  return <SelectStyled onChange={event => setHandler(event.target.value)}>{children}</SelectStyled>
}

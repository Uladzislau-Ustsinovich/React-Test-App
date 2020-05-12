import React from 'react'
import { ButtonStyled } from './Button.styled'

export const Button = props => <ButtonStyled onClick={props.onClick}>{props.children}</ButtonStyled>

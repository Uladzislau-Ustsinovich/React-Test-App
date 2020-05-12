import React from 'react'
import { CloseStyled, ModalContent, ModalStyled } from './modal.styled'

export const Modal = props => {
  return (
    <ModalStyled>
      <ModalContent>
        <CloseStyled onClick={props.closeHandler}>&times;</CloseStyled>
        {props.children}
      </ModalContent>
    </ModalStyled>
  )
}

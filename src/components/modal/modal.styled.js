import styled from 'styled-components'

export const ModalStyled = styled.div`
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`

export const CloseStyled = styled.button`
  background: none;
  border: none;
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  transition: all 0.2s linear;

  &:hover,
  &:focus {
    outline: none;
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    cursor: pointer;
  }
`

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.body};
  border-radius: 10px;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
  position: relative;
`

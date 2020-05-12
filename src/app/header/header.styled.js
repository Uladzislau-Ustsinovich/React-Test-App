import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const HeaderWrapper = styled.div`
  font-size: 20px;
  padding-top: 5px;
  background-color: ${({ theme }) => theme.header};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  margin-bottom: 30px;
`

export const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const LinkWrapper = styled.div`
  display: flex;
`

export const StyledLink = styled(Link)`
   {
    color: #ffffff;
    transition: color 0.2s, text-shadow 0.2s linear;
    &:hover {
      color: rgb(255, 255, 255);
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
    }
    &:nth-child(1) {
      margin-right: 100px;
    }
    &:nth-child(2) {
      margin-left: 100px;
    }
    p {
      font-size: 30px;
      font-weight: 600;
      margin: 0;
    }
  }
`

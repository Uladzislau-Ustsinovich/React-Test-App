import styled from 'styled-components'

export const ManageGitReposFormWrapper = styled.div`
  max-width: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, 180px);
  margin-bottom: 20px;
`

export const ManageGitReposFormCell = styled.div`
  text-transform: uppercase;
  margin: 0 10px;

  p {
    margin: 0;
    font-weight: 600;
  }

  input {
    max-width: 170px;
    font-size: 17px;
    border: 2px solid #222831;
    border-radius: 3px;
    padding: 5px;
  }
  transition: all 3s ease-in-out;
`

export const ModalErrorMessage = styled.h2`
text-align: center;
`


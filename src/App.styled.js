import styled from 'styled-components'

export const AppWrapper = styled.div`
  position: relative;

  .fade-appear,
  .fade-enter {
    opacity: 0;
    z-index: 1;
    transform: translateY(-10px);
  }

  .fade-appear p,
  .fade-enter p {
    transform: translateY(-5px);
    opacity: 0;
  }

  .fade-appear-active,
  .fade-enter.fade-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 300ms linear 150ms, transform 300ms ease-out 150ms;
  }

  .fade-appear-active p,
  .fade-enter.fade-enter-active p {
    transform: translateY(0);
    opacity: 1;
  }

  .fade-appear-active p:nth-child(2),
  .fade-enter.fade-enter-active p:nth-child(2) {
    transition: opacity 300ms linear 300ms, transform 300ms ease-out 300ms;
  }

  .fade-appear-active p:nth-child(3),
  .fade-enter.fade-enter-active p:nth-child(3) {
    transition: opacity 300ms linear 400ms, transform 300ms ease-out 400ms;
  }

  .fade-appear-active p:nth-child(4),
  .fade-enter.fade-enter-active p:nth-child(4) {
    transition: opacity 300ms linear 500ms, transform 300ms ease-out 500ms;
  }

  .fade-exit {
    opacity: 1;
    transform: translateY(0);
  }

  .fade-exit.fade-exit-active {
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 150ms linear, transform 150ms ease-in;
  }
`

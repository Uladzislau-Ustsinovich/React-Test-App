import styled from 'styled-components'

export const LoaderWrapper = styled.div`
  width: 66px;
  height: 66px;
  margin: 0 auto;
  margin-top: 20%;
  position: relative;
  transform: rotateZ(45deg);
  -o-transform: rotateZ(45deg);
  -ms-transform: rotateZ(45deg);
  -webkit-transform: rotateZ(45deg);
  -moz-transform: rotateZ(45deg);

  & .cssload-cube {
    position: relative;
    transform: rotateZ(45deg);
    -o-transform: rotateZ(45deg);
    -ms-transform: rotateZ(45deg);
    -webkit-transform: rotateZ(45deg);
    -moz-transform: rotateZ(45deg);
  }
  & .cssload-cube {
    float: left;
    width: 50%;
    height: 50%;
    position: relative;
    transform: scale(1.1);
    -o-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
  }
  & .cssload-cube:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(43, 160, 199);
    animation: cssload-fold-thecube 2.04s infinite linear both;
    -o-animation: cssload-fold-thecube 2.04s infinite linear both;
    -ms-animation: cssload-fold-thecube 2.04s infinite linear both;
    -webkit-animation: cssload-fold-thecube 2.04s infinite linear both;
    -moz-animation: cssload-fold-thecube 2.04s infinite linear both;
    transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
    -ms-transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    -moz-transform-origin: 100% 100%;
  }
  & .cssload-c2 {
    transform: scale(1.1) rotateZ(90deg);
    -o-transform: scale(1.1) rotateZ(90deg);
    -ms-transform: scale(1.1) rotateZ(90deg);
    -webkit-transform: scale(1.1) rotateZ(90deg);
    -moz-transform: scale(1.1) rotateZ(90deg);
  }
  & .cssload-c3 {
    transform: scale(1.1) rotateZ(180deg);
    -o-transform: scale(1.1) rotateZ(180deg);
    -ms-transform: scale(1.1) rotateZ(180deg);
    -webkit-transform: scale(1.1) rotateZ(180deg);
    -moz-transform: scale(1.1) rotateZ(180deg);
  }
  & .cssload-c4 {
    transform: scale(1.1) rotateZ(270deg);
    -o-transform: scale(1.1) rotateZ(270deg);
    -ms-transform: scale(1.1) rotateZ(270deg);
    -webkit-transform: scale(1.1) rotateZ(270deg);
    -moz-transform: scale(1.1) rotateZ(270deg);
  }
  & .cssload-c2:before {
    animation-delay: 0.255s;
    -o-animation-delay: 0.255s;
    -ms-animation-delay: 0.255s;
    -webkit-animation-delay: 0.255s;
    -moz-animation-delay: 0.255s;
  }
  & .cssload-c3:before {
    animation-delay: 0.51s;
    -o-animation-delay: 0.51s;
    -ms-animation-delay: 0.51s;
    -webkit-animation-delay: 0.51s;
    -moz-animation-delay: 0.51s;
  }
  & .cssload-c4:before {
    animation-delay: 0.765s;
    -o-animation-delay: 0.765s;
    -ms-animation-delay: 0.765s;
    -webkit-animation-delay: 0.765s;
    -moz-animation-delay: 0.765s;
  }

  @keyframes cssload-fold-thecube {
    0%,
    10% {
      transform: perspective(122px) rotateX(-180deg);
      opacity: 0;
    }
    25%,
    75% {
      transform: perspective(122px) rotateX(0deg);
      opacity: 1;
    }
    90%,
    100% {
      transform: perspective(122px) rotateY(180deg);
      opacity: 0;
    }
  }

  @-o-keyframes cssload-fold-thecube {
    0%,
    10% {
      -o-transform: perspective(122px) rotateX(-180deg);
      opacity: 0;
    }
    25%,
    75% {
      -o-transform: perspective(122px) rotateX(0deg);
      opacity: 1;
    }
    90%,
    100% {
      -o-transform: perspective(122px) rotateY(180deg);
      opacity: 0;
    }
  }

  @-ms-keyframes cssload-fold-thecube {
    0%,
    10% {
      -ms-transform: perspective(122px) rotateX(-180deg);
      opacity: 0;
    }
    25%,
    75% {
      -ms-transform: perspective(122px) rotateX(0deg);
      opacity: 1;
    }
    90%,
    100% {
      -ms-transform: perspective(122px) rotateY(180deg);
      opacity: 0;
    }
  }

  @-webkit-keyframes cssload-fold-thecube {
    0%,
    10% {
      -webkit-transform: perspective(122px) rotateX(-180deg);
      opacity: 0;
    }
    25%,
    75% {
      -webkit-transform: perspective(122px) rotateX(0deg);
      opacity: 1;
    }
    90%,
    100% {
      -webkit-transform: perspective(122px) rotateY(180deg);
      opacity: 0;
    }
  }

  @-moz-keyframes cssload-fold-thecube {
    0%,
    10% {
      -moz-transform: perspective(122px) rotateX(-180deg);
      opacity: 0;
    }
    25%,
    75% {
      -moz-transform: perspective(122px) rotateX(0deg);
      opacity: 1;
    }
    90%,
    100% {
      -moz-transform: perspective(122px) rotateY(180deg);
      opacity: 0;
    }
  }
`

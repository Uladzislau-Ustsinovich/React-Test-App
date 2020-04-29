import styled from 'styled-components';

export const TableButtonStyle = styled.div`
    display: inline-block;
    vertical-align: top;
    min-width: 170px;

    border: 1px solid #a20020;
    border-radius: 1.8em;
    //background: ${({ theme }) => theme.buttonBackground};
    cursor: pointer;

    font-family: inherit;
    color: #000000;
    text-transform: uppercase;
    text-decoration: none;
    text-align: center;

    transition: background-color .2s linear, color .2s linear, box-shadow .2s linear, border-color .2s linear;

    &:focus {
        outline: none;
    }

    &:hover {
        background-color: #000000;
        box-shadow: 2px 2px 10px fade(#000, 24%);
        color: #ffff;
        border-color: #ffff;
    }
`


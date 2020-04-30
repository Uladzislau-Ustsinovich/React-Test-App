import React from "react";
import {deleteRows, dublicateRows} from "../../../redux/action";
import {useDispatch} from "react-redux";
import {setEdit, showModal} from "../Modal/ModalReducer/actions";
import {ButtonStyled} from "./TableButtons.styled";


export const TableButtons = ({selectedFlatRows, setSelectedRow}) => {
    const dispatch = useDispatch();

    const dublicateHandler = () => {
        const data = selectedFlatRows.map(d => d.original._id);
        dispatch(dublicateRows(data));
    };

    const deleteHandler = () => {
        const data = selectedFlatRows.map(d => d.original._id);
        dispatch(deleteRows(data));
    };

    const copyHandler = () => {
        localStorage.setItem("copy", JSON.stringify(selectedFlatRows[0].original));
    };

    const addHandler = () => {
        dispatch(showModal(true));
        dispatch(setEdit(false));
    };

    const editHandler = () => {
        dispatch(showModal(true));
        dispatch(setEdit(true));
        setSelectedRow(selectedFlatRows[0].original);
    };

    return (
        <div>
            <ButtonStyled onClick={dublicateHandler}>Dublicate</ButtonStyled>
            <ButtonStyled onClick={deleteHandler}> Delete</ButtonStyled>
            <ButtonStyled onClick={addHandler}>Add</ButtonStyled>
            {selectedFlatRows.length === 1 &&
            <>
                <ButtonStyled onClick={copyHandler}>Copy</ButtonStyled>
                <ButtonStyled onClick={editHandler}>Edit</ButtonStyled>
            </>
            }
        </div>
    )
};
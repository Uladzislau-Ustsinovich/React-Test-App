import React from "react";
import {checkFields} from "../validation";
import {addRow, editRow, setEdit, showModal} from "../../../../redux/action";
import {useDispatch} from "react-redux";


export const ModalButtons = () =>{
    const dispatch = useDispatch();

    const changeInputHandler = (event) => {
        setBuffer({...rowBuffer, [event.target.name]: event.target.value});
    };

    const clearFields = () => {
        for (let key in rowBuffer)
            setBuffer(prev => ({...prev, ...{[key]: ''}}));
    };

    const submitHandler = () => {
        console.log(rowBuffer)
        if (!checkFields(rowBuffer)) return;
        dispatch(addRow(rowBuffer));
        clearFields();
        closeHandler();
    };

    const editHandler = () => {
        if (!checkFields(rowBuffer)) return;
        dispatch(editRow(rowBuffer));
        closeHandler();
    };


    const pasteHandler = () => {
        let obj = JSON.parse(localStorage.getItem("copy"));
        pasteToRow(obj);
    };

    const closeHandler = () => {
        clearFields();
        dispatch(showModal(false));
        dispatch(setEdit(false));
    };

    return (
        <div className="modal__footer">
            {isEdit &&
            <button className="modal__footer_btn" onClick={editHandler}>
                Edit
            </button>
            }
            {!isEdit &&
            <button className="modal__footer_btn" onClick={submitHandler}>
                Submit
            </button>
            }
            <button className="modal__footer_btn" onClick={pasteHandler}>
                Paste
            </button>
            <button className="modal__footer_btn" onClick={clearFields}>
                Clear
            </button>
            <button className="modal__footer_btn" onClick={closeHandler}>
                Close
            </button>
        </div>
    )
}
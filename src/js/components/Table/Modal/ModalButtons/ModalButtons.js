import React from "react";
import {checkFields} from "../validation";
import {addRow, editRow, setEdit, showModal} from "../../../../redux/action";
import {useDispatch, useSelector} from "react-redux";


export const ModalButtons = ({submitHandler, editHandler, pasteHandler, clearFields, closeHandler}) => {
    const dispatch = useDispatch();
    const isEdit = useSelector(state => state.table.isEdit);

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
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {checkFields} from "./validation";
import {addRow, editRow, setEdit, showModal} from "../../../redux/action";
import {ModalInputFields} from "./ModalInputFields/ModalInputFields";


export const Modal = ({row}) => {
    const dispatch = useDispatch();
    const [rowBuffer, setBuffer] = useState({});

    const isModalShow = useSelector(state => state.table.isModalShow);
    const isEdit = useSelector(state => state.table.isEdit);

    useEffect(() => {
        clearFields();
        if (row && isEdit) {
            pasteToRow(row);
        }
    }, [isEdit]);

    const pasteToRow = (obj) => {
        setBuffer({
            _id: obj._id.toString(),
            id: obj.id.toString(),
            name: obj.name.toString(),
            forks: obj.forks.toString(),
            watchers: obj.watchers.toString(),
            issues: obj.issues.toString()
        });
    };

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
        <div>
            {isModalShow &&
            <div className="modal">
                <div className="modal__window">
                    <div className="modal__header">
                        <h3 className="modal__title">

                        </h3>
                    </div>
                    <ModalInputFields
                        changeInputHandler={changeInputHandler}
                        rowBuffer={rowBuffer}
                    />
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
                </div>
            </div>
            }
        </div>
    )
}
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {checkFields} from "./validation";
import {addRow, editRow, setEdit, showModal} from "../../../redux/action";
import {ModalInputFields} from "./ModalInputFields/ModalInputFields";
import {ModalContent, ModalStyle} from "./Modal.styled";
import {ModalButtons} from "./ModalButtons/ModalButtons";


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
        <>
            {isModalShow &&
            <ModalStyle>
                <ModalContent>
                    <span className="close" onClick={closeHandler}>&times;</span>
                    <div className="modal__header">
                        <h3 className="modal__title">
                            Дарова бандиты
                        </h3>
                    </div>
                    <ModalInputFields
                        changeInputHandler={changeInputHandler}
                        rowBuffer={rowBuffer}
                    />
                    <ModalButtons
                        submitHandler={submitHandler}
                        editHandler={editHandler}
                        pasteHandler={pasteHandler}
                        clearFields={clearFields}
                        closeHandler={closeHandler}
                    />
                </ModalContent>
            </ModalStyle>
            }
        </>
    )
}
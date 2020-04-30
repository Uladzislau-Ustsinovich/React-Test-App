import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {checkFields} from "./validation";
import {addRow, editRow} from "../../../redux/action";
import {ModalInputFields} from "./ModalInputFields/ModalInputFields";
import {CloseStyled, ModalContent, ModalStyled} from "./Modal.styled";
import {setEdit, showModal} from "./ModalReducer/actions";
import {ButtonStyled} from "../TableButtons/TableButtons.styled";

const numberValues = ["id", "forks", "watchers", "issues"];

export const Modal = ({row}) => {
    const dispatch = useDispatch();
    const [rowBuffer, setBuffer] = useState({});

    const isModalShow = useSelector(state => state.modal.isModalShow);
    const isEdit = useSelector(state => state.modal.isEdit);

    useEffect(() => {
        clearFields();
        if (row && isEdit) {
            pasteToRow(row);
        }
    }, [isEdit]);

    const pasteToRow = obj => {
        setBuffer({
            _id: obj._id,
            id: Number(obj.id),
            name: obj.name,
            forks: Number(obj.forks),
            watchers: Number(obj.watchers),
            issues: Number(obj.issues)
        });
    };

    const changeInputHandler = event => {
        if (numberValues.includes(event.target.name)) {
            setBuffer({...rowBuffer, [event.target.name]: Number(event.target.value)});
        } else
            setBuffer({...rowBuffer, [event.target.name]: event.target.value});
    };

    const clearFields = () => {
        for (let key in rowBuffer)
            setBuffer(prev => ({...prev, ...{[key]: ''}}));
            setBuffer(prev => ({...prev, ...{_id: ''}}));
    };

    const submitHandler = () => {
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
            <ModalStyled>
                <ModalContent>
                    <CloseStyled onClick={closeHandler}>&times;</CloseStyled>
                    <div className="modal__header">
                        <h3 className="modal__title">
                            Дарова бандиты
                        </h3>
                    </div>
                    <ModalInputFields
                        changeInputHandler={changeInputHandler}
                        rowBuffer={rowBuffer}
                    />
                    <div className="modal__footer">
                        {isEdit &&
                        <ButtonStyled onClick={editHandler}>
                            Edit
                        </ButtonStyled>
                        }
                        {!isEdit &&
                        <ButtonStyled onClick={submitHandler}>
                            Submit
                        </ButtonStyled>
                        }
                        <ButtonStyled onClick={pasteHandler}>
                            Paste
                        </ButtonStyled>
                        <ButtonStyled onClick={clearFields}>
                            Clear
                        </ButtonStyled>
                        <ButtonStyled onClick={closeHandler}>
                            Close
                        </ButtonStyled>
                    </div>
                </ModalContent>
            </ModalStyled>
            }
        </>
    )
}
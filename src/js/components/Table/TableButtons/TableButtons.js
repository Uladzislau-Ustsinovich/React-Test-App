import React from "react";
import {deleteRows, dublicateRows, setEdit, showModal} from "../../../redux/action";
import {useDispatch} from "react-redux";


export const TableButtons = ({selectedFlatRows, setSelectedRow}) => {
    const dispatch = useDispatch();

    const dublicateHandler = () => {
        const data = selectedFlatRows.map(d => d.original);
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
            <button onClick={dublicateHandler}>Dublicate</button>
            <button onClick={deleteHandler}> Delete</button>
            <button onClick={addHandler}>Add</button>
            {selectedFlatRows.length === 1 &&
            <>
                <button onClick={copyHandler}>Copy</button>
                <button onClick={editHandler}>Edit</button>
            </>
            }
        </div>
    )
};
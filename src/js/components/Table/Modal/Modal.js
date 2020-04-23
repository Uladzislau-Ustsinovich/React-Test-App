import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addRow, showModal} from "../../../redux/action";


export const Modal = ({row}) => {
    const dispatch = useDispatch();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [forks, setForks] = useState('');
    const [watchers, setWatchers] = useState('');
    const [stars, setStars] = useState('');

    const isModalShow = useSelector(state => state.app.isModalShow);
    const isEdit = useSelector(state => state.app.isEdit);

    useEffect(() => {
        if (row && isEdit) {
            setId(row.id);
            setName(row.name);
            setForks(row.forks);
            setWatchers(row.watchers);
            setStars(row.stargazers_count);
        }
        if (!isEdit)
        clearFields();
    });

    const changeInputHandler = (event, handler) => {
        event.persist();
        handler(event.target.value);
    };

    const clearFields = () => {
        setId("");
        setName("");
        setForks("");
        setWatchers("");
        setStars("");
    };

    const submitHandler = () => {
        if (!id.trim() || !name.trim() || !forks.trim() || !watchers.trim() || !stars.trim()) {
            alert("Please Fill All Required Field");
            return
        }
        if (isNaN(id) || isNaN(forks) || isNaN(watchers) || isNaN(stars)) {
            if (isNaN(id))
                alert("id is should be a number");
            if (isNaN(forks))
                alert("forks is should be a number");
            if (isNaN(watchers))
                alert("watchers is should be a number");
            if (isNaN(stars))
                alert("stars is should be a number");
            return
        }
        let data = {
            id: id,
            name: name,
            forks: forks,
            watchers: watchers,
            stargazers_count: stars
        };
        clearFields();
        dispatch(addRow(data));
    };

    const pasteHandler = () => {
        setId(localStorage.getItem('id'));
        setName(localStorage.getItem('name'));
        setForks(localStorage.getItem('forks'));
        setWatchers(localStorage.getItem('watchers'));
        setStars(localStorage.getItem('stargazers_count'));
    };

    const closeHandler = () => {
        clearFields();
        dispatch(showModal(false));
        dispatch(isEdit(false));
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
                    <div className="modal__body">
                        <input type="text" placeholder="id" name="id" value={id}
                               onChange={(e) => changeInputHandler(e, setId)}/>
                        <input type="text" placeholder="name" name="name" value={name}
                               onChange={(e) => changeInputHandler(e, setName)}/>
                        <input type="text" placeholder="forks" name="forks" value={forks}
                               onChange={(e) => changeInputHandler(e, setForks)}/>
                        <input type="text" placeholder="watchers" name="watchers" value={watchers}
                               onChange={(e) => changeInputHandler(e, setWatchers)}/>
                        <input type="text" placeholder="stars" name="stars" value={stars}
                               onChange={(e) => changeInputHandler(e, setStars)}/>
                    </div>
                    <div className="modal__footer">
                        {isEdit &&
                        <button className="modal__footer_btn" onClick={submitHandler}>
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
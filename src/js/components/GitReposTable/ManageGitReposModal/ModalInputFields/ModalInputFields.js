import React from "react";
import '../../../Shareable/Modal/modalInputFields.less'

export const ModalInputFields = ({changeInputHandler, rowBuffer}) => {
    return (
        <div className="modal__wrapper">
            <div className="modal__box">
                <p>id:</p>
                <input type="number" placeholder="id" name="id" value={rowBuffer.id}
                       onChange={(e) => changeInputHandler(e)}/>
            </div>
            <div className="modal__box">
                <p>name:</p>
                <input type="text" placeholder="name" name="name" value={rowBuffer.name}
                       onChange={(e) => changeInputHandler(e)}/>
            </div>
            <div className="modal__box">
                <p>forks:</p>
                <input type="number" placeholder="forks" name="forks" value={rowBuffer.forks}
                       onChange={(e) => changeInputHandler(e)}/>
            </div>
            <div className="modal__box">
                <p>watchers:</p>
                <input type="number" placeholder="watchers" name="watchers" value={rowBuffer.watchers}
                       onChange={(e) => changeInputHandler(e)}/>
            </div>
            <div className="modal__box">
                <p>issues:</p>
                <input type="number" placeholder="issues" name="issues" value={rowBuffer.issues}
                       onChange={(e) => changeInputHandler(e)}/>
            </div>
        </div>
    )
}
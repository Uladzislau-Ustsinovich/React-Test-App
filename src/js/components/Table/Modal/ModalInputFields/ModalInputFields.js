import React from "react";

export const ModalInputFields = ({changeInputHandler, rowBuffer}) => {
    return (
        <div className="modal__body">
            <input type="text" placeholder="id" name="id" value={rowBuffer.id}
                   onChange={(e) => changeInputHandler(e)}/>
            <input type="text" placeholder="name" name="name" value={rowBuffer.name}
                   onChange={(e) => changeInputHandler(e)}/>
            <input type="text" placeholder="forks" name="forks" value={rowBuffer.forks}
                   onChange={(e) => changeInputHandler(e)}/>
            <input type="text" placeholder="watchers" name="watchers" value={rowBuffer.watchers}
                   onChange={(e) => changeInputHandler(e)}/>
            <input type="text" placeholder="issues" name="issues" value={rowBuffer.issues}
                   onChange={(e) => changeInputHandler(e)}/>
        </div>
    )
}
import React from 'react';
import './CustomModal.scss';
const CutomModal = ({ handleClose, handlerSubmit, title, children }) => {
    return (
        <div className="custom__modal__container">
            <div className="custom__modal__title">
                <h2>{title}</h2>
            </div>
            <div>
                {children}
            </div>
            <div className="custom__modal__footer">
                <button onClick={handleClose}>close</button>
                <button onClick={handlerSubmit}>submit</button>
            </div>
        </div>
    )
}

export default CutomModal

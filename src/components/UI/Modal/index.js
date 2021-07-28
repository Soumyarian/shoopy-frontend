import React from 'react';
import './Modal.scss';
import Backdrop from './../Backdrop';

const Modal = ({ show, handleClose }) => {
    return (
        <>
            <Backdrop show={show} clicked={handleClose} />
            <div
                className="modal"
                style={{
                    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0'
                }}>
                {this.props.children}
            </div>
        </>
    )
}

export default Modal

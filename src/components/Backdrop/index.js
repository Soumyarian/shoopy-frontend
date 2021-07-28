import React from 'react';
import './Backdrop.scss';

const Backdrop = ({ closeModalHandler }) => (
    <div className="backdrop" onClick={closeModalHandler}></div>
);

export default Backdrop;
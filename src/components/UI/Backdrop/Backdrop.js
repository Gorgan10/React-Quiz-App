import React from 'react';
import cl from './Backdrop.module.css'

const Backdrop = (props) => <div className={cl.Backdrop} onClick={props.onClick} />;

export default Backdrop;
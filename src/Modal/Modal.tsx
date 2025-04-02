import React, {Fragment, useCallback, useMemo, useState} from 'react';
import ReactDOM from "react-dom";
import "./Modal.scss";



const Modal:React.FC<{onClose:() => void 
    children:React.ReactNode}> =(props) =>{

    const BackDrop:React.FC<{onClose : () => void}> = (props) => {
        return <div className="BackDrop" onClick={props.onClose}></div>;
    };

    const ModalOverlay:React.FC<{children: React.ReactNode}> = (props) => {
        return (
            <div className="modal">
                  <div className="Modal_content">{props.children}</div>
            </div>
        );
    };
    const PortElement = document.getElementById('overlays')as HTMLElement;

    return (
        <Fragment>
            {ReactDOM.createPortal(<BackDrop onClose={props.onClose} />, PortElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, PortElement)}
        </Fragment>
    )
}

export default Modal;
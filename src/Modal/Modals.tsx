import React, {Fragment, useCallback, useEffect, useMemo, useState} from 'react';
import ReactDOM from "react-dom";
import Classes from "./Modal.module.scss";

interface modal_type{
    onClose:() => void,
    children:React.ReactNode,
    //test:boolean
}
type test={
    onClose :() => void
}

const Modals/*:React.FC<{onClose:() => void 
    children:React.ReactNode}>*/ =(props:modal_type) =>{


    const BackDrop = (props:test) => {

        return <div className={Classes.BackDrop} onClick={props.onClose}></div>;
    };

    const ModalOverlay:React.FC<{children: React.ReactNode}> = (props) => {
        console.log("모달 테스트:", props);
        useEffect(() =>{
            console.log("Modals effect!!");
          },[])
        return (
            <div className={Classes.modal}>
                  <div className={Classes.content}>{props.children}</div>
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

export default Modals;
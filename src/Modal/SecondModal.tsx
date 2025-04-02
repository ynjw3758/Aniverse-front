import React, {Fragment , useEffect} from 'react';
import ReactDOM from "react-dom";
import "./SecondModal.scss"

type modal_props={
    onClose : () => void,

}


const SecondModal:React.FC<{onClose:() => void 
    children:React.ReactNode}> =(props) =>{
        
    const BackDrop = (props:modal_props) => {
        console.log("두번째 백드롭 :" , props);
        return <div className="BackDrop" onClick={props.onClose}></div>;
    };

    const ModalOverlay:React.FC<{children: React.ReactNode}> = (props) => {
        console.log("두번째 모달 :" , props);
        useEffect(() =>{
            console.log("Modals effect!!");
          },[])
        return (
            <div className="modal">
                <div className="content">{props.children}</div>
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

export default SecondModal;
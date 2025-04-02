import { Fragment, useState } from "react";
import "./SecondModals.scss";
import SecondModal from "../Modal/SecondModal";
import Modal from "../Modal/Modal";

type activate ={
    isopen:boolean
    onClose: () => void
    ondelete : (check:boolean) => void
    isinitila:boolean
}

const SecondModals =(props:activate) =>{
    const[closeHandler , setCloseHandler]=useState<boolean>(false);

    console.log("모달 창 열기 체크 : " , props.isopen);
   const cancelHandler =() =>{
    console.log("test");
    props.onClose();
   }

   const datadelete =() =>{
    let closeHadnelr:boolean =false;
    //true일 경우만 모두 삭제 false인 경우는 secondmodal만 close
    if(props.isinitila == true){
        //setCloseHandler((prevState:boolean) => prevState = true);
    closeHadnelr= true;
    props.ondelete(true);     
    props.onClose();
    }
    else{
        closeHadnelr= false;
        props.ondelete(closeHadnelr); 
    }
   }


    return(<div className="BackDrop">
             <div className="Second_Motal_main">
             <h2>게시물을 삭제하시겠습니까?</h2>
             <span>지금 나가면 저장되지 않습니다</span>
             <button type="button" onClick={datadelete} style={{color:"red"}}>삭제</button>
             <button type="button" onClick={cancelHandler}>취소</button>
             </div>
        </div>)

}

export default SecondModals;
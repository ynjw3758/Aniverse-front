import Clesses from"./SecondsModal.module.scss";
import Modal from "../Modal/Modal";
import { useEffect, useState ,useContext} from "react";
import SecondModal from "../Modal/SecondModal";
import React from "react";
import Name from "../Userdata/Userdata";

type user_infos ={
    //img:string,
    //nickname:string,
    test:boolean
    onClose: () => void
}

const SecondsModal =(props:user_infos) =>{
   const[isshow , setIsshow] = useState<boolean>(false);
   const Nickname = useContext(Name);
    const cancel =() =>{
          props.onClose();
    }

    /*    { isshow &&  (<div className={Clesses.main}>
            <p>게시물을 삭제하시겠습니까?</p>
             <span>(지금 나가면 저장되지 않습니다)</span>
             <div className={Clesses.btn}>
             <button type="button" >삭제</button>
             <button type="button"  onClick={cancel}>취소</button>
             </div>
        </div>)}
        */

return(<>
    <div className={Clesses.main}>
            <p>게시물을 삭제하시겠습니까?</p>
             <span>(지금 나가면 저장되지 않습니다)</span>
             <div className={Clesses.btn}>
             <button type="button" >삭제</button>
             <button type="button"  onClick={cancel}>취소</button>
             </div>
        </div>
    </>)

};

export default React.memo(SecondsModal);
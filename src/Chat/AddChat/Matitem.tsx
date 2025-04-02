//                            +--------------------
//----------------------------+ 외부 라이브로리
//                            +--------------------
//#region type 
import {useState } from "react";
//#endregion



//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import "./Matitem.scss";
//#endregion

//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type Items ={
    Nickname:string,
    Ctid:string,
    Userid:string,
    Image:string,
    onChcked:(info:Object)=> void

 }
 //#endregion

const Matitem =(props:Items) =>{

//                            +------------------
//----------------------------+ 상태 관리
//                            +------------------
//#region
const[ischecked, setIschecked]=useState<boolean>(false);
//#endregion

const checkedHandler =(e:React.ChangeEvent<HTMLInputElement>) =>{
       console.log("체크 :" , ischecked);
    if(ischecked == false){
        setIschecked(true);
        const userinfo:object={Img:props.Image ,/* Ctid:props.Ctid ,*/ Nickname:props.Nickname , Userid:props.Userid};
        props.onChcked(userinfo);
    }
    else{
        console.log("체크 해제");
        setIschecked(false);
        const userinfo:object={Img:props.Image , /*Ctid:props.Ctid ,*/ Nickname:props.Nickname , Userid:props.Userid};
        props.onChcked(userinfo);
    }
}
    return(<>
    <div className="Matitem_Items" id={props.Userid} >
          <img src={props.Image}/>
          <p>{props.Nickname}</p>
            <input type="checkbox" checked ={ischecked} onChange={checkedHandler}/>
    </div>
    </>)

}

export default Matitem;
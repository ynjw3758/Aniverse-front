
//                            +------------------
//----------------------------+ 내부 라이브러리
//                            +------------------
//#region
import { useEffect, useState } from "react";
//#endregion

//                            +------------------
//----------------------------+ 내부 라이브러리
//                            +------------------
//#region
import "./ChatHeader.scss";
//#endregion


//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type info ={
    name:string,
    Count:number
 }
 //#endregion

const ChatHeader =(props:info) =>{
  const[name, setName]=useState<string>("");

  useEffect(() =>{
    if(props.name.length >= 15){
      const name = props.name.slice(0,15)+"...";
      setName(name);
    }
    else setName(props.name);
  },[props.name])

    return(<div className="ChatHeader_List">
      <div className="ChatHeader_menu">
         <h2>{name}</h2>
         <h3>{props.Count}</h3>
      </div>
      <div className="ChatHeader_showadd">
           <img src={"/image/showadd.png"} />
         </div>
    </div>)
}

export default ChatHeader;
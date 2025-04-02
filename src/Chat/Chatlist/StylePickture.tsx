


//                            +------------------
//----------------------------+ 내부 라이브러리
//                            +------------------
//#region
import { useEffect, useState } from "react";
import "./StylePickture.scss";

//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type image ={
    Image:string,
    Id:number
   }
//#endregion
const StylePickture =(props:image) =>{
    const[te ,setTe]=useState<boolean>(false);

    const number = te ? "ChatStylePickture_even" : "ChatStylePickture_odd";

    useEffect(() =>{
       
      if(props.Id != 2){
        setTe(true);
      }
      else{
        setTe(false);
      }
    },[props.Image, props.Id]);

    return(<div className={number}>
        <img src={props.Image}/>
    </div>)

}
export default StylePickture;
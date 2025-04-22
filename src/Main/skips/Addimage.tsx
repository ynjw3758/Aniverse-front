
import { useRef ,useState} from "react";

import "./Addimage.scss";


//                             +--------------------
//-----------------------------+   타입
//                             +--------------------
//#region type
type Image = {
    name:string,
    image:string
    
  }
 //#endregion

const Addimage =(props:Image) =>{
//              +-----------------
//--------------+ 전역 변수
//              +-----------------
//#region type
   const[hover, setHover]=useState<boolean>(false);
//#endregion
    
//              +-----------------
//--------------+ 전역 변수
//              +-----------------
//#region type
   const divref = useRef<HTMLDivElement>(null);
//#endregion

   const MouseOver =() =>{
    console.log("Over :" , divref.current?.id);
    setHover(true);
   }

   const MouseLeave =() =>{
    console.log("Leave :" , divref.current?.id);
    setHover(false);
   }
    return(<div className="MainAddimage" id={props.name} ref={divref} onMouseOver={MouseOver} onMouseLeave={MouseLeave}>
          <img src={props.image} />
          {hover && (<div className="test" >
          <p></p>
          </div>)}
    </div>)

}

export default Addimage;

import {useEffect, useState ,useRef , useContext, useSyncExternalStore, ReactNode} from "react";

import "./Slide.scss";


interface props{
    total:number,
    pageChange:(cnt:number, type:string) => void
}

const Slide =({total , pageChange}:props) =>{
    const[leftactive, setLeftactive]=useState<boolean>(false);
    const[rightactive, setRightactive]=useState<boolean>(false);
    const[pagenumber , setPagenumber]=useState<number>(1);
    const[isfirst, setIsfirst]=useState<boolean>(false);


const left_active = leftactive ? "left_active" : "left_unactive";
const right_active = rightactive ? "right_active" : "right_unactive";
const page_number= useRef<number>(1)

useEffect(() =>{
  setRightactive(true);
},[])


   useEffect(() =>{
    setIsfirst(true);
   },[])

   const SlidenextHandler =() =>{
    page_number.current+=1;
    pageChange(page_number.current, "next");
    if(page_number.current == total){
        setRightactive(false);
        setLeftactive(true);
    }
    else{
        setRightactive(true);
        setLeftactive(true);
    }
  }

  const SlidebeforeHandler =() =>{
    page_number.current-=1;
    pageChange(page_number.current, "before");
    if(page_number.current == 1){
        setRightactive(true);
        setLeftactive(false);
        setPagenumber((preNum) => preNum+1);
    }
    else{
        setRightactive(true);
        setLeftactive(true);
    }

  }

return(<>
              {(leftactive == false && rightactive == true) && ( <div className="Slide_right">
              <img src="/image/slideright.png" onClick={SlidenextHandler} id={right_active} />
              </div>)}
              {(leftactive == true && rightactive == true) && ( <>
              <div className="Slide_left">
               <img src="/image/slideleft.png" onClick={SlidebeforeHandler} id={left_active} />
              </div>
              <div className="Slide_right">
              <img src="/image/slideright.png" onClick={SlidenextHandler} id={right_active} />
              </div>
              </>)}
              {(leftactive == true && rightactive == false) && (<div className="Slide_left">
               <img src="/image/slideleft.png" onClick={SlidebeforeHandler} id={left_active} />
              </div>)}
</>)

}
export default Slide;
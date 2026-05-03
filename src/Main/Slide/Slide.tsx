
import { useEffect, useRef, useState } from "react";
import rightimg from "../../assets/images/slideright.png";
import leftimg from "../../assets/images/slideleft.png"
import "./Slide.scss";


interface props{
    total:number,
    pageChange:(cnt:number, type:string) => void
}

const Slide =({total , pageChange}:props) =>{
    const[leftactive, setLeftactive]=useState<boolean>(false);
    const[rightactive, setRightactive]=useState<boolean>(false);


const left_active = leftactive ? "left_active" : "left_unactive";
const right_active = rightactive ? "right_active" : "right_unactive";
const page_number= useRef<number>(1)

useEffect(() =>{
  page_number.current = 1;
  setLeftactive(false);
  setRightactive(total > 1);
},[total])

   const SlidenextHandler =() =>{
    const nextPage = Math.min(page_number.current + 1, total);
    if (nextPage === page_number.current) return;

    page_number.current = nextPage;
    pageChange(nextPage, "next");

    if(nextPage === total){
        setRightactive(false);
        setLeftactive(true);
    }
    else{
        setRightactive(true);
        setLeftactive(true);
    }
  }

  const SlidebeforeHandler =() =>{
    const prevPage = Math.max(page_number.current - 1, 1);
    if (prevPage === page_number.current) return;

    page_number.current = prevPage;
    pageChange(prevPage, "before");

    if(prevPage === 1){
        setRightactive(true);
        setLeftactive(false);
    }
    else{
        setRightactive(true);
        setLeftactive(true);
    }

  }

return(<>
              {(leftactive == false && rightactive == true) && ( <div className="Slide_right">
              <img src={rightimg} onClick={SlidenextHandler} id={right_active} />
              </div>)}
              {(leftactive == true && rightactive == true) && ( <>
              <div className="Slide_left">
               <img src={leftimg} onClick={SlidebeforeHandler} id={left_active} />
              </div>
              <div className="Slide_right">
              <img src={rightimg} onClick={SlidenextHandler} id={right_active} />
              </div>
              </>)}
              {(leftactive == true && rightactive == false) && (<div className="Slide_left">
               <img src={leftimg} onClick={SlidebeforeHandler} id={left_active} />
              </div>)}
</>)

}
export default Slide;

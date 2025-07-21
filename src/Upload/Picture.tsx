import "./Picture.scss";
import { useEffect, useState , ChangeEvent, useRef, Fragment} from "react";
import React from 'react';
import leftarrowimg from "../assets/images/left_arrow.png";

import FirstBefore from "./SecondModals";
import KaMap from "./KaMap"; //추후에 끌것이다

type user_info ={
    image_info:File | null | undefined

}
//SwiperCore.use([Navigation, Scrollbar , Autoplay]);
const Picture =(props:user_info) =>{
    const[imgFile , setImgFile] = useState<File | null | undefined>();
    const [ previewImg, setPreviewImg ] = useState<any>(""); 
    const[oneimg, setOneimg]= useState<boolean>(false);
    const[Nimg, setNimg]= useState<boolean>(false);
    console.log("image info :" , props.image_info);
    
    useEffect(() =>{
        console.log("사진 업로드!!");
        setImgFile(props.image_info);
        if(imgFile !== null && imgFile && undefined){
        if(imgFile?.size ==1){
            console.log("사진 1장");
            setOneimg(true)
        }
        else if(imgFile?.size >1){
           console.log("사진 N장");
           setNimg(true);
        }
    }
    else{
        console.log("알수 없는 파일입니다");
    }
    }, [imgFile]);

    const CloseHandler =() =>{

    }


    return(<>
            <div className="MainBackDrop" onClick={CloseHandler}>
               <div className="Main" onClick={(e) => e.stopPropagation()}>
           {oneimg && (<>
                  <div className="second_headers">
                    <div className="img">
                  <img src={leftarrowimg} /*onClick={backHandler}*//>
                  </div>
                  <h2>사진</h2>
                  <div className="btn">
                  <button type="button" /*onClick={nextHandler}*/>다음</button>
                  </div>
                </div>
                 <div className="Horizantal">
                  <hr />
                 </div>
                <div className="one_img" /*ref={containRef}*/>
                <img src={previewImg} //onMouseMove={imgDrag} 
                  //onMouseDown={mouseDown}
                  //onMouseUp={mouseSetup}     
                  //onClick={imageclick}
                  draggable="true"     
                  />
                </div>
                </>)}
        </div>
           </div>                
    </>)
}

export default Picture;
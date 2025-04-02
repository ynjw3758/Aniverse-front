

import { useEffect, useRef, useState } from "react";
import "./AddFileList.scss";

//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type info ={
    Img:string,
    Video:string,
    imgid:string,
    videoid:string
 }
 //#endregion

const AddFileList =(props:info) =>{

//              +-----------------
//--------------+ 상태 관리
//              +-----------------
//#region type
    const[img, setImg]=useState<string>("");
    const[video, setVideo]=useState<string>("");
    const[isimg,setIsimg]=useState<boolean>(false);
    const[isvideo, setIsvideo]=useState<boolean>(false);
    const[imgid, setImgid]=useState<string>("");
    const[videoid, setVideoid]=useState<string>("");
//#endregion

//              +-----------------
//--------------+ 전역 변수
//              +-----------------
//#region type
const imgref=useRef<HTMLDivElement>(null);
const videoref=useRef<HTMLDivElement>(null);
//#endregion

    useEffect(() =>{
        console.log("imgid :" , props.imgid);
        console.log("videoid :" , props.videoid);

        if(props.Img != "" && props.Video ==""){
           setImg(props.Img);
           setImgid(props.imgid);
           setIsimg(true);
        }
        else if(props.Img == "" && props.Video !=""){
            setVideo(props.Video);
            setVideoid(props.videoid);``
            setIsvideo(true);
        }
        else if(props.Img != "" && props.Video !=""){
            if(props.Video==undefined){
                setImg(props.Img);
                setImgid(props.imgid);
                setIsimg(true);
            }
            else if(props.Img ==undefined){
                setVideo(props.Video);
                setVideoid(props.videoid);``
                setIsvideo(true);

            }
            else if(props.Img != undefined && props.Video!= undefined){
                setImg(props.Img);
                setVideo(props.Video);
                setImgid(props.imgid);
                setVideoid(props.videoid);``
                setIsimg(true);
                setIsvideo(true);
            }

        }

   
    },[props.Img, props.Video,props.imgid, props.videoid]);



    const ImageClick =() =>{
       console.log("ref :" , imgref.current);
    }
    const VideoClick =() =>{
        console.log("ref :" , videoref.current);
    }

    return(<>
        {isimg && (<div className="AddChatFileList_imgbox" id={imgid} ref={imgref} 
        onClick={ImageClick}>
            <div className="AddChatFileList_Cancel" >
                   <img src="/image/delete.png"/>
                </div>
            <img src={img} />
        </div>)}
        {isvideo && ( <div className="AddChatFileList_videobox"  id={videoid} ref={videoref} 
        onClick={VideoClick}>
            <div className="AddChatFileList_Cancel">
                   <img src="/image/delete.png"/>
                </div>
             <video src={video}/>
          </div>)}
    </>)

}
export default AddFileList;
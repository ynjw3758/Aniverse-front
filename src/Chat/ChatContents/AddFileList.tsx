

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
    videoid:string,
    FileInfos:files,
 }

 type files={
    name:string;
    size:string;
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
    const[unit, setUnit]=useState<string>("MB");
    const[size, setSize]=useState<string>("");
//#endregion

//              +-----------------
//--------------+ 전역 변수
//              +-----------------
//#region type
const imgref=useRef<HTMLDivElement>(null);
const videoref=useRef<HTMLDivElement>(null);
//#endregion

    useEffect(() =>{


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
    useEffect(() =>{
       setSize(props.FileInfos.size);
    },[props.FileInfos])



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
                   <img src="../assets/images/delete.png"/>
                </div>
            <img src={img} />
            <div className="AddChatFileList_infos">
                <p>{props.FileInfos.name}</p>
                <h5>{size}</h5>
            </div>
        </div>)}
        {isvideo && ( <div className="AddChatFileList_videobox"  id={videoid} ref={videoref} 
        onClick={VideoClick}>
            <div className="AddChatFileList_Cancel">
                   <img src="../assets/images/delete.png"/>
                </div>
             <video src={video}/>
            <div className="AddChatFileList_infos">
                <p>{props.FileInfos.name}</p>
                <h5>{size}</h5>
            </div>
          </div>)}
    </>)

}
export default AddFileList;

import { useEffect, useRef, useState } from "react";
import "./Addfiles.scss";
import AddFileList from "./AddFileList";


//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type info ={
    Img:string[],
    Video:string[],
    ImgId:string[],
    VideoId:string[],
    FileInfos:files[],
 }

 type files={
    name:string;
    size:string;
 }
 //#endregion
const Addfiles =(props:info) =>{

    const[imgid, setImgid]=useState<string[]>([]);
    const[videoid, setVideoid]=useState<string[]>([]);
    const[multi, setMulti]=useState<string[]>([]);
    const[isimg, setIsimg]=useState<boolean>(false);
    const[isvideo, setIsvideo]=useState<boolean>(false);

    useEffect(() =>{
        if(props.Img.length !=0 && props.Video.length == 0){
            if(isimg == true && isvideo== true){
                setIsvideo(false);
                return;
            }
            else if(isimg == false){
                setIsimg(true);
                return;
            }

        }
        if(props.Video.length != 0 && props.Img.length == 0){
            if(isimg == true && isvideo== true){
                setIsimg(false);
                return;
            }
            else if(isvideo == false){
                setIsvideo(true);
                return;
            }
                
        }
        if(props.Img.length !=0 && props.Video.length != 0){

            if(isimg == false && isvideo == false){
                if(props.Img.length > props.Video.length){
                    setMulti(props.ImgId);
                }
                else{
                   setMulti(props.VideoId);
                }
                setIsimg(true);   
                setIsvideo(true);         
            }
            else{
                if(props.Img.length > props.Video.length){
                    setMulti(props.ImgId);
                }
                else{
                   setMulti(props.VideoId);
                }
                setIsimg(true);   
                setIsvideo(true); 
            }

        }

    },[props.Img , props.ImgId, props.Video , props.VideoId]);

    return(<> 
        {(isimg == true && isvideo ==false) && (<div className="AddChatFile_total">
          {props.ImgId.map((data, i) =>(<>
             <AddFileList Img={props.Img[i]} Video={""} imgid={data} videoid={""} FileInfos={props.FileInfos[i]}/>
           </>))}
         </div>)}
         {(isvideo == true && isimg == false) && (<div className="AddChatFile_total">
            {props.Video.map((data, i) =>(<>
             <AddFileList Img={""} Video={data} imgid={""} videoid={data} FileInfos={props.FileInfos[i]}/>
             </> ))}
          </div>)}
         {(isimg == true && isvideo ==true) && (<div className="AddChatFile_total">
            {multi.map((data,i) =>(<>
              <AddFileList Img={props.Img[i]} Video={props.Video[i]} imgid={props.ImgId[i]} videoid={props.VideoId[i]}
              FileInfos={props.FileInfos[i]}/>
             </>))}
          </div>)}
    </>)
}
export default Addfiles;
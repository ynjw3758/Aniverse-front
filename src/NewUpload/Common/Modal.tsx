import { useEffect, useState } from "react"
import Picture from"../../NewUpload/Components/Picture";
import Video from"../../NewUpload/Components/Video";
import Multi from"../../NewUpload/Components/Multi";
import "./Modal.scss";

interface props{
FileType:string
FileUrl:UrlInfo[]
ImgList:File[]
VideoList:File[]
}

type UrlInfo={
  fileName:string,
  fileUrl:string,
  fileType:string
}


const Modal:React.FC<props> =({FileType ,FileUrl ,ImgList ,VideoList}:props) =>{

    const[isImg, setIsImg]=useState<boolean>(false);
    const[isVideo, setIsVideo]=useState<boolean>(false);
    const[isMulti, setIsMulti]=useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() =>{
        setIsLoading(true)
        console.log("url정보 :" , FileUrl)
        if(FileType === "P"){
           console.log("사진 파일")
           setIsImg(true);
        }
        else if(FileType === "V"){
           console.log("영상 파일 ")
           setIsVideo(true);

        }else if(FileType === "M"){
           console.log("멀티 파일 ")
           setIsMulti(true);
        }

    },[FileType, FileUrl, ImgList, VideoList])
  
    return(<div className="FileUpload_BackDrop">
        <div className="FileUpload_Modal">
        {isLoading && (
          <div className="Upload_Loading_Overlay">
            <div className="Upload_Spinner" />
            <p>파일 준비 중입니다...</p>
          </div>
        )}
        {isImg && (<>
        <Picture FileInfo={ImgList} UrlInfo={FileUrl} onReady={() => setIsLoading(false)}/>
        </>)}
        {isVideo && (<>
        <Video FileInfo={VideoList} UrlInfo={FileUrl} onReady={() => setIsLoading(false)}/>
        </>)}
        </div>
    </div>)
}
export default Modal
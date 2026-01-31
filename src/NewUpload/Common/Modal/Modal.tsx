import { useEffect, useState } from "react"
import Picture from"../../Components/Picture";
import Video from"../../Components/Video";
import Multi from"../../Components/Multi";
import "./Modal.scss";

interface props{
FileType:string
FileUrl:UrlInfo[]
ImgList:File[]
VideoList:File[]
onReady?: () => void;
}

type UrlInfo={
  fileName:string,
  fileUrl:string,
  fileType:string
  fileTime:number
}


const Modal:React.FC<props> =({FileType ,FileUrl ,ImgList ,VideoList ,onReady}:props) =>{

    const[isImg, setIsImg]=useState<boolean>(false);
    const[isVideo, setIsVideo]=useState<boolean>(false);
    const[isMulti, setIsMulti]=useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() =>{
        setIsLoading(true)
        if(FileType === "P"){
           setIsImg(true);
        }
        else if(FileType === "V"){
           setIsVideo(true);

        }else if(FileType === "M"){
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
        <Picture FileInfo={ImgList} UrlInfo={FileUrl} onReady={() => setIsLoading(false)} />
        </>)}
        {isVideo && (<>
        <Video FileInfo={VideoList} UrlInfo={FileUrl} onReady={() => setIsLoading(false)} />
        </>)}
        {isMulti && (<>
        <Multi VideoList={VideoList} PictureList={ImgList} UrlInfo={FileUrl} onReady={() => setIsLoading(false)}/>
        </>)}
        
        </div>
    </div>)
}
export default Modal
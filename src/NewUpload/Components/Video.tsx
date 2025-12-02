import { Fragment, useEffect, useRef, useState } from "react";
import "./Video.scss";
import PlayButton from "../Common/PlayButton";

interface props{
    FileInfo: File[]
    UrlInfo:UrlInfo[]
    onReady?: () => void;
}

type UrlInfo={
  fileName:string,
  fileUrl:string,
  fileType:string
}

type SlideInfo={
  fileUrl:string,
  fileidx:number,
  filesize:number
}

type MoveInfo={
  FileIdx:number,
  Direct:string,
  Event:string
}



const Video : React.FC<props> =({FileInfo, UrlInfo ,onReady}:props) =>{

      const[selected ,setSelected]=useState<string>("");
      const[isCnt, setIsCnt]=useState<boolean>(false);
      const[fileSize, setFileSize]=useState<number>(0);
      const[video, setVideo]=useState<string>("");
      const[moveWidth ,setMoveWidth]=useState<number>(0);
      const[idxValue, setIdxValue]=useState<number>(0);
      const[showOverlay, setShowOverlay] = useState(true);
      const[isPlaying, setIsPlaying]=useState<boolean>(false);
      const[isType,setIsType]=useState<string>("main");

      const readyCalledRef = useRef(false);
      const RealMoveIdx = useRef<number>(0);
      const videoRef = useRef<HTMLVideoElement | null>(null);

      
          useEffect(() =>{
            if(FileInfo.length > 1) {
              setIsCnt(true);
              setSelected(UrlInfo[0].fileUrl);
      
            }
            setVideo(UrlInfo[0].fileUrl);
            setFileSize(UrlInfo.length);
             readyCalledRef.current = false;
             console.log("이미지 파일 원본 데이터 :" , UrlInfo[0]);
             
          },[FileInfo, UrlInfo])

        const handleMainVideoLoad = () => {
                console.log("로딩 완료")
                // 이미지가 실제로 브라우저에 로드된 순간
                if (!readyCalledRef.current) {
                readyCalledRef.current = true;
                onReady && onReady();   // 👈 Modal의 setIsLoading(false) 호출
                }
        };

    const SelectVideo =(info:SlideInfo) =>{
      setIsPlaying(false);  
      setVideo(info.fileUrl);
      setSelected(info.fileUrl);
      setIdxValue(info.fileidx);
      //setIsType("thumb")
    }

     const ChangeIdxHandler =(Idx:MoveInfo) =>{
      if(Idx.Direct=="R"){
        console.log("변수 :" , Idx)
        if(Idx.Event == "F"){
            setIdxValue(Idx.FileIdx);
            setVideo(UrlInfo[Idx.FileIdx].fileUrl);
            setSelected(UrlInfo[Idx.FileIdx].fileUrl);
        }else{
          RealMoveIdx.current = Idx.FileIdx;
          setIdxValue(Idx.FileIdx);
          setVideo(UrlInfo[Idx.FileIdx].fileUrl);
          setSelected(UrlInfo[Idx.FileIdx].fileUrl);
        }

      }else{
        if(Idx.Event =="F"){
            setIdxValue(Idx.FileIdx);
            setVideo(UrlInfo[Idx.FileIdx].fileUrl);
            setSelected(UrlInfo[Idx.FileIdx].fileUrl);
        }else{
          RealMoveIdx.current =Idx.FileIdx; 
            setVideo(UrlInfo[Idx.FileIdx].fileUrl);
            setSelected(UrlInfo[Idx.FileIdx].fileUrl);
            setIdxValue(Idx.FileIdx);
        }

      }

      
    }
    const PlayHandler =(IsPlay:boolean) =>{
        if(IsPlay == true){
            videoRef.current?.play();
        }else{
            videoRef.current?.pause();
        }
    }

    const MouseOverHandler =() =>{
      setShowOverlay(true);
    }
    const MouseOutHandler =() =>{
      setShowOverlay(false);
    }
    const OnClickHandler =() =>{
        if(isPlaying == false){
          setIsPlaying(true);
          videoRef.current?.play();
        }else{
            setIsPlaying(false);
            videoRef.current?.pause();
        }
     
    }

    return(<Fragment>
        <div className="UploadVideo_Main">
          <section className="UploadVideo_LeftSide"
                   onClick={OnClickHandler}
                   //onMouseOver={MouseOverHandler}
                   //onMouseOut={MouseOutHandler}
                   >
            <video src={video}  
                   muted
                   preload="metadata"
                   onLoadedData={handleMainVideoLoad}
                   ref={videoRef}
/>
            {showOverlay && (
                <PlayButton IsPlaying={isPlaying} variant="main"/>
            )}
            
          </section>
            {isCnt && (<>
               <section className="UploadVideo_VideoList">
                 <div className="UploadVideo_VideoArea">
                    {UrlInfo.map((video, id)=>(<>
                        <div className="UploadVideo_MoveDiv"
                        style={{transition:"all 0.3s ease-in-out" ,
                        transform:`translateX(${ moveWidth}vw)`}}>
                            <video muted src={video.fileUrl} key={id} onClick={() =>SelectVideo({fileUrl: video.fileUrl , 
                            fileidx:id , filesize:UrlInfo.length})}
                            className={selected == video.fileUrl ? "selected" : ""}/>
                            <PlayButton  IsPlaying={false} variant="thumb"/>
                        </div>
                        
                        </>) 
                    )}
                 </div>
               </section>
            </>)}
        </div>
    </Fragment>)
}
export default Video;
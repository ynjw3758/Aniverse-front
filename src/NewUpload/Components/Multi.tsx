import { Fragment, useEffect, useRef, useState } from "react";
import "./Multi.scss";
import PlayButton from "../Common/buttons/PlayButton";
import PlayBar from "../Common/player/PlayBar";
import SlideButton from "../Common/buttons/SlideButton";


interface props{
    VideoList: File[]
    PictureList:File[]
    UrlInfo:UrlInfo[]
    onReady?: () => void;
}

type UrlInfo={
  fileName:string,
  fileUrl:string,
  fileType:string,
  fileTime:number
}

type PictureSlideInfo={
  fileUrl:string,
  fileidx:number,
  filesize:number
}
type VideoSlideInfo={
  fileUrl:string,
  fileidx:number,
  filesize:number,
  filetime:number
}

type MoveInfo={
  FileIdx:number,
  Direct:string,
  Event:string
}


const Multi:React.FC<props> =({VideoList, PictureList ,UrlInfo ,onReady}:props) =>{

    const[isImg ,setIsImg]=useState<boolean>(true);
    const[isVid ,setIsVid]=useState<boolean>(false);
    const[isPlaying, setIsPlaying]=useState<boolean>(false);
    const[imgList, setImgList]=useState<string[]>([])
    const[vidList, setVidList]=useState<string[]>([])
    const[mainimg, setMainImg]=useState<string>("");
    const[mainvideo, setMainVideo]=useState<string>("");
    const[selected ,setSelected]=useState<string>("");
    const[idxValue, setIdxValue]=useState<number>(0);
    const[moveWidth ,setMoveWidth]=useState<number>(0);
    const[duration, setDuration]=useState<number>(0);
    const [currentTime, setCurrentTime] = useState(0);

    const readyCalledRef = useRef(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    let RealMoveIdx = useRef<number>(0);

    useEffect(() =>{
      console.log("멀티 url :" ,UrlInfo)
        const newImages: string[] = [];
        const newVideos: string[] = [];

      UrlInfo.map((value, idx) =>{
        if(value.fileType == "image"){
            if(idx == 0){
                setMainImg(value.fileUrl)
                newImages.push(value.fileUrl)
                setImgList(prev => [...prev, ...newImages])
            }else{
                    newImages.push(value.fileUrl)
                    setImgList(prev => [...prev, ...newImages])
            }

        }else{
            newVideos.push(value.fileUrl)
            setVidList(prev => [...prev, ...newVideos])
        }
      })
      readyCalledRef.current = false;
    },[UrlInfo])

    const handleMainImgLoad = () => {
        // 이미지가 실제로 브라우저에 로드된 순간
        if (!readyCalledRef.current) {
        readyCalledRef.current = true;
        onReady && onReady();   // 👈 Modal의 setIsLoading(false) 호출
        }
    };

    const SelectPicture =(info:PictureSlideInfo) =>{
      setSelected(info.fileUrl);
      setIdxValue(info.fileidx);
      setMainImg(info.fileUrl);
      setIsVid(false);
      setIsImg(true);
    }
    const SelectVideo =(info:VideoSlideInfo) =>{
      setIsPlaying(false);  
      setMainVideo(info.fileUrl);
      setSelected(info.fileUrl);
      setIdxValue(info.fileidx);
      setDuration(info.filetime);
      setIsImg(false);
      setIsVid(true);
    }

    const OnClickHandler =() =>{
        console.log("영상 클릭 :" , isPlaying)
        if(isPlaying == false){
          setIsPlaying(true);
          videoRef.current?.play();
        }else{
            setIsPlaying(false);
          videoRef.current?.pause();
        }
     
    }

    const handleSeek = (value: number) => {
      if (!videoRef.current) return;
      videoRef.current.currentTime = value; // ★ 비디오 재생 위치 변경
      setCurrentTime(value);
    };

    const handleTimeUpdate = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
      }
    };

    const VideoEndHandler =() =>{
        setIsPlaying(false);          // 재생버튼도 정지 상태로 바뀌게
        setCurrentTime(0);            // 진행바를 0초로 되돌림

        if (videoRef.current) {
          videoRef.current.currentTime = 0;  // 실제 비디오 재생 위치도 0초로
        }
    }
     const ChangeIdxHandler =(Idx:MoveInfo) =>{
            if(Idx.Direct=="R"){
                console.log("변수 :" , Idx)
                if(Idx.Event == "F"){
                    if(UrlInfo[Idx.FileIdx].fileType =="image"){
                        setIdxValue(Idx.FileIdx);
                        setMainImg(UrlInfo[Idx.FileIdx].fileUrl);
                        setSelected(UrlInfo[Idx.FileIdx].fileUrl);
                        setIsVid(false);
                        setIsImg(true);
                    }else{
                        setIsImg(false);
                        setIdxValue(Idx.FileIdx);
                        setMainVideo(UrlInfo[Idx.FileIdx].fileUrl);
                        setSelected(UrlInfo[Idx.FileIdx].fileUrl);
                        setIsVid(true);
                    }
                }else{
                    RealMoveIdx.current = Idx.FileIdx;
                    if(UrlInfo[Idx.FileIdx].fileType =="image"){
                        setIdxValue(Idx.FileIdx);
                        setMainImg(UrlInfo[Idx.FileIdx].fileUrl);
                        setSelected(UrlInfo[Idx.FileIdx].fileUrl);
                        setIsVid(false);
                        setIsImg(true);
                    }else{
                        setIsImg(false);
                        setIdxValue(Idx.FileIdx);
                        setMainVideo(UrlInfo[Idx.FileIdx].fileUrl);
                        setSelected(UrlInfo[Idx.FileIdx].fileUrl);
                        setIsVid(true);
                    }
                }

            }else{
                if(Idx.Event =="F"){
                    if(UrlInfo[Idx.FileIdx].fileType =="image"){
                        setIdxValue(Idx.FileIdx);
                        setMainImg(UrlInfo[Idx.FileIdx].fileUrl);
                        setSelected(UrlInfo[Idx.FileIdx].fileUrl);
                        setIsVid(false);
                        setIsImg(true);
                    }else{
                        setIsImg(false);
                        setIdxValue(Idx.FileIdx);
                        setMainVideo(UrlInfo[Idx.FileIdx].fileUrl);
                        setSelected(UrlInfo[Idx.FileIdx].fileUrl);
                        setIsVid(true);
                    }

                }else{
                    RealMoveIdx.current = Idx.FileIdx;
                    if(UrlInfo[Idx.FileIdx].fileType =="image"){
                        setIdxValue(Idx.FileIdx);
                        setMainImg(UrlInfo[Idx.FileIdx].fileUrl);
                        setSelected(UrlInfo[Idx.FileIdx].fileUrl);
                        setIsVid(false);
                        setIsImg(true);
                    }else{
                        setIsImg(false);
                        setIdxValue(Idx.FileIdx);
                        setMainVideo(UrlInfo[Idx.FileIdx].fileUrl);
                        setSelected(UrlInfo[Idx.FileIdx].fileUrl);
                        setIsVid(true);
                    }
                }

      }
    }
    const LeftMoveHandler =() =>{
        setMoveWidth((prev) => prev -14.8)
    }
    const RightMoveHandler =() =>{
        setMoveWidth((prev) => prev + 14.8)
    }

    return(<Fragment>
        <div className="UploadMulti_Main">
          <section className="UploadMulti_LeftSide">
            {isImg && (<>
              <img src={mainimg} onLoad={handleMainImgLoad}/>
            </>)}
            {isVid && (<>
            <div className="UploadMulti_VideoWrapper"
                 onClick={OnClickHandler}>
                <video  src={mainvideo}
                        muted
                        preload="metadata"
                        onLoadedData={handleMainImgLoad}
                        ref={videoRef}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={VideoEndHandler}/>
                <PlayBar FileTime={duration} currentTime ={currentTime} onSeek={handleSeek}/>
            </div>
                <PlayButton  IsPlaying={isPlaying} variant="main"/>
            </>
            )}
          </section>
          <section className="UploadMulti_FileList">
            <div className="UploadMulti_FileArea">
                {UrlInfo.map((file, id)=>(<div className="UploadMulti_MoveDiv"
                    style={{transition:"all 0.3s ease-in-out" ,
                    transform:`translateX(${ moveWidth}vw)`}}>
                        {file.fileType == "image" && (<>
                            <img src={file.fileUrl} key={id} onClick={() =>SelectPicture({fileUrl: file.fileUrl , 
                            fileidx:id , filesize:UrlInfo.length})}
                            className={selected == file.fileUrl ? "selected" : ""}/>
                        </>)}
                        {file.fileType =="video" && (<>
                            <video muted src={file.fileUrl} key={id} onClick={() =>SelectVideo({fileUrl: file.fileUrl , 
                            fileidx:id , filesize:UrlInfo.length, filetime:file.fileTime})}
                            className={selected == file.fileUrl ? "selected" : ""}/>
                            <PlayButton  IsPlaying={false} variant="thumb"/>
                        </>)}
              </div>) 
              )}
            </div>
                <SlideButton FileIdx={idxValue} FileSize={UrlInfo.length} 
                onChangeIndex={ChangeIdxHandler} onLeftMove={LeftMoveHandler} onRightMove={RightMoveHandler}/>
          </section>
        </div>
    </Fragment>)
}
export default Multi;
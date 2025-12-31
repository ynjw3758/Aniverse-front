import { Fragment, useEffect, useRef, useState } from "react";
import "./Picture.scss";
import SlideButton from "../Common/SlideButton";
import UploadFormPanel from "../Common/UploadFormPanel";
import KaMap from "../../Upload/KaMap";

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

type localinfo={
  Content:string,
  Address:string,
  isActive:boolean
}


const Picture : React.FC<props> =({FileInfo , UrlInfo ,onReady} :props) =>{
   
  const[img, setImg]=useState<string>("");
  const[selected ,setSelected]=useState<string>("");
  const[uploadlocal ,setUploadlocal]=useState<string>("");
  const[isCnt, setIsCnt]=useState<boolean>(false);
  const[isLocal, setIsLocal]=useState<boolean>(false);
  const[islocalform , setIslocalform]=useState<boolean>(false);
  const[fileSize, setFileSize]=useState<number>(0);
  const[moveWidth ,setMoveWidth]=useState<number>(0);
  const[idxValue, setIdxValue]=useState<number>(0);
  const[localdata , setLocaldata] = useState<any[]>([]);
  const[localInfo , setLocalInfo]=useState<localinfo>();

  const readyCalledRef = useRef(false);
  let RealMoveIdx = useRef<number>(0);

    useEffect(() =>{
      if(FileInfo.length > 1) {
        setIsCnt(true);
        setSelected(UrlInfo[0].fileUrl);

      }
      setImg(UrlInfo[0].fileUrl);
      setFileSize(UrlInfo.length);
       readyCalledRef.current = false;
       console.log("이미지 파일 원본 데이터 :" , UrlInfo[0]);
       
    },[FileInfo, UrlInfo])

    const SelectPicture =(info:SlideInfo) =>{
      setImg(info.fileUrl);
      setSelected(info.fileUrl);
      setIdxValue(info.fileidx);
    }
    const ChangeIdxHandler =(Idx:MoveInfo) =>{
      if(Idx.Direct=="R"){
        if(Idx.Event == "F"){
            setIdxValue(Idx.FileIdx);
            setImg(UrlInfo[Idx.FileIdx].fileUrl);
            setSelected(UrlInfo[Idx.FileIdx].fileUrl);
        }else{
          RealMoveIdx.current = Idx.FileIdx;
          setIdxValue(Idx.FileIdx);
          setImg(UrlInfo[Idx.FileIdx].fileUrl);
          setSelected(UrlInfo[Idx.FileIdx].fileUrl);
        }

      }else{
        if(Idx.Event =="F"){
            setIdxValue(Idx.FileIdx);
            setImg(UrlInfo[Idx.FileIdx].fileUrl);
            setSelected(UrlInfo[Idx.FileIdx].fileUrl);
        }else{
          RealMoveIdx.current =Idx.FileIdx; 
            setImg(UrlInfo[Idx.FileIdx].fileUrl);
            setSelected(UrlInfo[Idx.FileIdx].fileUrl);
            setIdxValue(Idx.FileIdx);
        }

      }

      
    }

      const handleMainImgLoad = () => {
    // 이미지가 실제로 브라우저에 로드된 순간
    if (!readyCalledRef.current) {
      readyCalledRef.current = true;
      onReady && onReady();   // 👈 Modal의 setIsLoading(false) 호출
    }
  };

  const LeftMoveHandler =() =>{
    setMoveWidth((prev) => prev -14.8)
  }
    const RightMoveHandler =() =>{
     setMoveWidth((prev) => prev + 14.8)
  }

  const LocalHandler =() =>{
    setIsLocal(true);
  }

  const LocationdataHandler =(info:any) =>{

    
        setIsLocal(false);
        setLocaldata(info);
        setUploadlocal(info.content);
        setIslocalform(true);
        setLocalInfo({Content:info.content , Address:info.address, isActive:true})
  }
  const MapClose =() =>{
    setIsLocal(false);
  }
  const AgLocalHandler =() =>{
   setIsLocal(true);
  }
    return(<Fragment>
      <div className="UploadPicture_Main">
        <section className="UploadPicture_LeftSide">
          <img src={img} onLoad={handleMainImgLoad}/>
           {isCnt && (<>
             <section className="UploadPicture_PictureList">
              <div className="UploadPicture_PictureArea">
              {UrlInfo.map((img, id)=>(<div className="UploadPicture_MoveDiv"
              style={{transition:"all 0.3s ease-in-out" ,
              transform:`translateX(${ moveWidth}vw)`}}>
                  <img src={img.fileUrl} key={id} onClick={() =>SelectPicture({fileUrl: img.fileUrl , 
                  fileidx:id , filesize:UrlInfo.length})}
                  className={selected == img.fileUrl ? "selected" : ""}/>
              </div>) 
              )}
              </div>
               <SlideButton FileIdx={idxValue} FileSize={fileSize} 
               onChangeIndex={ChangeIdxHandler} onLeftMove={LeftMoveHandler} onRightMove={RightMoveHandler}/>
             </section>
           </>)}
        </section>
        <UploadFormPanel IsLocal={LocalHandler} ChageLocal={localInfo} AgainLocal={AgLocalHandler}/>
      </div>
      {isLocal && (<>
      <KaMap onData={LocationdataHandler} onclose={MapClose}/>
      </>)}
    </Fragment>)
}

export default Picture;
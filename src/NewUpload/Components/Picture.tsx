import { Fragment, useEffect, useRef, useState } from "react";
import "./Picture.scss";
import SlideButton from "../Common/SlideButton";

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


const Picture : React.FC<props> =({FileInfo , UrlInfo ,onReady} :props) =>{
   
  const[img, setImg]=useState<string>("");
  const[selected ,setSelected]=useState<string>("");
  const[isCnt, setIsCnt]=useState<boolean>(false);
  //const[fileIdx ,setFileIdx]=useState<number>(0);
  const[fileSize, setFileSize]=useState<number>(0);
  const[moveWidth ,setMoveWidth]=useState<number>(0);
  const[idxValue, setIdxValue]=useState<number>(0);

  const readyCalledRef = useRef(false);
  let RealMoveIdx = useRef<number>(0);

    useEffect(() =>{
      if(FileInfo.length > 1) {
         const map = new Map<number, string>();
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
        console.log("변수 :" , Idx)
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
        console.log("왼쪽으로 인덱스 변환 : ", Idx.FileIdx)
        if(Idx.Event =="F"){
          console.log("포커스만 이동");
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
      </div>
    </Fragment>)
}

export default Picture;
import { Fragment, useEffect, useRef, useState } from "react";
import "./Picture.scss";
import SlideButton from "../Common/SlideButton";
import UploadFormPanel from "../Common/UploadFormPanel";
import KaMap from "../../Upload/KaMap";
import {TagNormalizeHnadler} from"../../Utils/TagNormalize";
import TagModal from "../../Common/TagModal";

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
type MarkerData ={
  marker: any; // kakao.maps.Marker
  content: string;
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  address?: string;
  phone?: string;
  isaddress: boolean;
  isphone: boolean;
  category_group_code?: string;
  category_group_name?: string;
  category_name?: string;
}
type NomalizeData={
  category_group_code?: string;
  category_group_name?: string;
  category_name?: string;
}


const Picture : React.FC<props> =({FileInfo , UrlInfo ,onReady} :props) =>{
   
  const[img, setImg]=useState<string>("");
  const[selected ,setSelected]=useState<string>("");
  const[uploadlocal ,setUploadlocal]=useState<string>("");
  const[isCnt, setIsCnt]=useState<boolean>(false);
  const[isLocal, setIsLocal]=useState<boolean>(false);
   const[isTag, setIsTag]=useState<boolean>(false);
  const[islocalform , setIslocalform]=useState<boolean>(false);
  const[fileSize, setFileSize]=useState<number>(0);
  const[moveWidth ,setMoveWidth]=useState<number>(0);
  const[idxValue, setIdxValue]=useState<number>(0);
  const[localdata , setLocaldata] = useState<MarkerData>();
  const[localInfo , setLocalInfo]=useState<localinfo>();
  const[tagData, setTagData]=useState<string[]>([]);

  const readyCalledRef = useRef(false);
  let RealMoveIdx = useRef<number>(0);


    useEffect(() =>{
      if(!UrlInfo || UrlInfo.length ==0) return;
      if(FileInfo.length > 1) {
        setIsCnt(true);
        setSelected(UrlInfo[0].fileUrl);

      }
      setImg(UrlInfo[0].fileUrl);
      setFileSize(UrlInfo.length);
       readyCalledRef.current = false;
       console.log("이미지 파일 원본 데이터 :" , UrlInfo[0]);
       
    },[FileInfo, UrlInfo])


    useEffect(() =>{ //위치 데이터를 받고 카테고리 맵핑하기 위한 useeffect
      console.log("맵핑하자");
      if(!localdata) return;

      const TagList = TagNormalizeHnadler({category_group_code:localdata.category_group_code,
        category_group_name:localdata.category_group_name,
        category_name:localdata.category_name
      })

      console.log("추출된 태그 리스트 :" , TagList)

    },[localdata])

    const SelectPicture =(info:SlideInfo) =>{
      setImg(info.fileUrl);
      setSelected(info.fileUrl);
      setIdxValue(info.fileidx);
    }

    const ApplyIndex =(idx: number, syncRealIdx = false) =>{
        if (!UrlInfo[idx]) return;

        if (syncRealIdx) {
          RealMoveIdx.current = idx;
        }

        setIdxValue(idx);
        setImg(UrlInfo[idx].fileUrl);
        setSelected(UrlInfo[idx].fileUrl);
    }
    const ChangeIdxHandler =(Idx:MoveInfo) =>{
      
      const { FileIdx, Event } = Idx;
      const shouldSyncRealIdx = Event !== "F";
      ApplyIndex(FileIdx, shouldSyncRealIdx)
      
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

  const LocationdataHandler =(info:MarkerData) =>{
        setIsLocal(false);
        setLocaldata(info);
        setUploadlocal(info.content);
        setIslocalform(true);
        setLocalInfo({Content:info.content , Address:info.address ?? "", isActive:true})

  }
  const MapClose =() =>{
    setIsLocal(false);
  }
  const AgLocalHandler =() =>{
   setIsLocal(true);
  }

  const TagHandler =() =>{
    setIsTag(true);
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
        <UploadFormPanel IsLocal={LocalHandler} ChageLocal={localInfo} AgainLocal={AgLocalHandler} 
        IsTag={TagHandler}/>
      </div>
      {isLocal && (<>
      <KaMap onData={LocationdataHandler} onclose={MapClose}/>
      </>)}
      {isTag && (<>
      <TagModal />
      </>)}
    </Fragment>)
}

export default Picture;
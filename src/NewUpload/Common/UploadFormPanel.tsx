import { Fragment, useEffect, useState } from "react";
import "./UploadFormPanel.scss";
import MapImg from"../../assets/images/uploadMap.png";
import TapImg from"../../assets/images/uploadtap.png";
import AnimalCh from"../../assets/images/UploadAnimal.png";

interface props{
   IsLocal?:() => void;
   AgainLocal?:() => void;
   TagData:string[];
   ChageLocal:localinfo | undefined;
   IsTag?:() => void;
   //AgainTag?:() => void;
   //ChageTag:localinfo | undefined;
}

type localinfo={
  Content:string,
  Address:string,
  isActive:boolean
}

type TagInfo={
TagList:string[]
isActive:boolean
}

const UploadFormPanel:React.FC<props> =({IsLocal ,AgainLocal ,IsTag ,ChageLocal,TagData }:props) =>{

    const[text, setText]=useState<string>("");
    const[textCnt, setTextCnt]=useState<number>(0);
    const[isLocalActive ,setIsLocalActive]=useState<boolean>(false);
    const[localInfo, setLocalInfo]=useState<localinfo>();
    const[tagInfo, setTagInfo]=useState<TagInfo>();
   

     useEffect(() =>{
      console.log("위치 div 활성화");
      if(ChageLocal== undefined) return;
      setLocalInfo({Content:ChageLocal.Content , Address:ChageLocal.Address , isActive:ChageLocal.isActive})
        
     },[ChageLocal])

    const OnchageHandler =(event:React.ChangeEvent<HTMLTextAreaElement>) =>{
           setTextCnt(event.target.value.length)
    }

    const KampHandler =() =>{
      IsLocal && IsLocal();
    }

    const ChangeLocalHandler =() =>{
      AgainLocal && AgainLocal();
    }

    const TagHandler =() =>{
      IsTag && IsTag();
    }

    return(<Fragment>
        <div className="UploadFormPanel_Main">
          <h2>당신의 이야기를 전해보세요...</h2>
           <div className="UploadFormPanel_TextAreaWrapper">
             <textarea className="UploadForm_TextArea"
             placeholder="오늘 어떤 일이 있었나요?
                          산책, 병원, 식사, 놀이... 자유롭게 적어보세요."
                           maxLength={500}
                           onChange={OnchageHandler}/>
            <div className="UploadForm_CharCount">
                {textCnt} / 500
            </div>
           </div>
           <div className="UploadFormPanel_Contents"
                onClick={KampHandler}>
             <img src={MapImg}/>
             {!localInfo?.isActive ? (<h4>위치 추가</h4>):(<div className="ActiveLocal_Main">
                <h2>{ChageLocal?.Content}</h2>
                <button onClick={ChangeLocalHandler}>변경</button>
               <p>{ChageLocal?.Address}</p>
             </div>)}
           </div>
            <div className="UploadFormPanel_TagContents" 
            onClick={TagHandler}>
              <div className="UploadFormPanel_header">
                <img src={TapImg}/>
                <h4>태그</h4>
             </div>
             {tagInfo?.isActive ? (<>
             </>) : (<>
                <div className="UploadFormPanel_TagData">
                  <div className="UploadFormPanel_TagListWrapper">
                {TagData.map((value, idx) =>(<div className="UploadFormPanel_TagList">
               <p>{value}</p>
             </div>))}
              </div>
             </div>
             </>)
             }
           </div>
            <div className="UploadFormPanel_Contents">
             <img src={AnimalCh}/>
             <h4>반려동물 선택</h4>
           </div>
           <div className="UploadFormPanel_Btn">
            <button className="CancelBtn">취소</button>
            <button className="UploadBtn">업로드</button>
           </div>
        </div>
    </Fragment>)

}

export default UploadFormPanel;
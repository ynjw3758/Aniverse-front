import { Fragment, useEffect, useState } from "react";
import "./UploadFormPanel.scss";
import MapImg from"../../assets/images/uploadMap.png";
import TapImg from"../../assets/images/uploadtap.png";
import PublicImg from"../../assets/images/publicArea.png";

interface props{
   IsLocal?:() => void;
   AgainLocal?:() => void;
   ChageLocal:localinfo | undefined;
}

type localinfo={
  Content:string,
  Address:string,
  isActive:boolean
}

const UploadFormPanel:React.FC<props> =({IsLocal ,AgainLocal ,ChageLocal}:props) =>{

    const[text, setText]=useState<string>("");
    const[textCnt, setTextCnt]=useState<number>(0);
    const[isLocalActive ,setIsLocalActive]=useState<boolean>(false);
    const[localInfo, setLocalInfo]=useState<localinfo>();
   

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
            <div className="UploadFormPanel_Contents">
             <img src={TapImg}/>
             <h4>태그 추가</h4>
           </div>
            <div className="UploadFormPanel_Contents">
             <img src={PublicImg}/>
             <h4>공개 범위</h4>
           </div>
        </div>
    </Fragment>)

}

export default UploadFormPanel;
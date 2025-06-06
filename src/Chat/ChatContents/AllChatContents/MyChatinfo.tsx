import { useEffect, useRef ,useContext, useState} from "react";
import {Oval} from "react-loader-spinner";

import "./MyChatinfo.scss";
import WebSocketChatContext from "../../../Context/WebSocketChatContext";
import { TranseDate } from "../../../Utils/TranseDate";

interface props{
    Chatinfo:MessageInfo,
    DeleteChat :(data:string) => void
}
type MessageInfo={
    chatId:string;
    message:string;
    messageId:string;
    nickname:string;
    profile:string;
    recount:number;
    sendId:string;
    timestamp:string;
    type:string;
    isSend:boolean;
   }
const DividChatinfo =({Chatinfo, DeleteChat}:props) =>{
    const[isLoading, setIsLoading]=useState<boolean>(true);
    const[isError, setIsError]=useState<boolean>(false);
    const[isSuccess, setIsSuccess]=useState<boolean>(false);
    const[ismine, setIsmine]=useState<boolean>(false);
    const[isother, setIsother]=useState<boolean>(false);
    const[sendtime, setSendtime]=useState<string>("");
    const[reCnt, setReCnt]=useState<number>(1);
    const[iszero, setIszero]=useState<boolean>(false);
    const[zeroresize, setZeroresize]=useState<boolean>(false);

   let div_ref = useRef<HTMLDivElement>(null);
   const Chat_Context= useContext(WebSocketChatContext);
   const resize_context =zeroresize?  "MyChat_Stand_resize":"MyChat_Stand";


   
   
    useEffect(() => {
        if(Chatinfo.type ==="mine"){
           setIsmine(true);
        }
        else{
            setIsother(true);
        }
        const nowTime =  new Date(Chatinfo.timestamp);
        const SendTime = TranseDate(nowTime);
        setSendtime(SendTime);
        
        if(Chatinfo.isSend === false){
            if (Chat_Context.isError) {
                setIsLoading(false);
                setIsError(true);
              }
            
              if (Chat_Context.isSuccess) {
                setIsLoading(false);
                setIsSuccess(true);
              }
        }
        else{
            setIsLoading(false);
            setIsSuccess(true);
        }
            
      },[Chat_Context.isError, Chat_Context.isSuccess])

    useEffect(() =>{
      console.log("chatinfo :" , Chatinfo)
      resizeToLeft(Chatinfo.message);
      if(Chatinfo.recount !==0) {
        setReCnt(Chatinfo.recount)
      }
      else{
        setZeroresize(true)
        setIszero(true);
      }

    },[Chatinfo])


    function CalMarginLeft (data:string){
        let total = 0;
        for (let char of data) {
            if (/[가-힣]/.test(char)) {
              total += 11.5; // 완성형 한글
            } else if (/[ㄱ-ㅎㅏ-ㅣ]/.test(char)) {
              total += 13;  // 자음/모음 단독 문자
            } else if (/[A-Z]/.test(char)) {
              total += 10;
            } else if (/[0-9]/.test(char)) {
              total += 8;
              
            }else if(/[a-z]/.test(char)){
                total += 9;
            } 
            else {
              total += 8;
            }
          }
      
        return total;
    }

    const resizeToLeft = (data:string) => {
        if(Chatinfo.type === "mine"){
            const container = div_ref.current;
            if(Chatinfo.isSend === false){
                if (container) {
                    if(isSuccess === true){
                        let margin = CalMarginLeft(data);
                        if(margin >240) margin=240;
                        container.style.marginLeft = `-${margin}px`;
                    }
                    else{
                            let margin = CalMarginLeft(data);
                            if(margin >240) margin=240;
                            container.style.marginLeft = `-${margin}px`;
                    }
    
                  }
            }
            else{
                if (container) {
                    let margin = CalMarginLeft(data);
                    if(margin >240) margin=240;
                    container.style.marginLeft = `-${margin}px`;
                  }
            }
        }
      };

      const deletechat =() =>{
        DeleteChat(Chatinfo.messageId);
      }

      const retrychat =() =>{

      }
    return(<div className={resize_context} ref={div_ref}>
        {ismine && (<>
            {isLoading && (<div className="MyChat_Loading">
                  <Oval 
                          color="#ff0000" 
                          height={20} 
                          width={20}
                       />
        </div>)}
        {isSuccess && (<>
            <div className="MyChat_ChangData">
                {!iszero && (<>
                    <p id="MyChat_ReCount">{reCnt}</p>
                </>)}
                <p>{sendtime}</p>
            </div>
        </>)}
        {isError && (<>
            <div className="MyChat_Error">
              <img src="/image/chatdelete.png" onClick={deletechat}/>
              <img src="/image/rotate.png" onClick={retrychat}/>
            </div>
        </>)}
        <div className="MyChat_Context" key={Chatinfo.messageId}>
         <h4>{Chatinfo.message}</h4>
        </div>
        </>)}
        {isother && (<>
            <div className="OtherChat_Userinfo">
             <img src={Chatinfo.profile}/>
            </div>
            <div className="OtherChat_column">
             <p>{Chatinfo.nickname}</p>
              <div className="OtherChat_Context" key={Chatinfo.messageId}>
               <h4>{Chatinfo.message}</h4>
              </div>
            </div>
        <div className="OtherChat_ChangData">
                {!iszero && (<>
                    <p id="OtherChat_ReCount">{reCnt}</p>
                </>)}
                <p>{sendtime}</p>
            </div>
        </>)}

    </div>)
}
export default DividChatinfo;
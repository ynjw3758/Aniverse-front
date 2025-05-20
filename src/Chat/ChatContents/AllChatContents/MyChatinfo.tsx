import { useEffect, useRef ,useContext, useState} from "react";
import {Oval} from "react-loader-spinner";

import "./MyChatinfo.scss";
import WebSocketChatContext from "../../../Context/WebSocketChatContext";

interface props{
    Chatinfo:MyChat
}

type MyChat ={
    Mchat:string,
    ReCount:number,
    Time:string
  }
const MyChatinfo =({Chatinfo}:props) =>{
    const[isLoading, setIsLoading]=useState<boolean>(true);
    const[isError, setIsError]=useState<boolean>(false);
    const[isSuccess, setIsSuccess]=useState<boolean>(false);

   let div_ref = useRef<HTMLDivElement>(null);
   const Chat_Context= useContext(WebSocketChatContext);
   
    useEffect(() => {
        if (Chat_Context.isError) {
          setIsLoading(false);
          setIsError(true);
        }
      
        if (Chat_Context.isSuccess) {
          setIsLoading(false);
          setIsSuccess(true);
        }
      },[Chat_Context.isError, Chat_Context.isSuccess])

    useEffect(() =>{
      console.log("Chat_Context" , Chat_Context);
      resizeToLeft(Chatinfo.Mchat);
    },[Chatinfo])

    const resizeToLeft = (data:string) => {
        const container = div_ref.current;
        const size = 20;
        if (container) {
            //if(size > Chatinfo.Mchat.length){
          const currentWidth = container.offsetWidth;
          const newWidth = currentWidth + 10; // 확장 정도
          container.style.width = `${newWidth}px`;
          container.style.marginLeft = `${100 - newWidth}px`; // 왼쪽으로 확장처럼 보이게
            //}

        }
      };

    return(<div className="MyChat_Stand" ref={div_ref}>
        {isLoading && (<div className="MyChat_Loading">
                  <Oval 
                          color="#ff0000" 
                          height={20} 
                          width={20}
                       />
        </div>)}
        {isSuccess && (<>
            <div className="MyChat_ChangData">
                <p id="MyChat_ReCount">{Chatinfo.ReCount}</p>
                <p>{Chatinfo.Time}</p>
            </div>
        </>)}
        {isError && (<>
            <div className="MyChat_Error">
              <img src="/image/chatdelete.png"/>
              <img src="/image/rotate.png"/>
            </div>
        </>)}
        <div className="MyChat_Context">
         <h4>{Chatinfo.Mchat}</h4>
        </div>
    </div>)
}
export default MyChatinfo;
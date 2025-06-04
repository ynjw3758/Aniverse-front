
import "./ShowChatWrapper.scss";
import ShowChat from "./ShowChat";
import ShowChatContext from "../../Context/ShowChatContext";
import WebSocketChatContext from "../../Context/WebSocketChatContext";
import { useContext, useEffect, useReducer, useRef, useState } from "react";

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
    isSend:boolean
   }


const ShowChatWrapper =() =>{
    const Chatinfo =useContext(ShowChatContext);
    const ReceiveMessage = useContext(WebSocketChatContext);

    return(<>
              <ShowChat Userinfo={Chatinfo.chatData} RoomName={Chatinfo.chatTitle} CreateDate={Chatinfo.chatCtDate}
      Chat_id={Chatinfo.chatId} onConnect={true} MyProfile={Chatinfo.MyProfile} isFirst={Chatinfo.isfirst}
      MyNickname={Chatinfo.MyNickname} isClick={Chatinfo.isClick} StandDate={Chatinfo.standDate} 
      MessageInfo={Chatinfo.messageinfo} RealtimeMsg={ReceiveMessage.receivemsg!} />

    </>)

}
export default ShowChatWrapper;

import "./ShowChatWrapper.scss";
import ShowChat from "./ShowChat";
import ShowChatContext from "../../Context/ShowChatContext";
import WebSocketChatContext from "../../Context/WebSocketChatContext";
import { useContext, useEffect, useReducer, useRef, useState } from "react";

type Receive_Message={
    MessageId:string
    ChatId:String;
    SendId:string;
    SendProfile:string;
    SendNickname:String;
    SendMsg:String;
    SendTime:string;
    ReCount:number;
    type:string
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
    isSend:boolean
   }


const ShowChatWrapper =() =>{
    const[realtimeMsg, setRealtimeMsg]=useState<MessageInfo | null>(null);
    const[isreal, setIsreal]=useState<boolean>(false);
    const Chatinfo =useContext(ShowChatContext);
    const ReceiveMessage = useContext(WebSocketChatContext);
    const test = useRef<MessageInfo | null>(null);
    useEffect(() =>{

    },[ReceiveMessage.receivemsg])


    return(<>
              <ShowChat Userinfo={Chatinfo.chatData} RoomName={Chatinfo.chatTitle} CreateDate={Chatinfo.chatCtDate}
      Chat_id={Chatinfo.chatId} onConnect={true} MyProfile={Chatinfo.MyProfile} isFirst={Chatinfo.isfirst}
      MyNickname={Chatinfo.MyNickname} isClick={Chatinfo.isClick} StandDate={Chatinfo.standDate} MessageInfo={Chatinfo.messageinfo} RealtimeMsg={ReceiveMessage.receivemsg!} />

    </>)

}
export default ShowChatWrapper;
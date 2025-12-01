import React from "react";

export interface Socket_Info {
    socketRef: React.MutableRefObject<WebSocket | null>;
    isError:boolean,
    isSuccess:boolean,
    ReadChat:readchatinfo,
    receivemsg?:MessageInfo,
    isOneRead:boolean,
    sendMessage: (chatId: string, message: string, userId: string , nickname:string,
        Profile:string, isFirst:boolean ,UserId:string[], ReCount:number, messageId:string , roomName:string) => void;
    Partici_Chatid : (chatId: string, UserId:string[]) => void
}

const Initial:Socket_Info ={
    socketRef: { current: null } as React.MutableRefObject<WebSocket | null>,
    isError:false,
    isSuccess:false,
    ReadChat:{
    chatId:"",
    msg:"",
    messageIds:[],
    userId:"",
    },
    receivemsg:{    
    chatId:"",
    message:"",
    messageId:"",
    nickname:"",
    profile:"",
    recount:0,
    sendId:"",
    timestamp:"",
    type:"",
    isSend:false
},
isOneRead:false,
    sendMessage:() => {},
    Partici_Chatid:() =>{}
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
type readchatinfo={
  chatId:string;
  msg:string;
  messageIds:string[];
  userId:string;
}



const WebSocketChatContext  =React.createContext<Socket_Info>(Initial);
export default WebSocketChatContext ;
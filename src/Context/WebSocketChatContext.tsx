import React from "react";

export interface Socket_Info {
    socketRef: React.MutableRefObject<WebSocket | null>;
    isError:boolean,
    isSuccess:boolean,
    sendMessage: (chatId: string, message: string, userId: string , nickname:string,
        Profile:string, isFirst:boolean ,UserId:string[], ReCount:number) => void;
    Partici_Chatid : (chatId: string, UserId:string[]) => void
}

const Initial:Socket_Info ={
    socketRef: { current: null } as React.MutableRefObject<WebSocket | null>,
    isError:false,
    isSuccess:false,
    sendMessage:() => {},
    Partici_Chatid:() =>{}
  }


const WebSocketChatContext  =React.createContext<Socket_Info>(Initial);
export default WebSocketChatContext ;
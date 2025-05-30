import React from "react";

export interface Receive_chat {
    SendId: string;
    SendProfile: string;
    SendNickname: string;
    SendMsg: string;
    SendTime:string;
    ChatId:string;
    MessageId:string,
  }

export interface Alarm_info {
socketRef: React.MutableRefObject<WebSocket | null>;
chatReceive : Receive_chat,
}

const initial:Alarm_info ={
socketRef: { current: null } as React.MutableRefObject<WebSocket | null>,
chatReceive:{    
    SendId: "",
    SendProfile: "",
    SendNickname: "",
    SendMsg: "",
    SendTime:"",
    ChatId:"",
    MessageId:""
    },
}


const WebSocketAlarmContext  =React.createContext<Alarm_info>(initial);
export default WebSocketAlarmContext ;
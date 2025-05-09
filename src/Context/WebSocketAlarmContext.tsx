import React from "react";

export interface Receive_chat {
    SendId: string;
    SendProfile: string;
    SendNickname: string;
    SendMsg: string;
    SendTime:string;
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
    SendTime:""
    },
}


const WebSocketAlarmContext  =React.createContext<Alarm_info>(initial);
export default WebSocketAlarmContext ;
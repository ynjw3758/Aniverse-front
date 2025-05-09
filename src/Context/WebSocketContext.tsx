import React from "react";

export interface WebSocketInfo {
    socket: WebSocket | null;
    isDisconnected: boolean;
  }
  
  const defaultContext: WebSocketInfo = {
    socket: null,
    isDisconnected: false,
  };

const WebSocketContext  =React.createContext<WebSocketInfo>(defaultContext);
export default WebSocketContext ;

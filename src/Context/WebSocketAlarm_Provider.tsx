import WebSocketAlarmContext from "./WebSocketAlarmContext";
import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";


type Props = {
    children?: React.ReactNode
  };

type Receive_chat={
    SendId:string;
    SendProfile:string;
    SendNickname:string;
    SendMsg:string;
    SendTime:string;
    ChatId:string;
}


  const WebSocketAlarm_Provider =({children}:Props) =>{
    const[chatReceive, setChatReceive]=useState<Receive_chat>({
        SendId: "",
        SendProfile: "",
        SendNickname: "",
        SendMsg: "",
        SendTime:"",
        ChatId:""
    })
    const[isAlarm, setIsAlarm]=useState<boolean>(false);
    const socketRef = useRef<WebSocket | null>(null);
    const stompClientRef = useRef<Client | null>(null);

    useEffect(() =>{
        const UserId:String = localStorage.getItem("id")!;
        const ws = new WebSocket("ws://127.0.0.1:8083/alarm");
        const socket = new SockJS(`http://127.0.0.1:8083/ws?userid=${UserId}`);
        ws.onopen =() =>{
         console.log("알람 웹 소켓 연결 확인");
         ws.send(JSON.stringify({ Id: UserId}));
                   const client = new Client({
                     webSocketFactory: () => socket,
                     reconnectDelay: 5000,
                     onConnect: () => {
                       client.subscribe(`/user/queue/notify`,(message) => {
                        const alarm = JSON.parse(message.body);
                        console.log("🔔 알림 수신:", alarm);
                        setChatReceive(alarm);
                    }, 
                        {
                            userId:JSON.stringify(UserId), 
                            type:"Alarm"// ✅ 헤더로 userId 넘김
                          });
                     },
                     onStompError: (frame) => {
                       console.error("❌ STOMP 에러:", frame);
                     },
                     onWebSocketError: (error) => {
                        console.error("❌ SockJS 연결 에러", error);
                        alert("서버와 연결할 수 없습니다.");
                      },
                   });
             
                   client.activate();
                   stompClientRef.current = client;
        }

    },[])

    const Alarm_info={
        socketRef:socketRef,
        chatReceive:chatReceive,
    }

    return (
        <WebSocketAlarmContext.Provider value={Alarm_info} >
        {children}
        </WebSocketAlarmContext.Provider>
    );
  }
  export default WebSocketAlarm_Provider;
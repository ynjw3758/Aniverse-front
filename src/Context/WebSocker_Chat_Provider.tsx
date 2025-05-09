
import { useEffect, useRef, useState } from "react";
import WebSocketChatContext from "./WebSocketChatContext";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

type Props = {
    children?: React.ReactNode
  };


const WebSocket_Chat_Provider =({children}:Props) =>{
  
  const stompClientRef = useRef<Client | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const ChatId = useRef<string>("");
  const UserIds = useRef<string[]>([]);
    useEffect(() => {
      //if (!ChatId.current || UserIds.current.length === 0) return;
      /*
      const id = localStorage.getItem("id");
      const ws = new WebSocket("ws://127.0.0.1:8083/chat");
      const socket = new SockJS("http://127.0.0.1:8083/ws");
      ws.onopen = () => {
        console.log("✅ WebSocket Chat연결됨 : " );
        ws.send(JSON.stringify({ Id: id, type: "join" }));

      };
  
      ws.onmessage = (e) => {
        console.log("📩 서버 메시지:",e.data);
      }
      ws.onerror = (e) => console.error("❌ WebSocket 에러", e);
      ws.onclose = () => console.log("🔌 WebSocket 종료");
  
      socketRef.current = ws;

        // ✅ 브라우저 종료/새로고침 직전에 종료 알림 보내기
        const handleBeforeUnload = () => {
          if (ws.readyState === WebSocket.OPEN) {
            console.log("새로고침?")
            ws.send(JSON.stringify({ Id: id, type: "session_close" }));
          }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
  
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        ws.close();
        
      };
      */
    }, []);


    const sendMessage = (chatId: string, message: string, userId: string, nickname:string, 
      Profile:string, isFirst:boolean ,UserId:string[]) => {
       console.log("채팅보내기");
       console.log("nickname : " , nickname);
       if (!stompClientRef.current || !stompClientRef.current.connected) {
        console.warn("STOMP 연결이 되어 있지 않습니다.");
        return;
      }
    
      const payload = {
        chatId,
        userId,
        message,
        timestamp: new Date().toISOString(), // 선택적
        profile:Profile,
        first:isFirst,
        inviteIds:UserId,
        nickname:nickname
      };
    
      stompClientRef.current.publish({
        destination: "/app/chat.send", // ✅ 서버 @MessageMapping("/chat.send") 에 대응
        body: JSON.stringify(payload),
      });
    };

    const Partici_Chatid =(chatid:string, UserId:string[]) =>{
      ChatId.current="d209ba25-bb41-4894-a3a5-def24a073ba9";
      UserIds.current =UserId;
      const userid= localStorage.getItem("id")!;
        // 여기서 STOMP 연결 수행
        const ws = new WebSocket("ws://127.0.0.1:8083/chat");
        const socket = new SockJS(`http://127.0.0.1:8083/ws?userid=${userid}`);
        ws.onopen = () => {
          console.log("✅ WebSocket Chat연결됨 : " );
          const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
              client.subscribe(`/topic/chat/${ChatId.current}`, (message: IMessage) => {
                console.log("📩 수신 메시지:", message.body);
              },  {
                userId:JSON.stringify(UserIds.current), 
                type:"Chat"// ✅ 헤더로 userId 넘김
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
        };
    
        ws.onmessage = (e) => {
          console.log("📩 서버 메시지:",e.data);
        }
        ws.onerror = (e) => console.error("❌ WebSocket 에러", e);
        ws.onclose = () => console.log("🔌 WebSocket 종료");
    
        socketRef.current = ws;

    }
    

    const WebSocket_Ingo ={
      socketRef:socketRef,
      sendMessage:sendMessage,
      Partici_Chatid:Partici_Chatid
    }
    return(
      <WebSocketChatContext.Provider value={WebSocket_Ingo} >
      {children}
      </WebSocketChatContext.Provider>
    );

    
}
export default WebSocket_Chat_Provider;
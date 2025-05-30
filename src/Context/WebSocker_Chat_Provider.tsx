
import { useEffect, useRef, useState } from "react";
import WebSocketChatContext from "./WebSocketChatContext";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

type Props = {
    children?: React.ReactNode
  };
type readchatinfo={
  chatId:string;
  messageIds:string[]
}


const WebSocket_Chat_Provider =({children}:Props) =>{
  const[isError, setIsError]=useState<boolean>(false);
  const[isSuccess, setIsSuccess]=useState<boolean>(false);
  
  const stompClientRef = useRef<Client | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const ChatId = useRef<string>("");
  const UserIds = useRef<string[]>([]);
  const[readChat, setReadChat]=useState<string[]>([]);


  useEffect(() =>{
   console.log("채팅 페이지 입장");

  },[]);
    const sendMessage = (chatId: string, message: string, sendId: string, nickname:string, 
      Profile:string, isFirst:boolean ,UserId:string[], ReCount:number ,messageId:string) => {
       if (!stompClientRef.current || !stompClientRef.current.connected) {
        console.warn("STOMP 연결이 되어 있지 않습니다.");
        return;
      }
      const payload = {
        chatId,
        sendId,
        message,
        timestamp: new Date().toISOString(), // 선택적
        profile:Profile,
        first:isFirst,
        inviteIds:UserId,
        nickname:nickname,
        recount:ReCount,
        messageId,

      };
    
      stompClientRef.current.publish({
        destination: "/app/chat.send", // ✅ 서버 @MessageMapping("/chat.send") 에 대응
        body: JSON.stringify(payload),
      });
    };

    const Partici_Chatid =(chatid:string, UserId:string[]) =>{
      ChatId.current=chatid;
      UserIds.current =UserId;
      const userid= localStorage.getItem("id")!;
        // 여기서 STOMP 연결 수행
        const ws = new WebSocket("ws://127.0.0.1:8083/chat");
        const socket = new SockJS(`http://127.0.0.1:8083/ws?userid=${userid}`);
        ws.onopen = () => {
          console.log("✅ WebSocket Chat연결됨 : ", userid);
          const MyId:string = localStorage.getItem("id")!;
          ws.send(JSON.stringify({ UserId:MyId ,ChatId:ChatId.current, type: "ChatJoin" }));
          const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
              client.subscribe(`/topic/chat/${ChatId.current}`, (message) => {
                console.log("📩 채팅 아이디로 수신 메시지:", message.body);
              },  {
                userId:JSON.stringify(UserIds.current), 
                type:"Chat"// ✅ 헤더로 userId 넘김
              });
               console.log("구독 하냐 ?" , ChatId.current);
              client.subscribe(`/topic/read/${ChatId.current}`, (message) => {
                console.log("오나 ?" , message);
                const readInfo:readchatinfo = JSON.parse(message.body);
                console.log("👁️ 읽음 정보 수신:", readInfo.messageIds);
                setReadChat(readInfo.messageIds);
              
                // 여기에 읽음 카운트 UI 업데이트 로직 추가
                // 예: 해당 messageId에 대한 UI의 recount 감소 처리 등
              });


              client.subscribe(`/user/queue/errors`, (message) => {
                const error = JSON.parse(message.body);  // 항상 parse 필요
                 console.log("에러 발생 :" , error);
                 setIsError(true);
                 setTimeout(() => {
                  setIsError(false);
                }, 100); // 3초 뒤 자동 초기화
              });

              client.subscribe(`/user/queue/success`, (message) => {
                console.log("message :" , message);
                const success = JSON.parse(message.body);  // 역시 parse 필요
                console.log("✅ 메시지 전송 성공:", success);
                setIsSuccess(true);

                setTimeout(() => {
                  setIsSuccess(false);
                }, 100); // 3초 뒤 자동 초기화
                // 여기서 메시지 전송 UI 처리 (로딩 종료, 체크표시 등)
              });
              
            },
            onStompError: (frame) => {
              const errorMessage = frame.headers["message"] ?? frame.body;
              console.error("❌ STOMP ERROR 메시지:", errorMessage);
            
              if (errorMessage.includes("채팅방 참여자가 아닙니다")) {
                alert("⚠️ 이 채팅방에 참여할 수 없습니다.");
                // 1초 후 메인으로 이동
                setTimeout(() => {
                  window.location.href = "/"; // ✅ 메인 페이지 경로
                }, 1000);
              }
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
    const resetErrorAndSuccess = () => {
      setIsError(false);
      setIsSuccess(false);
    };
    

    const WebSocket_Ingo ={
      socketRef:socketRef,
      isError,
      isSuccess,
      ReadChat:readChat,
      sendMessage:sendMessage,
      Partici_Chatid:Partici_Chatid,

    }
    return(
      <WebSocketChatContext.Provider value={WebSocket_Ingo} >
      {children}
      </WebSocketChatContext.Provider>
    );

    
}
export default WebSocket_Chat_Provider;
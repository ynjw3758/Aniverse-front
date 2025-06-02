import { useContext, useEffect, useRef, useState } from "react";
import WebSocketChatContext from "./WebSocketChatContext";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import ShowChatContext from "./ShowChatContext";

type Props = {
    children?: React.ReactNode
  };
type readchatinfo={
  chatId:string;
  messageIds:string[]
}
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

const WebSocket_Chat_Provider =({children}:Props) =>{
  const[isError, setIsError]=useState<boolean>(false);
  const[isSuccess, setIsSuccess]=useState<boolean>(false);
  
  const stompClientRef = useRef<Client | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const ChatId = useRef<string>("");
  const UserIds = useRef<string[]>([]);
  const[readChat, setReadChat]=useState<string[]>([]);
  const[receivemsg, setReceivemsg]=useState<MessageInfo>()
  //const showchat =useContext(ShowChatContext);

useEffect(() => {
  return () => {
    console.log("🧹 WebSocket_Chat_Provider unmount, 연결 종료 시도");
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.close();
      console.log("🔌 WebSocket 정상 종료");
    }

    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.deactivate();
      console.log("📴 STOMP 클라이언트 정상 종료");
    }
  };
}, []);

    const sendMessage = (chatId: string, message: string, sendId: string, nickname:string, 
      Profile:string, isFirst:boolean ,UserId:string[], ReCount:number ,messageId:string) => {
       if (!stompClientRef.current || !stompClientRef.current.connected) {
        console.warn("STOMP 연결이 되어 있지 않습니다.");
        return;
      }

      console.log("닉네임  :" ,nickname );
      console.log("프로파일일  :" ,Profile );
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

                // 🔌 기존 연결 정리
          if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.close();
            socketRef.current = null;
          }

          if (stompClientRef.current && stompClientRef.current.connected) {
            stompClientRef.current.deactivate();
            stompClientRef.current = null;
          }

      const userid= localStorage.getItem("id")!;
        const ws = new WebSocket(`ws://127.0.0.1:8083/chat?userId=${userid}&chatId=${ChatId.current}`);
        const socket = new SockJS(`http://127.0.0.1:8083/ws?userid=${userid}`);
        ws.onopen = () => {

          //setWeb(ws);
          socketRef.current = ws;
          console.log("✅ WebSocket Chat연결됨 : ", userid);
          const MyId:string = localStorage.getItem("id")!;
          ws.send(JSON.stringify({ UserId:MyId ,ChatId:ChatId.current, type: "ChatJoin" }));
          const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            
            onConnect: () => {
              //setStomp(client);
              stompClientRef.current = client;
              client.subscribe(`/topic/chat/${ChatId.current}`, (message) => {
                console.log("📩 채팅 아이디로 수신 메시지:", message.body);
                const msg:MessageInfo = JSON.parse(message.body);
                console.log("msg :" ,msg)
                setReceivemsg(msg);
              },  {
                userId:JSON.stringify(UserIds.current), 
                type:"Chat"// ✅ 헤더로 userId 넘김
              });
              client.subscribe(`/topic/read/${ChatId.current}`, (message) => {
                const readInfo:readchatinfo = JSON.parse(message.body);
                console.log("👁️ 읽음 정보 수신:", readInfo.messageIds);
                setReadChat(readInfo.messageIds);
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
        };
    
        ws.onmessage = (e) => {
          console.log("📩 서버 메시지:",e.data);
        }
        ws.onerror = (e) => console.error("❌ WebSocket 에러", e);
        ws.onclose = () => {
          console.log("🔌 WebSocket 종료");
        }
      

    }
    

    const WebSocket_Ingo ={
      socketRef:socketRef,
      isError,
      isSuccess,
      ReadChat:readChat,
      receivemsg:receivemsg,
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
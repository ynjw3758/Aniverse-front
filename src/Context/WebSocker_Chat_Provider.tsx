import { useContext, useEffect, useRef, useState } from "react";
import WebSocketChatContext from "./WebSocketChatContext";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import WebSocketAlarmContext from "./WebSocketAlarmContext";

//                            +------------------
//----------------------------+ 타입입
//                            +------------------
//#region
type Props = {
    children?: React.ReactNode
  };
type readchatinfo={
  chatId:string;
  msg:string;
  messageIds:string[];
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

  type lasgmsg={
  ChatId:string;
  Message:string;
 }
const WebSocket_Chat_Provider =({children}:Props) =>{
  const[isError, setIsError]=useState<boolean>(false);
  const[isSuccess, setIsSuccess]=useState<boolean>(false);
  //const[isOneRead, setIsOneRead]=useState<boolean>(false);
  
  const stompClientRef = useRef<Client | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const isOneRead = useRef<boolean>(false);
  const ChatId = useRef<string>("");
  const UserIds = useRef<string[]>([]);
  const[readChat, setReadChat]=useState<readchatinfo>({
       chatId:"",
       msg:"",
       messageIds:[]
   });
  const[receivemsg, setReceivemsg]=useState<MessageInfo>()
  
  const lasgmsgAlarm=useContext(WebSocketAlarmContext);

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
      Profile:string, isFirst:boolean ,UserId:string[], ReCount:number ,messageId:string , roomName:string) => {
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
        roomName,
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
        const ws = new WebSocket(`ws://127.0.0.1:8085/chat?userId=${userid}&chatId=${ChatId.current}`);
        const socket = new SockJS(`http://127.0.0.1:8085/ws?userid=${userid}&chatId=${ChatId.current}`);
        ws.onopen = () => {

          //setWeb(ws);
          socketRef.current = ws;
          console.log("✅ WebSocket Chat연결됨 : ", userid);
          const MyId:string = localStorage.getItem("id")!;
          const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            
            onConnect: () => {
              
              stompClientRef.current = client;
              client.subscribe(`/topic/chat/${ChatId.current}`, (message) => {
                console.log("📩 채팅 아이디로 수신 메시지:", message.body);
                const msg:MessageInfo = JSON.parse(message.body);
                setReceivemsg(msg);
                const lastmsg:lasgmsg ={ChatId:msg.chatId , Message:msg.message} 
                lasgmsgAlarm.realTimeLastChat(lastmsg);
              },  {
                userId:JSON.stringify(UserIds.current), 
                type:"Chat"// ✅ 헤더로 userId 넘김
              });
              client.subscribe(`/topic/read/${ChatId.current}`, (message) => {
                const readInfo:readchatinfo = JSON.parse(message.body);
                console.log("👁️ 읽음 정보 수신:", readInfo);
                setReadChat(readInfo);
              });
               console.log("일로 오냐");
              client.subscribe(`/user/queue/read`, (message) => {
                const readInfo: readchatinfo = JSON.parse(message.body);
                console.log("👁️ 개인 읽음 정보 수신 (ToUser):", readInfo);
                isOneRead.current =true;
                setReadChat(readInfo);
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

              ws.send(JSON.stringify({ UserId:MyId ,ChatId:ChatId.current, type: "ChatJoin" }));
              
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
      isOneRead:isOneRead.current,
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
import { useEffect, useRef, useState } from "react";
import WebSocketContext from "./WebSocketContext";
import { WEBSOCKET_BASE } from "../API/Api";

type Props = {
    children?: React.ReactNode
  };

const WebSocker_Provider:React.FC<Props> =({children}) =>{
    
    const socketRef = useRef<WebSocket | null>(null);
    const [isDisconnected, setIsDisconnected] = useState(false);
    
    useEffect(() => {
        const id = localStorage.getItem("id");
        const wsProtocol = WEBSOCKET_BASE?.startsWith("https") ? "wss" : "ws";
        const wsHost = WEBSOCKET_BASE?.replace(/^https?:\/\//, "");
        const ws = new WebSocket(`${wsProtocol}://${wsHost}/login`);
    
        ws.onopen = () => {
          ws.send(JSON.stringify({ Id: id, type: "login" }));
        };
    
        ws.onmessage = (e) => {
          console.log("📩 서버 메시지:",e.data);
        }
        ws.onerror = (e) => console.error("❌ WebSocket 에러", e);
        ws.onclose = (event) => {
          if (!event.wasClean) {
            console.warn("❗비정상 종료 (서버 문제일 수 있음)", event);
            setIsDisconnected(true);
          } else {
            console.log("🔌 WebSocket 정상 종료됨");
          }
        }
    
        socketRef.current = ws;

          // ✅ 브라우저 종료/새로고침 직전에 종료 알림 보내기
          const handleBeforeUnload = () => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ Id: id, type: "session_close" }));
            }
          };

          window.addEventListener("beforeunload", handleBeforeUnload);
    
        return () => {
          window.removeEventListener("beforeunload", handleBeforeUnload);
          ws.close();
        };
      }, []);
      
    const WebSocketInfo={
      socket:socketRef.current,
      isDisconnected:isDisconnected
    }




    return (
        <WebSocketContext.Provider value={WebSocketInfo} >
        {children}
        </WebSocketContext.Provider>
    );
}

export default WebSocker_Provider;

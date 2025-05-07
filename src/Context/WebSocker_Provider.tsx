import { useEffect, useRef } from "react";
import WebSocketContext from "./WebSocketContext";

type Props = {
    children?: React.ReactNode
  };

const WebSocker_Provider:React.FC<Props> =({children}) =>{
    
    const socketRef = useRef<WebSocket | null>(null);
    
    useEffect(() => {
        const id = localStorage.getItem("id");
        const ws = new WebSocket("ws://127.0.0.1:8083/login");
    
        ws.onopen = () => {
          console.log("✅ WebSocket 연결됨");
          ws.send(JSON.stringify({ Id: id, type: "login" }));
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
      }, []);




    return (
        <WebSocketContext.Provider value={socketRef.current} >
        {children}
        </WebSocketContext.Provider>
    );
}

export default WebSocker_Provider;
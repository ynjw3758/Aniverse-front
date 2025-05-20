
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatNotificationMain.scss";


interface Props{
    ChatReceive:Receive_chat
}

type Receive_chat={
    SendId:string,
    SendProfile:string,
    SendNickname:string,
    SendMsg:string,
    SendTime:string,
    ChatId:string,
}

const ChatNotificationMain =({ChatReceive}:Props) =>{
   
    const[time, setTime]=useState<string>("");
    const navigate = useNavigate();
    useEffect(() =>{
     console.log("알람 ui 활성화");

     const date = new Date(ChatReceive.SendTime);

        const formatter = new Intl.DateTimeFormat("ko-KR", {
        timeZone: "Asia/Seoul",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
        });
        const result = formatter.format(date);
        console.log("날 :" , result)
        setTime(result)
    },[])

    const moveChat =() =>{
      console.log("채팅 아이디 :" ,ChatReceive.ChatId )
        navigate(`/main/Chat/${ChatReceive.ChatId}`, {
            state: { focusId: ChatReceive.ChatId,
                isFromAlarm: true,
             },
          });
    }

    return(<div className="Notification_Stand" onClick={moveChat}>
            <img src={ChatReceive.SendProfile}/>
          <div className="Notification_Userinfo">
            <h4>{ChatReceive.SendNickname}</h4>
            <p>{ChatReceive.SendMsg}</p>
          </div>
          <div className="Notification_Time">
            <p>{time}</p>
          </div>
    </div>)
}

export default ChatNotificationMain;
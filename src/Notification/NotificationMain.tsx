
import { useEffect, useRef, useState } from "react";
import "./NotificationMain.scss";


interface Props{
    ChatReceive:Receive_chat
}

type Receive_chat={
    SendId:string,
    SendProfile:string,
    SendNickname:string,
    SendMsg:string,
    SendTime:string
}

const NotificationMain =({ChatReceive}:Props) =>{
   
    const[time, setTime]=useState<string>("");
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

    return(<div className="Notification_Stand">
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

export default NotificationMain;
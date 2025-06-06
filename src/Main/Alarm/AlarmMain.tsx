import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AlarmMain.scss";

interface props{
 AlarmData:Noti_info | undefined;
}

type Noti_info={
  Chat:ChatInfo[];
}


type ChatInfo={
ChatId:string;
IsRead:boolean;
MessageId:string;
RoomName:string;
UserId:string;
message:string;
nickname:string;
profile:string;
sendId:string;
timestamp:string;
type:string;
Count:number;
}




const AlarmMain =({AlarmData}:props) =>{
    const[chat, setChat]=useState<ChatInfo[]>([]);
    const[isShow, setIsShow] = useState<boolean>(false);
    const navigate = useNavigate();

useEffect(() =>{
    if(AlarmData !== undefined){
         const ChatData:ChatInfo[] = AlarmData.Chat; 
        setChat(ChatData);
    }

},[AlarmData]);

useEffect(() =>{
 if(chat !== null) setIsShow(true);
},[chat])

const moveChat=(ChatId:string) =>{
   navigate(`/main/chat/${ChatId}`);
}


    return (<div className="AlarmList_Miain">
        {isShow && (<>
       {chat.map(({ ChatId, RoomName, Count }) => {
        const displayName = RoomName.length > 7
            ? RoomName.slice(0, 7) + '...'
            : RoomName;

        return (
            <div key={ChatId} className="AlarmList_Chat" onClick={() =>moveChat(ChatId)}>
            [{displayName}] 새 메시지 {Count}개 도착했습니다.
            </div>
        );
        })}

        </>)}
    </div>)

}
export default AlarmMain;
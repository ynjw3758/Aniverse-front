import { useEffect, useState } from "react";
import "./AllChatItems.scss";
import DividChatinfo from "./MyChatinfo";

interface props{
    ChatInfoList : MessageInfo[],
    StandDate:string,
    CreateDate:string,
    newDate:string
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
    isSend:boolean;
   }

const AllChatItems =({ChatInfoList ,StandDate ,newDate}:props) =>{
    const[isSameTime, setIsSameTime]=useState<boolean>(true);
    useEffect(() =>{
        if(newDate !==StandDate && StandDate !== undefined) setIsSameTime(false);
        else if(newDate !==StandDate && StandDate === undefined) setIsSameTime(true);
    },[ChatInfoList])
   

    return(<div className="StandDate_AllChat">
        {!isSameTime && (<>
            <button>{StandDate}</button>
        </>)}
        {ChatInfoList.map((data, index) => {
         const className = data.type === "mine" ? "AllChatDiv_MyStand" : "AllChatDiv_OtherStand";
            return (
            <div key={index} className={className}>
                <DividChatinfo Chatinfo={data} />
            </div>
            );
       })}
    </div>)
}

export default AllChatItems
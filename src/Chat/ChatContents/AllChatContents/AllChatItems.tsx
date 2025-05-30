import { useEffect, useRef, useState } from "react";
import "./AllChatItems.scss";
import DividChatinfo from "./MyChatinfo";

interface props{
    ChatInfoList : MessageInfo[],
    StandDate:string,
    CreateDate:string,
    newDate:string,
    ReadChatcnt:string[],
    DeleteChat :(data:string) => void
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

const AllChatItems =({ChatInfoList ,StandDate ,newDate,ReadChatcnt ,DeleteChat}:props) =>{
    const[isSameTime, setIsSameTime]=useState<boolean>(true);
    const [ChatInfoLists, setChatInfoLists] = useState<MessageInfo[]>([]);
    const bottomRef = useRef<HTMLDivElement | null>(null);
    useEffect(() =>{
        console.log("newdate :" , newDate);
        console.log("StandDate :" , StandDate);
        setChatInfoLists(ChatInfoList);
        if(newDate !==StandDate && StandDate !== undefined) setIsSameTime(false); //날짜가 갱신된 경우 표시 o
        else if(newDate !==StandDate && StandDate === undefined) setIsSameTime(true); //같은 날짜인 경우 표시 x
        else if(newDate ===StandDate && ChatInfoList.length ===1) setIsSameTime(false); //최초 채팅 등록 시 날짜 표시 o
    },[ChatInfoList])

    useEffect(() => {
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
          }, 0);
      }, [ChatInfoLists]);

    const deletechat =(data:string) =>{
        setChatInfoLists(prev => prev.filter(chat => chat.messageId !== data));
        DeleteChat(data);

    }

    useEffect(() =>{

        setChatInfoLists(prev =>
            prev.map(chat => {
              if (ReadChatcnt.includes(chat.messageId)) {
                console.log("카운트 낮추자", chat.messageId);
                return {
                  ...chat,
                  recount: Math.max(chat.recount - 1, 0), // 음수 방지
                };
              }
              return chat;
            })
          );
    },[ReadChatcnt])
    

        return(<div className="StandDate_AllChat">
            {!isSameTime && (<>
                <button>{StandDate}</button>
            </>)}
            {ChatInfoLists.map((data, index) => {
            const className = data.type === "mine" ? "AllChatDiv_MyStand" : "AllChatDiv_OtherStand";
                return (
                <div key={index} className={className}>
                    <DividChatinfo Chatinfo={data} DeleteChat={deletechat} ReadChatcnt={ReadChatcnt}/>
                </div>
                );
        })}
        <div ref={bottomRef}/>
        </div>)
    }

export default AllChatItems


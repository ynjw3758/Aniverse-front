import { useEffect, useRef, useState } from "react";
import "./AllChatItems.scss";
import DividChatinfo from "./MyChatinfo";

interface props{
    ChatInfoList : MessageInfo[],
    StandDate:string,
    CreateDate:string,
    newDate:string,
    ReadChatcnt:string[],
    NewDate_receive:string,
    StandDate_receive:string,
    IsMine:boolean,
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

const AllChatItems =({ChatInfoList ,StandDate ,newDate,ReadChatcnt ,DeleteChat ,
    NewDate_receive ,StandDate_receive ,IsMine}:props) =>{
    const[isSameTime, setIsSameTime]=useState<boolean>(true);
    const [ChatInfoLists, setChatInfoLists] = useState<MessageInfo[]>([]);
    const[standdate, setStandatwe]=useState<string>("");
    const[groupdata ,setGroupdata]= useState<Record<string, MessageInfo[]>>({});

    const bottomRef = useRef<HTMLDivElement | null>(null);
    useEffect(() =>{
        setChatInfoLists(ChatInfoList);
        if(IsMine ===true){
            if(newDate !==StandDate && StandDate !== undefined) setIsSameTime(false); //날짜가 갱신된 경우 표시 o
            else if(newDate !==StandDate && StandDate === undefined) setIsSameTime(true); //같은 날짜인 경우 표시 x
            else if(newDate ===StandDate && ChatInfoList.length ===1) setIsSameTime(false); //최초 채팅 등록 시 날짜 표시 o
            setStandatwe(StandDate);
        }else{
            if(NewDate_receive !==StandDate_receive && StandDate_receive !== undefined) setIsSameTime(false); //날짜가 갱신된 경우 표시 o
            else if(NewDate_receive !==StandDate_receive && StandDate_receive === undefined) setIsSameTime(true); //같은 날짜인 경우 표시 x
            else if(NewDate_receive ===StandDate_receive && ChatInfoList.length ===1) setIsSameTime(false); //최초 채팅 등록 시 날짜 표시 o
            setStandatwe(StandDate_receive);
        }
        console.log("ChatInfoList :" ,ChatInfoList);
        const Group =groupChat(ChatInfoList)
        setGroupdata(Group);
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

    function groupChat (data:MessageInfo[]){
        const grouped: Record<string, MessageInfo[]> = {};
        data.forEach((chat) =>{
            const date = chat.timestamp.slice(0, 10);
                if (!grouped[date]) {
                    grouped[date] = [];
                    }
                    grouped[date].push(chat);
                        });
                          // 각 그룹을 시간순으로 정렬 (오름차순: 오래된 → 최신)
                Object.keys(grouped).forEach((date) => {
                    grouped[date].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
                });

        return grouped;

    }

    useEffect(() =>{
      console.log("groupdata :" ,groupdata);
    },[groupdata])
/*
    useEffect(() =>{
        console.log("ReadChatcnt :" ,ReadChatcnt);
        if(IsMine === true){
            setChatInfoLists(prev =>
                prev.map(chat => {
                if (ReadChatcnt.includes(chat.messageId)) {
                    return {
                    ...chat,
                    recount: Math.max(chat.recount - 1, 0), // 음수 방지
                    };
                }
                return chat;
                })
            );
        }

          
    },[ReadChatcnt])
    */
   /*
               {!isSameTime && (<>
                <button>{standdate}</button>
            </>)}
            {ChatInfoLists.map((data, index) => {
            const className = data.type === "mine" ? "AllChatDiv_MyStand" : "AllChatDiv_OtherStand";
                return (
                <div key={index} className={className}>
                    <DividChatinfo Chatinfo={data} DeleteChat={deletechat} ReadChatcnt={ReadChatcnt}/>
                </div>
                );
        })}
                */

        return(<div className="StandDate_AllChat">
            {Object.entries(groupdata).map(([date, chats]) => (
               <div key={date}>
                <button>{date}</button>
                {chats.map((data) => {
                const test = IsMine ? "" :"" 
                const className = data.type === "mine" ? "AllChatDiv_MyStand" : "AllChatDiv_OtherStand";
                return (
                    <div key={data.messageId} className={className}>
                    <DividChatinfo Chatinfo={data} DeleteChat={deletechat} ReadChatcnt={ReadChatcnt} />
                    </div>
                );
                })}
            </div>
            ))}
        </div>)
    }

export default AllChatItems


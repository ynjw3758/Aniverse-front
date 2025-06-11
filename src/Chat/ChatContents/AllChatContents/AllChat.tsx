import { useEffect, useState } from "react";
import "./AllChat.scss";
import AllChatItems from "./AllChatItems";

interface props{
    allChat : MessageInfo[][],
    Otherchat:MessageInfo[][],
    SaveChat:MessageInfo[][],
    StandDate:string[],
    CreateDate:string,
    newDate:string,
    ReadChatcnt:readchatinfo,
    RealTimeMsg:MessageInfo,
    Receive_NewDate:string,
    Receive_standDate:string[],
    IsMine:boolean,
    IsSaveChatCnt:boolean;
    IsOneRead:boolean;
    DeleteChat:(data:string) => void
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
type readchatinfo={
  chatId:string;
  msg:string;
  messageIds:string[];
}


const AllChat =({allChat ,StandDate ,CreateDate ,newDate, ReadChatcnt  ,DeleteChat ,
    Receive_standDate ,IsMine ,Otherchat,SaveChat ,IsSaveChatCnt ,IsOneRead}:props) =>{

    const [localChat, setLocalChat] = useState<MessageInfo[][]>(allChat);
    const [localDate, setLocalDate] = useState<string[]>(StandDate);
    const [newDateState, setNewDateState] = useState<string>(newDate);
    const[totalRead, setTotalRead]=useState<readchatinfo>();

    const formatdate =(date:Date) =>{
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 0~11이므로 +1
        const day = String(date.getDate()).padStart(2, '0');  
        return `${year}-${month}-${day}`;
    }
            const isValidChat = (chat: any[]) => {
            return Array.isArray(chat) && chat.length > 0 && Array.isArray(chat[0]);
            };

        useEffect(() =>{
         console.log("저장된 채팅 데이터 온다");
          console.log("저장된 채팅  :" ,SaveChat );
           console.log("standDate :" ,StandDate );
           if (!isValidChat(SaveChat)) return;
             if(IsSaveChatCnt === true){


             }else{
                setLocalChat([...SaveChat]);
                setLocalDate([...StandDate]);
             }

                
        },[SaveChat])

        useEffect(() =>{
            console.log("allchat :" , allChat);

             if (!isValidChat(allChat)) return;

            if(Otherchat.length ===0){
                console.log("다른 댓글이 없다")
                setLocalChat([...allChat]);
                setLocalDate([...StandDate]);
                setNewDateState(newDate);
            }else{
                 console.log("다른 댓글이 있다 :" , Otherchat);
                 console.log("allChat :" , allChat);
                 const mergedChat = [...Otherchat];
                 const latestIndex = mergedChat.length - 1;
                       mergedChat[latestIndex] = [
                    ...mergedChat[latestIndex],
                    ...allChat[allChat.length - 1],
                ];
                setLocalChat(mergedChat);
            }

        },[allChat])

        useEffect(() =>{
           console.log("다른 사람 채팅이 왔다 받아라:" ,Otherchat);

            if (!isValidChat(Otherchat)) return;

           if(allChat.length ===0){
              setLocalChat([...Otherchat]);
           }else{
                 const mergedChat = [...allChat];
                 const latestIndex = mergedChat.length - 1;
                       mergedChat[latestIndex] = [
                    ...mergedChat[latestIndex],
                    ...Otherchat[Otherchat.length - 1],
                ];
                setLocalChat(mergedChat);
           }
           
        },[Otherchat])


        useEffect(() =>{
          console.log("ReadChatcnt :" , ReadChatcnt)
          if(ReadChatcnt.chatId !== null && ReadChatcnt.chatId !== undefined)  setTotalRead(ReadChatcnt)
        },[ReadChatcnt])

    const deletechat =(data:string) =>{
        DeleteChat(data);
    }
    return(<>
    <p id="AllCaht_Stand_date">{CreateDate}</p>
    <p id="CreateChat_Message">채팅방이 생성 되었습니다.</p>
    {localChat.map((values, idx) =>(<>
    <AllChatItems ChatInfoList={values} StandDate={StandDate[idx]} CreateDate={CreateDate} 
    newDate={newDate} DeleteChat={deletechat} ReadChatcnt={ReadChatcnt} 
    NewDate_receive={newDateState} StandDate_receive={Receive_standDate[idx]} IsMine={IsMine} IsOneRead={IsOneRead}/>
    </>))}
    </>)

}

export default AllChat;
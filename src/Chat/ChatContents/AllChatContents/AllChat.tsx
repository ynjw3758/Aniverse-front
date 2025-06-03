import { useEffect, useState } from "react";
import "./AllChat.scss";
import AllChatItems from "./AllChatItems";

interface props{
    allChat : MessageInfo[][],
    Otherchat:MessageInfo[][],
    StandDate:string[],
    CreateDate:string,
    newDate:string,
    ReadChatcnt:string[],
    RealTimeMsg:MessageInfo,
    Receive_NewDate:string,
    Receive_standDate:string[],
    IsMine:boolean,
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


const AllChat =({allChat ,StandDate ,CreateDate ,newDate, ReadChatcnt  ,DeleteChat ,
    RealTimeMsg ,Receive_NewDate ,Receive_standDate ,IsMine ,Otherchat}:props) =>{

    const [localChat, setLocalChat] = useState<MessageInfo[][]>(allChat);
    const [localDate, setLocalDate] = useState<string[]>(StandDate);
    const [newDateState, setNewDateState] = useState<string>(newDate);

    const formatdate =(date:Date) =>{
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 0~11이므로 +1
        const day = String(date.getDate()).padStart(2, '0');  
        return `${year}-${month}-${day}`;
    }
   
/*
     useEffect(() =>{
        console.log("RealTimeMsg :" ,RealTimeMsg);
        if(RealTimeMsg !==null){
        if (allChat.length === 0) {
            console.log("최초의 데이터 넣기");
           const now  =new Date();
           const FormatDate = formatdate(now);
             StandDate[0] = FormatDate;
             newDate =FormatDate; 
            allChat.push([RealTimeMsg]); // 최초 메시지 2중 배열로 추가
        } else {
            console.log("날짜 단위로 데이터 넣기");
           const now  =new Date();
           const FormatDate = formatdate(now);
             if(StandDate[StandDate.length-1] !== FormatDate) {
                StandDate[StandDate.length-1] =FormatDate;
            }
            // 마지막 날짜 그룹에 실시간 메시지를 병합
            allChat[allChat.length - 1].push(RealTimeMsg);
        }
    }
    else return;
     },[RealTimeMsg])
*/

        useEffect(() =>{
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
/*
  useEffect(() => {
    if (!RealTimeMsg) return;

    const now = new Date();
    const FormatDate = formatdate(now);

    setLocalChat((prev) => {
      let updatedChat = [...prev];

      if (updatedChat.length === 0) {
        setLocalDate([FormatDate]);
        setNewDateState(FormatDate);
        return [[RealTimeMsg]];
      } else {
        if (localDate[localDate.length - 1] !== FormatDate) {
          setLocalDate((prevDate) => [...prevDate, FormatDate]);
          setNewDateState(FormatDate);
          return [...updatedChat, [RealTimeMsg]];
        } else {
          // 마지막 그룹에 메시지 추가
          updatedChat[updatedChat.length - 1] = [
            ...updatedChat[updatedChat.length - 1],
            RealTimeMsg,
          ];
          return updatedChat;
        }
      }
    });
    console.log("newdate :" , Receive_NewDate)
    console.log("stand :" , Receive_standDate)
  }, [RealTimeMsg]);
  */
    const deletechat =(data:string) =>{
        DeleteChat(data);
    }
    return(<>
    <p id="AllCaht_Stand_date">{CreateDate}</p>
    <p id="CreateChat_Message">채팅방이 생성 되었습니다.</p>
    {localChat.map((values, idx) =>(<>
    <AllChatItems ChatInfoList={values} StandDate={StandDate[idx]} CreateDate={CreateDate} 
    newDate={newDate} DeleteChat={deletechat} ReadChatcnt={ReadChatcnt} 
    NewDate_receive={newDateState} StandDate_receive={Receive_standDate[idx]} IsMine={IsMine}/>
    </>))}
    </>)

}

export default AllChat;
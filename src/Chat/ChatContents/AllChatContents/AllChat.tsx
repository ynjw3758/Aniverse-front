import { useEffect } from "react";
import "./AllChat.scss";
import AllChatItems from "./AllChatItems";

interface props{
    allChat : MessageInfo[][],
    StandDate:string[],
    CreateDate:string,
    newDate:string,
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


const AllChat =({allChat ,StandDate ,CreateDate ,newDate}:props) =>{


    useEffect(() =>{
      console.log("2중배열의 채팅 정보 : " , newDate);
    },[allChat])    

    return(<>
    <p id="AllCaht_Stand_date">{CreateDate}</p>
    <p id="CreateChat_Message">채팅방이 생성 되었습니다.</p>
    {allChat.map((values, idx) =>(<>
    <AllChatItems ChatInfoList={values} StandDate={StandDate[idx]} CreateDate={CreateDate} newDate={newDate}/>
    </>))}
    </>)

}

export default AllChat;
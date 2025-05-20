import { useEffect } from "react";
import "./AllChatItems.scss";
import MyChatinfo from "./MyChatinfo";

interface props{
    mychat : MyChat[],
    //otherchat:OtherChat
}

type MyChat ={
  Mchat:string,
  ReCount:number,
  Time:string
}
type OtherChat={
    Profile:string,
    UserId:string,
    Nickname:string,
    ReCount:number,
    Chat:string
}

const AllChatItems =({mychat}:props) =>{

    useEffect(() =>{
     console.log("채팅 리스트 :" , mychat);
    },[mychat])

    return(<>
     {mychat.map((data, i) =>(<div className="AllChatDiv_MyStand">
      <MyChatinfo Chatinfo={data}/>
     </div>))}
    </>)
}

export default AllChatItems
import { useEffect } from "react";
import "./AllChat.scss";
import AllChatItems from "./AllChatItems";

interface props{
    mychat : MyChat[][],
    otherchat:OtherChat[][]
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

const AllChat =({mychat}:props) =>{

    useEffect(() =>{
      console.log("2중배열의 채팅 정보 : " , mychat);
    },[mychat])

    return(<>
    {mychat.map((values, idx) =>(<>
    <AllChatItems mychat={values}/>
    </>))}
    </>)

}

export default AllChat;
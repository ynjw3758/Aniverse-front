
import "./ShowChatWrapper.scss";
import ShowChat from "./ShowChat";
import ShowChatContext from "../../Context/ShowChatContext";
import { useContext } from "react";

const ShowChatWrapper =() =>{

    const Chatinfo =useContext(ShowChatContext);
    console.log("chatId :" , Chatinfo.chatId);
    console.log("chatTitle:" , Chatinfo.chatTitle);
    console.log("chatData :" , Chatinfo.chatData);
    console.log("chatCtDate :" , Chatinfo.chatCtDate);
    console.log("chatProfiles :" , Chatinfo.chatProfiles);
    console.log("isfirst:" , Chatinfo.isfirst);


    return(<>
      <ShowChat Userinfo={Chatinfo.chatData} RoomName={Chatinfo.chatTitle} CreateDate={Chatinfo.chatCtDate}
      Chat_id={Chatinfo.chatId} onConnect={true} MyProfile={Chatinfo.MyProfile} isFirst={Chatinfo.isfirst}
      MyNickname={Chatinfo.MyNickname} isClick={Chatinfo.isClick}/>
    </>)

}
export default ShowChatWrapper;

import "./ShowChatWrapper.scss";
import ShowChat from "./ShowChat";
import ShowChatContext from "../../Context/ShowChatContext";
import { useContext } from "react";

const ShowChatWrapper =() =>{

    const Chatinfo =useContext(ShowChatContext);
    return(<>
      <ShowChat Userinfo={Chatinfo.chatData} RoomName={Chatinfo.chatTitle} CreateDate={Chatinfo.chatCtDate}
      Chat_id={Chatinfo.chatId} onConnect={true} MyProfile={Chatinfo.MyProfile} isFirst={Chatinfo.isfirst}
      MyNickname={Chatinfo.MyNickname} isClick={Chatinfo.isClick} StandDate={Chatinfo.standDate} MessageInfo={Chatinfo.messageinfo}/>
    </>)

}
export default ShowChatWrapper;
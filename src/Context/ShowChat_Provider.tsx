import { useState } from "react";
import ShowChatContext from "./ShowChatContext";

type Props = {
    children?: React.ReactNode
  };

type infos={
    chatId:string;
    chatTitle:string;
    chatData:object[];
    chatProfiles:string[];
    chatCtDate:string;
    isfirst:boolean;
    MyNickname:string;
    MyProfile:string;
    FocuseId:string;
    isClick:boolean
}

const ShowChat_Provider =({children} : Props) =>{

const[chatinfo, setChatinfo]=useState<infos>({
    chatId:"",
    chatTitle:"",
    chatData:[{}],
    chatProfiles:[],
    chatCtDate:"",
    isfirst:false,
    MyNickname:"",
    MyProfile:"",
    FocuseId:"",
    isClick:false
})

const insert_data =(chatId:string,chatTitle:string, chatData:object[], chatProfiles:string[], chatCtDate:string, isfirst:boolean, 
                    MyNickname:string, MyProfile:string,FocuseId:string, isClick:boolean
) =>{

    setChatinfo({chatId:chatId, chatTitle:chatTitle, chatData:chatData, 
        chatProfiles :chatProfiles, chatCtDate:chatCtDate ,isfirst:isfirst, 
        MyNickname:MyNickname ,MyProfile:MyProfile, FocuseId:FocuseId , isClick:isClick})
}
const Chat_infos ={
    chatId:chatinfo.chatId,
    chatTitle:chatinfo.chatTitle,
    chatData:chatinfo.chatData,
    chatProfiles:chatinfo.chatProfiles,
    chatCtDate:chatinfo.chatCtDate,
    isfirst:chatinfo.isfirst,
    MyNickname:chatinfo.MyNickname,
    MyProfile:chatinfo.MyProfile,
    isClick:chatinfo.isClick,
    insert_values:insert_data
}
    return(<ShowChatContext.Provider value={Chat_infos}>
          {children}
    </ShowChatContext.Provider>

    )

}
export default ShowChat_Provider;
import { useState } from "react";
import ShowChatContext from "./ShowChatContext";

type Props = {
    children?: React.ReactNode
  };

type infos={
    chatId:string;
    chatTitle:string;
    chatData:Userfos[];
    chatProfiles:string[];
    chatCtDate:string;
    isfirst:boolean;
    MyNickname:string;
    MyProfile:string;
    FocuseId:string;
    isClick:boolean;
    StandDate:string[];
    Messageinfo:messageInfo[][]
}
type messageInfo={
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
type Userfos={
Img:string,
Nickname:string,
UserId:string
}

const ShowChat_Provider =({children} : Props) =>{

const[chatinfo, setChatinfo]=useState<infos>({
    chatId:"",
    chatTitle:"",
    chatData:[],
    chatProfiles:[],
    chatCtDate:"",
    isfirst:false,
    MyNickname:"",
    MyProfile:"",
    FocuseId:"",
    isClick:false,
    StandDate:[],
    Messageinfo:[]
})

const insert_data =(chatId:string,chatTitle:string, chatData:Userfos[], chatProfiles:string[], chatCtDate:string, isfirst:boolean, 
                    MyNickname:string, MyProfile:string,FocuseId:string, isClick:boolean ,
                    StandDate:string[],Messageinfo:messageInfo[][]
) =>{

    setChatinfo({chatId:chatId, chatTitle:chatTitle, chatData:chatData, 
        chatProfiles :chatProfiles, chatCtDate:chatCtDate ,isfirst:isfirst, 
        MyNickname:MyNickname ,MyProfile:MyProfile, FocuseId:FocuseId , isClick:isClick,
        StandDate:StandDate ,Messageinfo:Messageinfo })
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
    standDate:chatinfo.StandDate,
    messageinfo:chatinfo.Messageinfo,
    insert_values:insert_data
}
    return(<ShowChatContext.Provider value={Chat_infos}>
          {children}
    </ShowChatContext.Provider>

    )

}
export default ShowChat_Provider;
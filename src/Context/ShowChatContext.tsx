import React from "react";

export interface ShoChat_infos{
    chatId:string;
    chatTitle:string;
    chatData:object[];
    chatProfiles:string[];
    chatCtDate:string;
    isfirst:boolean;
    MyNickname:string;
    MyProfile:string;
    isClick:boolean,
    standDate:string[],
    messageinfo:MessageInfo[][]
    insert_values:(chatId:string,chatTitle:string, chatData:Userfos[],chatProfiles:string[], 
        chatCtDate:string, isfirst:boolean, MyNickname:string, MyProfile:string, FocuseId:string, 
        isClick:boolean ,standDate:string[], messageinfo:MessageInfo[][])=> void 
}

const Initial : ShoChat_infos={
    chatId:"",
    chatTitle:"",
    chatData:[{}],
    chatProfiles:[],
    chatCtDate:"",
    isfirst:false,
    MyNickname:"",
    MyProfile:"",
    isClick:false,
    standDate:[],
    messageinfo:[],
    insert_values:() => {}
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
    isSend:boolean
   }
   type Userfos={
    Img:string,
    Nickname:string,
    UserId:string
   }


const ShowChatContext = React.createContext<ShoChat_infos>(Initial);
export default ShowChatContext;
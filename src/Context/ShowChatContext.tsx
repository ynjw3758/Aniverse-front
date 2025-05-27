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
    insert_values:(chatId:string,chatTitle:string, chatData:object[],chatProfiles:string[], 
        chatCtDate:string, isfirst:boolean, MyNickname:string, MyProfile:string, FocuseId:string, isClick:boolean)=> void
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
    insert_values:() => {}
}


const ShowChatContext = React.createContext<ShoChat_infos>(Initial);
export default ShowChatContext;
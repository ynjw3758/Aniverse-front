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
    insert_values:(chatId:string,chatTitle:string, chatData:object[], chatProfiles:string[], 
        chatCtDate:string, isfirst:boolean, MyNickname:string, MyProfile:string)=> void
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
    insert_values:() => {}
}


const ShowChatContext = React.createContext<ShoChat_infos>(Initial);
export default ShowChatContext;
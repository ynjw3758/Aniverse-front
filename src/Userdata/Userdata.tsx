import React from "react";
export interface UserStateInterface {
    UserId: string;
    UserNickName :string;
    Profile:string;
    Thumbnail:string;
    email:string;
    date:string;
    kakao_info:any;
    check:boolean;
    count:number;
    addkakaoinfo:(kakao_info:any) => void;
    adddate:(date:string) => void;
    addemail:(email:string) => void;
    addid: (text: string) => void;
    addcheck :(text:boolean) => void;
    addeNickName :(text:string) => void;
    addprofile:(Profile:string) => void;
    addthumbnail :(text:string) => void;
    addcount:(Count:number) => void;
  }
  
  const initialState: UserStateInterface = {
    UserId: '',
    UserNickName:'',
    Profile:'',
    Thumbnail:'',
    email:'',
    check:false,
    date:'',
    count:0,
    kakao_info:{},
    addkakaoinfo :() =>{},
    adddate: () => {},
    addemail : () =>{},
    addid: () => {},
    addcheck:()=>{},
    addeNickName:() =>{},
    addprofile:() =>{},
    addthumbnail:() =>{},
    addcount:() => {}
  };
const Id = React.createContext<UserStateInterface>(initialState);
export default Id;
import React from "react";
export interface UserStateInterface {
    UserId: string;
    UserNickName :string;
    Profile:string;
    Thumbnail:string;
    email:string;
    date:string;
    kakao_info:Kakao_infos;
    naver_info:naver_infos;
    check:boolean;
    count:number;
    addkakaoinfo:(kakao_info:Kakao_infos) => void;
    addnaverinfo:(naver_infos:naver_infos) => void
    adddate:(date:string) => void;
    addemail:(email:string) => void;
    addid: (text: string) => void;
    addcheck :(text:boolean) => void;
    addeNickName :(text:string) => void;
    addprofile:(Profile:string) => void;
    addthumbnail :(text:string) => void;
    addcount:(Count:number) => void;
  }

type Kakao_infos={
  id:string,
  email:string,
  profile:string,
  thumbnail:string,
  nickname:string,
  gender:string,
} 

type naver_infos={
  id:string,
  username:string,
  email:string,
  profile:string,
  nickname:string,
  gender:string,
  birthday:string,
  phone:string,
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
    kakao_info:{
        id:"",
        email:"",
        profile:"",
        thumbnail:"",
        nickname:"",
        gender:""
    },
    naver_info:{
        id:"",
        username:"",
        email:"",
        profile:"",
        nickname:"",
        gender:"",
        birthday:"",
        phone:"",

    },
    addkakaoinfo :() =>{},
    addnaverinfo : () =>{},
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
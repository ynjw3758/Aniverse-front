
import { useState } from "react";
import Id from "./Userdata";

type Props = {
    children?: React.ReactNode
  };

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
const IdProvider:React.FC<Props> = (props) =>{

  const[userid , setUserid] = useState<string>("");
  const[usernickname , setUserNickname] = useState<string>("");
  const[prpfile , setProfile] = useState<string>("");
  const[thumbnail , setThumbnail] = useState<string>("");
  const[email , setEmail] = useState<string>("");
  const[date , setDate] = useState<string>("");
  const[kakaoinfo , setKakaoinfo] = useState<Kakao_infos>({
      id:"",
      email:"",
      profile:"",
      thumbnail:"",
      nickname:"",
      gender:"",
  });
    const[naverinfo , setNaverinfo] = useState<naver_infos>({
      id:"",
      username:"",
      email:"",
      profile:"",
      nickname:"",
      gender:"",
      birthday:"",
      phone:"",
  });
  const[check , setCheck] = useState<boolean>(false);
  const[count , setCount] = useState<number>(0);

  const addidhandler =(id:string) =>{
       setUserid(id);
  }
  const addnamehandler =(Nickname:string) =>{
    setUserNickname(Nickname);
  }

  const addprofileHandler =(profile:string) =>{
    setProfile(profile);
  }

  const addthumbnailHandler =(thumbnail:string) =>{
    setThumbnail(thumbnail)
  }
  const addemailHandler =(email:string) =>{
    setEmail(email);
  }
  const adddateHandler =(date:string) =>{
    setDate(date);
  }
  const addkakaoHandler =(info:Kakao_infos) =>{
    setKakaoinfo(info);
  }
  const addNaverHandler =(info:naver_infos) =>{
    setNaverinfo(info);
  }
  const addcheckHandler =(check:boolean) =>{
    setCheck(check);
  }
  const addCountHandler =(count:number) =>{
    setCount(count);
  }
  
const LogData ={
    UserId:userid,
    UserNickName:usernickname,
    Profile:prpfile,
    Thumbnail:thumbnail,
    check:check,
    email:email,
    date:date,
    kakao_info:kakaoinfo,
    naver_info:naverinfo,
    count:count,
    addkakaoinfo:addkakaoHandler,
    addnaverinfo:addNaverHandler,
    adddate:adddateHandler,
    addprofile:addprofileHandler,
    addemail:addemailHandler,
    addcheck:addcheckHandler,
    addthumbnail:addthumbnailHandler,
    addid:addidhandler,
    addeNickName :addnamehandler,
    addcount:addCountHandler
}
return (
<Id.Provider value={LogData}>
{props.children}
</Id.Provider>
  );
}

export default IdProvider;
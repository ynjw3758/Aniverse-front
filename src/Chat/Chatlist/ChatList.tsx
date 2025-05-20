//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import { useEffect ,useState} from "react";
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import {Oval} from "react-loader-spinner";

//#endregion

//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import AddChatItems from "../AddChat/AddChatItems";
import PartiChatList from "./PartiChatList";
//#endregion

//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type Chat ={
   /*
  DataList:object[],
  ImgList:string[],
  Roomname:string,
  RoomId:string,
  create_date:string,
  */
  isFocusid:string,
  IsDuple:boolean,
  ChatListinfo:ChatList_infos[],
  showcontents(data:object):void
 }
 type ChatList_infos={
   CreateDate:string,
   RoomName:string,
   chat_Id:string,
   userCount:number,
   Members:Member_info[]
  }
  type Member_info={
   Img:string,
   Nickname:string,
   UserId:string
  }
//#endregion

const ChatList =(props:Chat) =>{

//              +-----------------
//--------------+ 상태 관리
//              +-----------------
//#region type
const[roomname, setRoomname]=useState<string[]>([]);
const[ctdate, setCtdate]=useState<string[]>([]);
const[chatId, setChatId]=useState<string[]>([]);
const[isdata, setIsdata]=useState<boolean>(false);
const[isloading, setIsloading]=useState<boolean>(true);
const[isfocus, setIsfocus]=useState<string>("");
const[usercnt, setUsercnt]=useState<number[]>([]);
const[member, setMember]=useState<Member_info[][]>([]);
const[imglist, setImglist]=useState<string[][]>([]);
//#endregion

//              +-----------------
//--------------+ 전역 변수
//              +-----------------
//#region type
//#endregion

useEffect(() =>{
   
   const ChatInfos:ChatList_infos[] = props.ChatListinfo;
   dayjs.extend(relativeTime);
   let RoomName:string[]=[...roomname];
   let CtDate:string[]=[...ctdate];
   let Count:number[]=[...usercnt];
   let ChatId:string[] = [...chatId];
   let Member_info:Member_info[][] =[...member];
   let allImages: string[][] = [...imglist]; // ⬅️ 바깥에 선언해두기
   ChatInfos.forEach((data) =>{
      Object.entries(data).map((key) =>{
         if(key[0] === "RoomName"){
            RoomName.unshift(key[1].toString());
            setRoomname(RoomName);
         }
         else if(key.at(0) =="chat_Id"){
            ChatId.unshift(key[1].toString());
            setChatId(ChatId);
         }
         else if(key.at(0) =="userCount"){
             const cnt:any = key[1]!;
             Count.unshift(cnt);
             setUsercnt(Count);

         }
         else if(key.at(0) =="CreateDate"){
            CtDate.unshift(key[1].toString());
            setCtdate(CtDate);
         }
         else if(key.at(0) =="Members"){
            let members = key[1];

            if (Array.isArray(members)) {
               
              const imgArray = members.map((m) => m.Img); // ✅ 각 멤버의 Img만 추출
              allImages.unshift(imgArray); 
              Member_info.unshift(key[1] as Member_info[]);
              setMember(Member_info);
              setImglist(allImages);
            }
         }

      })
   })
   setIsdata(true);
},[props.ChatListinfo]);

const showcontents =(data:object) =>{
  props.showcontents(data);
}
const ShowList =() =>{
   console.log("뭐야야")
   setIsloading(false);
   setIsdata(true)
}

   return(<>
   {isloading && (<div className="ChatList_Loading">
      <Oval 
         color="#ff0000" 
         height={150} 
         width={50}
       />
       {isdata && (<>
         {chatId.map((data , i) =>(<>
         <PartiChatList Id={data} Name={roomname[i]} Count={usercnt[i]} 
         Images={imglist[i]} showdata={showcontents} create_date={ctdate[i]} FocusId={""}
         user_infos={member[i]} IsDuple={props.IsDuple} total={chatId.length} idx={i} onshowlist={ShowList}/>
      </>))}
       </>)}

       

   </div>)}
   {!isloading && (<>
      {chatId.map((data , i) =>(<>
         <PartiChatList Id={data} Name={roomname[i]} Count={usercnt[i]} 
         Images={imglist[i]} showdata={showcontents} create_date={ctdate[i]} FocusId={props.isFocusid}
         user_infos={member[i]} IsDuple={props.IsDuple} total={chatId.length} idx={i} onshowlist={ShowList}/>
      </>))}
   </>)}
   </>)



}

export default ChatList;
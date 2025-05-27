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
import "./ChatList.scss";
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
   lasttime:string,
   Message:string,
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
const[lastmsg, setLastmsg]=useState<string[]>([]);
const[lasttime, setLasttime]=useState<string[]>([]);
const[isdata, setIsdata]=useState<boolean>(false);
const[isloading, setIsloading]=useState<boolean>(true);
const[noChat, setNoChat]=useState<boolean>(false);
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
   if(props.ChatListinfo.length != 0){
   const ChatInfos:ChatList_infos[] = props.ChatListinfo;
   dayjs.extend(relativeTime);
   let RoomName:string[]=[...roomname];
   let CtDate:string[]=[...ctdate];
   let Count:number[]=[...usercnt];
   let ChatId:string[] = [...chatId];
   let Member_info:Member_info[][] =[...member];
   let allImages: string[][] = [...imglist]; // ⬅️ 바깥에 선언해두기
   let lastMsg:string[]=[...lastmsg];
   let lastTime:string[]=[...lasttime];
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
         else if(key.at(0) =="Message"){
           lastMsg.unshift(key[1].toString());
           setLastmsg(lastMsg);
         }
         else if(key.at(0) =="lasttime"){
            lasttime.unshift(key[1].toString());
            setLasttime(lastMsg);
         }

      })
   })
   setIsdata(true);
}
else{
    console.log("데이터 없다");
    setIsloading(false);
    setNoChat(true);
}
},[props.ChatListinfo]);

const showcontents =(data:object) =>{
  props.showcontents(data);
}
const ShowList =() =>{
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
         Images={imglist[i]} showdata={showcontents} create_date={ctdate[i]} FocusId={props.isFocusid}
         user_infos={member[i]} IsDuple={props.IsDuple} total={chatId.length} idx={i} lastmsg={lastmsg[i]} lasttime={lasttime[i]}
         onshowlist={ShowList}/>
      </>))}
       </>)}
   </div>)}
   {!isloading && (<>
      {chatId.map((data , i) =>(<>
         <PartiChatList Id={data} Name={roomname[i]} Count={usercnt[i]} 
         Images={imglist[i]} showdata={showcontents} create_date={ctdate[i]} FocusId={props.isFocusid}
         user_infos={member[i]} IsDuple={props.IsDuple} total={chatId.length} idx={i} lastmsg={lastmsg[i]} lasttime={lasttime[i]}
         onshowlist={ShowList}/>
      </>))}
   </>)}
   {(isloading == false && noChat == true) && (<div className="ChatList_Nochat">
   <p>참여 중인 채팅이 없습니다.</p>
   </div>)}
   
   </>)



}

export default ChatList;
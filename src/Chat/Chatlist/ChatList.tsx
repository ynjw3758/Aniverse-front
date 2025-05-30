//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import { useContext, useEffect ,useState} from "react";
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
import WebSocketAlarmContext from "../../Context/WebSocketAlarmContext";
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

  type Receive_chat={
   SendId:string,
   SendProfile:string,
   SendNickname:string,
   SendMsg:string;
   SendTime:string;
   ChatId:string;
   MessageId:string
 }
 type ChatAlarmMap = {
   [chatId: string]: Receive_chat[];
 };
//#endregion

const ChatList =(props:Chat) =>{

//              +-----------------
//--------------+ 상태 관리
//              +-----------------
//#region type
const[alarmid, setAlarmid]=useState<string[]>([]);
const[lastmsg, setLastmsg]=useState<string[]>([]);
const[isdata, setIsdata]=useState<boolean>(false);
const[isloading, setIsloading]=useState<boolean>(true);
const[noChat, setNoChat]=useState<boolean>(false);
  const[alchatReceive, setAlchatReceive]=useState<Receive_chat>({
    SendId: "",
    SendProfile: "",
    SendNickname: "",
    SendMsg: "" ,
    SendTime:"",
    ChatId:"",
    MessageId:""
})
const[divideChat, setDivideChat]=useState<ChatAlarmMap>({});
const [alarmCounts, setAlarmCounts] = useState<{ [chatId: string]: number }>({});
const [alarmmsg, setAlarmmsg] = useState<{ [chatId: string]: string }>({});
const [lasttime, setLasttime] = useState<{ [chatId: string]: string }>({});
const [roomname, setRoomname] = useState<{ [chatId: string]: string }>({});
const [ctdate, setCtdate] = useState<{ [chatId: string]: string }>({});
const [usercnt, setUsercnt] = useState<{ [chatId: string]: number }>({});
const [memebers, setMembers] = useState<{ [chatId: string]: Member_info[] }>({});
const [imglist, setImglist] = useState<{ [chatId: string]: string[] }>({});
const[chatId, setChatId]=useState<string[]>([]);

//#endregion

//              +-----------------
//--------------+ 전역 변수
//              +-----------------
//#region type
const ChatReceive_Alarm= useContext(WebSocketAlarmContext);
//#endregion

useEffect(() =>{
   if(ChatReceive_Alarm.chatReceive.SendMsg !="") 
    {
      let ChatId:string=ChatReceive_Alarm.chatReceive.ChatId;
      let alarmChatid:string[]=[...alarmid];
      alarmChatid.push(ChatId);
     setAlchatReceive(ChatReceive_Alarm.chatReceive);
     let chatinfos:Receive_chat={SendId:ChatReceive_Alarm.chatReceive.SendId,
      SendProfile:ChatReceive_Alarm.chatReceive.SendProfile,
      SendNickname:ChatReceive_Alarm.chatReceive.SendNickname,
      SendMsg:ChatReceive_Alarm.chatReceive.SendMsg,
      SendTime:ChatReceive_Alarm.chatReceive.SendTime,
      MessageId:ChatReceive_Alarm.chatReceive.MessageId,
      ChatId:ChatReceive_Alarm.chatReceive.ChatId} 
      setDivideChat(prev => {
          const isExist = Object.prototype.hasOwnProperty.call(prev, ChatId);
          return {
            ...prev,
            [ChatId]: isExist ? [...prev[ChatId], chatinfos] : [chatinfos]
          };
        });

     }
 },[ChatReceive_Alarm.chatReceive])

 useEffect(() =>{
   if(ChatReceive_Alarm.chatReceive.ChatId === "") return;
   const chatId = ChatReceive_Alarm.chatReceive.ChatId;
   const message =ChatReceive_Alarm.chatReceive.SendMsg;
   setAlarmCounts(prev => ({
      ...prev,
      [chatId]: prev[chatId] ? prev[chatId] + 1 : 1
    }));
    setAlarmmsg(prev =>{
      return{
         ...prev,
         [chatId]: prev[chatId] ? message : message
      }
   });
 },[divideChat])

useEffect(() =>{
   if(props.ChatListinfo.length != 0){
   const ChatInfos:ChatList_infos[] = props.ChatListinfo;
   dayjs.extend(relativeTime);
   let addchatid:string[]=[...chatId];
   ChatInfos.forEach((data) =>{
      let ChatId:string = data.chat_Id;
      addchatid.unshift(ChatId);
      setChatId(addchatid);
      setAlarmmsg(prev =>{
         return{
            ...prev,
            [ChatId]: prev[ChatId] ? prev[ChatId] +data.Message : data.Message
         }
      });

      setRoomname(prev =>{
         return{
            ...prev,
            [ChatId]: prev[ChatId] ? prev[ChatId] +data.RoomName : data.RoomName
         }
      });

      setLasttime(prev =>{
         return{
            ...prev,
            [ChatId]: prev[ChatId] ? prev[ChatId] +data.lasttime : data.lasttime
         }
      });

      setUsercnt(prev =>{
         return{
            ...prev,
            [ChatId]: prev[ChatId] ? prev[ChatId] +data.userCount : data.userCount
         }
      });

      setCtdate(prev =>{
         return{
            ...prev,
            [ChatId]: prev[ChatId] ? prev[ChatId] +data.CreateDate : data.CreateDate
         }
      })
      if (Array.isArray(data.Members)) {
         const members = data.Members;
         const imgArray = members.map((m) => m.Img);
         setMembers((prev) => ({
            ...prev,
            [ChatId]: prev[ChatId] ? [...prev[ChatId], ...members] : members
          }))

          setImglist(prev =>{
            return{
               ...prev,
               [ChatId]: prev[ChatId] ? [...prev[ChatId], ...imgArray] : imgArray
            }
         })
      }
   })
   setIsdata(true);
}
else{
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
         <PartiChatList Id={data} Name={roomname[data] || ""} Count={usercnt[data] || 0} 
         Images={imglist[data] || []} showdata={showcontents} create_date={ctdate[data] || ""} 
         FocusId={props.isFocusid} user_infos={memebers[data] || []} IsDuple={props.IsDuple} 
         total={chatId.length} idx={i} lastmsg={alarmmsg[data] || ""} lasttime={lasttime[data] || ""}
         onshowlist={ShowList} ChatAlarm={alchatReceive} AlarmCnt={alarmCounts[data] || 0}/>
      </>))}
       </>)}
   </div>)}
   {!isloading && (<>
      {chatId.map((data , i) =>(<>
         <PartiChatList Id={data} Name={roomname[data] || ""} Count={usercnt[data] || 0} 
         Images={imglist[data] || []} showdata={showcontents} create_date={ctdate[data] || ""} 
         FocusId={props.isFocusid} user_infos={memebers[data] || []} IsDuple={props.IsDuple} 
         total={chatId.length} idx={i} lastmsg={alarmmsg[data] || ""} lasttime={lasttime[data] || ""}
         onshowlist={ShowList} ChatAlarm={alchatReceive} AlarmCnt={alarmCounts[data] || 0}/>
      </>))}
   </>)}
   {(isloading == false && noChat == true) && (<div className="ChatList_Nochat">
   <p>참여 중인 채팅이 없습니다.</p>
   </div>)}
   
   </>)



}

export default ChatList;
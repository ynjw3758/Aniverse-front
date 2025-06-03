//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import {useEffect ,useRef,useState } from "react";
//#endregion

//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import "./PartiChatList.scss";
import Multipicture from "./Multipicture";
import React from "react";
import AllChat from "../ChatContents/AllChatContents/AllChat";
//#endregion

//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type image ={
    Id:string,
    Name:string,
    Count:number,
    Images:Object,
    create_date:string,
    user_infos:object,
    FocusId:string,
    IsDuple:boolean,
    total:number,
    idx:number,
    lastmsg:string,
    lasttime:string,
    ChatAlarm:Receive_chat,
    AlarmCnt:number,
    showdata : (data:Object) => void,
    onshowlist : () => void
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

const PartiChatList =(props:image) =>{



//              +-----------------
//--------------+ 상태 관리
//              +-----------------
//#region type
const[img, setImg]=useState<string[]>([]);
const[name, setName]=useState<string>("");
const[message, setMessage]=useState<string>("");
const[isfocus, setIsfocus]=useState<boolean>(false);
const[isChat, setIsChat]=useState<boolean>(false);
const[ismsg, setIsmsg]=useState<boolean>(false);
const[alarmcnt, setAlarmcnt]=useState<string>("");
//#endregion

//              +-----------------
//--------------+ 전역 변수
//              +-----------------
//#region type
const Focus_div = isfocus? "PartiChatList_Main_Focus" :"PartiChatList_Main";
const Ismsg = ismsg ? "PartiChatList_story_msg" :"PartiChatList_story";
//#endregion

useEffect(() =>{

    let test :string[]=[...img];
    const images:object=props.Images;
    if(props.Id ===props.FocusId) {
        if(props.AlarmCnt !==0){
            setAlarmcnt("0");
            setIsChat(false);
        }
        setIsfocus(true);
    }else{
        setIsfocus(false);
      }

    Object.entries(images).map((key) =>{
        test.push(key[1]);
        setImg(test);
    })
    if(props.Name.length >= 15){
        const name = props.Name.slice(0,15)+"...";
        setName(name);
    }
    else setName(props.Name);
    if(props.idx ===props.total -1) props.onshowlist();
    if(props.lastmsg !=="null") {
        setIsmsg(true);
        setMessage(props.lastmsg);
    } 
},[props.Id, props.FocusId]);

useEffect(() =>{
      if(props.IsDuple === true){
        setIsfocus(true);
      }
      else{
        setIsfocus(false);
      }
},[props.IsDuple])

useEffect(() =>{
    if(props.lastmsg !== "null") setMessage(props.lastmsg)
    if(props.AlarmCnt !==0) {
        if(props.AlarmCnt >99)
            {
            
            const cnt:string=String(props.AlarmCnt); 
            setAlarmcnt("99+")
            }
            else{
                const cnt:string=String(props.AlarmCnt); 
                setAlarmcnt(cnt);
                setIsChat(true);
            }

    }


    
},[props.AlarmCnt])




const showchat= () =>{
    const show_data:object ={user_count:props.Count+1, room_name:name, room_id:props.Id, 
        create_date:props.create_date, userinfos: props.user_infos}
    props.showdata(show_data);
    

}
    return(<div className={Focus_div} id={props.Id} onClick={showchat}>
            <div className="PartiChatList_imgs">
                <Multipicture Image={props.Images}/>
            </div>
             <div className="PartiChatList_contents">
                <div className="PartiChatList_info">
                    <p>{name}</p>
                    <h4>{props.Count+1}</h4>
                </div>
             <div className={Ismsg} id={props.create_date}>
                <p>{message}</p>
             </div>
            </div>
        {isChat &&(<div className="ChatList_ChatAlarm">
          <p>{alarmcnt}</p>
        </div>)}
    </div>)
}

export default React.memo(PartiChatList);
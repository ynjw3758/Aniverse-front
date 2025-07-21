import { Fragment, useState ,useContext, useEffect} from "react";
import "./MainContents.scss";
import React from "react";

import user_info from "../../Context/Userdata";
import UserUpload from "../../Upload/UserUpload";
import Contents from "./Contents";
import UploadComplate from "../../Layout/UploadComplete";
import WebSocketAlarmContext from "../../Context/WebSocketAlarmContext";
import NotificationMain from "../../Notification/ChatNotificationMain";
import loadingimg from "../../assets/images/login_loading.png";
import Nodata from "../../assets/images/no_data.png";


type user_info ={
    img:string,
    nickname:string,
    content:string[],
    openmodal:boolean | null | undefined,
    onload:() => void,
    onclose:() => void,
    onDisActive:(data:object) => void
}

type Receive_chat={
    SendId:string,
    SendProfile:string,
    SendNickname:string,
    SendMsg:string;
    SendTime:string;
    ChatId:string;
    MessageId:string;
    RoomName:string;
}

const MainContentsx=(props:user_info) =>{
    const[modal , setModal]=useState<boolean | null | undefined>(false);
    const[complete, setComplete]=useState<boolean>(false);
    const[isdata, setIsdata]=useState<boolean>(false);
    const [isshow, setIshow]=useState<boolean>(false);
    const [isloading, setIsloading]=useState<boolean>(false);
    const[isAlarm, setIsAlarm]=useState<boolean>(false);
    const[alchatReceive, setAlchatReceive]=useState<Receive_chat>({
        SendId: "",
        SendProfile: "",
        SendNickname: "",
        SendMsg: "" ,
        SendTime:"",
        ChatId:"",
        MessageId:"",
        RoomName:""
    })
    const disable:boolean=true;

    const ChatReceive_Alarm= useContext(WebSocketAlarmContext);
    useEffect(() =>{
      console.log("채팅 알람람 : " , ChatReceive_Alarm.chatReceive);
      if(ChatReceive_Alarm.chatReceive.SendMsg !="") 
       {
        setAlchatReceive(ChatReceive_Alarm.chatReceive);
        setIsAlarm(true);
            // 2초 후 알람 숨기기
        const timer = setTimeout(() => {
            setIsAlarm(false);
        }, 7000);
    
        // 클린업
        return () => clearTimeout(timer);
        
        }
    },[ChatReceive_Alarm])

    const uploadclose =(check:any) =>{
        props.onclose()
        
    }
    const CompleteHandler =() =>{
        props.onclose()
        setComplete(true);
    }
    const closeHandler =() =>{
       props.onclose()
        setComplete(false);
    }

    const DisAvtive =(data:object) =>{
     props.onDisActive(data);
     setIshow(true);
     setIsdata(true);
     setIsloading(true);
    }

    useEffect(() =>{
        console.log("content :" , props.content)
        console.log("넘어온 modal :" ,props.openmodal)
        setModal(props.openmodal);
    },[props.openmodal])

    useEffect(() =>{  
        console.log("넘어온 modal :" ,props.openmodal)
        setModal(props.openmodal);
       if(props.content.length > 0 ){
        console.log("not null");
           setIsdata(true);
       }
       else{
        console.log("null");
        setIsdata(false);
        setIsloading(true);
       }
    },[props.content])

    const show =(data:object) =>{

        props.onDisActive(data);
    }

       
    return(<Fragment>
        {isAlarm && (<>
        <NotificationMain ChatReceive={alchatReceive}/>
        </>)}
            {!isloading && (<div className="login_loading">
                <img src={loadingimg}/>
                <p>로딩 중</p>
            </div>)}
        {(isdata == true && isshow ==false) && (<div className="Maincontents_body_blur">
            <Contents  contents={props.content} disActive={DisAvtive} Img={props.img} Nickname={props.nickname}/>
        </div>)}
        {(isdata == true && isshow ==true) && (<div className="Main_Contents">
            <Contents  contents={props.content} disActive={show} Img={props.img} Nickname={props.nickname}/>
        </div>)}

        {!isdata && (<div className="upload_story">
            <img src={Nodata}/>
            <p>당신의 이야기를 올려보세요...</p>
            </div>)}
        {modal && (<UserUpload img={props.img} nickname={props.nickname} onClose={uploadclose} onComplete={CompleteHandler}/>)}
        {complete && (<UploadComplate onClose={closeHandler}/>)}
        </Fragment>)
}

export default React.memo(MainContentsx);



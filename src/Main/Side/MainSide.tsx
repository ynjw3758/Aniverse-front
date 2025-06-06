import "./MainSide.scss";
import { useNavigate } from "react-router-dom";
import user_info from "../../Context/Userdata";
import { useContext, useEffect,  useState } from "react";



  type user_infos ={
    img:string,
    nickname:string,
    id:string,
    isReady:boolean,
    Noti:Noti_Kind | undefined,
    onside :(side:any) => void,
    onProfile :() =>void,
    AlarmClick :(data:boolean) => void

}
type Noti_Kind={
  Chat:ChatInfo[];
}
type ChatInfo={
  ChatId:string;
  IsRead:boolean;
  MessageId:string;
  RoomName:string;
  UserId:string;
  message:string;
  nickname:string;
  profile:String;
  sendId:string;
  timestamp:string;
  type:string;
}


const MainSide =(props:user_infos) =>{

  const[isNoti, setIsNoti]=useState<boolean>(false);
  
  const navigate = useNavigate();
  const data=useContext(user_info);

  useEffect(() =>{
    console.log("props.Noti.length :" , props.Noti);
    if(props.Noti?.Chat && props.Noti.Chat.length > 0) {
      setIsNoti(true)
    }
  },[props.Noti])

  const Myprofile =() =>{
    props.onProfile();
  }
  const NoteHandler =() =>{
    navigate(`/main/Note/${props.id}`);
  }

  const ChatHandler =() =>{
    data.addeNickName(props.nickname);
    data.addprofile(props.img);
    navigate(`/main/Chat/${props.id}`);
  }

  const AlarmClick =() =>{
     props.AlarmClick(true);
  }

    return(<>
            <ul className="Main_side">
                <button className="Main_myinfo" onClick={Myprofile} disabled={!props.isReady}>
                    <img src={props.img} />
                    <h3>{props.nickname}</h3>
                </button>
                <button className="Main_FItem" disabled={!props.isReady}>
                  <img src="/image/friends.png" />
                    <h3>친구</h3>
                </button>
                <button className="Main_MItem" onClick={NoteHandler} disabled={!props.isReady}>
                  <img src="/image/message.png" />
                    <h3>쪽지</h3>
                </button>
                <button className="Main_CItem" onClick={ChatHandler} disabled={!props.isReady}>
                  <img src="/image/talk.png" />
                    <h3>메신져</h3>
                </button>
                <button className="Main_SItem" disabled={!props.isReady}>
                  <img src="/image/search.png" />
                    <h3>검색</h3>
                </button>
                <button className="Main_AlItem" disabled={!props.isReady} onClick={AlarmClick}>
                  <img src="/image/Alarm.png" />
                    <h3>알람</h3>
                    {isNoti && (<div className="MainSide_Alarm_cnt">
                      <p>{"..."}</p>
                    </div>)}
                </button>
                <button className="Main_LItem" disabled={!props.isReady}>
                  <img src="/image/favorite.png" />
                    <h3>즐겨찾기</h3>
                </button>
                <button className="Main_AItem" disabled={!props.isReady}>
                <img src="/image/time.png" />
                    <h3>활동기록</h3>
                </button>
            </ul>
            <div className="Main_side_vertical"> 
             <hr />
            </div>
    </>
    )
}

export default MainSide;
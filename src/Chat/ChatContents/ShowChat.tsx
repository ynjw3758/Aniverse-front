//                            +--------------------
//----------------------------+ 외부 라이브로리
//                            +--------------------
//#region type 
import {useEffect, useState, useRef, useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosHeaders } from "axios";
import {Cookies} from 'react-cookie';
//#endregion

//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import ChatHeader from "./ChatHeader";
import "./ShowChat.scss";
import AddItems from "./Input_AddItems";
import WebSocket_Chat_Provider from "../../Context/WebSocker_Chat_Provider";
import WebSocketChatContext from "../../Context/WebSocketChatContext";

//#endregion

//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type info ={
    Userinfo:Object[];
    RoomName:string;
    CreateDate:any;
    Chat_id:string;
    onConnect:boolean;
    MyProfile:string;
    isFirst:boolean;
    MyNickname:string;
    isClick:boolean;
    StandDate:string[];
    MessageInfo:MessageInfo[][],
    RealtimeMsg:MessageInfo
 }

 type ChatInfos={
  date:string;
  messages:MessageInfo[];
 }

 type MessageInfo={
  chatId:string;
  message:string;
  messageId:string;
  nickname:string;
  profile:string;
  recount:number;
  sendId:string;
  timestamp:string;
  type:string;
  isSend:boolean
 }

 //#endregion

//                             +--------------------
//-----------------------------+   에러 인터페이스
//                             +--------------------
//#region type
interface ResponseDataType {
    message: string;
    code: number;
    response:object
  }
//#endregion
const ShowChat =(props:info) =>{

    const[img, setImg]=useState<string[]>([]);
    const[nick, setNick]=useState<string[]>([]);
    const[ids, setIds]=useState<string[]>([]);
    const[ctid, setCtid]=useState<string[]>([]);
    const[chsendId, setChsendId]=useState<string[]>([]);
    const[size, setSize]=useState<number>(0);
    const[create, setCreate]=useState<string>("");
    const[standDate, setStandDate]=useState<string[]>([]);
    const[msgInfo, setMsgInfo]=useState<MessageInfo[][]>([]);
    const[isSocket, setIsSocket]=useState<boolean>(false);
    const[againlogin,setAgainlogin]=useState<boolean>(false);
    const[isperist, setIsperist]=useState<boolean>(false);
    const [allChat, setAllChat] = useState<MessageInfo[][]>(props.MessageInfo);
    const [newDate, setNewDate] = useState<string>("");
//              +-----------------
//--------------+ 전역 변수
//              +-----------------
//#region type
    const navigate = useNavigate();
    const cookies = new Cookies();
    const Web_Chatinfo=useContext(WebSocketChatContext);
    const real_chat = useRef<MessageInfo | null>(null);
    const RdCnt = useRef<number>(0);
//#endregion

  const formatdate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


    useEffect(() =>{

      if(props.RealtimeMsg ===undefined) return;
       const Id:string=localStorage.getItem("id")!;       
       if(props.RealtimeMsg.sendId !==Id ){
          const newMsg: MessageInfo = {
            ...props.RealtimeMsg,
            recount : Math.max(props.RealtimeMsg.recount - 1, 0)
          };
          RdCnt.current =newMsg.recount;
        real_chat.current = props.RealtimeMsg;

              const now = new Date();
      const FormatDate = formatdate(now);

            // 최초 메시지일 경우
      if (allChat.length === 0) {
        if(standDate.length ===0){
          setAllChat([[newMsg]]);
          setStandDate([FormatDate]);
          setNewDate(FormatDate);
          return;
        }else{
          if(standDate[standDate.length-1] ===FormatDate ) return;
          else setStandDate([...standDate, FormatDate]);
        }

      }
            // 날짜 단위로 메시지 병합
      const lastDate = standDate[standDate.length - 1];
      if (lastDate !== FormatDate) {
        setStandDate([...standDate, FormatDate]);
        setAllChat([...allChat, [newMsg]]);
        setNewDate(FormatDate);
      } else {
        const updated = [...allChat];
        updated[updated.length - 1] = [...updated[updated.length - 1], newMsg];
        setAllChat(updated);

      }
       }
       else return;
    },[props.RealtimeMsg])

    useEffect(() =>{
      setIsSocket(false);
    if(props.isClick === true){
      real_chat.current=null;
      setAllChat([]);
      setMsgInfo([]);
      let access_token:string="";
      const UserId:string= localStorage.getItem("id")!;
      access_token =localStorage.getItem("a_id")!;
      axios.defaults.headers.common['Authorization'] = access_token;
      axios.post("http://localhost:8080/Pets-social/gateway/api-proxy", {
       service: "chat",
       endpoint: "/chatinfo",
       method: "GET",
       body: {Id:UserId, ChatId:props.Chat_id}
     })
      .then(response =>{
             const ChatInfos:ChatInfos[] =response.data.data.MessageInfo;
             if(ChatInfos.length !==0){
                const ChatData:ChatInfos[] = response.data.data.MessageInfo;
                let date:string[] =[...standDate];
                let message:MessageInfo[][]=[];
                ChatData.map(Item => {
                  date.push(Item.date);
                  message.push(Item.messages);
                  setStandDate(date);
                  setMsgInfo(message);
                  UserInfoPasing();
                })
             }
             else{
              UserInfoPasing();
             }
             setIsSocket(true);
       }).catch((error) =>{
       if(axios.isAxiosError<ResponseDataType>(error)){
           const originalRequest = error.config;
           if(error.response?.status==400){
            navigate("/error/BadRequest");
            return;
           }
           else if(error.response?.status==401){
               Object.entries(error.response?.data).map(key =>{
                if(key.at(0) == "errorcode"){
                  if(key.at(1) == "00"){
                    navigate("/error/auth/");
                    return;
                  }
                  else if(key.at(1) == "01"){
                    let refresh_token:string="";
                      console.log("토큰 시간 만료 refresh token을 보낸다");
                      refresh_token= cookies.get('refresh_token');
                      const id= localStorage.getItem("id");
                      axios.post("http://localhost:8080/Pets-social/token/refresh", {
                        refresh_token : refresh_token,
                        id : id})
                        .then(
                        response =>{
                          console.log("응답 결과 :" , response)
                          if(response.status == 200){
                            localStorage.setItem("p_exp" ,response.data.data.exp);
                            localStorage.setItem("a_id" ,response.data.data.access_token);
                            if (originalRequest) {
                              const newAccesstoken = localStorage.getItem("a_id")!;
                              originalRequest.headers = new AxiosHeaders({
                                ...originalRequest.headers,
                                Authorization: newAccesstoken
                              });
                              if (typeof originalRequest.data === "string") {
                                originalRequest.data = JSON.parse(originalRequest.data);
                              }
                              const retryResponse = axios.request(originalRequest);
                              console.log("재요청 후 응답 처리 :" , retryResponse)
                            }
                          }
                        }
                      ).catch(error =>{
                        if(axios.isAxiosError<ResponseDataType>(error)){
                                    console.log("error code: " , error.response?.status);
            
                                    if(error.response?.status==400){
                                      navigate("/error");
                                      return;
                                    }
                                    else if(error.code == "ERR_NETWORK"){
                                      console.log("네트워크 에러 ");
                                      return;
                                      
                                    }
                                    else if(error.response?.status == 401){
                                        console.log("다시 로그인해야 된다.");
                                        localStorage.clear();
                                        setAgainlogin(true);
 
        
                                    }
                                    else if(error.response?.status==301){
                                        console.log("기존 아이디 존재");
                                        setIsperist(true);
                                        //setUserid(error.response?.data.resultdata);
                                    }
            
                                    
                                    console.log("error response: " , error.response?.data.response);
                                  }
                    })
                      
 
                  }
                }
              })
           }
           else if(error.response?.status==500){
             console.log("서버 에러발생");
             navigate("/error/se-error")
           }
           else if(error.response?.status==403){
                console.log("인가 문제?");
                navigate("/error/NoAccess");
           }
           else if(error.response?.status==502){
            console.log("gateway 에러 발생");
            navigate("/error/Gateway");
            return;
           }
           
           console.log("error response: " , error.response?.data);
         }
    })
    }else{
      setIsSocket(true);
    }

    },[props.Chat_id])

    useEffect(() =>{
       setStandDate(props.StandDate);
       setMsgInfo(props.MessageInfo);
       UserInfoPasing();
    },[props.MessageInfo, props.StandDate])

    useEffect(() =>{
    },[Web_Chatinfo.ReadChat])

    async function UserInfoPasing(){
      let list:Object[]=props.Userinfo;
      let image:string[]=[];
      let Nick:string[]=[];
      let Ids:string[]=[];
      let Ctid:string[]=[];
      let SendIds:string[]=[];
      const My_Id:string= localStorage.getItem("id")!;
     
      list.map((data) => Object.entries(data).map((key, idx) =>{

          if(key.at(0) == "Ctid"){
              Ctid.push(key[1]);
             setCtid(Ctid);
            }
            else if(key.at(0) == "Nickname"){
              Nick.push(key[1]);
              setNick(Nick);
            }
            else if(key.at(0) == "UserId"){
             Ids.push(key[1]);
             setIds(Ids);
             if(key[1] !==My_Id ){
              SendIds.push(key[1]);
              setChsendId(SendIds);
             }

            }

            else if(key.at(0) == "Img"){
                if(key.at(1) == "N"){
                    image.push("/image/baseimg.png");
                }
                else{
                    image.push(key[1]);
                }   
                setImg(image);
            }
      }))
      const isoDate = props.CreateDate;
      const date = new Date(isoDate);
      const formatted =
          date.getFullYear() + '-' +
          String(date.getMonth() + 1).padStart(2, '0') + '-' +
          String(date.getDate()).padStart(2, '0') + ' ' +
          String(date.getHours()).padStart(2, '0') + ':' +
          String(date.getMinutes()).padStart(2, '0') + ':' +
          String(date.getSeconds()).padStart(2, '0');
       setCreate(formatted);
       setSize(list.length);
    }

    
     return(<>
     <div id={props.Chat_id}>
     <div>
        <ChatHeader name={props.RoomName} Count={size}/>
     </div>
      <div className="ShowChat_vertical">
         <hr />
      </div>
      <div className="ShowChat_Showcontents">
        {isSocket && (<>
          <AddItems CreateDate={create} ChatId={props.Chat_id} totalId={ids} Profile={props.MyProfile} 
          isFirst={props.isFirst} ChSendId={chsendId} MyNickname={props.MyNickname} 
          count={size} date ={standDate} messages={msgInfo} RealtimeMsg={real_chat.current!} 
          AllChat={allChat} NewDate={newDate} realcnt={RdCnt.current}/>
        </>)}
      </div>
     </div>
     </>)
}

export default ShowChat;
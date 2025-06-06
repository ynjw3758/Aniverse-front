//                            +------------------
//----------------------------+ 외부 라이브러리
//                            +------------------
//#region
import {useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {Cookies} from 'react-cookie';
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
//#endregion

//                            +------------------
//----------------------------+ 내부 라이브러리
//                            +------------------
//#region
import "./Input_AddItems.scss";
import Emoji from"./Emoji";
import Addfiles from "./Addfiles";
import Sizemessage from "./Sizemessage";
import WebSocketChatContext from "../../Context/WebSocketChatContext";
import AllChat from "./AllChatContents/AllChat";

//#endregion


//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type info ={
    CreateDate:string;
    ChatId:string;
    MyNickname:string;
    totalId:string[];
    Profile:string;
    isFirst:boolean;
    ChSendId:string[];
    count:number;
    date:string[];
    messages:MessageInfo[][];
    RealtimeMsg:MessageInfo;
    AllChat:MessageInfo[][];
    NewDate:string;
    realcnt:number;
    isPartiZero:boolean;
    RoomName:string;
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
  isSend:boolean;
 }


 //#endregion

 //                             +--------------------
//-----------------------------+   인터페이스
//                             +--------------------
//#region
interface ResponseDataType {
    message: string;
    code: number;
    response:object
  }
  
  interface tokenRenewal { //토큰 생긴 인터페이스
    message: string;
    code: number;
    data:string
  }
  //#endregion

const Input_AddItems =(props:info) =>{

//              +-----------------
//--------------+ 상태 관리
//              +-----------------
//#region type
const[isSize, setIsSize]=useState<boolean>(false);
const[isEmoticon, setIsEmoticon]=useState<boolean>(false);
const[isfiles, setIsfiles]=useState<boolean>(false);
const[isMyChat, setIsMyChat]=useState<boolean>(false);
const[img, setImg]=useState<string[]>([]);
const[video, setVideo]=useState<string[]>([]);
const[imgid,  setImgid]=useState<string[]>([]);
const[videoid,  setVideoid]=useState<string[]>([]);

const[maxsize, setMaxsize]=useState<number>(0);
const[allChat, setAllChat]=useState<MessageInfo[][]>(/*props.messages*/[]);
//#endregion

//              +-----------------
//--------------+ 전역 변수수
//              +-----------------
//#region type
const max_size:number=  1024 * 1024 * 20;
const cookies = new Cookies();
const navigate = useNavigate();
const Chat_Context= useContext(WebSocketChatContext);
const TextRef =useRef<HTMLTextAreaElement>(null); 
const containerRef = useRef<HTMLDivElement>(null);
const StandDate= useRef<string[]>(props.date);
const newDate = useRef<string>("");
const allChatRef = useRef<MessageInfo[][]>(props.messages);
const ismychat= useRef<boolean>(false);
const input_values= useRef<string>("");
//#endregion



    const AddfileHandler =(event: React.ChangeEvent<HTMLInputElement>) =>{
        const array :any=event.target.files;
        let imglist:string[]=[...img];
        let imidlist:string[]=[...imgid];
        let videolist:string[]=[...video];
        let vilistid:string[]=[...videoid];

        for(let count =0; count<array.length;count++){
            console.log("이미지 미리보기 만들기");
            if (array[count] !== null) {
                const file = array[count];
                if(max_size < maxsize){
                    setMaxsize((prev) => prev+file.size);
                    if (file && file.type.substring(0, 5) === "image") {
                        const currentimg = URL.createObjectURL(file);
                        console.log("url :" , currentimg);
                        imglist.push(currentimg);
                        setImg(imglist);
                        const origin:string =file.name;
                        const index:number = origin.lastIndexOf(".");
                        const name:string =file.name.substring(0, index-1);
                        imidlist.push(name);
                        setImgid(imidlist);
                    }
                    else{
    
                        const create_url = URL.createObjectURL(file);
                        videolist.push(create_url);
                        setVideo(videolist);
                        const origin:string =file.name;
                        const index:number = origin.lastIndexOf(".");
                        const name:string =file.name.substring(0, index-1);
                        vilistid.push(name);
                        setVideoid(vilistid);
                    }
                }
                else{
                    console.log("용량 초과");
                    setIsSize(true);
                    setIsfiles(false);
                    return;
                }


            }

        }
        setIsfiles(true);
     }   

    const EmoticonHandler =() =>{
        if(isEmoticon == false){
            setIsEmoticon(true);
        }
        else{
            setIsEmoticon(false);
        }
       
    }

    const AddEmoticon =(data:string) =>{
      input_values.current += data;
        if (TextRef.current) {
          TextRef.current.value = input_values.current;
        }
    }

    const inputHandler =(e:React.ChangeEvent<HTMLTextAreaElement>) =>{
      const filteredValue = e.target.value.replace(/\n/g, '');
       input_values.current = filteredValue;
         if (TextRef.current) {
          TextRef.current.value = input_values.current;
        }
    }
    
    const CloseHandler =() =>{
        setIsSize(false);
    }

    useEffect(() =>{
      console.log("최초 렌더링되고 채팅 리스트 저장 useeffect : ");
       Chat_Context.Partici_Chatid(props.ChatId, props.totalId);
        setIsMyChat(true);
      
      
   },[]);

   useEffect(() =>{
     if(props.RealtimeMsg!== null ) {
      setIsMyChat(true);
      AutoDownScroll();
    }
   },[props.RealtimeMsg])

      const formatdate =(date:Date) =>{
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 0~11이므로 +1
        const day = String(date.getDate()).padStart(2, '0');
      
        return `${year}-${month}-${day}`;
      }

      const sendChatHandler =() =>{
        if(input_values.current.length !== 0){
          ismychat.current =true;
        let access_token:string="";
        let UserId:string= "";
        access_token = localStorage.getItem("a_id")!;
        UserId = localStorage.getItem("id")!;
        axios.defaults.headers.common['Authorization'] = access_token;
   
        axios.get("http://localhost:8080/Pets-social/acccheck").then((response) =>{
   
         if(response.status == 200){
          
           const UserId = localStorage.getItem("id")!;
           const messageId = uuidv4();
           const nowTime =  new Date().toISOString();
           const now  =new Date();
           const FormatDate = formatdate(now);
           if(FormatDate !== props.date[props.date.length-1]){ //둘이 같지 않다는 건 새로우이 추가하는 거고 같으면 그냥 stand.current 여기다 그냥 넣으면 되잔아아
              newDate.current = FormatDate;
              let add_date:string[]=[...props.date];
              add_date.push(FormatDate);
              StandDate.current =add_date; 
           }else{
            newDate.current = FormatDate;
            // 같은 날짜일 경우에도 외부 날짜(props)로 최신화하여 날짜 헤더의 일관성 유지
            if(StandDate.current.length ===0)  StandDate.current[0] =props.date[props.date.length-1]; 
            else  StandDate.current[StandDate.current.length-1] =props.date[props.date.length-1]; 
           
           }
            
            let newChat:MessageInfo[][]=[...allChat];
            let RdCount=0;
            console.log("카운트 :" , props.count)
            if(props.isPartiZero === true){
                RdCount =props.realcnt;
            }
            else RdCount =props.count-1;
            let newMessage = {chatId:props.ChatId,message:input_values.current, messageId:messageId,nickname:props.MyNickname,
              profile:props.Profile,
              recount:RdCount,
              sendId:UserId,
              timestamp:nowTime,
              type:"mine",
              isSend:false}
              if(newChat.length ===0){
                 newChat.push([newMessage]);
              }
              else{
                const lastIdx = newChat.length - 1;
                newChat[lastIdx] = [...newChat[lastIdx], newMessage]
              }
              
            setAllChat([...newChat]);
            setIsMyChat(true);
            Chat_Context.sendMessage(props.ChatId, input_values.current, UserId, props.MyNickname ,props.Profile,  
            true, props.ChSendId,props.count ,messageId ,props.RoomName)
             input_values.current = "";
              if (TextRef.current) TextRef.current.value = "";
            
        }
   
        }).catch((error) =>{
           if(axios.isAxiosError<ResponseDataType>(error)){
             console.log("error code: " , error.response?.status);
             
             if(error.response?.status==400){
              navigate("/error/BadRequest");
              return;
             }
             else if(error.response?.status==401){
                 console.log("승인되지 않은 로그인");
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
                            console.log("refresh 토큰 응답 결과 :" , response)
                            if(response.status == 200){
                              localStorage.setItem("p_exp" ,response.data.data.exp);
                              localStorage.setItem("a_id" ,response.data.data.access_token);
                              //navigate("/main");
                            }
                          }
                        ).catch(error =>{
                          if(axios.isAxiosError<tokenRenewal>(error)){
                                      console.log("error code: " , error.response?.status);
              
                                      if(error.response?.status==400){
                                        navigate("/error/BadRequest");
                                        return;
                                      }
                                      else if(error.code == "ERR_NETWORK"){
                                        console.log("네트워크 에러 ");
                                        return;
                                        
                                      }
                                      else if(error.response?.status == 401){
                                          console.log("다시 로그인해야 된다.");
                                          localStorage.clear();
                                          //setAgainlogin(true);
      
           
                                      }
                                      else if(error.response?.status==301){
                                          console.log("기존 아이디 존재");
                                          //setIsfirst(true);
                                          //setUserid(error.response?.data.data);
                                      }
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
             else if(error.response?.status==502){
              console.log("gateway 에러 발생");
              navigate("/error/Gateway");
              return;
             }

           }
         })
        }
        else{
           return;
        }
      }
      const margin = useRef<number>(0);
      const compare_height = useRef<number>(85);
      const textarea_hegiht= useRef<number>(65);
      const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === 'Enter' && input_values.current.length !==0){
          console.log("엔터 치면 바로 채팅 보내기");
          sendChatHandler()
        }
        if (e.key === 'Enter' && e.shiftKey) {;
            resizeTextarea(); 
        }
        else{
          if(e.key === "Backspace" && e.currentTarget.selectionStart === 0 && e.currentTarget.selectionEnd === e.currentTarget.value.length){
                   Initial_textarea()
          } 
          
        }
        
      };

      const Initial_textarea =() =>{
        const textarea = TextRef.current;
        const container = containerRef.current;
        if (textarea && container) {
          container.style.height = `auto`; // 여유
          container.style.marginTop = `auto`;
          textarea.style.height = `auto`;
          margin.current=0
          compare_height.current=85
          textarea_hegiht.current=65
        }
      }
      const resizeTextarea = () => {
        //const margin_limit = -200;
        const margin_limit = -40;
        const textarea = TextRef.current;
        const container = containerRef.current;
        if (textarea && container) {
          //if(margin.current > margin_limit) {
            const newHeight = Math.min(textarea.scrollHeight, 100);
            const containers = Math.min(container.scrollHeight, 100); //이전값은 500
           if(margin.current > margin_limit) {
            margin.current+=-10;
            compare_height.current+=10;
            //margin.current+=-20;
            //compare_height.current+=20;
            textarea_hegiht.current+=10;
            //if(compare_height.current >=100) compare_height.current=100;
            if(textarea_hegiht.current >= 100) textarea_hegiht.current =100;
            container.style.height = `${containers}px`; // 여유
            container.style.marginTop = `${margin.current}px`;
            textarea.style.height = `${textarea_hegiht.current }px`;
            }
            else{
              textarea.style.height = `${newHeight}px`;
            }

        }

        
      };
      const chatEndRef = useRef<HTMLDivElement | null>(null);
      useEffect(() => {
        AutoDownScroll();
      }, [allChat]); // ✅ 메시지가 바뀔 때마다 스크롤 실행

      useEffect(() =>{
          if(isMyChat === true) AutoDownScroll();
      },[isMyChat])

      useEffect(() =>{
        console.log("읽어야 되는 데이터 :" , Chat_Context.ReadChat);
      },[Chat_Context.ReadChat])

      function AutoDownScroll (){
        if (chatEndRef.current) {
          setTimeout(() => {
            chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
          }, 100);
        }
      }

    const deletechat =(data:string) =>{
      setAllChat(prev => prev.filter(chat => {
        if(chat[chat.length-1].messageId !== data){
          return{...prev}
        }
      }));
    }

    return(
    <div className="AddChatItems_total">
        {isfiles &&(<div className="AddChatItems_filelist" >
            <Addfiles Img={img} Video={video} ImgId={imgid} VideoId={videoid}/>
        </div>)}
        {isMyChat && (<div className="AllChat_Stand">
          <AllChat allChat={allChat} StandDate={StandDate.current} CreateDate={props.CreateDate} 
          newDate={newDate.current} DeleteChat={deletechat}  ReadChatcnt={Chat_Context.ReadChat} 
          RealTimeMsg={props.RealtimeMsg} Receive_NewDate={props.NewDate} Receive_standDate={props.date}
          IsMine={ismychat.current} Otherchat={props.AllChat} SaveChat={props.messages} />
          <div ref={chatEndRef} />
        </div>)}
        <div className="AddChatItems_inputchat" ref={containerRef}>
        <div className="AddChatItems_AddContents">
            <img src="/image/ChatSend.png" onClick={sendChatHandler}/>
            <img src="/image/emoticon.png" onClick={EmoticonHandler}/>
            <label  
                draggable="true"
            >
            <img src="/image/picture.png"/>
            <input type="file" 
                style={{display:"none"}}
                onChange={AddfileHandler}
                multiple={true}
                accept=".jpg, .jpeg, .png , .mp4"
              />
              </label>
        </div>
        <textarea  placeholder="메시지 입력..." /*value={emoticon}*/ onChange={inputHandler} 
           onKeyDown={handleKeyDown} ref={TextRef}/>
        </div>

        {isEmoticon && (<>
          <Emoji onimage={AddEmoticon}/>
        </>)}
        {isSize && (<>
         <Sizemessage onClose={CloseHandler}/>
        </>)}
    </div>)

}
export default Input_AddItems;
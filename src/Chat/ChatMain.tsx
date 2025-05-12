//                            +--------------------
//----------------------------+ 외부 라이브로리
//                            +--------------------
//#region type 
import { useContext, useEffect, useState ,useRef} from "react";
import { Outlet, useNavigate , useParams } from "react-router-dom";
import axios from "axios";
//#endregion

//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import user_info from "../Context/Userdata";
import "./ChatMain.scss";
import AddChat from "./AddChat/AddChat";
import ShowChat from "./ChatContents/ShowChat";
import WebSocker_Provider from "../Context/WebSocker_Provider";
import ChatList from "./Chatlist/ChatList";
import Dupleroom from "./AddChat/Dupleroom";
import ChatMainSide from "./ChatMainSide";
import Side_Search from "../CommonSide/Side_Search";
import ShowChatContext from "../Context/ShowChatContext";
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
const ChatMain =() =>{

//                             +--------------------
//-----------------------------+   상태 관리
//                             +--------------------
//#region type
   const[ischat,setIschat]=useState<any>({Addchat:false , showcaht:false, islist:false , isDuple:false});
   const[dupldata, setDupldata]=useState<object>({});
   const[isSearch, setIsSearch]=useState<boolean>(false);
   const[issocket, setIssocket]=useState<boolean>(false);
//#endregion

//              +-----------------
//--------------+ 전역 변수
//              +-----------------
//#region type
const navigate = useNavigate();
const param=useParams();
const chattitle=useRef("");
const chatid=useRef("");
const chatDate=useRef("");
const isFirst=useRef<boolean>(false);
const chatdata=useRef<object[]>([]);
const imgdata=useRef<string[]>([]);
const myinfo=useContext(user_info);
const Chatinfo =useContext(ShowChatContext);
//#endregion


    const AddchatHandler =() =>{
    setIschat({...ischat ,Addchat:true });
    }

    useEffect(() =>{
        let access_token:string="";
        access_token =localStorage.getItem("a_id")!;
        console.log("access : " , access_token);
        axios.defaults.headers.common['Authorization'] = access_token;
        axios.get("http://localhost:8080/Pets-social/acccheck")
        .then(response =>{
           console.log("응답 결과 확인 " , response.data);
          if(response.status == 200){
            console.log("토큰 인증 성공");
            const id:string =param.userid! ;
            axios.get("http://localhost:8089/Pets-social/Chat/reload" , {params:{Id:id}})
            .then((response) =>{
        
   
            }).catch((error) =>{
           if(axios.isAxiosError<ResponseDataType>(error)){
               console.log("error code: " , error.response?.status);
               
               if(error.code=="ERR_BAD_REQUEST"){
                 navigate("/error");
               }
               if(error.code == "ERR_NETWORK"){
                 console.log("네트워크 에러 ");
                 
               }
               if(error.response?.status==500){
                 console.log("서버 에러발생");
                 navigate("/error/se-error")
               }
               
               console.log("error response: " , error.response?.data);
             }
        })
   
          }
        }).catch((error) =>{
           if(axios.isAxiosError<ResponseDataType>(error)){
               console.log("error code: " , error.response?.status);
               
               if(error.code=="ERR_BAD_REQUEST"){
                 navigate("/error");
               }
               if(error.code == "ERR_NETWORK"){
                 console.log("네트워크 에러 ");
                 
               }
               if(error.response?.status==401){
                   console.log("승인되지 않은 로그인");
                   navigate("/login");
               }
               if(error.response?.status==500){
                 console.log("서버 에러발생");
                 navigate("/error/se-error")
               }
               
               console.log("error response: " , error.response?.data);
             }
        })
    },[]);


    const AddClose =() =>{
    setIschat({...ischat ,Addchat:false });
    }

    const chatList =(data:Object[] , img:string[] ,name:string , roomid:string, date:string) =>{
      chatid.current= roomid;
      chattitle.current =name;
      chatdata.current = data;
      imgdata.current=img;
      chatDate.current = date;
      isFirst.current= true;

      Chatinfo.insert_values(chatid.current,chattitle.current, chatdata.current,imgdata.current,
       chatDate.current,isFirst.current , myinfo.UserNickName , myinfo.Profile);
      setIschat({AddChat:false , showchat:true, islist:true});

      navigate(`/main/chat/${chatid.current}`);

    }

    const DupleHandler =(data:object) =>{
      console.log("중복 채팅방 데이터 :" , data);
      setDupldata(data);
      setIschat({...ischat ,Addchat:false , isDuple:true});
    }

    const TypeChatHandler =(type:string, id:string, name:string , chat:any[], img:string[]) =>{
      console.log("type :" , type);
      console.log("id :" , id);
      console.log("name :" , name);
      console.log("chatdata :" , chat);
      console.log("img :" , img);
      if(type="move"){
        chatdata.current= chat;
        chattitle.current =name;
        console.log("데이타 :" ,chatdata.current);
        console.log("채팅방 이름 :" ,chattitle.current );
        setIschat({...ischat ,isDuple:false});
      }
      else{
       console.log("채팅 생성");
      }
      
    }

    const onClickshow =(data : object) =>{
      setIschat({...ischat ,showchat:false});
     Object.entries(data).map((key) =>{
      console.log("key: " ,key);
      if(key.at(0) =="userinfos"){
        chatdata.current= key[1];
      }
      else if(key.at(0) =="room_id"){
        chatid.current= key[1];

      }
      else if(key.at(0) =="room_name"){
        chattitle.current=key[1];
      }
      else if(key.at(0) =="create_date"){
         chatDate.current= key[1];
      }
     })
      console.log("생성 날짜 :" ,chatDate);
      console.log("유저 :" ,chatdata);
      console.log("제목 :" ,chattitle);
      setIschat({...ischat ,showchat:true });
      setIssocket(true);
    }

    const Active_Search =(data:boolean) =>{
      if(data == true){
        setIsSearch(true);
      }
      else{
        setIsSearch(false);
      }

    }

    const OneToOneDuple =() =>{

    }
    /*
               <ShowChat Userinfo={chatdata.current} RoomName={chattitle.current} 
           CreateDate={chatDate.current} Chat_id={chatid.current} onConnect={issocket} 
           MyProfile={myinfo.Profile} isFirst={isFirst.current} MyNickname={myinfo.UserNickName}/>
           */
    return(<WebSocker_Provider>
        <div className="Side">
            <div className="Myinfo">
              <div className="Profile">
                 <img src={myinfo.Profile}/>
              </div>
              <h3>{myinfo.UserNickName}</h3>
            </div>
            <div className="addchat">
                <h3>채팅 리스트</h3>
              <div className="plusIcon">
                <img src="/image/pluschat.png"  onClick={AddchatHandler}/>
              </div>
            </div>
            <div className="verticla">
                <hr />
            </div>
            <div className="search">
              <input type="search" placeholder="채팅방/참여자 검색"/>
            </div>
            <div className="chatlist">
              {ischat.islist && (<>
                <ChatList DataList={chatdata.current} Roomname={chattitle.current} RoomId={chatid.current} 
                ImgList={imgdata.current} create_date={chatDate.current} showcontents={onClickshow}/>
              </>)}
            </div>
        </div>
        {!ischat.showchat && (<>
          <div className="Initbody">
          <img src="/image/chat.png"/>
          <p>당신의 지인과 채팅을 해보세요</p>
          <button onClick={AddchatHandler}>초대하기</button>
        </div>
        </>)}
        {ischat.Addchat && (<AddChat onClose={AddClose} ChatShow={chatList} onDuple={DupleHandler} OnOneDuple={OneToOneDuple} 
        Profile={myinfo.Profile} Nickname={myinfo.UserNickName}/>)}
        {ischat.showchat && (<div className="chatcontents">
          <Outlet />
        </div>)}
        {ischat.isDuple &&(<>
        <Dupleroom Items={dupldata} onMovechat={TypeChatHandler}/>
        </>)}
        <ChatMainSide OnclickSearch={Active_Search}/>
        {isSearch && (<Side_Search />)}        
        </WebSocker_Provider>)
}

export default ChatMain;
//                            +--------------------
//----------------------------+ 외부 라이브로리
//                            +--------------------
//#region type 
import { useContext, useEffect, useState ,useRef} from "react";
import { Outlet, useNavigate , useParams ,useLocation} from "react-router-dom";
import axios from "axios";
import {Cookies} from 'react-cookie';
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
//                             +--------------------
//-----------------------------+    변수 타입
//                             +--------------------
//#region type
type My_IFOS={
  Mnick:string;
  Mprofile:string;
 }

 type duple_infos ={
 ChatId:string;
 ChatTitle:string;
 ChatCtDate:string;
 }


 type ChatList_infos={
  CreateDate:string,
  RoomName:string,
  chat_Id:string,
  userCount:number,
  Members:Userfos[]
 }


 type Userfos={
  Img:string,
  Nickname:string,
  UserId:string
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
   const[isDuple, setIsDuple]=useState<boolean>(false);
   const[againlogin, setAgainlogin]=useState<boolean>(false);
   const[isperist, setIsperist]=useState<boolean>(false);
   const[ctList_Info, setCtList_Info]=useState<ChatList_infos[]>([])
   const[myinfos, setMyinfos]=useState<Userfos>({
    Img:"",
    Nickname:"",
    UserId:""
   })

//#endregion

//              +-----------------
//--------------+ 전역 변수
//              +-----------------
//#region type
const navigate = useNavigate();
const param=useParams();
const chattitle=useRef("");
const chatid=useRef("");
const focusid=useRef("");
const chatDate=useRef("");
const isFirst=useRef<boolean>(false);
const chatdata=useRef<object[]>([]);
const imgdata=useRef<string[]>([]);
const myinfo=useContext(user_info);
const Dpchat=useRef<object[]>([]); 
const Dpimgdata=useRef<string[]>([]);
const Dpchattitle=useRef("");
const Dpchatid=useRef("");
const DpchatDate=useRef("");
const Chatinfo =useContext(ShowChatContext);
const location = useLocation();
const { focusId, isFromAlarm } = location.state || {};
const cookies = new Cookies();
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
          if(response.status == 200){
            console.log("토큰 인증 성공");
            if(isFromAlarm === undefined){
              const id:string =localStorage.getItem("id")! ;
              axios.get("http://localhost:8089/Pets-social/Chat/reload" , {params:{Id:id}})
              .then((response) =>{
                console.log("새로고침 데이터 가져오기기 : " , response.data.data);
                setMyinfos(response.data.data.Myinfo);
                setCtList_Info(response.data.data.ChatList);
                setIschat({...ischat ,islist:true ,showchat:false})
                myinfo.addeNickName(response.data.data.Myinfo.Nickname);
                myinfo.addprofile(response.data.data.Myinfo.Img)
     
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
            }else{
              const id:string =localStorage.getItem("id")!;
              axios.get("http://localhost:8089/Pets-social/Chat/getFocusList" , {params:{Id:id, ChatId:focusId}})
              .then((response) =>{
               console.log("채팅 리스트 조회 결과 : " ,response);
               setCtList_Info(response.data.data.ChatList);
               setIschat({...ischat ,islist:true ,showchat:true})
               setMyinfos(response.data.data.Myinfo);
               myinfo.addeNickName(response.data.data.Myinfo.Nickname);
               myinfo.addprofile(response.data.data.Myinfo.Img);

               Chatinfo.insert_values(focusId,response.data.data.RoomInfo.Name, response.data.data.RoomInfo.Member.Members,[],
                response.data.data.RoomInfo.Member.CreateDate,isFirst.current , myinfo.UserNickName , myinfo.Profile);
              setIschat({AddChat:false , showchat:true, islist:true});
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

   
          }
        }).catch((error) =>{
           if(axios.isAxiosError<ResponseDataType>(error)){
               console.log("error code: " , error.response?.status);
               
               if(error.response?.status==400){
                 navigate("/error");
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
                              console.log("응답 결과 :" , response)
                              if(response.status == 200){
                                localStorage.setItem("p_exp" ,response.data.data.exp);
                                localStorage.setItem("a_id" ,response.data.data.access_token);
                                navigate("/main");
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
               }
               
               console.log("error response: " , error.response?.data);
             }
        })
    },[]);


    const AddClose =() =>{
    setIschat({...ischat ,Addchat:false });
    }

    const chatList =(data:Userfos[] , img:string[] ,name:string , roomid:string, date:string) =>{
    console.log("보여줄 데이터 :" , data);
      const myinfo_add:Userfos[]=[...data];
      const Id = localStorage.getItem("id")!;

      myinfo_add.push({Img:myinfo.Profile,Nickname:myinfo.UserNickName, UserId:Id });
      setIschat({AddChat:false , showchat:false, islist:false});
      let ChatList_add:ChatList_infos[]=[...ctList_Info];
      ChatList_add.push({
        CreateDate: date,
        RoomName: name,
        chat_Id: roomid,
        userCount: data.length,
        Members: myinfo_add
      });
      setCtList_Info(ChatList_add);
      isFirst.current= true;
      focusid.current = roomid;
      Chatinfo.insert_values(roomid,name, myinfo_add,img,
        date,isFirst.current , myinfo.UserNickName , myinfo.Profile);
      setIschat({AddChat:false , showchat:true, islist:true});
      navigate(`/main/chat/${roomid}`);

    }

    const DupleHandler =(data:object) =>{
      setDupldata(data);
      setIschat({...ischat ,Addchat:false , isDuple:true});
    }

    const TypeChatHandler =(type:string, id:string, name:string , chat:any[], img:string[]) =>{
      if(type="move"){
        chatdata.current= chat;
        chattitle.current =name;
        setIschat({...ischat ,isDuple:false});
      }
      else{
       console.log("채팅 생성");
      }
      
    }

    const onClickshow =(data : object) =>{
      setIschat({...ischat ,showchat:false});
     Object.entries(data).map((key) =>{
      if(key.at(0) =="userinfos"){
        chatdata.current= key[1];
      }
      else if(key.at(0) =="room_id"){
        chatid.current= key[1];
        focusid.current = key[1];

      }
      else if(key.at(0) =="room_name"){
        chattitle.current=key[1];
      }
      else if(key.at(0) =="create_date"){
         chatDate.current= key[1];
      }
     })
       console.log("chatid :" ,focusid.current)
      setIschat({...ischat ,showchat:true });
      setIssocket(true);
      Chatinfo.insert_values(chatid.current,chattitle.current, chatdata.current,imgdata.current,
        chatDate.current,isFirst.current , myinfo.UserNickName , myinfo.Profile);
       setIschat({AddChat:false , showchat:true, islist:true});
 
       navigate(`/main/chat/${chatid.current}`);
    }

    const Active_Search =(data:boolean) =>{
      if(data == true){
        setIsSearch(true);
      }
      else{
        setIsSearch(false);
      }

    }

    const OneToOneDuple =(MemList: object[], Chat_info: duple_infos, Myinfos: My_IFOS, ImageList:string[]) =>{
      Dpchat.current=MemList;
      Dpchattitle.current=Chat_info.ChatTitle
      Dpchatid.current=Chat_info.ChatId
      Dpimgdata.current=ImageList;
      DpchatDate.current=Chat_info.ChatCtDate
      setIsDuple(true);
      Chatinfo.insert_values(Dpchatid.current,Dpchattitle.current, Dpchat.current,Dpimgdata.current,
        DpchatDate.current,isFirst.current , Myinfos.Mnick, Myinfos.Mprofile);
      setIschat({AddChat:false , showchat:true, islist:true});
      navigate(`/main/chat/${chatid.current}`);
     
    }

    return(<WebSocker_Provider>
        <div className="Side">
            <div className="Myinfo">
              <div className="Profile">
                 <img src={myinfos.Img}/>
              </div>
              <h3>{myinfos.Nickname}</h3>
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
                <ChatList ChatListinfo={ctList_Info} showcontents={onClickshow} isFocusid={focusid.current} IsDuple={isDuple}/>
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
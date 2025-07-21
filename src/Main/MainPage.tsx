
//                            +--------------------
//----------------------------+ 외부 라이브러리
//                            +--------------------
//#region type 
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import moment from"moment";
import {Cookies} from 'react-cookie';
import { useNavigate  ,useParams} from "react-router-dom";
import axios from "axios";
 //#endregion

//                            +--------------------
//----------------------------+ 내부 라이브러리
//                            +--------------------
//#region type 
 import DropDownItem from "../Dropdow/DropDownItem";
 import MainSide from "./Side/MainSide";
 import MainContentsx from "./Contents/MainContents";
 import "./MainPage.scss";
 import user_info from "../Context/Userdata";
 import LoginExp from "../LginExpiration/LoginExp";
 import WebSocker_Provider from "../Context/WebSocker_Provider";
 import WebSocketAlarm_Provider from "../Context/WebSocketAlarm_Provider";
import AlarmMain from "./Alarm/AlarmMain";
import logimg from "../assets/images/log.png";
import { set } from "lodash";
 //#endregion

//                            +--------------------
//----------------------------+ 인터페이스
//                            +--------------------
//#region type 
interface ResponseDataType {
      message: string;
      code: number;
      response:object
    }

    
interface ResponseDataType {
  message: string;
  code: number;
  response:object;
  resultdata:any;
}
//#endregion

//                            +--------------------
//----------------------------+ type
//                            +--------------------
//#region type
type Noti_Kind={
  Chat:ChatNoti[];
}

type ChatNoti={
  ChatId:string;
  IsRead:boolean;
  MessageId:string;
  RoomName:string;
  UserId:string;
  message:string;
  nickname:string;
  profile:string;
  sendId:string;
  timestamp:string;
  type:string;
  Count:number;
}
//#endregion

 const MapinPage= () =>{      
      const[NickName, setNickName]=useState<string>("");
      const[profile, setProfile]=useState<string>("");
      const[id, setId]=useState<string>("");
      const[dropdow, setDropdow]=useState<boolean>(false);
      const[dropblur, setDropblur]=useState<boolean>(false);
      const [content , setContent]=useState<string[]>([]);
      const[contentitem  ,setContentitem]=useState<boolean>(false);
      const[isloading ,setIsloading]=useState<boolean>(false);
      const[isready, setIsready]=useState<boolean>(true);
      const[againlogin, setAgainlogin]=useState<boolean>(false);
      const[isperist, setIsperist]=useState<boolean>(false);
      const[isAlarm , SetIsAlarm]=useState<boolean>(false);
      const[userid, setUserid]=useState<string>("");
      const[noti, setNoti]=useState<Noti_Kind>()
      const[modal , setModal]=useState<boolean>(false);
      const [dataloaded,setDataLoaded]= useState<boolean>(false);



      const navigate = useNavigate();
      const login_info = useContext(user_info);
      const cookies = new Cookies();
      let uuid:any="";
      let p_exp:any="";
      let sessionid:any="";
      let s_id:any="";
      const param=useParams();

      useEffect(()=>{        
        setIsloading(true);
            p_exp=localStorage.getItem("p_exp");
            uuid = localStorage.getItem("page_uuid");
            sessionid = localStorage.getItem("a_id");
            s_id = localStorage.getItem("id");
            let date = new Date(p_exp*1000);
            let dates = moment(date).format('YYYY-MM-DD HH:mm');
            
            if(moment(dates).diff(moment()) > 0){

                  let access_token:string="";
                  let id:any;
                  id=localStorage.getItem("id");
                  
                  if(param.userid != undefined) {
                    setContentitem(false);
                    navigate(`/main/${param.userid}`);
                  }
                  else{
                    setIsready(false);
                    access_token =localStorage.getItem("a_id")!;
                    axios.defaults.headers.common['Authorization'] = access_token;
                    axios.get("http://localhost:8080/Pets-social/acccheck").then(
                      response =>{
                        if(response.status == 200){
                          axios.get("http://localhost:8080/Pets-social/refresh-main" , {params:{Id:id}})
                          .then(response =>{
                            console.log("메인 페이지 새로고침 :" , response.data.resultdata.Noti)
                             if(response.status == 200){
                              setNoti(response.data.resultdata.Noti);
                              setContent(response.data.resultdata.content_info);
                              setNickName(response.data.resultdata.nickname);
                              const progile:string=response.data.resultdata.profile_img;
                              if(progile =="null"){
                                setProfile("/image/baseimg.png");
        
                              }
                              else{
                                setProfile(response.data.resultdata.profile_img);
                              }
                              login_info.addprofile(response.data.resultdata.profile_img);
                              login_info.addeNickName(response.data.resultdata.nickname);
                              setId(response.data.resultdata.id);
                              setContentitem(true);
                             }
                             else if(response.status == 201){
                              setContent([]);
                              setNickName(response.data.resultdata.nickname);
                              const progile:string=response.data.resultdata.profile_img;
                              if(progile =="null"){
                                setProfile("/image/baseimg.png");
        
                              }
                              else{
                                setProfile(response.data.resultdata.profile_img);
                              }
                              login_info.addprofile(response.data.resultdata.profile_img);
                              login_info.addeNickName(response.data.resultdata.nickname);
                              setId(response.data.resultdata.id);
                              setContentitem(true);
                             }
                             setIsready(true);
        
                    }).catch(error =>{
                          if(axios.isAxiosError<ResponseDataType>(error)){
                                      console.log("error code: " , error.response?.status);
                                      
                                      if(error.code=="ERR_BAD_REQUEST"){
                                        navigate("/error");
                                      }

                                      else if(error.response?.status==500){
                                        console.log("서버 에러발생");
                                        navigate("/error/se-error")
                                      }
                                      
                                      console.log("error response: " , error.response?.data);
                                    }
                      })
                        }
                      }
                    ).catch((error) =>{
                if(axios.isAxiosError<ResponseDataType>(error)){
               
                      if(error.response?.status == 400){
                        navigate("/error");
                          }
                        else if(error.response?.status == 401){
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
                                                    setUserid(error.response?.data.resultdata);
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
             }
            })
                  }
                    
            }
            else{
              console.log("로그인 유지 시간 만료");
              setNickName("");
              navigate("/login");

            }

      },[]);
      
      const MainClick =() =>{
        console.log("메인 페이지 이동");
        setContentitem(true);
        //navigate("/main")
        setIsloading(true);
            console.log("파라미터 존재 확인 :" , param.userid);
            p_exp=localStorage.getItem("p_exp");
            uuid = localStorage.getItem("page_uuid");
            sessionid = localStorage.getItem("a_id");
            s_id = localStorage.getItem("id");
            console.log("만료 시간 :" , p_exp);
            let date = new Date(p_exp*1000);
            console.log("변환 날짜 :" + date);
            let dates = moment(date).format('YYYY-MM-DD HH:mm');
            console.log("date : " + dates);
            
            if(moment(dates).diff(moment()) > 0){

                  console.log("시간 : " , moment(dates).diff(moment()));
                  console.log("로그인 ");
                  let access_token:string="";
                  let id:any;
                  id=localStorage.getItem("id");
  
                    setIsready(false);
                    access_token =localStorage.getItem("a_id")!;
                    console.log("access : " , access_token);
                    axios.defaults.headers.common['Authorization'] = access_token;
                    console.log("메인 화면 리로딩시 아이디값 :" ,id)
                    axios.get("http://localhost:8080/Pets-social/acccheck").then(
                      response =>{
                        if(response.status == 200){
                          console.log("엑세스 토큰 확인")
                          axios.get("http://localhost:8080/Pets-social/refresh-main" , {params:{Id:id}})
                          .then(response =>{
                            console.log("메인 페이지 새로고침 :" , response.data.resultdata.Noti)
                             if(response.status == 200){
                              setNoti(response.data.resultdata.Noti);
                              setContent(response.data.resultdata.content_info);
                              setNickName(response.data.resultdata.nickname);
                              const progile:string=response.data.resultdata.profile_img;
                              if(progile =="null"){
                                setProfile("/image/baseimg.png");
        
                              }
                              else{
                                setProfile(response.data.resultdata.profile_img);
                              }
                              login_info.addprofile(response.data.resultdata.profile_img);
                              login_info.addeNickName(response.data.resultdata.nickname);
                              setId(response.data.resultdata.id);
                              setContentitem(true);
                             }
                             else if(response.status == 201){
                              setContent([]);
                              setNickName(response.data.resultdata.nickname);
                              const progile:string=response.data.resultdata.profile_img;
                              if(progile =="null"){
                                setProfile("/image/baseimg.png");
        
                              }
                              else{
                                setProfile(response.data.resultdata.profile_img);
                              }
                              login_info.addprofile(response.data.resultdata.profile_img);
                              login_info.addeNickName(response.data.resultdata.nickname);
                              setId(response.data.resultdata.id);
                              setContentitem(true);
                             }
                             setIsready(true);
                    }).catch(error =>{
                          if(axios.isAxiosError<ResponseDataType>(error)){
                                      console.log("error code: " , error.response?.status);
                                      
                                      if(error.response?.status == 400){
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
                                                  console.log("토큰 시간 만료 refresh token을 보낸다");
                                                  const refresh_token= cookies.get('refresh_token');
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
                                                        //todo: 엑세스 토큰과 만료 시간을 재설정하고 사용자의 아아디, 닉네임, 이미지를 가져오면 된다.
                                                        const accesstoken = localStorage.getItem("a_id")!;
                                                        axios.defaults.headers.common['Authorization'] = accesstoken;
                                                        //todo:re
                                                        axios.get("http://localhost:8080/Pets-social/refresh-main" , {params:{Id:id}})
                                                        .then(response =>{
                                                           console.log("응답 결과 확인 " , response.data);
                                                           if(response.status == 200){
                                                            setContent(response.data.resultdata.content_info);
                                                            setNickName(response.data.resultdata.nickname);
                                                            const progile:string=response.data.resultdata.profile_img;
                                                            console.log("progile :", progile);
                                                            if(progile =="null"){
                                                              console.log("등록된 사진이 없습니다");
                                                              setProfile("/image/baseimg.png");
                                      
                                                            }
                                                            else{
                                                              setProfile(response.data.resultdata.profile_img);
                                                            }
                                                            login_info.addprofile(response.data.resultdata.profile_img);
                                                            login_info.addeNickName(response.data.resultdata.nickname);
                                                            setId(response.data.resultdata.id);
                                                            setContentitem(true);
                                                           }
                                                           else if(response.status == 201){
                                                            setContent([]);
                                                            setNickName(response.data.resultdata.nickname);
                                                            const progile:string=response.data.resultdata.profile_img;
                                                            console.log("progile :", progile);
                                                            if(progile =="null"){
                                                              console.log("등록된 사진이 없습니다");
                                                              setProfile("/image/baseimg.png");
                                      
                                                            }
                                                            else{
                                                              setProfile(response.data.resultdata.profile_img);
                                                            }
                                                            login_info.addprofile(response.data.resultdata.profile_img);
                                                            login_info.addeNickName(response.data.resultdata.nickname);
                                                            setId(response.data.resultdata.id);
                                                            setContentitem(true);
                                                           }
                                                           setIsready(true);
                                                           navigate("/main");
                                                  })
                                                        
                                                      }
                                                    }
                                                  ).catch(error =>{
                                                    if(axios.isAxiosError<ResponseDataType>(error)){
                                                                console.log("error code: " , error.response?.status);
                                        
                                                                if(error.response?.status==400){
                                                                  navigate("/error/BadRequest");
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
                                                                    setUserid(error.response?.data.resultdata);
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

                                                              }
                                                })
                                                  
            
                                              }
                                            }
                                           })
                                      }
                                      else if(error.response?.status==500){
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
                        }
                      }
                    ).catch((error) =>{
           if(axios.isAxiosError<ResponseDataType>(error)){
               console.log("error code: " , error.response?.status);
               
               if(error.response?.status ==400){
                navigate("/error/BadRequest");
                return;
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
            }
            else{
              console.log("로그인 유지 시간 만료");
              setNickName("");
              navigate("/login");
            }

      }

      const SideHandler =(data:boolean) =>{
        setContentitem(data);
      }

      const ContentDisActive =(data:any) =>{
        const ischeck: boolean = data.isDisactive; 
        const user_id:string= data.userid;
        setContentitem(ischeck);
        navigate(`/main/${user_id}`);
      }
      const contentHandler =() =>{
        const Myid= localStorage.getItem("id");
        navigate(`/main/${Myid}`);
        setContentitem(false);
      }
      const handleDataLoaded = () => {
        setDataLoaded(true); // 데이터 로딩 완료
        setIsloading(false); // 로딩 화면 해제
      };

      const AlarmClick =() =>{
        if(isAlarm == false){
          SetIsAlarm(true);
        }else{
          SetIsAlarm(false);
        }
        
      }
    const ModalHandler =() =>{
      setModal(true)
    }

  const ModalClose =() =>{
   setModal(false);
  }
    return(<WebSocketAlarm_Provider>
    <WebSocker_Provider>
    <div className="MainPage_back">
        {againlogin && (<LoginExp />)}
        <div className="MainPage_log" onClick={MainClick}>
            <img src={logimg} alt="애완멀" ></img>
            <h3>ALL_Pets</h3>
            </div>
          <MainSide img={profile}  nickname={NickName} id={id} onside={SideHandler} onProfile={() =>{
            contentHandler();
          }} isReady={isready} Noti={noti} AlarmClick={AlarmClick}/>
          <div className="Main_Contents">
            <h2>당신의 이야기를 공유해보세요</h2>
            <input  placeholder="당신에 반려견과의 일상을 공유해보세요"
              /*disabled={!disable}*/
              onClick={ModalHandler}/>
          </div>  
          <Outlet />
          {isAlarm && (<>
          <AlarmMain AlarmData={noti}/>
          </>)}
          {contentitem && (<div>
            <MainContentsx img={profile}  nickname={NickName} content={content} onDisActive={ContentDisActive} onload={handleDataLoaded}
            openmodal={modal} onclose={ModalClose}/>
            </div>)}
          {dropdow===true && dropblur === false ?  (<DropDownItem img={profile}  nickname={NickName} />):<></>}

         
    </div>
    </WebSocker_Provider>
    </WebSocketAlarm_Provider>)
}

export default MapinPage;
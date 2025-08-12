
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
import baseprofile from "../assets/images/baseimg.png"
import {api } from "../API/Api";

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

interface CustomError{
  errorcode:string;
  message :string
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
      const param=useParams();

      useEffect(()=>{        
        setIsloading(true);

        let access_token:string="";
        let id:any;
        id=localStorage.getItem("id");
        
        if(param.userid != undefined) {
          setContentitem(false);
          navigate(`/main/${param.userid}`);
        }
        else{
          setIsready(true);
          //setIsready(false);
          access_token =localStorage.getItem("a_id")!;
          
          api.defaults.headers.common['Authorization'] = access_token;
          api.post("/Pets-social/gateway/api-proxy" ,{
              service: "common",
              endpoint: "main/refresh-main",
              method: "GET",
              body: {Id:id}
          },{
              withCredentials: true
          }).then(response =>{
              console.log("메인 페이지 새로고침 :" , response.data)
                if(response.status == 200){
                  console.log("아니 그럼 여기 와야지")
                setNoti(response.data.data.Noti);
                setContent(response.data.data.content_info);
                setNickName(response.data.data.nickname);
                const progile:string=response.data.data.profile_img;
                if(progile =="null"){
                  setProfile(baseprofile);

                }
                else{
                  setProfile(response.data.data.profile_img);
                }
                login_info.addprofile(response.data.data.profile_img);
                login_info.addeNickName(response.data.data.nickname);
                setId(response.data.data.id);
                setContentitem(true);
                }
                else if(response.status == 201){
                setContent([]);
                setNickName(response.data.data.nickname);
                const progile:string=response.data.data.profile_img;
                if(progile =="null"){
                  setProfile(baseprofile);
                }
                else{
                  setProfile(response.data.data.profile_img);
                }
                login_info.addprofile(response.data.data.profile_img);
                login_info.addeNickName(response.data.data.nickname);
                setId(response.data.data.id);
                setContentitem(true);
                }
          }).catch(error =>{
              if(axios.isAxiosError<ResponseDataType>(error)){
                  console.log("error code: " , error.response?.status);
                  if(!error.response) {
                        console.warn("서버 응답 없음 (게이트웨이 연결 실패)");
                        navigate("/error/Gateway"); // 502로 간주
                        return;
                  }
                  if(error.response?.status==400){
                      console.log("400에러 발생")
                      navigate("/error/BadRequest");
                    }
                    else if(error.response?.status==415){
                        console.log("지원하지 않는 형식입니다.")
                        setIsloading(false);
                    }
                    else if(error.response?.status==500){
                        navigate("/error/se-error")
                    }
                    else if(error.response?.status==502){
                        navigate("/error/Gateway");
                    }
              }
          })
        }

      },[]);
      
      const MainClick =() =>{
        console.log("메인 페이지 이동");
        setIsloading(true);
        let access_token:string="";
          setIsready(false);
          access_token =localStorage.getItem("a_id")!;
          api.defaults.headers.common['Authorization'] = access_token;
          api.post("/Pets-social/gateway/api-proxy" ,{
              service: "common",
              endpoint: "main/refresh-main",
              method: "GET",
              body: {Id:id}
          },{
              withCredentials: true
          }).then(response =>{
              console.log("로그 클릭 시 :" , response.data)
                if(response.status == 200){
                  console.log("아니 그럼 여기 와야지")
                setNoti(response.data.data.Noti);
                setContent(response.data.data.content_info);
                setNickName(response.data.data.nickname);
                const progile:string=response.data.data.profile_img;
                if(progile =="null"){
                  setProfile(baseprofile);

                }
                else{
                  setProfile(response.data.data.profile_img);
                }
                login_info.addprofile(response.data.data.profile_img);
                login_info.addeNickName(response.data.data.nickname);
                setId(response.data.data.id);
                setContentitem(true);
                }
                else if(response.status == 201){
                setContent([]);
                setNickName(response.data.data.nickname);
                const progile:string=response.data.data.profile_img;
                if(progile =="null"){
                  setProfile(baseprofile);
                }
                else{
                  setProfile(response.data.data.profile_img);
                }
                login_info.addprofile(response.data.data.profile_img);
                login_info.addeNickName(response.data.data.nickname);
                setId(response.data.data.id);
                setContentitem(true);
                }
          }).catch(error =>{
              if(axios.isAxiosError<ResponseDataType>(error)){
                  console.log("error code: " , error.response?.status);
                  if(!error.response) {
                        console.warn("서버 응답 없음 (게이트웨이 연결 실패)");
                        navigate("/error/Gateway"); // 502로 간주
                        return;
                  }
                  if(error.response?.status==400){
                      console.log("400에러 발생")
                      navigate("/error/BadRequest");
                    }else if(error.response?.status==415){
                        console.log("지원하지 않는 형식입니다.")
                        setIsloading(false);
                    }
                    else if(error.response?.status==500){
                        navigate("/error/se-error")
                    }
                    else if(error.response?.status==502){
                       navigate("/error/Gateway");
                    }
                  
              }
          })
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
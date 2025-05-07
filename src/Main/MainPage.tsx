
//                            +--------------------
//----------------------------+ 외부 라이브러리
//                            +--------------------
//#region type 
import { Fragment, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import moment from "momnet";
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
 import WebSocker_Info from"../Context/WebSocketContext";
 import WebSocker_Provider from "../Context/WebSocker_Provider";
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

 const MapinPage= () =>{      
      const[NickName, setNickName]=useState<string>("");
      const[profile, setProfile]=useState<string>("");
      const[id, setId]=useState<string>("");
      const[dropdow, setDropdow]=useState<boolean>(false);
      const[dropblur, setDropblur]=useState<boolean>(false);
      const [content , setContent]=useState<string[]>([]);
      const[contentitem  ,setContentitem]=useState<boolean>(false);
      const[soket, setSoket]=useState<boolean>(false);
      const[socket, setSocket]=useState<number>(0);
      const[isloading ,setIsloading]=useState<boolean>(false);
      const[isready, setIsready]=useState<boolean>(true);
      const[againlogin, setAgainlogin]=useState<boolean>(false);
      const[isperist, setIsperist]=useState<boolean>(false);
      const[userid, setUserid]=useState<string>("");
      

      const navigate = useNavigate();
      const login_info = useContext(user_info);
      const WebSocket_info = useContext(WebSocker_Info);
      const cookies = new Cookies();
      let uuid:any="";
      let p_exp:any="";
      let sessionid:any="";
      let s_id:any="";
      let message:string="";
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
                             if(response.status == 200){
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
      

      useEffect(() =>{
              //console.log("웹 소켓 정보 :" , WebSocker_Info.Provider);
                         /*
                        let id:any;
                        id=localStorage.getItem("id");
                        const ws = new WebSocket("ws://127.0.0.1:8083/login");
                        console.log("ws : " ,ws)
                        ws.onopen = () => {
                          console.log("✅ WebSocket 연결됨");
                          const type = "login";
                          ws.send(JSON.stringify({ Id: id, type }));
                        };
                      
                        ws.onmessage = (event) => {
                          const data = JSON.parse(event.data);
                          console.log("서버에서 받은 메시지:", data);
                        };
                      
                        ws.onerror = (error) => {
                          console.error("❌ WebSocket 에러 발생:", error);
                        };
                      
                        ws.onclose = () => {
                          console.log("🔌 WebSocket 연결 종료");
                        };
                      
                        return () => {
                          ws.close(); // 컴포넌트 언마운트 시 연결 종료
                        };
        */
      },[])
      

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
            //cookies.set("Sessionid" , sessionid);
            //cookies.set("p_exp" , p_exp);
            //cookies.set("id" , s_id);
            
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
                    }).catch(error =>{
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
                    ).catch((error) =>{
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
      const [dataloaded,setDataLoaded]= useState<boolean>(false);
      const handleDataLoaded = () => {
        setDataLoaded(true); // 데이터 로딩 완료
        setIsloading(false); // 로딩 화면 해제
      };
    return(<WebSocker_Provider>
    <div >
        {againlogin && (<LoginExp />)}
        <div className="MainPage_log" onClick={MainClick}>
            <img src="/image/log_test.jpg" alt="애완멀" ></img>
            <h3>ALL_Pets</h3>
            </div>
          <MainSide img={profile}  nickname={NickName} id={id} onside={SideHandler} onProfile={() =>{
            contentHandler();
          }} isReady={isready}/>         
          <Outlet />
          {contentitem && (<div>
            <MainContentsx img={profile}  nickname={NickName} content={content} onDisActive={ContentDisActive} onload={handleDataLoaded}/>
            </div>)}
          {dropdow===true && dropblur === false ?  (<DropDownItem img={profile}  nickname={NickName} />):<></>}

         
    </div>
    </WebSocker_Provider>)
}

export default MapinPage;
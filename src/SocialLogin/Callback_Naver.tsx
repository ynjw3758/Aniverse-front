import {Oval} from "react-loader-spinner";
import axios from "axios";
import { useEffect , useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Cookies} from 'react-cookie';


import "./Callback_Naver.scss";
import user_info from "../Userdata/Userdata";
import LoginExp from "../LginExpiration/LoginExp";


interface ResponseDataType {
    message: string;
    code: number;
    response:object;
    resultdata:any;
  }

  interface ResponseDataTypetest {
    code:number;
    data:any;
    msg:string;

  }

const Callback_Naver =() =>{
    const[againlogin, setAgainlogin]=useState<boolean>(false);
    const[isperist, setIsperist]=useState<boolean>(false);
    const[userid, setUserid]=useState<string>("");
    const[isfirst, setIsfirst]=useState<boolean>(false);
    const[isvalid, setIsvalid]=useState<boolean>(false);
    const[isunvalid, setIsunvalid]=useState<boolean>(false);
    const[isSubmit, setIsSubmit]=useState<boolean>(true);
    const[nickname, setNickname]=useState<string>("");

    const isblur=isperist ? "Naver_Isblur " : "Naver_loding_main"; 
    let Code = new URL(window.location.href).searchParams.get("code");
    let state = new URL(window.location.href).searchParams.get("state");
    const login_info = useContext(user_info);
    const navigate = useNavigate();
    const cookies = new Cookies();
    let refresh_token:string =""

    useEffect(() =>{
        let header:any="";
        header =localStorage.getItem("a_id");
          
          console.log("access_token존재 : " , header);
          if(header !== null){
            console.log("엑세스 토큰 존재");
           axios.defaults.headers.common['Authorization'] = header;
           axios.get("http://localhost:8080/Pets-social/oauth/naver" , {params:{Code:Code, State:state}})
           .then(response =>{
               console.log("response : " , response);

               login_info.addprofile(response.data.data.profile_img);
               login_info.addthumbnail(response.data.data.thumbnail_img);
               login_info.addeNickName(response.data.data.nickname);
               navigate("/main");
               return ;
   
           }).catch(error =>{
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
                               console.log("승인되지 않은 로그인");
                               Object.entries(error.response?.data).map(key =>{
                                if(key.at(0) == "errorcode"){
                                  if(key.at(1) == "00"){
                                    navigate("/error/auth/");
                                    return;
                                  }
                                  else if(key.at(1) == "01"){
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
                           else if(error.response?.status==301){
                               console.log("카카오와 계정 연동");
                               setIsperist(true);
                               setUserid(error.response?.data.resultdata);
                           }
   
                           
                           console.log("error response: " , error.response?.data.response);
                         }
           })
       }
       else{
           console.log("신규 회원");
           axios.get("http://localhost:8080/Pets-social/oauth/naver" , {params:{Code:Code, State:state} ,withCredentials: true})
           .then(response =>{
          console.log("결과 : " ,response)
            if(response.status == 201){
              login_info.addprofile(response.data.data.profile_img);
              login_info.addeNickName(response.data.data.nickname);
  
              localStorage.setItem("a_id" , response.headers.authorization);
              localStorage.setItem("p_exp" , response.data.data.exp);
              localStorage.setItem("id" , response.data.data.id);
              refresh_token= cookies.get('refresh_token');
              console.log("refreshToken : " ,refresh_token)
              setIsperist(true);
              setIsfirst(true);
              console.log("isfirst :" , isfirst);
            }
            else{
              if(response.data.Customcode == "01"){
                console.log("모든 토큰 재발급 ");
                localStorage.setItem("p_exp" , response.data.data.exp);
                localStorage.setItem("a_id" , response.data.data.access_token);
                localStorage.setItem("id" , response.data.data.id);
              }
            }

               navigate("/main");
                return ;
   
           }).catch(error =>{
               if(axios.isAxiosError<ResponseDataTypetest>(error)){
                           console.log("error code: ", error);
                           if(error.response?.status==301){
                             console.log("리다이랙트");
                             console.log("결과값 : " , error.response.data.data.kakao_info);
                             login_info.addemail(error.response?.data.data.email);
                             login_info.addid(error.response?.data.data.id);
                             login_info.adddate(error.response?.data.data.insert_date);
                             login_info.addkakaoinfo(error.response.data.data.kakao_info);
                             navigate("/link");
                             return;
                           }
                           else if(error.code=="ERR_BAD_REQUEST"){
                             navigate("/error");
                             return ;
                           }
                           else if(error.code == "ERR_NETWORK"){
                             return;
                             
                           }
                           else if(error.response?.status==401){
                                  return;
                           }
                           
                           //console.log("error response: " , error.response?.data);
                         }
           })
           
       }

    },[])

    const InputHandler =(event:React.ChangeEvent<HTMLInputElement>) =>{
      setNickname(event.target.value);
      if(event.target.value.length == 0){
        setIsvalid(false);
        setIsunvalid(false);
      }
    }

    const dupleHandler =() =>{
      let access_token:string="";
      access_token =localStorage.getItem("a_id")!;
      console.log("access : " , access_token);
      axios.defaults.headers.common['Authorization'] = access_token;
      axios.get("http://localhost:8080/Pets-social/acccheck").then(  response =>{
        if(response.status == 200){
          console.log("엑세스 토큰 인증 완료");
          axios.get("http://localhost:8080/Pets-social/dupl-nick", {params:{nickname:nickname}})
          .then(response => {
             console.log("결과값 : " , response.data);
             if(response.status == 200){
                 console.log("닉네임 성공");
                 setIsvalid(true);
                 setIsunvalid(false);
             }
          })
          .catch(error =>{
             if(axios.isAxiosError<ResponseDataType>(error)){
                 console.log("error code: " , error.code);
                 
                 if(error.code=="ERR_BAD_REQUEST"){
                    setIsunvalid(true);
                    setIsvalid(false);
     
                   
                 }
                 if(error.code == "ERR_NETWORK"){
                   console.log("네트워크 에러 ");
                   
                 }
     
                 if(error)
                 console.log("error response: " , error.response?.data);
               }
     
          });
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
            if(error.response?.status==500){
              console.log("서버 에러발생");
              navigate("/error/se-error")
            }
            
            console.log("error response: " , error.response?.data);
          }
         })
     
    }

    useEffect(() =>{
      if(isvalid == true){
        setIsSubmit(false);
      }
      else{
        setIsSubmit(true);
      }

    },[isvalid, isSubmit])

    const submitHandler =() =>{
       
    }

    const movelogin =() =>{
      navigate("/login")
    }

    return(<>
           {againlogin && (<LoginExp />)}
           {isfirst && (<div className="Callback_naver_nicksetting">
            <p>자기의 개성을 드러내는 닉네임을 사용해보세요</p>
            <div className="callback_naver_dupl">
              <input placeholder="닉네임 입력" onChange={InputHandler} value={nickname}/>
              <button onClick={dupleHandler}>중복 확인</button>
            </div>
            {isvalid && (<>
            <p>✅ 사용 가능한 닉네임입니다.</p>
            </>)}
            {isunvalid && (<>
            <p>❌ 이미 사용 중인 닉네임입니다.</p>
            </>)}
             <button onClick={submitHandler} disabled={isSubmit}>완료</button>
           </div>)}

            <div className={isblur}>
                <h2>로그인 중입니다</h2>
               <h3>잠시만 기다려주세요...</h3> 
              <Oval 
                      color="#ff0000" 
                      height={100} 
                      width={100}
                   />
            </div>
    </>)

}

export default Callback_Naver;
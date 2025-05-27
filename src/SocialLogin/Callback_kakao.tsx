import "./Callback_kakao.scss";  
import {Oval} from "react-loader-spinner";
import axios from "axios";
import { useEffect , useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import user_info from "../Context/Userdata";
import { Cookies } from "react-cookie";
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

const Callbackkakao =() =>{
    const[isperist, setIsperist]=useState<boolean>(false);
    const[userid, setUserid]=useState<string>("");
    const[againlogin, setAgainlogin]=useState<boolean>(false);

    let Code = new URL(window.location.href).searchParams.get("code");
    console.log("code : ", Code);

    const navigate = useNavigate();
    const login_info = useContext(user_info);
    const isblur= isperist ? "kakao_Isblur " : "kakao_loding_main";
    const cookies = new Cookies();
    let refresh_token:string =""

    useEffect(() =>{
      let header:any="";
      header =localStorage.getItem("a_id");

        if(header !== null){
         console.log("엑세스 토큰 존재");
        axios.defaults.headers.common['Authorization'] = header;
        axios.get("http://localhost:8080/Pets-social/oauth/kakao" , {params:{Code:Code}})
        .then(response =>{
            console.log("response : " , response);
            console.log("response : " , response);

            login_info.addprofile(response.data.data.profile_img);
            login_info.addthumbnail(response.data.data.thumbnail_img);
            login_info.addeNickName(response.data.data.nickname);
            navigate("/main");
            return ;

        }).catch(error =>{
            if(axios.isAxiosError<ResponseDataType>(error)){
                        console.log("error code: " , error.response?.data.resultdata);

                        if(error.response?.status==400){
                          navigate("/error/BadRequest");
                          return;
                        }
                        else if(error.code == "ERR_NETWORK"){
                          console.log("네트워크 에러 ");
                          return;
                          
                        }
                        else if(error.response?.status == 401){
                            console.log("승인되지 않은 로그인");
                            console.log("왜 ?>" , error.response)
                            Object.entries(error.response?.data).map(key =>{
                              
                             if(key.at(0) == "errorcode"){
                               if(key.at(1) == "00"){
                                 navigate("/error/auth/");
                                 return;
                               }
                               else if(key.at(1) == "01"){
                                   console.log("토큰 시간 만료 refresh token을 보낸다");
                                   
                                   refresh_token= cookies.get('refresh_token');
                                   console.log("토큰 : " ,refresh_token)
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
        axios.get("http://localhost:8080/Pets-social/oauth/kakao" , {params:{Code:Code} ,withCredentials: true})
        .then(response =>{
          if(response.status == 201){
            login_info.addprofile(response.data.data.profile_img);
            login_info.addeNickName(response.data.data.nickname);

            localStorage.setItem("a_id" , response.headers.authorization);
            localStorage.setItem("p_exp" , response.data.data.exp);
            localStorage.setItem("id" , response.data.data.id);
            refresh_token= cookies.get('refresh_token');
            console.log("refreshToken : " ,refresh_token)
            setIsperist(true);
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
                        console.log("error code: ", error.response?.data);
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
                        if(error.response?.status ==400){
                          navigate("/error/BadRequest");
                        }


                      }
        })
        
    }
    },[]);
      console.log("리프레쉬 :" ,refresh_token);
    const kakao_integer =() =>{
      let header:any="";
      header =localStorage.getItem("a_id");
      console.log("access_token존재 : " , header);
      axios.defaults.headers.common['Authorization'] = header;

    }

    const kakao_create =() =>{
      let header:any="";
      header =localStorage.getItem("a_id");
      console.log("access_token존재 : " , header);
      axios.defaults.headers.common['Authorization'] = header;

    }

    const movelogin =() =>{
      navigate("/login")
    }
/*
    {!isperist && (<>
      <div className="kakao_perist">
          <h3>🐾 다시 만나서 반가워요!</h3>
          <p>{`(${userid}) 계정이 확인되었습니다.`}</p>
          <p>이 계정을 카카오 로그인과 연결하시겠어요?</p>
          <div className="kakao_perist">
          <button type="submit" onClick={kakao_integer}>통합하기</button>
          <button type="submit" onClick={kakao_create}>새 계정 만들기기</button>
          </div>
      </div>
      </>)}
      */
    return(<>
        {againlogin && (<LoginExp />)}
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

export default Callbackkakao;
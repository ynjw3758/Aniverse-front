import "./Callback_kakao.scss";  
import {Oval} from "react-loader-spinner";
import axios from "axios";
import { useEffect , useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import user_info from "../Userdata/Userdata";
import { Cookies } from "react-cookie";

interface ResponseDataType {
    message: string;
    code: number;
    response:object;
    resultdata:any;
  }

  interface ResponseDataTypetest {
    resultcode:number;
    resultdata:any;
    resultmsg:string;

  }

const Callbackkakao =() =>{
    const[isperist, setIsperist]=useState<boolean>(false);
    const[userid, setUserid]=useState<string>("");
    let Code = new URL(window.location.href).searchParams.get("code");
    console.log("code : ", Code);

    const navigate = useNavigate();
    const login_info = useContext(user_info);
    const isblur= isperist ? "kakao_Isblur " : "kakao_loding_main";

    useEffect(() =>{
      let header:any="";
      header =localStorage.getItem("a_id");
        
        console.log("access_token존재 : " , header);
        
        if(header !== null){
         console.log("엑세스 토큰 존재");
        axios.defaults.headers.common['Authorization'] = header;
        axios.get("http://localhost:8080/Pets-social/oauth/kakao" , {params:{Code:Code}})
        .then(response =>{
            console.log("response : " , response);
            if(response.status==201){
              console.log("기존 회원 로그인 토큰 재발급 후 로그인 성공");
              localStorage.setItem("p_exp" , response.data.resultdata.exp);
              localStorage.setItem("a_id" , response.headers.authorization);
              
            }
            login_info.addprofile(response.data.resultdata.profile_img);
            login_info.addthumbnail(response.data.resultdata.thumbnail_img);
            login_info.addeNickName(response.data.resultdata.nickname);
            navigate("/main");
            return ;

        }).catch(error =>{
            if(axios.isAxiosError<ResponseDataType>(error)){
                        console.log("error code: " , error.response?.data.resultdata);

                        if(error.code=="ERR_BAD_REQUEST"){
                          navigate("/error");
                          return;
                        }
                        if(error.code == "ERR_NETWORK"){
                          console.log("네트워크 에러 ");
                          return;
                          
                        }
                        if(error.response?.status==401){
                            console.log("승인되지 않은 로그인");
                            navigate("/error/auth/");
                            return;
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
        axios.get("http://localhost:8080/Pets-social/oauth/kakao" , {params:{Code:Code}})
        .then(response =>{
            console.log("status : " , response.status);
            console.log("data : " , response.data.resultdata.id);
            login_info.addprofile(response.data.resultdata.profile_img);
            login_info.addthumbnail(response.data.resultdata.thumbnail_img);
            login_info.addeNickName(response.data.resultdata.nickname);

            localStorage.setItem("a_id" , response.headers.authorization);
            localStorage.setItem("p_exp" , response.data.resultdata.exp);
            localStorage.setItem("id" , response.data.resultdata.id);

            navigate("/main");
             return ;

        }).catch(error =>{
            if(axios.isAxiosError<ResponseDataTypetest>(error)){
                        console.log("error code: ", error.response?.data);
                        if(error.response?.status==301){
                          console.log("리다이랙트");
                          console.log("결과값 : " , error.response.data.resultdata.kakao_info);
                          login_info.addemail(error.response?.data.resultdata.email);
                          login_info.addid(error.response?.data.resultdata.id);
                          login_info.adddate(error.response?.data.resultdata.insert_date);
                          login_info.addkakaoinfo(error.response.data.resultdata.kakao_info);
                          navigate("/link");
                          return;
                        }
                        if(error.code=="ERR_BAD_REQUEST"){
                          navigate("/error");
                        }
                        if(error.code == "ERR_NETWORK"){
                          console.log("네트워크 에러 ");
                          
                        }
                        if(error.response?.status==401){
                            console.log("승인되지 않은 로그인");

                        }
                        
                        //console.log("error response: " , error.response?.data);
                      }
        })
        
    }
    },[]);

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
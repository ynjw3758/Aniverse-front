import "./Callback_kakao.scss";  
import {Oval} from "react-loader-spinner";
import axios from "axios";
import { useEffect , useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import user_info from "../Context/Userdata";
import { Cookies } from "react-cookie";
import LoginExp from "../LginExpiration/LoginExp";
import {api ,PUBGATEWAY_URL} from "../API/Api"


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
  interface CustomError{
    errorcode:string;
    message :string;
    data:Connect_id_info;
    status:string;
    timestamp:string;
  }

  type Connect_id_info={
    createdate:string,
    id:string,
    email:string,
    profile:string,
    thumbnail:string,
    nickname:string,
    gender:string,
  }


type Kakao_infos={
  id:string,
  email:string,
  profile:string,
  thumbnail:string,
  nickname:string,
  gender:string,
} 

const Callbackkakao =() =>{
    const[isperist, setIsperist]=useState<boolean>(false);
    const[userid, setUserid]=useState<string>("");
    const[createdt, setCreatedt]=useState<string>("");
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
        api.defaults.headers.common['Authorization'] = header;
        api.post("/gateway/api-proxy" ,{
                service: "common",
                endpoint: "login/oauth/kakao",
                method: "GET",
                body: {code:Code}
            },{
                withCredentials: true
            }).then(response =>{
              console.log("카카오 로그인 :" , response)

              login_info.addprofile(response.data.data.profile_img);
              login_info.addthumbnail(response.data.data.thumbnail_img);
              login_info.addeNickName(response.data.data.nickname);
              navigate("/main");
              return ;
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
                        //setIsloading(false);
                    }
                    else if(error.response?.status==500){
                        navigate("/error/Lbse-error")
                    }
                    else if(error.response?.status==502){
                       navigate("/error/Gateway");
                    }
                  
              }
            })

    }
    else{
        console.log("신규 회원");
          api.get(`${PUBGATEWAY_URL}/login/oauth/kakao`,
          {
            params:{code:Code}
          }
        ).then(response =>{
                console.log("신규 회원 가입 :" , response)

                login_info.addprofile(response.data.data.profile_img);
                login_info.addeNickName(response.data.data.nickname);

                localStorage.setItem("a_id" , response.headers.authorization);
                localStorage.setItem("p_exp" , response.data.data.exp);
                localStorage.setItem("id" , response.data.data.id);
                refresh_token= cookies.get('refresh_token');
                console.log("refreshToken : " ,refresh_token)
                /*
              if(response.status == 201){
                login_info.addprofile(response.data.data.profile_img);
                login_info.addeNickName(response.data.data.nickname);

                localStorage.setItem("a_id" , response.headers.authorization);
                localStorage.setItem("p_exp" , response.data.data.exp);
                localStorage.setItem("id" , response.data.data.id);
                refresh_token= cookies.get('refresh_token');
                console.log("refreshToken : " ,refresh_token)
              }else{
                console.log("기존 게정 말고 다른 계정으로 새로 로그인 하는 경우")
                                login_info.addprofile(response.data.data.profile_img);
                login_info.addeNickName(response.data.data.nickname);

                localStorage.setItem("a_id" , response.headers.authorization);
                localStorage.setItem("p_exp" , response.data.data.exp);
                localStorage.setItem("id" , response.data.data.id);
                refresh_token= cookies.get('refresh_token');
                console.log("refreshToken : " ,refresh_token)
              }
                */
        }).catch(error =>{
            if(axios.isAxiosError<CustomError>(error)){
                  console.log("error code: " , error.response?.data.data);
                  if(!error.response) {
                        console.warn("서버 응답 없음 (게이트웨이 연결 실패)");
                        navigate("/error/LbGateway"); // 502로 간주
                        return;
                  }
                  if(error.response?.status==400){
                      console.log("400에러 발생")
                      navigate("/error/LbBadRequest");
                    }else if(error.response?.status==409){
                      const infos=error.response?.data.data; 
                      const kakao_insert:Kakao_infos={id:error.response?.data.data.id, email:error.response?.data.data.email,
                        profile:error.response?.data.data.profile, thumbnail:error.response?.data.data.thumbnail, 
                        nickname:error.response?.data.data.nickname ,gender:error.response?.data.data.gender
                      }
                      console.log("날짜 및 아이디 :" ,infos )
                      setUserid(error.response?.data.data.id);
                      setCreatedt(error.response?.data.data.createdate);
                      login_info.addkakaoinfo(kakao_insert);
                      setIsperist(true);

                    }else if(error.response?.status==401){
                         
                    }
                    else if(error.response?.status==404){
                         navigate("/error/LbNotFound");
                    }
                    else if(error.response?.status==415){
                        console.log("지원하지 않는 형식입니다.")
                        //setIsloading(false);
                    }
                    else if(error.response?.status==500){
                        navigate("/error/Lbse-error")
                    }
                    else if(error.response?.status==502){
                       navigate("/error/LbGateway");
                    }
                  
              }
        })
      
    }

    },[]);
    const Exist_login =() =>{
      navigate("/login");
    }

    const Create_login =() =>{
      console.log("카카오 새 계정 만들기 : " , login_info.kakao_info)
      
        api.post(`${PUBGATEWAY_URL}/login/kakao/create` , 
             login_info.kakao_info,{
              withCredentials: true
             })
            .then(response =>{
                console.log("response :" , response);
                localStorage.setItem("a_id" , response.headers.authorization);
                localStorage.setItem("p_exp" , response.data.data.exp);
                localStorage.setItem("id" , response.data.data.id);

                navigate("/main");

            }).catch(error =>{
                if(axios.isAxiosError<CustomError>(error)){
                  console.log("error code: " , error.response);
                    if(!error.response) {
                          console.warn("서버 응답 없음 (게이트웨이 연결 실패)");
                          navigate("/error/LbGateway"); // 502로 간주
                          return;
                    }
                    if(error.response?.status==400){
                      navigate("/error/LbBadRequest");
                    }
                    else if(error.response?.status==401){
                         
                    }
                    else if(error.response?.status==404){
                         navigate("/error/LbNotFound");
                    }
                    else if(error.response?.status==415){
                        console.log("지원하지 않는 형식입니다.")
                        //setIsloading(false);
                    }
                    else if(error.response?.status==500){
                        navigate("/error/Lbse-error")
                    }
                    else if(error.response?.status==502){
                       navigate("/error/Gateway");
                    }

                }
            })

    }

    return(<>
        {againlogin && (<LoginExp />)}
            {isperist && (<>
              <div className="kakao_perist">
                  <h2>🐾 다시 만나서 반가워요!</h2>
                  <h4><strong>{`(${userid}) 계정이 확인되었습니다.`}</strong></h4>
                  <p>가입일: {createdt}</p>
                  <h3>위 계정과 연결하시겠습니까?</h3>
                  <div className="kakao_btn">
                  <button type="submit" onClick={Exist_login} id="Kakao_Connect">기존 계정으로 로그인</button>
                  <button type="submit" onClick={Create_login} id="kakao_Create">새 계정으로 가입</button>
                  </div>
              </div>
          </>)}
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
import {Oval} from "react-loader-spinner";
import axios from "axios";
import { useEffect , useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Cookies} from 'react-cookie';


import "./Callback_Naver.scss";
import user_info from "../Context/Userdata";
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
    username:string,
    email:string;
    profile:string;
    nickname:string,
    gender:string,
    birthday:string,
    phone:string,
    newid:string,
  }
  type naver_infos={
    id:string,
    username:string,
    email:string,
    profile:string,
    nickname:string,
    gender:string,
    birthday:string,
    phone:string,
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
    const[createdt, setCreatedt]=useState<string>("");

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
             api.defaults.headers.common['Authorization'] = header;
             api.post("/gateway/api-proxy" ,{
                    service: "common",
                    endpoint: "login/oauth/naver",
                    method: "GET",
                    body: {code:Code, state:state}
                },{
                    withCredentials: true
                }).then(response =>{
                    login_info.addprofile(response.data.data.profile_img);
                    //login_info.addthumbnail(response.data.data.thumbnail_img);
                    login_info.addeNickName(response.data.data.nickname);
                    navigate("/main");
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
                        navigate("/error/se-error")
                    }
                    else if(error.response?.status==502){
                       navigate("/error/Gateway");
                    }
                  
              }
            })
/*
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
                                            //todo: 엑세스 토큰과 만료 시간을 재설정하고 사용자의 아아디, 닉네임, 이미지를 가져오면 된다.
                                            const accesstoken = localStorage.getItem("a_id")!;
                                            axios.defaults.headers.common['Authorization'] = accesstoken;
                                            //todo:나의 데이터를 가져올 api 호출출
                                            
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
                               console.log("네이버와 계정 연동");
                               setIsperist(true);
                               setUserid(error.response?.data.resultdata);
                           }
   
                           
                           console.log("error response: " , error.response?.data.response);
                         }
           })
                         */
       }
       else{
           console.log("신규 회원");
           api.get(`${PUBGATEWAY_URL}/login/oauth/naver`, {params:{code:Code, state:state} ,withCredentials: true})
           .then(response =>{
              console.log("네이버 로그인 결과 :", response)
                if(response.status == 201){
                    login_info.addprofile(response.data.data.profile_img);
                    login_info.addeNickName(response.data.data.nickname);
        
                    localStorage.setItem("a_id" , response.headers.authorization);
                    localStorage.setItem("p_exp" , response.data.data.exp);
                    localStorage.setItem("id" , response.data.data.id);
                    //setIsperist(true);
                    setIsfirst(true);
            }
                           //navigate("/main");

           }).catch(error =>{
               if(axios.isAxiosError<CustomError>(error)){
                  if(!error.response) {
                        console.warn("서버 응답 없음 (게이트웨이 연결 실패)");
                        navigate("/error/LbGateway"); // 502로 간주
                        return;
                  }if(error.response?.status==400){
                      console.log("400에러 발생")
                      navigate("/error/LbBadRequest");
                    }else if(error.response?.status==409){
                      const infos=error.response?.data.data; 
                      const naver_insert:naver_infos={id:error.response?.data.data.newid, username:error.response?.data.data.username,
                        email:error.response?.data.data.email,
                        profile:error.response?.data.data.profile,
                        nickname:error.response?.data.data.nickname, gender : error.response?.data.data.gender,birthday:error.response?.data.data.birthday,
                         phone:error.response?.data.data.phone
                      }
                      console.log("날짜 및 아이디 :" ,infos )
                      setUserid(error.response?.data.data.id);
                      setCreatedt(error.response?.data.data.createdate);
                      login_info.addnaverinfo(naver_insert);
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
           /*
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
                           else if(error.response?.status == 400){
                             navigate("/error/BadRequest");
                             return ;
                           }
                         }
           })
           */
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
        api.get(`${PUBGATEWAY_URL}/user/dupl-nick` ,{params:{nickname:nickname}
                })
                .then(response =>{
                 setIsvalid(true);
                 setIsunvalid(false);
                }).catch(error =>{
                    console.log("error : " , error.response);
                        if(axios.isAxiosError<CustomError>(error)){
                        console.log("error code: " , error.code);
                            if (!error.response) {
                                console.warn("서버 응답 없음 (게이트웨이 연결 실패)");
                                navigate("/error/LbGateway"); // 502로 간주
                                return;
                            }
                        if(error.response?.status==400){
                                if(error.response?.data.errorcode ==="E0021"){
                                    setIsunvalid(true);
                                    setIsvalid(false);
                                }else{
                                    navigate("/error/LbBadRequest");
                                }
                            }else if(error.response?.status==415){
                            console.log("지원하지 않는 형식입니다.")
                            }
                            else if(error.response?.status==500){
                                navigate("/error/Lbse-error")
                            }
                            else if(error.response?.status==502){
                                navigate("/error/LbGateway")
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
      console.log("네이버 계정 생성")
      setIsfirst(false)
        const modifiedNaverInfo = {
          ...login_info.naver_info,
          nickname: nickname,
        };
         api.post(`${PUBGATEWAY_URL}/login/naver/create` , 
             modifiedNaverInfo,{
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
    const Exist_login =() =>{
      navigate("/login");
    }

    const Create_login =() =>{
          setIsperist(false);
          setIsfirst(true);
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

export default Callback_Naver;
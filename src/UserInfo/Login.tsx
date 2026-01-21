//                             +--------------------
//-----------------------------+   외부 라이브러리
//                             +--------------------
//#region type
import {Fragment,  useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios'
import moment from"moment";
import {Cookies} from "react-cookie";
import Kakaoimg from "../assets/images/btn_kakao.svg"
import Naverimg from "../assets/images/btn_naver.svg";
import Googleimg from "../assets/images/btn_google.svg";
import LoginMaminimg from "../assets/images/login_picture.png";
import LoginImg from "../assets/images/loginimg.png";
import Lodingimg from "../assets/images/login_loading.png"
import { v4 as uuidv4 } from 'uuid';
//#endregion

//                             +--------------------
//-----------------------------+   내부 라이브러리
//                             +--------------------
//#region type
import "./Login.scss";
import UseInput from "../UseHook/UserInput";
import {api,COMMON_URL , PUBGATEWAY_URL} from "../API/Api";
//#endregion


//                             +------------------------
//-----------------------------+   에러 응답 인터페이스
//                             +------------------------
//#region type
interface ResponseDataType {
    message: string;
    code: number;
    response:object
  }

interface CustomError {
  status: number;
  errorcode: string;
  message: string;
  timestamp?: string;
}
//#endregion

  

const Login:React.FC= (props : {})=>{

//                             +--------------------
//-----------------------------+   상태 관리
//                             +--------------------
//#region type
    const [fomrIsValid, setFormIsValid] = useState<boolean>(false);
    const [islogin, setIslogin]=useState<boolean>(false);
    const[isloading , setIsloading]=useState<boolean>(false);
    const navigate = useNavigate();

//#endregion

    const {
        value: EnterId,
        isValid: enterIdIsValid,
        valueChangeHandler: IdChangeHandler,
        inputBlurHandler: IdBlurHandler,
    } = UseInput((value:string) => value.trim() != '');

    const {
        value: EnterPass,
        isValid: enterPassIsValid,
        valueChangeHandler: PassChangeHandler,
        inputBlurHandler: PassBlurHandler,
    } = UseInput((value:string) => value.trim().length > 10);

     
    

    useEffect(() => {
        console.log("왜 갑자기");
        const identifier = setTimeout(() => {
            console.log("Checking form validity!");
            setFormIsValid(enterIdIsValid && enterPassIsValid);
        }, 500);
        return () => {
            console.log("CLEANUP");
            clearTimeout(identifier);
        };
    }, [enterPassIsValid, enterIdIsValid]);
    console.log("입력 상태 : " , enterPassIsValid , enterIdIsValid);


    const KeydownHandler =(e:React.KeyboardEvent<HTMLFormElement>) =>{
        
        console.log("key :" , e.key);
        if(e.key=="Enter"){
            e.preventDefault();
            submitfn();
        }
            
        
    }

     
    const submitfn = () => {
        setIsloading(true);
        const accesstoekn = localStorage.getItem("a_id");
        console.log("엑세스 토큰 :" ,accesstoekn);
        if(accesstoekn ===null){
            axios.post(`${PUBGATEWAY_URL}/login/login`,{
                  id: EnterId,
                  password: EnterPass
                }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
                })
                .then(response =>{
                        console.log("로그인 결과 :" , response);
                        localStorage.setItem("a_id" , response.data.data.access_token);
                        localStorage.setItem("id" , response.data.data.id);
                        
                        let transe_time:Date = new Date(response.data.exp*1000);
                        let time:string="";
                        time =moment(transe_time).format('YYYY-MM-DD HH:mm').toString();
                        console.log("시간 변환 :" , time);
                        localStorage.setItem("p_exp" , response.data.data.exp);
                        navigate("/main")
                })
                .catch(error =>{
                    
                  if(axios.isAxiosError<CustomError>(error)){
                    if (!error.response) {
                        console.warn("서버 응답 없음 (게이트웨이 연결 실패)");
                        navigate("/error/LbGateway"); // 502로 간주
                        return;
                    }
                      if(error.response?.status==400){
                        if(error.response?.data.errorcode ==="E0010"){
                            setIslogin(true);
                            setIsloading(false);
                        }else{
                            navigate("/error/LbBadRequest");
                        }
                        
                       }
                       else if(error.response?.status==415){
                           console.log("지원하지 않는 형식입니다.")
                           setIsloading(false);
                       }
                       else if(error.response?.status==500){
                          navigate("/error/se-error")
                       }else if(error.response?.status==502){
                        navigate("/error/LbGateway");
                       }
                  }})
                    
        }else{
            console.log("재 로그인 게이트웨이 호출")
            let access_token:string="";
            access_token =localStorage.getItem("a_id")!;
            console.log("access : " , access_token);
            const logindata ={ id: EnterId,
                  password: EnterPass}
            api.defaults.headers.common['Authorization'] = access_token;
             axios.post(`${PUBGATEWAY_URL}/login/login`,{
                  id: EnterId,
                  password: EnterPass
                }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
                }).then(response =>{
                console.log("결과 :" , response);
                localStorage.setItem("a_id" , response.data.data.access_token);
                localStorage.setItem("p_exp" , response.data.data.exp);
                
                let transe_time:Date = new Date(response.data.exp*1000);
                let time:string="";
                time =moment(transe_time).format('YYYY-MM-DD HH:mm').toString();
                console.log("시간 변환 :" , time);
                localStorage.setItem("p_exp" , response.data.data.exp);
                  navigate("/main")
                  return;
            }).catch(error =>{
                if(axios.isAxiosError<CustomError>(error)){

                  if (!error.response) {
                        console.warn("서버 응답 없음 (게이트웨이 연결 실패)");
                        navigate("/error/Gateway"); // 502로 간주
                        return;
                    }

                    if(error.response?.status==400){
                        console.log("400에러 발생")
                        navigate("/error/LbBadRequest");
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
                /*
            api.post("/gateway/api-proxy" ,{
                service: "common",
                endpoint: "/login/login",
                method: "POST",
                body: logindata
            },{
                withCredentials: true
            }).then(response =>{
                console.log("결과 :" , response);
                localStorage.setItem("a_id" , response.data.data.access_token);
                localStorage.setItem("p_exp" , response.data.data.exp);
                
                let transe_time:Date = new Date(response.data.exp*1000);
                let time:string="";
                time =moment(transe_time).format('YYYY-MM-DD HH:mm').toString();
                console.log("시간 변환 :" , time);
                localStorage.setItem("p_exp" , response.data.data.exp);
                  navigate("/main")
                  return;
            }).catch(error =>{
                if(axios.isAxiosError<CustomError>(error)){

                  if (!error.response) {
                        console.warn("서버 응답 없음 (게이트웨이 연결 실패)");
                        navigate("/error/Gateway"); // 502로 간주
                        return;
                    }

                    if(error.response?.status==400){
                        console.log("400에러 발생")
                        navigate("/error/LbBadRequest");
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
                */
        }

        }
     
    


    const SubmitHandler = (event:React.FormEvent) => {
        event.preventDefault();
    }


    const kakaologin = () => {
        const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
        const redirect_url = process.env.REACT_APP_REDIRECT_URL;
        console.log("REST_API_KEY : " ,REST_API_KEY);
        console.log("redirect_url" , redirect_url);
        const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${redirect_url}&response_type=code`;
        window.location.href = KAKAO_AUTH_URL;
    }


    const naverlogin =() =>{
            const client_id= process.env.REACT_APP_CLIENT_ID;
            const naver_redirect_url= process.env.REACT_APP_REDIRECT_URL_N;
            const state = uuidv4();
            console.log("client_id : " ,client_id);
            console.log("redirect_url_N" , naver_redirect_url);
            const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${naver_redirect_url}&state=${state}`;
            window.location.href = url;
    }

    const googlelogin =() =>{

    }

    return ( <div className="LoginWrapper">
          <form onSubmit={SubmitHandler} onKeyDown={KeydownHandler}>
                  {isloading && (<div className="login_loading">
                <img src={Lodingimg}/>
                <p>로그인 중</p>
            </div>)}
            <div className="Loginimage">
               <img src={LoginImg} />
            </div>
            <div className="Loginmain">
                <h2>로그인</h2>
                <div className="LoginInput">
                    <label htmlFor="id"></label>
                    <input
                        type="text"
                        id="id"
                        placeholder="아이디"
                        value={EnterId}
                        onChange={IdChangeHandler}
                        onBlur={IdBlurHandler} />

                </div>
                <div className="LoginInput">
                    <label htmlFor="password"></label>
                    <input
                        type="password"
                        id="password"
                        placeholder="비밀번호"
                        value={EnterPass}
                        onChange={PassChangeHandler}
                        onBlur={PassBlurHandler} />
                </div>
                {islogin && (<div className="fali_login">
                <p>회원정보와 일치하지 않습니다</p>
                </div>)}
                <div className="Loginbtn">
                    <button type="submit" onClick={submitfn} disabled={!fomrIsValid} >로그인</button>
                </div>
                
                <div className="Loginuserinfo">
                    <span></span>
                        <Link to="/find">비밀번호 찾기</Link>      
                    <span></span>             
                </div>
                <div className="Login_sns">
                    <img src={Kakaoimg} onClick={kakaologin} />
                    <img src={Naverimg} onClick={naverlogin} />
                    <img src={Googleimg} onClick={googlelogin} />
                </div>
                <div className="Login_Sign">
                  <p>계정이 없으신가요?<br />
                    <a href="/sign" className="Link">회원가입</a>
                  </p>
                  
                </div>
            </div>
            </form>
    </div>
    );
}

export default Login;
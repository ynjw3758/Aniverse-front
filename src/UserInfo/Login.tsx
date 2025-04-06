//                             +--------------------
//-----------------------------+   외부 라이브러리
//                             +--------------------
//#region type
import {Fragment,  useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios'
import moment from "momnet";
import {Cookies} from "react-cookie";
//#endregion

//                             +--------------------
//-----------------------------+   내부 라이브러리
//                             +--------------------
//#region type
import "./Login.scss";
import UseInput from "../UseHook/UserInput";
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
        axios.post('http://localhost:8080/Pets-social/login',
            {   
                id: EnterId,
                password: EnterPass
                ,withCredentials: true
            },
            
        ).then(response =>{
            console.log("상태값 :" , response.status);
             let re_auth:string="";
             re_auth = response.headers.authorization;
             
             
             if(response.status==200){
                console.log("로그인 성공 : " , response);
                localStorage.setItem("a_id" , response.data.data.access_token);
                localStorage.setItem("id" , response.data.data.id);
                
                let transe_time:Date = new Date(response.data.exp*1000);
                let time:string="";
                time =moment(transe_time).format('YYYY-MM-DD HH:mm').toString();
                console.log("시간 변환 :" , time);
                localStorage.setItem("p_exp" , response.data.data.exp);
                const cookies = new Cookies();
                let access_token:string="";
                let refresh_token:string="";
                refresh_token = cookies.get("refresh_token");
                console.log("리프레쉬 : " , refresh_token)
                access_token = localStorage.getItem("a_id")!;
                axios.defaults.headers.common['Authorization'] = access_token;
                axios.get("http://localhost:8080/Pets-social/valid-accesstoken" , {params:{id:EnterId}}).then(responses =>{
                    console.log("access token response : " , responses);
                    if(responses.status== 200){
                        console.log("로그인 성공");
                        setIsloading(false);
                        navigate("/main");
                        return;
                    }
                }).catch(error =>{
                    if(axios.isAxiosError<ResponseDataType>(error)){
                        console.log("error :" , error);
                        if(error.code == "ERR_NETWORK"){
                          console.log("네트워크 에러 ");
                          
                        }
                        if(error.response?.status==401){
                            console.log("승인되지 않은 로그인");
                            setIsloading(false);
                        }
                      }
                })
             }
        }).catch(error=> {
            if(axios.isAxiosError<ResponseDataType>(error)){
                console.log("error code: " , error);
                
                if(error.response?.status==400){
                    console.log("로그인 정보가 일치하지 않습니다");
                    setIslogin(true);
                }
                if(error.code == "ERR_NETWORK"){
                  console.log("네트워크 에러 ");
                  
                }
              }
            
            
        })

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
        let Code = new URL(window.location.href).searchParams.get("code");
    }
    const client_id= process.env.REACT_APP_CLIENT_ID;
    const naver_redirect_url= process.env.REACT_APP_REDIRECT_URL_N;
    const state = crypto.randomUUID(); // CSRF 방지용]]

    console.log("client_id : " ,client_id);
    console.log("redirect_url_N" , naver_redirect_url);

    const naverlogin =() =>{


        const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${naver_redirect_url}&state=${state}`;
        window.location.href = url;

    }

    const googlelogin =() =>{

    }
      /*
                  {isloading && (<div className="login_loading">
                <img src="/image/login_loading.png"/>
                <p>로딩 중....</p>
            </div>)}
            */
    return ( <Fragment>
          <form onSubmit={SubmitHandler} onKeyDown={KeydownHandler}>

            <div className="Loginmain">
                <h2>로그인</h2>
                <div className="Loginimage">
                  <img src="/image/login_picture.jpg" />
                </div>
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
                <p>회원정보와 일치하지 않습니다다</p>
                </div>)}
                <div className="Loginbtn">
                    <button type="submit" onClick={submitfn} disabled={!fomrIsValid} >로그인</button>
                </div>
                
                <div className="Loginuserinfo">
                    <ul>
                        <li><Link to="/Agree">회원가입</Link></li>
                        <li><Link to="/find">id/password 찾기</Link></li>
                    </ul>
                </div>
                <div className="Login_sns">
                    <img src={"/image/btn_kakao.svg"} onClick={kakaologin} />
                    <img src={"/image/btn_naver.svg"} onClick={naverlogin} />
                    <img src={"/image/btn_google.svg"} onClick={googlelogin} />
                </div>
            </div>
            </form>
    </Fragment>
    );
}

export default Login;
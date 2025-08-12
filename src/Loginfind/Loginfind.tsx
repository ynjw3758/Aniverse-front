import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import {Oval} from "react-loader-spinner";
import "./Loginfind.scss";
import UseInput from "../UseHook/UserInput";
import { useNavigate } from "react-router-dom";
import Certification_pw from "../Message/Certification_pw";
import Pw_fail from "../Message/Pw_fail";
import Err_Network from "../Message/Err_Network";
import Id from "../Context/Userdata";
import logimg from "../assets/images/log.png";
import {api,COMMON_URL, PUBGATEWAY_URL } from "../API/Api";
import CertifiTimer from "../Utils/CertifiTimer";
import Resetpassword from "./Resetpassword";
/*
const lv_style = JSXStyle`
.yoon-margin-0px { margin: 0; }
`
*/
interface ResponseDataType {
  message: string;
  code: number;
  response:object
}

  interface CustomError{
    errorcode:string;
    message :string
  }


const Loginfind= () =>{
  const [modalopen, setModalOpen] = useState<boolean>(false);
  const [certifi, setCertifi] = useState<boolean>(false);
    const[idfind , setIdfind] = useState<boolean>(false);
    const[pwfind , setPwfind] = useState<boolean>(false);
    const[successid ,setSuccessid] = useState<boolean>(false);
    const[availid ,setAvailid] = useState<string>("");
    const[failid , setFailid] = useState<boolean>(false);
    const[fomrIsValid, setFormIsValid] = useState<boolean>(false);
    const[ceremail , setCeremail] = useState<boolean>(false);
    const[cerphon , setCerphon] = useState<boolean>(false);
    const[phone_certifi , setPhone_certifi] = useState<boolean>(false);
    const[certifi_button , setCertifi_button] = useState<boolean>(false);
    const[check_certifi , setCheck_certifi] = useState<boolean>(false);
    const[network , setNetwork] = useState<boolean>(false);
    const[id , setId] = useState<string>("");
    const[name , setName] = useState<string>("");
    const[phone_number , setPhone_number] = useState<string>("");
    const[certifi_number , setCertifi_number] = useState<string>("");
    const[inputId ,setInputId]=useState<string>("");
    const[inputEmail, setInputEmail]=useState<string>("");
    const[isnotfound, setIsnotfound]=useState<boolean>(false)
    const[sendEmail, setSendEmail]=useState<boolean>(false);
    const[isopt, setIsopt]=useState<string>("");
    const[inputopt, setInputopt]=useState<string>("");
    const[againtime, setAgaintime]=useState<boolean>(false);
    const[isRetry, setIsRetry]=useState<boolean>(false);
    const[isDisable, setIsDisable]=useState<boolean>(true);
    const[isLoading, setIsLoading]=useState<boolean>(true);
    const[expiredCode , setExpiredCode]=useState<boolean>(false);
    const[codemiss, setCodemiss]=useState<boolean>(false);
    const[verifyloading, setVerifyloading]=useState<boolean>(false);
    const[verify_Success, setVerify_Success]=useState<boolean>(false);
    const[sendUi, setSendUi]=useState<boolean>(false);


    const navigate = useNavigate();
    const useid = useContext(Id);
    let Component_Contain = verify_Success ? "VerifyEmail_Main" :"LoginFind_Verifi_Email"
    
    const id_button =() =>{
     console.log("아이디 찾기");
     setIdfind(true);
     setPwfind(false);
     setSuccessid(false);
     setFailid(false);
     setCerphon(false);
    }

    const pw_button =() =>{
      setPwfind(true);
      setIdfind(false);
      setCerphon(false);
      setCeremail(false);
      setSuccessid(false);
      setFailid(false);
    }
    const {
      value: EnternName,
      hassError: EnterNameHassError,
      isValid: enterNameIsValid,
      valueChangeHandler: IdChangeHandler,
      inputBlurHandler: IdBlurHandler,
  } = UseInput((value:string) => value.trim() != '');

  const {
    value: EnterEmail,
    hassError: EnterEmailHassError,
    isValid: enterEmailIsValid,
    valueChangeHandler: EmailChangeHandler,
    inputBlurHandler: EmailBlurHandler,
    } = UseInput((value:string) => value.trim().includes('@') && value.trim() != '');

    useEffect(() => {
      const identifier = setTimeout(() => {
          console.log("Checking form validity!");
          setFormIsValid(enterNameIsValid && enterEmailIsValid);
          setPhone_certifi(certifi_button && check_certifi);
      }, 200);
      return () => {
          console.log("CLEANUP");
          clearTimeout(identifier);
      };
    }, [enterEmailIsValid, enterNameIsValid , certifi_button , check_certifi]);

    useEffect(() =>{
      if(inputopt.length ==10) setIsDisable(false)
      else return;
    },[inputopt])
      // ✅ 인증 성공 시 2초 후 자동 이동
      /*
    useEffect(() => {
      if (verify_Success) {
        const timer = setTimeout(() => {
          navigate("/login");
        }, 3000);

        return () => clearTimeout(timer); // cleanup
      }
    }, [verify_Success]);
*/

      const submit =() =>{
        console.log("아이디 찾기 조회");
        api.post(`${PUBGATEWAY_URL}/user/findId`,
        {
            username: EnternName,
            email: EnterEmail
        }
    ).then(response =>{

        if(response.status==200){
            if(response.data.Success === true){
              setAvailid(response.data.id);
              setFailid(false);
              setIdfind(false);
              setSuccessid(true);
            }else{
              setSuccessid(false);
              setIdfind(false);
              setFailid(true);
            }

        }
    }).catch(error =>{
        if(axios.isAxiosError<CustomError>(error)){
          console.log("error code: " , error);
            if (!error.response) {
                console.warn("서버 응답 없음 (게이트웨이 연결 실패)");
                navigate("/error/LbGateway"); // 502로 간주
                return;
              }
          
          if(error.response?.status == 400){
              if(error.response?.data.errorcode ==="E0011"){
                  setSuccessid(false);
                  setFailid(true)
              }else{
                  navigate("/error/LbBadRequest");
              }
          }
          else if(error.response?.status==500){
            console.log("서버 에러발생");
            navigate("/error/Lbse-error")
          }
          else if(error.response?.status==502){
          console.log("gateway 에러 발생");
          navigate("/error/LbGateway");
          return;
          }
          else if(error.response?.status==404){
                console.log("잘못된 url 요청")
          }
          else if(error.response?.status==415){
            console.log("타입 문제")
          }
          console.log("error response: " , error.response?.data);
        }

        
    })
      }

        const login_page =() =>{
          navigate("/login");
        }

        const return_input =() =>{
          console.log("다시 입력");
          setSuccessid(false);
          setIdfind(true);
          setFailid(false);
        }

        const return_sign =() =>{
          navigate("/sign");
        }

        const email_button =() =>{
          setCeremail(true);
          setPwfind(false);
        }

        const phon_button =() =>{
          setCerphon(true);
          setPwfind(false);
        }

        const Number_Receive =() =>{
          // 복호화 키 지정   
          const seckey = process.env.REACT_APP_SECRET_KEY;
          const serviceid = process.env.REACT_APP_SERVICE_ID;
          const accesskey =process.env.REACT_APP_ACCESS_KEY;
            console.log(seckey);
            console.log(serviceid);
            console.log(accesskey);
      }

      const firstnumber =(e:React.ChangeEvent<HTMLInputElement>) =>{
        setPhone_number(e.target.value);
        if(phone_number.length >=10){
          setCertifi_button(true);
        }
      } 
      const namehandler = (e:React.ChangeEvent<HTMLInputElement>) =>{

        setName(e.target.value);

      }
      const idhandler =(e:React.ChangeEvent<HTMLInputElement>) =>{
          setId(e.target.value);

      }
      const certifinumber =(e:React.ChangeEvent<HTMLInputElement>) =>{
        setCertifi_number(e.target.value);
        if(certifi_number.length>=7){
          setCheck_certifi(true);
        }
      }  
      const closemodal = () => {
        setModalOpen(false);
    }
    const certifi_closemodal = () =>{
      setCertifi(false);
    }



    const resetpwhandler =() =>{
      api.post('http://localhost:8080/Pets-social/reset-pass',
      {
          phonnumber:phone_number,
        certifi_number:certifi_number
      }
    ).then(function(response){
      console.log("핸드폰 번호 : "  , phone_number);
    console.log("응답 데이터 : " , response.data.id);
        if(response.status == 200){
        useid.addid(response.data.id);     
          navigate("/reset");
        }

    }).catch(function(e){
      if(axios.isAxiosError<ResponseDataType>(e)){
        console.log("error code: " , e);
        
        if(e.code=="ERR_BAD_REQUEST"){
          setCertifi(true);
        }
        if(e.code == "ERR_NETWORK"){
          console.log("네트워크 에러 ");
          setNetwork(true);
        }
        console.log("error response: " , e.response?.data);
      }
    });
    }
    const network_closemodal =() =>{
      setNetwork(false);
    }

    const InputIdHandler =(e:React.ChangeEvent<HTMLInputElement>) =>{
    setInputId(e.target.value)
    }

    const InputEmailHandler =(e:React.ChangeEvent<HTMLInputElement>) =>{
      setInputEmail(e.target.value);
    }

    const SendEmail =() =>{
     setSendEmail(true);
      api.post(`${PUBGATEWAY_URL}/certifi/sendemail`,
        {
          id:inputId,
          email:inputEmail
            
        },{  
          headers: {
              "X-Platform-Type": "web"
        }}
    ).then(response =>{
      console.log("response : " , response);
      setIsopt(response.data.opt);
      setIsLoading(false);
      setSendUi(true);

    })
    .catch(error =>{
      console.log("error  :" , error);
      if(axios.isAxiosError<CustomError>(error)){
              if (!error.response) {
                console.warn("서버 응답 없음 (게이트웨이 연결 실패)");
                navigate("/error/LbGateway"); // 502로 간주
                return;
              }

              if(error.response?.status == 400){
              if(error.response?.data.errorcode ==="E0031"){
                setIsnotfound(true);
                setSendEmail(false);
              }else if(error.response?.data.errorcode ==="E0030"){
                setCertifi(true);
                setSendEmail(false);
                  
              }else{
                navigate("/error/LbBadRequest");
              }
          }
          else if(error.response?.status==500){
            console.log("서버 에러발생");
            navigate("/error/Lbse-error")
          }
          else if(error.response?.status==502){
          console.log("gateway 에러 발생");
          navigate("/error/LbGateway");
          return;
          }
          else if(error.response?.status==415){
            console.log("타입 문제")
          }

        console.log("error response: " , error.response?.data);
      }
    })

    }

  const nfmodalClose =() =>{
    setIsnotfound(false);
  }
  const SendEmailClose =() =>{
    console.log("왜?")
    setSendEmail(false);
    //navigate("/login");
  }


  const InputOptHandler =(e:React.ChangeEvent<HTMLInputElement>) =>{
    setInputopt(e.target.value);
  }

  const TimeFinish =(data:boolean) =>{
    setIsRetry(data);
  }

  const againSendMail =() =>{
    console.log("이메일 재전송")
    setInputopt("");
    setCodemiss(false);
    setExpiredCode(false);
    setIsRetry(false);
    setIsLoading(true);
    SendEmail();

  }

  const EmailCertifi =() =>{
      setVerifyloading(true);
      api.get(`${PUBGATEWAY_URL}/certifi/verifiCertifi`,{
        params:{
          id:inputId,
          code:inputopt
            
        }}
    ).then(response =>{
      setVerifyloading(false);
        console.log("응답 결과 :" , response);
        setSendUi(false);
        setVerify_Success(true);

    }).catch(error =>{
            if(axios.isAxiosError<CustomError>(error)){
              if (!error.response) {
                console.warn("서버 응답 없음 (게이트웨이 연결 실패)");
                navigate("/error/LbGateway"); // 502로 간주
                return;
              }

              if(error.response?.status == 400){
              if(error.response?.data.errorcode ==="E0032"){
                setVerifyloading(false);
                setInputopt("");
                setExpiredCode(true);
              }else if(error.response?.data.errorcode ==="E0033"){
                setVerifyloading(false);
                setInputopt("");
                setCodemiss(true);
                  
              }else{
                setVerifyloading(false);
                navigate("/error/LbBadRequest");
              }
          }
          else if(error.response?.status==404){
                console.log("잘못된 url 요청")
                navigate("/error/LbNotFound")
          }
          else if(error.response?.status==500){
            console.log("서버 에러발생");
            navigate("/error/Lbse-error")
          }
          else if(error.response?.status==502){
          console.log("gateway 에러 발생");
          navigate("/error/LbGateway");
          return;
          }
          else if(error.response?.status==415){
            console.log("타입 문제")
          }

        console.log("error response: " , error.response?.data);
      }
    })
  }
//<p>인증이 완료되었습니다. 잠시 후 로그인 페이지로 이동합니다.</p>
    return (
    <Fragment>
        <div className="header">
            <img src={logimg} alt="애완멀" ></img>
            <h2>ID/PW 찾기</h2>
          </div>
           <div className="LoginFind_tag">
             <button type="button" onClick={id_button}>아이디</button>
             <button typeof="button" onClick={pw_button}>비밀번호</button>
           </div>
           {idfind && <div className="LoginFind_id">
              <h2>아이디 찾기</h2>
              <input placeholder="이름"
                            type="text"
                            value={EnternName}
                            onChange={IdChangeHandler}
                            onBlur={IdBlurHandler}
                            id="LoginFind_input_id"
                        /> 
               <input
                            placeholder="이메일"
                            type="email"
                            value={EnterEmail}
                            onChange={EmailChangeHandler}
                            onBlur={EmailBlurHandler}
                            id="LoginFind_input_Email"
                        />
                        <button type="submit" onClick={submit} disabled={!fomrIsValid}>아이디 조회</button>
            </div>}
            {successid && (<div className="useid">
              <p>사용 가능 id :{availid}</p>
              <button type="button" onClick={login_page}>로그인</button>
              </div>)}
            {failid && <div className="fail">
              <p>등록된 정보가 없습니다</p>
              <div className="failbtn">
              <button onClick={return_input}>다시 입력하기</button>
              <button onClick={return_sign}>회원가입</button>
              </div>
              </div>}
            {pwfind && <div className="pw">
              <h2>비밀번호 찾기 </h2>
               <h3>인증 방식 선택해주세요</h3>
               <div className="certitype">
               <input type="checkbox" onClick={email_button}/>
               <label>Email인증</label>
               <input type="checkbox" onClick={phon_button}/>
               <label>핸드폰인증</label>
               </div>
              </div>}
              {ceremail && <div className="email">
                <h2>이메일 인증</h2>
                <input placeholder="이메일를 입력해주세요" onChange={InputEmailHandler}/>
                <input placeholder="아이디를 입력해주세요" onChange={InputIdHandler}/>
                <button type="submit" onClick={SendEmail}>이메일 발송</button>
                </div>}
                {cerphon && <div className="phon">
                  <h2>핸드폰 인증</h2>
                  <input placeholder="아이디를 입력해주세요" onChange={idhandler}/>
                  <input placeholder="이름를 입력해주세요" onChange={namehandler}/>
                  <div className="divi_input">
                   <input type="number" onChange={firstnumber} placeholder="전화번호를 입력해주세요"/>
                   <button onClick={Number_Receive} disabled={!certifi_button}>인증번호</button>
                  </div>
                  <input type="number" onChange={certifinumber} placeholder="인증번호를 입력해주세요"/>
                  <div className="next">
                  <button onClick={resetpwhandler} disabled={!phone_certifi}>다음</button>
                  </div>
                  </div>}
                  {sendEmail && (<div className="LoginFind_again_input_backdrop" onClick={SendEmailClose}>
                    <div className={Component_Contain} onClick={(e) => e.stopPropagation()}>
                    {isLoading && (<>
                        <Oval 
                          color="#ff0000" 
                          height={150} 
                          width={50}
                        />
                    </>)}
                    {sendUi && (<>
                        <h2>이메일 인증</h2>
                        <p>인증번호가 이메일로 전송되었습니다<br />{inputEmail}</p>
                        <input type="text" placeholder="인증번호 입력"  onChange={InputOptHandler}/>
                          {codemiss && (<div className="Verify_Miss">
                          <p>번호가 맞지 않습니다.</p>
                          </div>)}
                          {expiredCode && (<div className="Verify_expired">
                             <p>인증번호 유효 시간이 만료되었습니다. 다시 요청해주세요.</p>
                          </div>)}
                         <CertifiTimer IsFinish={TimeFinish} Retry={againtime}/>
                         {isRetry && (<div className="Again_SendEmail" onClick={againSendMail}>
                         <p>인증번호 다시 받기</p>
                         </div>)}
                        <button disabled={isDisable} onClick={EmailCertifi}>인증하기</button>
                          {verifyloading && (<div className="VerifyLoadinf">
                              <Oval 
                                color="#ff0000" 
                                height={150} 
                                width={50}
                              />
                          </div>)}

                    </>)}
                    {verify_Success && (<div className="Verify_Success">
                       <Resetpassword Userid={inputId}/>
                    </div>)}
                    </div>
                  </div>)}
                  {isnotfound && (<div className="LoginFind_again_input_backdrop" onClick={nfmodalClose}>
                    <div className="LoginFind_again_input_modal">
                      <p>입력한 정보가 옳바르지 않습니다 다시 한번 확인 해주세요.</p>
                    </div>
                    </div>)}
                    <div style={{background:"red"}}></div>
                 {modalopen && (<Certification_pw onClose={closemodal} />)}
                 {certifi && (<Pw_fail onClose={certifi_closemodal} />)}
                 {network && (<Err_Network onClose={network_closemodal}/>)}

    </Fragment>
    )
}

export default Loginfind;
import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Loginfind.scss";
import UseInput from "../UseHook/UserInput";
import { useNavigate } from "react-router-dom";
import Certification_pw from "../Message/Certification_pw";
import Pw_fail from "../Message/Pw_fail";
import Err_Network from "../Message/Err_Network";
import Id from "../Context/Userdata";
import logimg from "../assets/images/log_test.jpg";
import {api,COMMON_URL } from "../API/Api";
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
    const[selectid , setSelectid] = useState<string>("");
    const[inputId ,setInputId]=useState<string>("");
    const[inputEmail, setInputEmail]=useState<string>("");
    const[isnotfound, setIsnotfound]=useState<boolean>(false)
    const[sendEmail, setSendEmail]=useState<boolean>(false);
    const[isopt, setIsopt]=useState<string>("");
    const[inputopt, setInputopt]=useState<string>("");

    const navigate = useNavigate();
    const useid = useContext(Id);
    
    const id_button =() =>{
     console.log("아이디 찾기");
     setIdfind(true);
     setPwfind(false);
     setSuccessid(false);
     setFailid(false);
     setCerphon(false);
     console.log("idfind : " , idfind);
    }

    const pw_button =() =>{
      console.log("비밀번호 찾기");
      setPwfind(true);
      setIdfind(false);
      setCerphon(false);
      setCeremail(false);
      setSuccessid(false);
      console.log("pwfind : " , pwfind);
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


  const submit =() =>{
    console.log("아이디 찾기 조회");
    axios.post('http://localhost:8080/Pets-social/findId',
    {
        Username: EnternName,
        Email: EnterEmail
    }
).then(response =>{

     if(response.status==200){
        console.log("아이디 조회 성공 : " ,response.data);
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
    console.log("error : " , error.response);
    if(axios.isAxiosError<ResponseDataType>(error)){
      console.log("error code: " , error);
      
      if(error.response?.status == 400){
                        navigate("/error/BadRequest");
                return;
      }
      else if(error.response?.status==500){
        console.log("서버 에러발생");
        navigate("/error/se-error")
      }
      else if(error.response?.status==403){
           console.log("인가 문제?");
           navigate("/error/NoAccess");
      }
      else if(error.response?.status==502){
       console.log("gateway 에러 발생");
       navigate("/error/Gateway");
       return;
      }
      console.log("error response: " , error.response?.data);
    }

    
})
  }

    const login_page =() =>{
      console.log("로그인 페이지 이동");
      navigate("/login");
    }

    const return_input =() =>{
      console.log("다시 입력");
      setSuccessid(false);
      setIdfind(true);
      setFailid(false);
    }

    const return_sign =() =>{
      console.log("회원 가입 이동");
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
          
/*
        axios.post('http://localhost:8080/Pets-social/findpw',
        {
            service_id:serviceid,
            secret_key:seckey,
            access_key :accesskey,
            Phone_number :phone_number,
            Name:name,
            Id:id,
            Reset:true,
            
        }
    ).then(response =>{
      console.log("response : " , response);
      setModalOpen(true);
    })
    .catch(error =>{
      console.log("error  :" , error);
      if(axios.isAxiosError<ResponseDataType>(error)){
        console.log("error code: " , error);
        
        if(error.code=="ERR_BAD_REQUEST"){
          setCertifi(true);
        }
        if(error.code == "ERR_NETWORK"){
          console.log("네트워크 에러 ");
          setNetwork(true);
        }
        console.log("error response: " , error.response?.data);
      }
    })
      */
  }

  const firstnumber =(e:React.ChangeEvent<HTMLInputElement>) =>{
     console.log("전화번호 :" , e.target.value);
     setPhone_number(e.target.value);
     console.log("결과 : " , phone_number.length);
     if(phone_number.length >=10){

      console.log("전화 번호 자릿숫자 확인");
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
  axios.post('http://localhost:8080/Pets-social/reset-pass',
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
console.log("id : " , selectid);
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

  axios.post('http://localhost:8080/Pets-social/certification/sendemail',
    {
       Id:inputId,
       Email:inputEmail
        
    }
).then(response =>{
  console.log("response : " , response);
  setIsopt(response.data.opt);
  setSendEmail(true);
})
.catch(error =>{
  console.log("error  :" , error);
  if(axios.isAxiosError<ResponseDataType>(error)){
    const status = error.response?.status;
    if(status == 404){
      console.log("입력한 정보가 존재하지 않는다")
      setIsnotfound(true);
    }
    
    if(status == 400){
      setCertifi(true);
    }
    if(error.code == "ERR_NETWORK"){
      console.log("네트워크 에러 ");
      setNetwork(true);
    }
    console.log("error response: " , error.response?.data);
  }
})

}

const nfmodalClose =() =>{
  setIsnotfound(false);
}
const SendEmailClose =() =>{
  setSendEmail(false);
  //navigate("/login");
}

const InputOptHandler =(e:React.ChangeEvent<HTMLInputElement>) =>{
  setInputopt(e.target.value);

}
//                 <style> {lv_style}</style>
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
                    <div className="LoginFind_Verifi_Email">
                      <p>인증번호가 이메일에 전송되었습니다.</p>
                      <input type="text" placeholder="인증번호를 입력해주세요."  onChange={InputOptHandler}/>
                      <button>인증번호 확인</button>
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
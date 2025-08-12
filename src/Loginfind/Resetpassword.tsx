import React, { useEffect, useState } from "react";
import "./Resetpassword.scss";
import UseInput from "../UseHook/UserInput";
import Id from "../Context/Userdata";
import { useContext } from "react";
import axios from "axios";
import Change_pw_success from "../Message/Change_pw_success";
import { useNavigate } from "react-router-dom";
import logimg from "../assets/images/log.png";
import {api,PUBGATEWAY_URL } from "../API/Api";
interface ResponseDataType {
    message: string;
    code: number;
    response:object
  }

interface Userinfo{
    Userid:string;
}

const Resetpassword =({Userid} :Userinfo) =>{

    const[formisValid, setFormIsValid] = useState(false);
    const[success , setSuccess] = useState<boolean>(false);
    const[samebeforepw, setSamebeforepw]=useState<boolean>(false);

    const User_id = useContext(Id);
    const passwordRegExp =
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const navigate = useNavigate();

    const {
        value: EnterNewpw,
        hassError: EnterNewpwHassError,
        isValid: enterNewpwIsValid,
        valueChangeHandler: NewChangeHandler,
        inputBlurHandler: NewBlurHandler,
    } = UseInput((value:string) => value.trim().length >=11 && value.match(passwordRegExp) != null);

    const {
        value: EnterAgainpw,
        hassError: EnterAgaintpwHassError,
        isValid: enterAgainpwIsValid,
        valueChangeHandler: AgainChangeHandler,
        inputBlurHandler: AgainBlurHandler,
    } = UseInput((value:string) => value.match(passwordRegExp) != null
    && value == EnterNewpw);
    const EnterNewpwInputClasses = EnterNewpwHassError ? "Resetpw_invalid" : "Resetpw_input";
    const EnterAgainInputClasses = EnterAgaintpwHassError ? "Resetpw_invalid" : "Resetpw_input";

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log('Checking form validity!');
            setFormIsValid(
                enterNewpwIsValid && enterAgainpwIsValid
            );
        }, 500);
        return () => {
            console.log('CLEANUP');
            clearTimeout(identifier);
        };
    }, [enterNewpwIsValid, enterAgainpwIsValid])
    const reset_post =() =>{
        api.post(`${PUBGATEWAY_URL}/user/resetpw`,
        {
             password : EnterAgainpw,
             id:/*User_id.UserId*/Userid
        }
      ).then(response =>{
          console.log("success :" ,response.status);
          setSuccess(true);

      }).catch(error =>{
        if(axios.isAxiosError<ResponseDataType>(error)){
            console.log("error code: " , error.code);
             if (!error.response) {
                console.warn("서버 응답 없음 (게이트웨이 연결 실패)");
                navigate("/error/LbGateway"); // 502로 간주
                return;
              }

            if(error.response?.status == 400){
                navigate("/error/LbBadRequest");
                return;
              }
              else if(error.response?.status == 404){
                navigate("/error/LbNotFound");
                return;
              }
              else if(error.response?.status==500){
                console.log("서버 에러발생");
                navigate("/error/Lbse-error")
              }
              else if(error.response?.status==409){
                   console.log("인가 문제?");
                   setSamebeforepw(true);
                   //navigate("/error/NoAccess");
              }
              else if(error.response?.status==502){
               console.log("gateway 에러 발생");
               navigate("/error/LbGateway");
               return;
              }
        }
    }
    )
    }

    const closehandler =() =>{

    }
    return(
        <div className="Reset_Main">
            <img src={logimg} alt="애완멀" ></img>
            <h2>비밀번호 재설정</h2>
            <p>사용 가능 아이디 : {User_id.UserId}</p>
            <div className={EnterNewpwInputClasses}>
             <input placeholder="새로운 비밀번호 입력해주세요"
             value={EnterNewpw} 
             onChange={NewChangeHandler}
             onBlur={NewBlurHandler}
             type="password"
             />
            
              <>
             {EnterNewpwHassError && <p className="errortext" >형식에 맞게 입력해주세요..</p>}
              </>
             </div>
             <div className={EnterAgainInputClasses}>
             <input placeholder="다시한번 비밀번호 입력해주세요"
             value={EnterAgainpw}
             onChange={AgainChangeHandler}
             onBlur={AgainBlurHandler}
             type="password"
             />
             <>
             {EnterAgaintpwHassError && <p className="errortext" >비밀번호가 일치하지 않습니다</p>}
              </>
             </div>
             <div className="reset">
              {samebeforepw && (<>
               <p>이전 비밀번호와 동일입니다. 다시 변경해주세요.</p>
              </>)}
             <button disabled={!formisValid} onClick={reset_post}>비밀번호 변경</button>
             </div>
             {success && (<Change_pw_success onClose={closehandler}/>)}
        </div>
    )
}

export default Resetpassword;
import React, { useEffect, useState } from "react";
import "./Resetpassword.scss";
import UseInput from "../UseHook/UserInput";
import Id from "../Context/Userdata";
import { useContext } from "react";
import axios from "axios";
import Change_pw_success from "../Message/Change_pw_success";
import { useNavigate } from "react-router-dom";
import logimg from "../assets/images/log_test.jpg";
import {api,COMMON_URL } from "../API/Api";
interface ResponseDataType {
    message: string;
    code: number;
    response:object
  }

const Resetpassword =() =>{

    const [formisValid, setFormIsValid] = useState(false);
    const[success , setSuccess] = useState<boolean>(false);
    const User_id = useContext(Id);
    console.log("aaaaa: " ,User_id.UserId );
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
        api.post(`http://localhost:8080/Pets-social/resetpw`,
        {
             New_password : EnterAgainpw,
             id:User_id.UserId
        }
      ).then(response =>{
          console.log("success :" ,response.status);
          setSuccess(true);

      }).catch(error =>{
        if(axios.isAxiosError<ResponseDataType>(error)){
            console.log("error code: " , error.code);
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
        }
    }
    )
    }

    const closehandler =() =>{

    }
    return(
        <div className="main">
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
             <button disabled={!formisValid} onClick={reset_post}>비밀번호 변경</button>
             </div>
             {success && (<Change_pw_success onClose={closehandler}/>)}
        </div>
    )
}

export default Resetpassword;
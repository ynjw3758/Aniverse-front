import React, { useEffect, useState } from "react";
import "./Resetpassword.scss";
import UseInput from "../UseHook/UserInput";
import Id from "../Context/Userdata";
import { useContext } from "react";
import axios from "axios";
import Change_pw_success from "../Message/Change_pw_success";

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

    const {
        value: EnterNewpw,
        hassError: EnterNewpwHassError,
        isValid: enterNewpwIsValid,
        valueChangeHandler: NewChangeHandler,
        inputBlurHandler: NewBlurHandler,
    } = UseInput((value:string) => value.trim().length >=11 && value.match(passwordRegExp) != null);
     console.log("error 체크  : " , EnterNewpwHassError , enterNewpwIsValid);
     console.log("input value : " , EnterNewpw);
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
        axios.post('http://localhost:8080/Pets-social/resetpw',
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
            
            if(error.code=="ERR_BAD_REQUEST"){
              console.log("요청 파라미터 에러")
            }
            if(error.code == "ERR_NETWORK"){
              console.log("네트워크 에러 ");
              
            }
            console.log("error response: " , error.response?.data);
        }
    }
    )
    }

    const closehandler =() =>{

    }
    return(
        <div className="main">
            <img src="/image/log_test.jpg" alt="애완멀" ></img>
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
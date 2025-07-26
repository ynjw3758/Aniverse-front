//                             +--------------------
//-----------------------------+   내부 라이브러리
//                             +--------------------
//#region type
import "./Sign.scss";
import UseInput from "../UseHook/UserInput";
import Certification from "../Certification/Certification";
import Adress from "../address/Adress";
import Success_Sign from "../Success_Sign/Success_Sign";
//#endregion

//                             +--------------------
//-----------------------------+   외부 라이브러리
//                             +--------------------
//#region type
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Fragment, KeyboardEvent, useRef } from "react";
import React, { useState, useEffect } from 'react';
import {api,COMMON_URL } from "../API/Api";
//#endregion

//                             +--------------------
//-----------------------------+   타입
//                             +--------------------
//#region type
interface ResponseDataType {
    message: string;
    code: number;
    response:object
  }

interface CustomError{
errorcode:string;
message :string
}
  //#endregion

const Sign:React.FC=()=> {
//                             +--------------------
//-----------------------------+   상태 관리
//                             +--------------------
//#region type
    const [modalopen, setModalOpen] = useState<boolean>(false);
    const[address , setaddress] = useState<boolean>(false); 
    const[main_address , setAdress_data] = useState<string>("");
    const[ischeckcerfiti , setIscheckcerfiti]=useState<boolean>(false);
    const[phonnumber , setPhonenumber] =useState<string>("");
    const [formisValid, setFormIsValid] = useState(false);
    const[issignvalid , setIssignValid]=useState<boolean>(false);
    const[idisvalid , setIdisvalid] = useState<boolean>(false);
    const[nickisvalid ,setNickisvalid] = useState<boolean>(false);
    const[emailisvalid ,setEmailisvalid] = useState<boolean>(false);

    const[disid , setDisid] = useState<boolean>(false);
    const[disnick , setDisnick] = useState<boolean>(false);
    const[disemail , setDisemail] = useState<boolean>(false);

    const[duplid,setDuplid]=useState<boolean>(false);
    const[duplnick,setDuplnick]=useState<boolean>(false);
    const[duplemail,setDuplemail]=useState<boolean>(false);
//#endregion

//                             +--------------------
//-----------------------------+   전역 변수
//                             +--------------------
//#region type
    const navigate = useNavigate();
    const passwordRegExp =
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const disable_input:boolean =true; 
//#endregion



//                             +--------------------
//-----------------------------+   Function
//                             +--------------------
//#region type
    const openmodal = () => {
        setModalOpen(true);
    }

    const closemodal = () => {
        setModalOpen(false);
    }
    const addressclose =() =>{
        setaddress(false);
    }
    const address_data =(Address_data:object) =>{
        console.log("주소값 넘어오는거 확인 " ,Address_data)
        Object.entries(Address_data).map((k) =>{
         if(k.at(0) == "address"){
            console.log("address : " , k.at(1));
            setAdress_data(k.at(1));
         }})
        console.log("adrress : ", main_address);
    }

    const addressHandler =() =>{
        console.log("주소 입력 창 열기");
        setaddress(true);
    }
    const {
        value: EnterId,
        hassError: EnterIdHassError,
        isValid: enterIdIsValid,
        valueChangeHandler: IdChangeHandler,
        inputBlurHandler: IdBlurHandler,
    } = UseInput((value:string) => value.trim() != '');


    const {
        value: EnterPass,
        hassError: EnterPassHassError,
        isValid: enterPassIsValid,
        valueChangeHandler: PassChangeHandler,
        inputBlurHandler: PassBlurHandler,
    } = UseInput((value:string) => value.trim().length > 10 && value.match(passwordRegExp) != null);


    const {
        value: EnterName,
        hassError: EnterNameHassError,
        isValid: enterNameIsValid,
        valueChangeHandler: NameChangeHandler,
        inputBlurHandler: NameBlurHandler,
    } = UseInput((value:string) => value.trim() != '');

    const {
        value: EnterNicName,
        hassError: EnterNicNameHassError,
        isValid: enterNicNameIsValid,
        valueChangeHandler: NicNameChangeHandler,
        inputBlurHandler: NicNameBlurHandler,
    } = UseInput((value:string) => value.trim() != '');

    const {
        value: Enteraddress,
        hassError: EnteraddressHassError,
        isValid: enteraddressIsValid,
        valueChangeHandler: addressChangeHandler,
        inputBlurHandler: addressBlurHandler,
    } = UseInput((value:string) => value.trim() != '');

    const {
        value: EnterEmail,
        hassError: EnterEmailHassError,
        isValid: enterEmailIsValid,
        valueChangeHandler: EmailChangeHandler,
        inputBlurHandler: EmailBlurHandler,
    } = UseInput((value:string) => value.trim().includes('@'));

//                             +--------------------
//-----------------------------+   useeffect
//                             +--------------------
//#region type

   useEffect(() =>{

    console.log("입력값을 삭제하면 중보/사용 가능 메시지 없애기");
    if(EnterId == false){
        setIdisvalid(false) 
        setDisid(false);
        
    }
    else if(EnterNicName == false){
        setNickisvalid(false) 
        setDisnick(false)
        
    }
    else if(EnterId == false){
        setEmailisvalid(false) 
        setDisemail(false)
    }

   },[EnterEmail,EnterNicName ,EnterId ])

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log('Checking form validity!');

            setFormIsValid(
                enterNameIsValid && enterEmailIsValid && enterIdIsValid && 
                enterPassIsValid && enterNicNameIsValid /*&& ischeckcerfiti*/ && enteraddressIsValid&&
                idisvalid && nickisvalid
            );
        }, 500);
        return () => {
            console.log('CLEANUP');
            clearTimeout(identifier);
        };
    }, [enterPassIsValid, enterIdIsValid, enterEmailIsValid, enterNameIsValid, 
        enterNicNameIsValid /*, ischeckcerfiti*/ , enteraddressIsValid , idisvalid , nickisvalid])

    useEffect(() =>{
            console.log("중복 버튼!!");
            setDuplid(enterIdIsValid);
            setDuplnick(enterNicNameIsValid);
            setDuplemail(enterEmailIsValid);
            if(enterIdIsValid == false){
                setDisid(false);
                setIdisvalid(false);
            }
            else if(enterNicNameIsValid == false){
                setDisnick(false);
                setNickisvalid(false);
            }
            else if(enterEmailIsValid == false){
                setDisemail(false);
                setEmailisvalid(false);
            }
            
        },[enterIdIsValid ,enterNicNameIsValid,  enterEmailIsValid])

//#endregion

    const Submits = (event:KeyboardEvent<HTMLFormElement>) => {
        if(event.key=="Enter"){
        //event.preventDefault();
        response_userinfo();
        }
        
    }

    const back_main =() =>{
        navigate("/home");
    }

    const response_userinfo = () =>{
        //이름, 핸드폰 이메일, 주소, 닉네임
        api.post(`${COMMON_URL}/Pets-social/Common/user/sign`,
        {
            Name:EnterName,
            /*Phone:phonnumber,*/
            Email:EnterEmail,
            address : main_address+" "+Enteraddress,
            Nickname:EnterNicName,
            Password:EnterPass,
            Id:EnterId,
        }
    ).then(response =>{
        console.log("결과 : " , response.data);
        console.log("결과 status: " , response.status);
        if(response.status == 200){
            console.log("회원 가입 성공 ");
            setIssignValid(true);
            //navigate("/login");
            return;
        }
    }).catch(error =>{
        console.log("error : " , error.response);
        if(axios.isAxiosError<ResponseDataType>(error)){
           console.log("error code: " , error.code);
            if (!error.response) {
                console.warn("서버 응답 없음 (게이트웨이 연결 실패)");
                navigate("/error/LbGateway"); // 502로 간주
                return;
            }
           if(error.response?.status==400){
              navigate("/error/BadRequest");
            }else if(error.response?.status==415){
            console.log("지원하지 않는 형식입니다.")
            }
            else if(error.response?.status==500){
                navigate("/error/se-error")
            }

           console.log("error response: " , error.response?.data);
         }

    });
    }

    const resultcerfitication =() =>{
       console.log("본인인증 완료 ");
       setIscheckcerfiti(true);
    }
    const userNumber =(data:string)=>{
        console.log("인증 핸드폰 번호 : " , data);
        setPhonenumber(data);
    }

    const dupl_id = async() =>{
      console.log("중복 아이디 검색");
      api.get(`${COMMON_URL}/Pets-social/Common/user/dupl-id`, {params:{id:EnterId}})
      .then(response => {
         console.log("결과값 : " , response.data);
         console.log("결과status : " , response.status);
         if(response.status == 200){
            console.log("로그인 완료");
            setDisid(false);
            setIdisvalid(true);
         }
      })
      .catch(error =>{
         console.log("error : " , error.response);
         if(axios.isAxiosError<CustomError>(error)){
            console.log("error code: " , error.code);
            if (!error.response) {
                console.warn("서버 응답 없음 (게이트웨이 연결 실패)");
                navigate("/error/LbGateway"); // 502로 간주
                return;
            }
            if(error.response?.status==400){
                if(error.response?.data.errorcode ==="E0020"){
                    setIdisvalid(false);
                    setDisid(true);
                }
                else{
                     navigate("/error/LbBadRequest");
                }

            }
            else if(error.response?.status==415){
                console.log("지원하지 않는 형식입니다.")
                //setIsloading(false);
            }
            else if(error.response?.status==500){
                navigate("/error/se-error")
            }
            console.log("error response: " , error.response?.data);
          }

      });

    }
    const dupl_nickname =() =>{
     console.log("중복 닉네임 검색");
     api.get(`${COMMON_URL}/Pets-social/Common/user/dupl-nick`, {params:{nickname:EnterNicName}})
     .then(response => {
        console.log("결과값 : " , response.data);
        console.log("결과status : " , response.status);
        if(response.status == 200){
            console.log("닉네임 성공");
            setNickisvalid(true);
            setDisnick(false);
        }
     })
     .catch(error =>{
        if(axios.isAxiosError<CustomError>(error)){
            console.log("error code: " , error.code);
            if (!error.response) {
                console.warn("서버 응답 없음 (게이트웨이 연결 실패)");
                navigate("/error/LbGateway"); // 502로 간주
                return;
            }
            if(error.response?.status==400){
                if(error.response?.data.errorcode ==="E0021"){
                setNickisvalid(false);
                setDisnick(true);
                }else{
                    navigate("/error/LbBadRequest");
                }


            }
            else if(error.response?.status==415){
                console.log("지원하지 않는 형식입니다.")
                //setIsloading(false);
            }
            else if(error.response?.status==500){
                navigate("/error/se-error")
            }

            if(error)
            console.log("error response: " , error.response?.data);
          }

     });
     
    }

    const dupl_email =() =>{
        console.log("중복 이메일 검색");
        api.get(`${COMMON_URL}/Pets-social/Common/user/dupl-email`, {params:{email:EnterEmail}})
        .then(response => {
           console.log("결과값 : " , response.data);
           console.log("결과status : " , response.status);
           if(response.status == 200){
               console.log("이메일 중복 없음");
               setEmailisvalid(true);
               setDisemail(false);
           }
        })
        .catch(error =>{
           if(axios.isAxiosError<CustomError>(error)){
               console.log("error code: " , error.code);
                if (!error.response) {
                    console.warn("서버 응답 없음 (게이트웨이 연결 실패)");
                    navigate("/error/LbGateway"); // 502로 간주
                    return;
                    }
               
               if(error.response?.status==400){
                  if(error.response?.data.errorcode ==="E0022"){
                    setEmailisvalid(false);
                    setDisemail(true);
                  }else{
                    navigate("/error/LbBadRequest");
                  }
               }
                else if(error.response?.status==415){
                    console.log("지원하지 않는 형식입니다.")
                    //setIsloading(false);
                }
                else if(error.response?.status==500){
                    navigate("/error/se-error")
                }
             }
   
        }).finally(() => {});
    }
//#endregion


//                             +--------------------
//-----------------------------+   validation
//                             +--------------------
//#region type
    //input scss
    const EnterIdInputClasses = EnterIdHassError ? "Idinvalid" : "Idinput"; // 0(false), 1(true)
    const EnterPassInputClasses = EnterPassHassError ? "invalid" : "input";
    const EnterNameInputClasses = EnterNameHassError ? "invalid" : "input";
    const EnterNicNameInputClasses = EnterNicNameHassError ? "Nickinvalid" : "Nickinput";
    const EnterEmailInputClasses = EnterEmailHassError ? "Emailinvalid" : "Emailinput";
    const EnterAdressInputClasses = EnteraddressHassError ? "invalid" : "input";

    //placeholder value
    const idplaceholder = EnterIdHassError ? "아이디를 입력해주세요." : "아이디"
    const passwordplaceholder = EnterPassHassError ? "형식을 확인해주세요." : "비밀번호"
    const EnterNameplaceholder = EnterNameHassError ? "이름을 입력해주세요." : "이름";
    const EnterNicNameplaceholder = EnterNicNameHassError ? "닉네임을 입력해주세요." : "닉네임";
    const EnterEmailplaceholder = EnterEmailHassError ? "형식을 확인해주세요." : "이메일";
    const EnterAdressplaceholder = EnteraddressHassError ? "나머지 주소를 입력해주세요." : "상세 주소";
 
console.log("브라우저 넓이 :" , window.innerWidth);
    return (<Fragment>
       
            <div className="Signmain">
                <h2>회원가입</h2>
                    <div className={EnterIdInputClasses}>
                        <input placeholder={idplaceholder}
                            type="text"
                            value={EnterId}
                            onChange={IdChangeHandler}
                            onBlur={IdBlurHandler}
                            id="input_id"
                        />

                        <button type="button" onClick={dupl_id} disabled={!duplid}>중복확인</button>           
                        {idisvalid && <p className="id_success">사용가능</p>}
                        {disid && <p className="id_fail">중복</p>}
                        
                        
                    </div>
                    <div className={EnterPassInputClasses}>
                        <input placeholder={passwordplaceholder}
                            type="password"
                            value={EnterPass}
                            onChange={PassChangeHandler}
                            onBlur={PassBlurHandler}
                            id="input_password"                        
                        />
                      <div className="pass_msg">
                        <p>숫자+영문자+특수문자 10자리 이상 입력해주세요!</p>
                      </div>
                       
                    </div>

                    <div className={EnterNameInputClasses}>
                        <input placeholder={EnterNameplaceholder}
                            type="text"
                            value={EnterName}
                            onChange={NameChangeHandler}
                            onBlur={NameBlurHandler}                         
                            id="input_Name"
                        />
                    </div>
                    <div className = "adress">
                        <input placeholder="지역 주소"
                         type="text"
                         value={main_address}
                         id="input_Adrress"
                         disabled={!disable_input}
                        />

                        <button type="button" onClick={addressHandler} >주소입력</button>
                        {address && (<Adress onClose={addressclose} address ={address_data}/>)}
                    </div>
                    <div className={EnterAdressInputClasses}>
                        <input placeholder={EnterAdressplaceholder}
                         type="text"
                         value={Enteraddress}
                         onChange={addressChangeHandler}
                         onBlur={addressBlurHandler} />
                    </div>
                    <div className={EnterNicNameInputClasses}>
                        <input placeholder={EnterNicNameplaceholder}
                            type="text"
                            value={EnterNicName}
                            onChange={NicNameChangeHandler}
                            onBlur={NicNameBlurHandler}
                            id="input_NicName"
                        />
                        <button type="button" onClick={dupl_nickname} disabled={!duplnick}>중복확인</button>
                        {nickisvalid && <p className="nick_success">사용가능</p>}
                        {disnick && <p  className="nick_fail">중복</p>}
                    </div>
                    <div className={EnterEmailInputClasses}>
                        <input
                            placeholder={EnterEmailplaceholder}
                            type="email"
                            value={EnterEmail}
                            onChange={EmailChangeHandler}
                            onBlur={EmailBlurHandler}
                            id="input_Email"
                        />
                        <button type="button" onClick={dupl_email} disabled={!duplemail}>중복확인</button>
                        {emailisvalid && <p className="email_success">사용가능</p>}
                        {disemail && <p  className="email_fail">중복</p>}
                    </div>
                    <div className="certifi"> 
                    <button onClick={openmodal} id="verification">본인인증</button>
                    </div>
                    {modalopen && (<Certification onClose={closemodal} 
                    oncerfitication={resultcerfitication} onPhonNumber={userNumber}/>)}
                    {ischeckcerfiti && <p className="certification">인증 완료</p>}
                    {issignvalid && <Success_Sign onClose={closemodal} Name={EnterName}/>}
                    <div className="sign">
                        <button disabled={!formisValid} type="submit" onClick={response_userinfo}>회원가입</button>
                        <button onClick={back_main}>취소</button>
                    </div>
            </div>

    </Fragment >
    )

}

export default Sign;
//                             +--------------------
//-----------------------------+   내부 라이브러리
//                             +--------------------
//#region type
import "./Sign.scss";
import UseInput from "../UseHook/UserInput";
import Certification from "../Certification/Certification";
import Adress from "../address/Adress";
import Success_Sign from "../Success_Sign/Success_Sign";
import PetBuddyLogo from "../assets/images/petbuddy_logo.svg";
import SignupPetDogIcon from "../assets/images/signup_pet_dog.svg";
import SignupPetCatIcon from "../assets/images/signup_pet_cat.svg";
import SignupPetReptileIcon from "../assets/images/signup_pet_reptile.svg";
import SignupPetBirdIcon from "../assets/images/signup_pet_bird.svg";
import SignupPetRabbitIcon from "../assets/images/signup_pet_rabbit.svg";
import SignupPetAmphibiaIcon from "../assets/images/signup_pet_amphibia.svg";
import SignupPetInsectIcon from "../assets/images/signup_pet_insect.svg";
import GoogleIcon from "../assets/images/btn_google.svg";
import KakaoIcon from "../assets/images/btn_kakao.svg";
import NaverIcon from "../assets/images/btn_naver.svg";
import HeroAnimalsImg from "../assets/images/petbuddy_landing_collage.png";
//#endregion

//                             +--------------------
//-----------------------------+   외부 라이브러리
//                             +--------------------
//#region type
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Fragment, KeyboardEvent, useRef } from "react";
import React, { useState, useEffect } from 'react';
import {api,COMMON_URL ,PUBGATEWAY_URL} from "../API/Api";
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
    const[termsAccepted, setTermsAccepted] = useState<boolean>(false);

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

useEffect(() => {
  console.log("입력값을 삭제하면 중복/사용 가능 메시지 없애기");

  if (EnterId.trim() === "") {
    setIdisvalid(false);
    setDisid(false);
  }

  if (EnterNicName.trim() === "") {
    setNickisvalid(false);
    setDisnick(false);
  }

  if (EnterEmail.trim() === "") {
    setEmailisvalid(false);
    setDisemail(false);
  }
}, [EnterEmail, EnterNicName, EnterId]);

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log('Checking form validity!');

            setFormIsValid(
                enterNameIsValid && enterEmailIsValid && enterIdIsValid && 
                enterPassIsValid && enterNicNameIsValid /*&& ischeckcerfiti*/ && enteraddressIsValid&&
                idisvalid && nickisvalid && termsAccepted
            );
        }, 500);
        return () => {
            console.log('CLEANUP');
            clearTimeout(identifier);
        };
    }, [enterPassIsValid, enterIdIsValid, enterEmailIsValid, enterNameIsValid, 
        enterNicNameIsValid /*, ischeckcerfiti*/ , enteraddressIsValid , idisvalid , nickisvalid, termsAccepted])

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

        console.log("아이디 :" ,EnterId)

        
        api.post(`${PUBGATEWAY_URL}/user/sign` ,{
                name:EnterName,
                //phone:phonnumber,
                email:EnterEmail,
                address : main_address+" "+Enteraddress,
                nickname:EnterNicName,
                password:EnterPass,
                id:EnterId
            }).then(response =>{
                    console.log("회원 가입 성공 ");
                    setIssignValid(true);
                    return;
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
                    navigate("/error/LbBadRequest");
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
        api.get(`${PUBGATEWAY_URL}/user/dupl-id`, {params:{id:EnterId}}).
        then(response =>{
            setDisid(false);
            setIdisvalid(true);
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
                    if(error.response?.data.errorcode ==="E0020"){
                        setIdisvalid(false);
                        setDisid(true);
                    }
                    else{
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
    const dupl_nickname =() =>{
     console.log("중복 닉네임 검색");
        api.get(`${PUBGATEWAY_URL}/user/dupl-nick` ,{params:{nickname:EnterNicName}
                })
                .then(response =>{
                    setNickisvalid(true);
                    setDisnick(false);
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
                                setNickisvalid(false);
                                setDisnick(true);
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

    const dupl_email =() =>{
        console.log("중복 이메일 검색");
        api.get(`${PUBGATEWAY_URL}/user/dupl-email` ,
                {
                  params:{email:EnterEmail}
                }).then(response =>{
                    setEmailisvalid(true);
                    setDisemail(false);
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
                            if(error.response?.data.errorcode ==="E0022"){
                                    setEmailisvalid(false);
                                    setDisemail(true);
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
    const petPreviewList = [
        { src: SignupPetDogIcon, alt: "강아지" },
        { src: SignupPetCatIcon, alt: "고양이" },
        { src: SignupPetReptileIcon, alt: "파충류" },
        { src: SignupPetBirdIcon, alt: "조류" },
        { src: SignupPetRabbitIcon, alt: "토끼" },
        { src: SignupPetAmphibiaIcon, alt: "양서류" },
        { src: SignupPetInsectIcon, alt: "절지류" },
    ];

    return (<Fragment>
            <main className="SignPage">
                <section className="Signmain" aria-label="회원가입">
                    <div className="SignHeader">
                        <button type="button" className="SignLogoButton" onClick={back_main} aria-label="홈으로 이동">
                            <img src={PetBuddyLogo} alt="PetBuddy" />
                        </button>
                        <button type="button" className="SignLoginLink" onClick={() => navigate("/login")}>
                            로그인 하기 <span>›</span>
                        </button>
                    </div>

                    <div className="SignIntro">
                        <h2>회원가입</h2>
                        <p><strong>모든 반려동물</strong>을 위한 특별한 공간,<br />PetBuddy에서 함께해요!</p>
                    </div>

                    <div className="SignPetPreview" aria-hidden="true">
                        {petPreviewList.map((pet) => (
                            <span key={pet.alt}>
                                <img src={pet.src} alt="" />
                            </span>
                        ))}
                    </div>

                    <div className="SignForm">
                        <div className={EnterEmailInputClasses}>
                            <input
                                placeholder={EnterEmailplaceholder}
                                type="email"
                                value={EnterEmail}
                                onChange={EmailChangeHandler}
                                onBlur={EmailBlurHandler}
                                id="Sign_input_Email"
                            />
                            <button type="button" onClick={dupl_email} disabled={!duplemail}>확인</button>
                            {emailisvalid && <p className="email_success">사용 가능</p>}
                            {disemail && <p className="email_fail">이미 사용 중</p>}
                        </div>

                        <div className={EnterIdInputClasses}>
                            <input
                                placeholder={idplaceholder}
                                type="text"
                                value={EnterId}
                                onChange={IdChangeHandler}
                                onBlur={IdBlurHandler}
                                id="Sign_input_id"
                            />
                            <button type="button" onClick={dupl_id} disabled={!duplid}>확인</button>
                            {idisvalid && <p className="id_success">사용 가능</p>}
                            {disid && <p className="id_fail">이미 사용 중</p>}
                        </div>

                        <div className={EnterPassInputClasses}>
                            <input
                                placeholder={passwordplaceholder}
                                type="password"
                                value={EnterPass}
                                onChange={PassChangeHandler}
                                onBlur={PassBlurHandler}
                                id="Sign_input_password"
                            />
                            <div className="pass_msg">
                                <p>숫자, 영문자, 특수문자를 포함해 10자리 이상 입력해주세요.</p>
                            </div>
                        </div>

                        <div className={EnterNameInputClasses}>
                            <input
                                placeholder={EnterNameplaceholder}
                                type="text"
                                value={EnterName}
                                onChange={NameChangeHandler}
                                onBlur={NameBlurHandler}
                                id="Sign_input_Name"
                            />
                        </div>

                        <div className={EnterNicNameInputClasses}>
                            <input
                                placeholder={EnterNicNameplaceholder}
                                type="text"
                                value={EnterNicName}
                                onChange={NicNameChangeHandler}
                                onBlur={NicNameBlurHandler}
                                id="Sign_input_NicName"
                            />
                            <button type="button" onClick={dupl_nickname} disabled={!duplnick}>확인</button>
                            {nickisvalid && <p className="nick_success">사용 가능</p>}
                            {disnick && <p className="nick_fail">이미 사용 중</p>}
                        </div>

                        <div className="adress">
                            <input
                                placeholder="지역 주소"
                                type="text"
                                value={main_address}
                                id="Sign_input_Adrress"
                                disabled={!disable_input}
                            />
                            <button type="button" onClick={addressHandler}>주소입력</button>
                            {address && (<Adress onClose={addressclose} address={address_data}/>)}
                        </div>

                        <div className={EnterAdressInputClasses}>
                            <input
                                placeholder={EnterAdressplaceholder}
                                type="text"
                                value={Enteraddress}
                                onChange={addressChangeHandler}
                                onBlur={addressBlurHandler}
                            />
                        </div>

                        <div className="certifi">
                            <button type="button" onClick={openmodal} id="verification">본인인증</button>
                            {ischeckcerfiti && <p className="certification">인증 완료</p>}
                        </div>

                        {modalopen && (<Certification onClose={closemodal}
                            oncerfitication={resultcerfitication} onPhonNumber={userNumber}/>)}
                        {issignvalid && <Success_Sign onClose={closemodal} Name={EnterName}/>}

                        <label className="SignTerms">
                            <input
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={(event) => setTermsAccepted(event.target.checked)}
                            />
                            <span>서비스 이용약관 및 개인정보 처리방침에 동의합니다. <strong>(필수)</strong></span>
                        </label>

                        <div className="sign">
                            <button disabled={!formisValid} type="button" onClick={response_userinfo}>회원가입</button>
                        </div>
                    </div>

                    <div className="SignDivider"><span>또는 다른 방법으로 가입하기</span></div>
                    <div className="SignSocials" aria-label="소셜 회원가입">
                        <button type="button" aria-label="Google로 가입">
                            <img src={GoogleIcon} alt="" />
                        </button>
                        <button type="button" aria-label="Apple로 가입" className="apple">●</button>
                        <button type="button" aria-label="Kakao로 가입">
                            <img src={KakaoIcon} alt="" />
                        </button>
                        <button type="button" aria-label="Naver로 가입">
                            <img src={NaverIcon} alt="" />
                        </button>
                    </div>
                </section>

                <section className="SignVisual" aria-label="PetBuddy 소개">
                    <div className="SignVisualContent">
                        <span className="SignFloatIcon heart">♥</span>
                        <span className="SignFloatIcon paw">●●●</span>
                        <h1>다양한 반려동물과<br /><strong>특별한 일상을 함께해요</strong></h1>
                        <p>강아지, 고양이부터 파충류, 조류, 양서류, 곤충까지<br />모든 반려동물 보호자들이 모여 소통하는 공간입니다.</p>
                        <div className="SignHeroAnimalsVisual">
                            <img
                                className="SignHeroAnimals"
                                src={HeroAnimalsImg}
                                alt="강아지, 고양이, 파충류, 조류, 양서류, 곤충, 토끼가 함께 있는 PetBuddy 소개 이미지"
                            />
                        </div>
                        <div className="SignStats">
                            <div><strong>20,000+</strong><span>활발한 보호자</span></div>
                            <div><strong>15,000+</strong><span>다양한 반려동물</span></div>
                            <div><strong>50,000+</strong><span>정보 & 게시글</span></div>
                            <div><strong>안전한</strong><span>커뮤니티</span></div>
                        </div>
                    </div>
                </section>
            </main>

    </Fragment >
    )

}

export default Sign;

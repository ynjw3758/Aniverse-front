import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import "./Loginfind.scss";
import UseInput from "../UseHook/UserInput";
import Certification_pw from "../Message/Certification_pw";
import Pw_fail from "../Message/Pw_fail";
import Err_Network from "../Message/Err_Network";
import Id from "../Context/Userdata";
import { api, PUBGATEWAY_URL } from "../API/Api";
import CertifiTimer from "../Utils/CertifiTimer";
import Resetpassword from "./Resetpassword";
import PetBuddyLogo from "../assets/images/petbuddy_logo.svg";
import LoginFindPetTrio from "../assets/images/loginfind_pet_trio.png";

interface CustomError {
  errorcode: string;
  message: string;
}

interface ResponseDataType {
  message: string;
  code: number;
  response: object;
}

const Loginfind = () => {
  const [modalopen, setModalOpen] = useState(false);
  const [certifi, setCertifi] = useState(false);
  const [availid, setAvailid] = useState("");
  const [phone_certifi, setPhone_certifi] = useState(false);
  const [certifi_button, setCertifi_button] = useState(false);
  const [check_certifi, setCheck_certifi] = useState(false);
  const [network, setNetwork] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [certifi_number, setCertifi_number] = useState("");
  const [inputId, setInputId] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [isnotfound, setIsnotfound] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [isopt, setIsopt] = useState("");
  const [inputopt, setInputopt] = useState("");
  const [againtime, setAgaintime] = useState(false);
  const [isRetry, setIsRetry] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [expiredCode, setExpiredCode] = useState(false);
  const [codemiss, setCodemiss] = useState(false);
  const [verifyloading, setVerifyloading] = useState(false);
  const [verify_Success, setVerify_Success] = useState(false);
  const [sendUi, setSendUi] = useState(false);
  const [activeTab, setActiveTab] = useState<"id" | "pw">("id");
  const [authType, setAuthType] = useState<"email" | "phone">("email");
  const [resultId, setResultId] = useState(false);
  const [failId, setFailId] = useState(false);

  const navigate = useNavigate();
  const useid = useContext(Id);
  const Component_Contain = verify_Success ? "VerifyEmail_Main" : "LoginFind_Verifi_Email";

  const {
    value: EnternName,
    isValid: enterNameIsValid,
    valueChangeHandler: IdChangeHandler,
    inputBlurHandler: IdBlurHandler,
    ResetValue: resetName,
  } = UseInput((value: string) => value.trim() !== "");

  const {
    value: EnterEmail,
    isValid: enterEmailIsValid,
    valueChangeHandler: EmailChangeHandler,
    inputBlurHandler: EmailBlurHandler,
    ResetValue: resetEmail,
  } = UseInput((value: string) => value.trim().includes("@") && value.trim() !== "");

  useEffect(() => {
    const identifier = setTimeout(() => {
      setPhone_certifi(certifi_button && check_certifi);
    }, 200);

    return () => clearTimeout(identifier);
  }, [enterEmailIsValid, enterNameIsValid, certifi_button, check_certifi]);

  useEffect(() => {
    setIsDisable(inputopt.length !== 10);
  }, [inputopt]);

  const id_button = () => {
    setResultId(false);
    setFailId(false);
    setActiveTab("id");
  };

  const pw_button = () => {
    setResultId(false);
    setFailId(false);
    setActiveTab("pw");
  };

  const submit = () => {
    api
      .post(`${PUBGATEWAY_URL}/user/findId`, {
        username: EnternName,
        email: EnterEmail,
      })
      .then((response) => {
        if (response.status === 200 && response.data.id !== null) {
          setAvailid(response.data.id);
          setFailId(false);
          setResultId(true);
          return;
        }

        setResultId(false);
        setFailId(true);
      })
      .catch((error) => {
        if (axios.isAxiosError<CustomError>(error)) {
          if (!error.response) {
            navigate("/error/LbGateway");
            return;
          }

          if (error.response.status === 400 && error.response.data.errorcode === "E0011") {
            setResultId(false);
            setFailId(true);
            return;
          }

          if (error.response.status === 400) navigate("/error/LbBadRequest");
          else if (error.response.status === 500) navigate("/error/Lbse-error");
          else if (error.response.status === 502) navigate("/error/LbGateway");
        }
      });
  };

  const login_page = () => {
    navigate("/login");
  };

  const return_input = () => {
    setResultId(false);
    setFailId(false);
    resetName();
    resetEmail();
  };

  const firstnumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPhone_number(value);
    setCertifi_button(value.length >= 10);
  };

  const namehandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const idhandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const certifinumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCertifi_number(value);
    setCheck_certifi(value.length >= 7);
  };

  const Number_Receive = () => {
    console.log("휴대폰 인증 요청", { id, name, phone_number });
  };

  const resetpwhandler = () => {
    api
      .post("http://localhost:8080/Pets-social/reset-pass", {
        phonnumber: phone_number,
        certifi_number,
      })
      .then((response) => {
        if (response.status === 200) {
          useid.addid(response.data.id);
          navigate("/reset");
        }
      })
      .catch((error) => {
        if (axios.isAxiosError<ResponseDataType>(error)) {
          if (error.code === "ERR_BAD_REQUEST") setCertifi(true);
          if (error.code === "ERR_NETWORK") setNetwork(true);
        }
      });
  };

  const InputIdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputId(event.target.value);
  };

  const InputEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  };

  const SendEmail = () => {
    setSendEmail(true);
    setIsLoading(true);
    setSendUi(false);

    api
      .post(
        `${PUBGATEWAY_URL}/certifi/sendemail`,
        {
          id: inputId,
          email: inputEmail,
        },
        {
          headers: {
            "X-Platform-Type": "web",
          },
        }
      )
      .then((response) => {
        setIsopt(response.data.opt);
        setIsLoading(false);
        setSendUi(true);
      })
      .catch((error) => {
        if (axios.isAxiosError<CustomError>(error)) {
          if (!error.response) {
            navigate("/error/LbGateway");
            return;
          }

          if (error.response.status === 400) {
            if (error.response.data.errorcode === "E0031") setIsnotfound(true);
            else if (error.response.data.errorcode === "E0030") setCertifi(true);
            else navigate("/error/LbBadRequest");
            setSendEmail(false);
            return;
          }

          if (error.response.status === 500) navigate("/error/Lbse-error");
          else if (error.response.status === 502) navigate("/error/LbGateway");
        }
      });
  };

  const InputOptHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputopt(event.target.value);
  };

  const TimeFinish = (data: boolean) => {
    setIsRetry(data);
  };

  const againSendMail = () => {
    setInputopt("");
    setCodemiss(false);
    setExpiredCode(false);
    setIsRetry(false);
    setIsLoading(true);
    SendEmail();
  };

  const EmailCertifi = () => {
    setVerifyloading(true);

    api
      .get(`${PUBGATEWAY_URL}/certifi/verifiCertifi`, {
        params: {
          id: inputId,
          code: inputopt,
        },
      })
      .then(() => {
        setVerifyloading(false);
        setSendUi(false);
        setVerify_Success(true);
      })
      .catch((error) => {
        if (axios.isAxiosError<CustomError>(error)) {
          if (!error.response) {
            navigate("/error/LbGateway");
            return;
          }

          if (error.response.status === 400) {
            setVerifyloading(false);
            setInputopt("");

            if (error.response.data.errorcode === "E0032") setExpiredCode(true);
            else if (error.response.data.errorcode === "E0033") setCodemiss(true);
            else navigate("/error/LbBadRequest");
            return;
          }

          if (error.response.status === 404) navigate("/error/LbNotFound");
          else if (error.response.status === 500) navigate("/error/Lbse-error");
          else if (error.response.status === 502) navigate("/error/LbGateway");
        }
      });
  };

  const closemodal = () => setModalOpen(false);
  const certifi_closemodal = () => setCertifi(false);
  const network_closemodal = () => setNetwork(false);
  const nfmodalClose = () => setIsnotfound(false);
  const SendEmailClose = () => setSendEmail(false);

  return (
    <Fragment>
      <main className="LoginFindPage">
        <section className="LoginFindPanel" aria-label="아이디 찾기와 비밀번호 재설정">
          <header className="LoginFindHeader">
            <button type="button" className="LoginFindBrand" onClick={() => navigate("/")}>
              <img src={PetBuddyLogo} alt="animal" />
              <span>animal</span>
            </button>
          </header>

          <div className="LoginFindHeroText">
            <h1>
              ID / PW <strong>찾기</strong>
            </h1>
            <p>
              가입한 이메일을 통해
              <br />
              아이디 또는 비밀번호를 찾을 수 있어요.
            </p>
          </div>

          <div className="LoginFind_tag" role="tablist" aria-label="찾기 유형">
            <button className={`LoginFindTab ${activeTab === "id" ? "isSelected" : ""}`} type="button" onClick={id_button}>
              아이디 찾기
            </button>
            <button className={`LoginFindTab ${activeTab === "pw" ? "isSelected" : ""}`} type="button" onClick={pw_button}>
              비밀번호 재설정
            </button>
          </div>

          <div className="LoginFind_Body">
            <div className="LoginFind_Title">
              <span className="LoginFindTitleIcon">{activeTab === "id" ? "♙" : "✉"}</span>
              <div>
                <h3>{activeTab === "id" ? "아이디 찾기" : "비밀번호 재설정"}</h3>
                <p>
                  {activeTab === "id"
                    ? "가입 시 입력한 정보를 통해 아이디를 안내해드려요."
                    : "가입 이메일로 비밀번호 재설정 인증을 진행해요."}
                </p>
              </div>
            </div>

            {activeTab === "id" && !resultId && !failId && (
              <form
                className="LoginFind_id"
                onSubmit={(event) => {
                  event.preventDefault();
                  submit();
                }}
              >
                <label className="LoginFindField">
                  <span>이름</span>
                  <input
                    placeholder="이름을 입력해주세요"
                    type="text"
                    className="LoginFind_Input"
                    value={EnternName}
                    onChange={IdChangeHandler}
                    onBlur={IdBlurHandler}
                  />
                </label>
                <label className="LoginFindField">
                  <span>이메일</span>
                  <input
                    placeholder="가입 시 사용한 이메일을 입력해주세요"
                    type="email"
                    className="LoginFind_Input"
                    value={EnterEmail}
                    onChange={EmailChangeHandler}
                    onBlur={EmailBlurHandler}
                  />
                </label>
                <button className="LoginFind_Button" type="submit" disabled={!EnternName || !EnterEmail.includes("@")}>
                  아이디 찾기
                </button>
              </form>
            )}

            {resultId && (
              <div className="ResultCard success">
                <div className="ResultTop">
                  <span className="ResultBadge">조회 완료</span>
                  <h3 className="ResultTitle">아이디를 찾았어요</h3>
                  <p className="ResultDesc">아래 아이디로 로그인할 수 있어요.</p>
                </div>
                <div className="ResultIdBox">
                  <span className="ResultIdLabel">아이디</span>
                  <span className="ResultIdValue">{availid}</span>
                </div>
                <div className="ResultActions">
                  <button type="button" className="PrimaryBtn" onClick={login_page}>
                    로그인하러 가기
                  </button>
                  <button type="button" className="GhostBtn" onClick={return_input}>
                    다른 정보로 다시 찾기
                  </button>
                </div>
              </div>
            )}

            {failId && (
              <div className="ResultCard LoginFinderror">
                <div className="ResultTop">
                  <span className="ErrorBadge">조회 결과</span>
                  <h3 className="ResultTitle">등록된 정보를 찾을 수 없어요</h3>
                  <p className="ResultDesc">입력한 이름과 이메일을 다시 확인해주세요.</p>
                </div>
                <div className="ResultActions">
                  <button type="button" className="PrimaryBtn" onClick={return_input}>
                    다시 입력하기
                  </button>
                </div>
              </div>
            )}

            {activeTab === "pw" && (
              <div className="pw">
                <div className="AuthType">
                  <button
                    type="button"
                    className={`LoginFindAuthBtn ${authType === "email" ? "isSelected" : ""}`}
                    onClick={() => setAuthType("email")}
                  >
                    이메일 인증
                  </button>
                  <button
                    type="button"
                    className={`LoginFindAuthBtn ${authType === "phone" ? "isSelected" : ""}`}
                    onClick={() => setAuthType("phone")}
                  >
                    휴대폰 인증
                  </button>
                </div>

                {authType === "email" && (
                  <div className="Form">
                    <label className="Field">
                      <span className="Label">이메일</span>
                      <input className="Input" type="email" placeholder="example@domain.com" onChange={InputEmailHandler} />
                    </label>
                    <label className="Field">
                      <span className="Label">아이디</span>
                      <input className="Input" type="text" placeholder="아이디를 입력해주세요" onChange={InputIdHandler} />
                    </label>
                    <button type="button" className="PrimaryBtn" onClick={SendEmail}>
                      재설정 인증 메일 받기
                    </button>
                  </div>
                )}

                {authType === "phone" && (
                  <div className="Form">
                    <label className="Field">
                      <span className="Label">아이디</span>
                      <input className="Input" type="text" placeholder="아이디를 입력해주세요" onChange={idhandler} />
                    </label>
                    <label className="Field">
                      <span className="Label">이름</span>
                      <input className="Input" type="text" placeholder="이름을 입력해주세요" onChange={namehandler} />
                    </label>
                    <div className="Inline">
                      <input className="Input" type="tel" placeholder="전화번호를 입력해주세요" onChange={firstnumber} />
                      <button type="button" className="InlineBtn" onClick={Number_Receive} disabled={!certifi_button}>
                        인증번호
                      </button>
                    </div>
                    <label className="Field">
                      <span className="Label">인증번호</span>
                      <input className="Input" type="number" placeholder="인증번호를 입력해주세요" onChange={certifinumber} />
                    </label>
                    <button type="button" className="PrimaryBtn" onClick={resetpwhandler} disabled={!phone_certifi}>
                      다음
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="LoginFindAlt">
            <span>다른 방법으로 찾기</span>
          </div>
          <button type="button" className="LoginFindSupport">
            <span>✉</span>
            <strong>이메일이 기억나지 않으세요?</strong>
            <em>고객센터 문의</em>
          </button>
          <button type="button" className="LoginFindBack" onClick={login_page}>
            ← 로그인으로 돌아가기
          </button>
        </section>

        <aside className="LoginFindVisual" aria-label="계정 찾기 도움말">
          <div className="LoginFindVisualInner">
            <h2>
              소중한 반려동물과의
              <br />
              <strong>일상을 다시 연결해드릴게요</strong>
            </h2>
            <p>
              아이디 또는 비밀번호가 기억나지 않아도 걱정하지 마세요.
              <br />
              간단한 정보로 쉽게 찾을 수 있어요.
            </p>
            <img className="LoginFindPetTrio" src={LoginFindPetTrio} alt="강아지, 고양이, 흰 강아지" />

            <section className="LoginFindFaq">
              <h3>자주 묻는 질문</h3>
              <button type="button"><span>♙</span>아이디 찾기에서 실패했어요<b>›</b></button>
              <button type="button"><span>✉</span>비밀번호 재설정 메일이 오지 않아요<b>›</b></button>
              <button type="button"><span>?</span>이메일 주소가 기억나지 않아요<b>›</b></button>
              <button type="button"><span>☏</span>여전히 도움이 필요해요<b>›</b></button>
            </section>

            <section className="LoginFindHelp">
              <span>☏</span>
              <div>
                <strong>도움이 필요하신가요?</strong>
                <p>평일 09:00 - 18:00 (주말, 공휴일 제외)</p>
              </div>
              <button type="button">1:1 문의하기</button>
            </section>
          </div>
        </aside>
      </main>

      {sendEmail && (
        <div className="LoginFind_again_input_backdrop" onClick={SendEmailClose}>
          <div className={Component_Contain} onClick={(event) => event.stopPropagation()}>
            {isLoading && <Oval color="#ff4f76" height={120} width={50} />}
            {sendUi && (
              <>
                <h2>이메일 인증</h2>
                <p>
                  인증번호가 이메일로 전송되었습니다.
                  <br />
                  {inputEmail}
                </p>
                <input type="text" placeholder="인증번호 입력" onChange={InputOptHandler} />
                {codemiss && <p className="Verify_Miss">번호가 맞지 않습니다.</p>}
                {expiredCode && <p className="Verify_expired">인증번호 유효 시간이 만료되었습니다.</p>}
                <CertifiTimer IsFinish={TimeFinish} Retry={againtime} />
                {isRetry && (
                  <button type="button" className="Again_SendEmail" onClick={againSendMail}>
                    인증번호 다시 받기
                  </button>
                )}
                <button disabled={isDisable} onClick={EmailCertifi}>
                  인증하기
                </button>
                {verifyloading && (
                  <div className="VerifyLoadinf">
                    <Oval color="#ff4f76" height={120} width={50} />
                  </div>
                )}
              </>
            )}
            {verify_Success && (
              <div className="Verify_Success">
                <Resetpassword Userid={inputId} />
              </div>
            )}
          </div>
        </div>
      )}

      {isnotfound && (
        <div className="LoginFind_again_input_backdrop" onClick={nfmodalClose}>
          <div className="LoginFind_again_input_modal">
            <p>입력한 정보가 올바르지 않습니다. 다시 확인해주세요.</p>
          </div>
        </div>
      )}
      {modalopen && <Certification_pw onClose={closemodal} />}
      {certifi && <Pw_fail onClose={certifi_closemodal} />}
      {network && <Err_Network onClose={network_closemodal} />}
    </Fragment>
  );
};

export default Loginfind;

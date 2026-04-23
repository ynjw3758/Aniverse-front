import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Kakaoimg from "../assets/images/btn_kakao.svg";
import Naverimg from "../assets/images/btn_naver.svg";
import Googleimg from "../assets/images/btn_google.svg";
import Lodingimg from "../assets/images/login_loading.png";
import PetBuddyLogo from "../assets/images/petbuddy_logo.svg";
import LoginCollageImg from "../assets/images/petbuddy_login_collage.png";
import { v4 as uuidv4 } from "uuid";
import "./Login.scss";
import UseInput from "../UseHook/UserInput";
import { PUBGATEWAY_URL } from "../API/Api";

interface CustomError {
  status: number;
  errorcode: string;
  message: string;
  timestamp?: string;
}

const Login: React.FC = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [isLoginFail, setIsLoginFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    value: EnterId,
    isValid: enterIdIsValid,
    valueChangeHandler: IdChangeHandler,
    inputBlurHandler: IdBlurHandler,
  } = UseInput((value: string) => value.trim() !== "");

  const {
    value: EnterPass,
    isValid: enterPassIsValid,
    valueChangeHandler: PassChangeHandler,
    inputBlurHandler: PassBlurHandler,
  } = UseInput((value: string) => value.trim().length > 10);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(enterIdIsValid && enterPassIsValid);
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [enterPassIsValid, enterIdIsValid]);

  const submitfn = () => {
    if (!formIsValid || isLoading) return;

    setIsLoading(true);
    setIsLoginFail(false);

    axios
      .post(
        `${PUBGATEWAY_URL}/login/login`,
        {
          id: EnterId,
          password: EnterPass,
          clientType: "WEB",
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      )
      .then((response) => {
        localStorage.setItem("id", response.data.data.id);
        navigate("/main");
      })
      .catch((error) => {
        setIsLoading(false);

        if (axios.isAxiosError<CustomError>(error)) {
          if (!error.response) {
            navigate("/error/LbGateway");
            return;
          }

          if (error.response.status === 400) {
            if (error.response.data.errorcode === "E0010") {
              setIsLoginFail(true);
            } else {
              navigate("/error/LbBadRequest");
            }
            return;
          }

          if (error.response.status === 500) {
            navigate("/error/se-error");
            return;
          }

          if (error.response.status === 502) {
            navigate("/error/LbGateway");
          }
        }
      });
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    submitfn();
  };

  const kakaoLogin = () => {
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const redirectUrl = process.env.REACT_APP_REDIRECT_URL;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${redirectUrl}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  const naverLogin = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const naverRedirectUrl = process.env.REACT_APP_REDIRECT_URL_N;
    const state = uuidv4();
    const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${naverRedirectUrl}&state=${state}`;
    window.location.href = url;
  };

  const googleLogin = () => {
    // TODO: 구글 OAuth 연결 시 이 함수에 인증 URL을 연결하면 됩니다.
  };

  return (
    <main className="LoginPage">
      {isLoading && (
        <div className="LoginLoading" role="status" aria-live="polite">
          <img src={Lodingimg} alt="" />
          <p>로그인 중입니다...</p>
        </div>
      )}

      <section className="LoginShell">
        <header className="LoginHeader">
          <button type="button" className="LoginBrand" onClick={() => navigate("/")}>
            <img src={PetBuddyLogo} alt="Aniverse" />
            <span>Aniverse</span>
          </button>

          <p>
            계정이 없으신가요?
            <button type="button" onClick={() => navigate("/signs")}>회원가입</button>
          </p>
        </header>

        <div className="LoginContent">
          <form className="LoginPanel" onSubmit={submitHandler}>
            <div className="LoginTitle">
              <h1>로그인</h1>
              <p>
                Aniverse에 오신 것을 환영합니다!
                <br />
                다양한 반려동물 보호자들과 함께 <strong>소통</strong>해보세요.
              </p>
            </div>

            <div className="LoginField">
              <label htmlFor="id">아이디</label>
              <div className="LoginInputBox">
                <span aria-hidden="true">⌾</span>
                <input
                  type="text"
                  id="id"
                  placeholder="아이디를 입력해주세요"
                  value={EnterId}
                  onChange={IdChangeHandler}
                  onBlur={IdBlurHandler}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="LoginField">
              <label htmlFor="password">비밀번호</label>
              <div className="LoginInputBox">
                <span aria-hidden="true">⌕</span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="비밀번호를 입력해주세요"
                  value={EnterPass}
                  onChange={PassChangeHandler}
                  onBlur={PassBlurHandler}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="PasswordToggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "숨김" : "보기"}
                </button>
              </div>
            </div>

            <div className="LoginOptions">
              <label>
                <input type="checkbox" />
                <span>로그인 상태 유지</span>
              </label>
              <Link to="/find">비밀번호 찾기</Link>
            </div>

            {isLoginFail && (
              <p className="LoginError">회원정보가 일치하지 않습니다.</p>
            )}

            <button className="LoginSubmit" type="submit" disabled={!formIsValid || isLoading}>
              로그인
            </button>

            <div className="LoginDivider">
              <span />
              <p>또는</p>
              <span />
            </div>

            <div className="LoginSocial">
              <p>간편하게 로그인하기</p>
              <div>
                <button type="button" onClick={kakaoLogin} aria-label="카카오 로그인">
                  <img src={Kakaoimg} alt="" />
                </button>
                <button type="button" onClick={naverLogin} aria-label="네이버 로그인">
                  <img src={Naverimg} alt="" />
                </button>
                <button type="button" onClick={googleLogin} aria-label="구글 로그인">
                  <img src={Googleimg} alt="" />
                </button>
                <button type="button" aria-label="애플 로그인">
                  <span></span>
                </button>
              </div>
            </div>

            <p className="LoginNotice">
              로그인하면 Aniverse의 다양한 서비스를 이용할 수 있어요.
            </p>
          </form>

          <aside className="LoginVisual" aria-label="Aniverse 소개 이미지">
            <div className="LoginVisualText">
              <span>♡</span>
              <h2>
                모든 반려동물과
                <strong>모든 반려동물을 위한 플랫폼</strong>
              </h2>
              <p>
                강아지, 고양이부터 파충류, 조류, 양서류, 곤충까지
                <br />
                모든 반려동물 보호자들이 모여 정보를 나누고 소통하는 공간입니다.
              </p>
            </div>
            <img src={LoginCollageImg} alt="" />
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Login;

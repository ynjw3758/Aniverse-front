
import { useNavigate } from "react-router-dom";


const LoginExp =() =>{

    const navigate = useNavigate();

    const movelogin =() =>{
        navigate("/login")
      }
   
    return(<div className="Naver_refresh_token_again_BackDrop">
        <div className="Naver_refresh_token_again">
        <h2>세션 만료</h2>
        <p>
        오랜 시간이 지나 자동으로 로그아웃되었어요.<br />
        보안을 위해 다시 로그인해 주세요.</p>
        <button onClick={movelogin} type="button">로그인 페이지 이동</button>
        </div>
       </div>)
}

export default LoginExp;
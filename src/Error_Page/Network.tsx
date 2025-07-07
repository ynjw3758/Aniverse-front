
import Clesses from"./Network.module.scss";
import {useNavigate}  from "react-router-dom";

const Network =() =>{
    const navigate = useNavigate();

    const clickHandler =() =>{
        navigate(-1);
    }

    return(<div className={Clesses.main}>
          <img src="../assets/images/network.png" />
          <h2>Network error 발생</h2>
          <p>오류가 발생하였습니다. 관리자에게 문의하세요</p>
          <button onClick={clickHandler}>이전 페이지 이동</button>
    </div>

    )

}
export default Network;
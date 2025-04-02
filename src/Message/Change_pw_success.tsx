import Modal from "../Modal/Modal";
import "./Change_pw_success.scss";
import { useNavigate } from "react-router-dom";
const Change_pw_success:React.FC<{onClose : () => void }>  =(props) =>{
    const navigate = useNavigate();
   
    const loginhadnler =() =>{
      console.log("비밀번호 변경 후 로그인 페이지 이동");
      navigate("/login");
    }
    const mainpagehandler =() =>{
     console.log("최초 패이지 이동 ");
     navigate("/");
    }


     return(<Modal onClose={props.onClose}>
     <div className="main">
        <h2>비밀번호 변경이 완료되었습니다</h2>
        <div className="btn">
        <button onClick={loginhadnler}>로그인</button>
        <button onClick={mainpagehandler}>취소</button>
        </div>
     </div>
     </Modal>)

}

export default Change_pw_success;
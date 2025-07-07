import { useState } from "react";
import Modal from "../Modal/Modal";
import "./Success_Sign.scss";
import { useNavigate } from "react-router-dom";

interface SettingsMenuType {
  Name:string;
  onClose :() => void
}

const Success_Sign:React.FC<SettingsMenuType> =({onClose , Name}) =>{
    const[username , setUsername] = useState<string>("");
    const navigate = useNavigate();

    const move_login =() =>{
      console.log("로그인 페이지로 이동");
      navigate("/login");
    }

    const move_main =() =>{
        console.log("최초의 페이지로 이동");
        navigate("/");
    }
//<div className="Success_SignDrop">
    return(<Modal onClose={onClose}>
            <div className="Success_Sign_Main">
              <img src="../assets/images/success_sign.png"/>
             <p>{`${Name}님의 회원 가입을 축하드립니다`}</p>
             <h3>애완동물과의 이야기를 공유해보세요</h3>
             <div className="success_sign_btn">
             <button type="button" onClick={move_login}>로그인</button>
             <button type="button" onClick={move_main}>취소</button>
             </div>
            </div>
         
       </Modal>   
    )


}
export default Success_Sign;
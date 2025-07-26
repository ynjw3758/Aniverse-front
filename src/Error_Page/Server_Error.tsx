import { Fragment } from "react";
import "./Server_Error.scss";
import errorimg from "../assets/images/500.png";
import errormain from "../assets/images/500Error.png";
import { useNavigate } from "react-router-dom";


const Server_Error =() =>{
    
    const navigate = useNavigate();

    const mainpage =() =>{
        navigate("/main");
    }
    return(<Fragment>
    <div className="Server_Error_Main">
        <img src={errormain}/>
        <div className="centents">
            <img src={errorimg}/>
            <h2>현재 시스템오류가 발생하여 문제를 해결중입니다...</h2>
        </div>
        <div className="Server_Error_btn">
             <button onClick={mainpage}>메인페이지 이동</button>
        </div>
    </div>
    </Fragment>)
}

export default Server_Error;
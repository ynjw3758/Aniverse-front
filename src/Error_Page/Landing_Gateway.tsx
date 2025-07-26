import "./GatewayError.scss";
import { useNavigate } from "react-router-dom";
import errorimg from "../assets/images/502-error-image.png"

const Landing_Gateway =()=>{

    const navigate = useNavigate();

    const mainpage =() =>{
        navigate("/");
    }

  return(<div className="Gateway_Error">  
    <img src={errorimg} alt="502 Bad Gateway" />
    <h2>502 Bad Gateway </h2>
    <div className="Gateway_Error_btn">
             <button onClick={mainpage}>메인페이지 이동</button>
    </div>
  </div>
)}


export default Landing_Gateway;
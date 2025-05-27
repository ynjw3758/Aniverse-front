
import "./GatewayError.scss";
import { useNavigate } from "react-router-dom";

const GatewayError =() =>{
    
    const navigate = useNavigate();

    const mainpage =() =>{
        navigate("/main");
    }

  return(<div className="Gateway_Error">  
    <img src="/image/502-error-image.png" alt="502 Bad Gateway" />
    <h2>502 Bad Gateway </h2>
    <div className="Gateway_Error_btn">
             <button onClick={mainpage}>메인페이지 이동</button>
    </div>
  </div>)
}
export default GatewayError;
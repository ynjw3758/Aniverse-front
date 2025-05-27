
import "./BadRequest.scss";
import { useNavigate } from "react-router-dom";

const BadRequest =() =>{
    const navigate = useNavigate();

    const mainpage =() =>{
        navigate("/main");
    }

    return(<div className="BadRequest_Stand">
        <img src="/image/502-error-image.png" alt="400 Bad Request" />
    <h2>400 Bad Request</h2>
    <div className="BadRequest_Stand_btn">
             <button onClick={mainpage}>메인페이지 이동</button>
    </div>
    </div>)
}

export default BadRequest;
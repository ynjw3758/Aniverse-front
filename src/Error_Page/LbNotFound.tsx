import "./NotFound.scss";
import img from"../assets/images/404Error.png";
import { useNavigate } from "react-router-dom";


const LbNotFound =() =>{

     const navigate = useNavigate();
    
    const mainpage =() =>{
        navigate("/");
    }


    return(<div className="NotFound_Main">
            <img src={img}/>
            <h2>해당 url을 찾을수 없습니다...</h2>
            <button onClick={mainpage}>메인페이지 이동</button>
    </div>)

}

export default LbNotFound;
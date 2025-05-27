import "./Authorization_Page.scss";
import { useNavigate } from "react-router-dom";


const Authorization_Page =() =>{

    const navigate = useNavigate();
    const beforepage =() =>{
        navigate(-1);
    }

    const mainpage =() =>{
        navigate("/main");
    }


    return(
         <div className="Authorization">
            <h4>Error 403 forbidden</h4>
            <h2>접근이 거부 되었습니다.</h2>
            <div className="Authorization_btn">
             <button onClick={beforepage}>이전페이지 이동</button>
             <button onClick={mainpage}>메인페이지 이동</button>
            </div>
         </div>
    )
}

export default Authorization_Page;
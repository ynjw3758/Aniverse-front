import { FaHouse } from "react-icons/fa6";
import "./Home.scss";
import { useNavigate } from "react-router-dom";

const Home=() =>{
    const navigate = useNavigate();
    const clicKHandler =() =>{
        console.log("Mainㅠ페이지 이동");
        navigate("/main");
    }
    return(
        <button className="button" onClick={clicKHandler}>
           <span className="icon">
          <FaHouse size="40"/>
          </span>
        </button>

    )
    
}

export default Home;
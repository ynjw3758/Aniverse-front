import { Link } from "react-router-dom";
//import Classes from "./Header.module.scss";
import "./Header.scss";
import img from "../assets/images/log.png"

const Header = () =>{



    return(
       <div className="Headers">
            <Link to = "/" 
            style={{ textDecoration: 'none'  , 
                   color:"black",
                    fontSize:"xx-large"}}>
            <div className="Headers_log">
                <img src={img} alt="애완멀" ></img>
            </div>
                </Link>
        </div>
       
    )
}

export default Header;
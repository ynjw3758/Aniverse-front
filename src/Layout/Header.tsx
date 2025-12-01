import { Link } from "react-router-dom";
//import Classes from "./Header.module.scss";
import "./Header.scss";
import img from "../assets/images/log.png"

const Header = () =>{

//<img src={img} alt="애완멀" ></img>

    return(
       <div className="Headers">
            <Link to = "/" 
            style={{ textDecoration: 'none'  , 
                   color:"black",
                    fontSize:"xx-large"}}>
            <div className="Headers_log">
                <p>Aniverse</p>
            </div>
                </Link>
        </div>
       
    )
}

export default Header;
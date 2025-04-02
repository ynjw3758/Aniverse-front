import "./Navigation.scss";
import { Link } from "react-router-dom";


const Navigation:React.FC = () =>{
    return(<div>  
    <nav className="Headernav">
        <ul>
        <li><Link to="/"
            style={{
                textDecoration: 'none'
            }}
            className="Headerhome">Home</Link></li>
        <li><Link to="/Agree" style={{
            textDecoration: 'none'
        }}
        className="Headersign">회원가입</Link></li>
        <li><Link to="/login" style={{
            textDecoration: 'none'
        }}
        className="Headerlogin">로그인</Link></li>
        </ul>
    </nav>
</div>)

}

export default Navigation;
import { HiBell } from "react-icons/hi";
import "./HibellIcon.scss";


const HiBellIcon =() =>{
    return (
    <button className="button">
    <span className="icon">
   <HiBell size="45"/>
   </span>
   <span className="badge">1</span>
 </button>
    )
}

export default HiBellIcon;
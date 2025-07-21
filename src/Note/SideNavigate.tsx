
import { useNavigate} from "react-router-dom";
import "./SideNavigate.scss";
import Homeimg from "../assets/images/log.png";
import Freindimg from "../assets/images/friends.png";
import Messageimg from "../assets/images/message.png";
import Chatimg from "../assets/images/talk.png";
import Searchimg from "../assets/images/search.png";
import Alarmimg from "../assets/images/Alarm.png";
import Favoriteimg from "../assets/images/favorite.png";
import Timeimg from "../assets/images/time.png" 


const SideNavigate =() =>{

//              +-----------------
//--------------+ 전역 변수
//              +-----------------
//#region type
const navigate = useNavigate();
//#endregion
  const HomeHandler =() =>{
    navigate("/main");
  }
/*

             */

    return(<>
       <ul className="Note_side">
                <button className="NoteSide_Home" onClick={HomeHandler}>
                  <img src={Homeimg} />
                </button>
                <button className="NoteSide_FItem">
                  <img src={Freindimg} />
                </button>
                <button className="NoteSide_MItem">
                  <img src={Messageimg} />
                </button>
                <button className="NoteSide_CItem">
                  <img src={Chatimg} />
                </button>
                <button className="NoteSide_SItem">
                  <img src={Searchimg} />
                </button>
                <button className="NoteSide_RItem">
                  <img src={Alarmimg} />
                </button>
                <button className="NoteSide_LItem">
                  <img src={Favoriteimg} />
                </button>
                <button className="NoteSide_AItem">
                <img src={Timeimg} />    
                </button>
            </ul>
            <div className="NoteSide_vertical"> 
              <hr />
             </div>
    </>)
}

export default SideNavigate;
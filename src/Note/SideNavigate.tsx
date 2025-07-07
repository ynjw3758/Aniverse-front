
import { useNavigate} from "react-router-dom";

import "./SideNavigate.scss";


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
                  <img src="../assets/images/log_test.jpg" />
                </button>
                <button className="NoteSide_FItem">
                  <img src="../assets/images/friends.png" />
                </button>
                <button className="NoteSide_MItem">
                  <img src="../assets/images/message.png" />
                </button>
                <button className="NoteSide_CItem">
                  <img src="../assets/images/talk.png" />
                </button>
                <button className="NoteSide_SItem">
                  <img src="../assets/images/search.png" />
                </button>
                <button className="NoteSide_RItem">
                  <img src="../assets/images/Alarm.png" />
                </button>
                <button className="NoteSide_LItem">
                  <img src="../assets/images/favorite.png" />
                </button>
                <button className="NoteSide_AItem">
                <img src="../assets/images/time.png" />    
                </button>
            </ul>
            <div className="NoteSide_vertical"> 
              <hr />
             </div>
    </>)
}

export default SideNavigate;

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
                  <img src="/image/log_test.jpg" />
                </button>
                <button className="NoteSide_FItem">
                  <img src="/image/friends.png" />
                </button>
                <button className="NoteSide_MItem">
                  <img src="/image/message.png" />
                </button>
                <button className="NoteSide_CItem">
                  <img src="/image/talk.png" />
                </button>
                <button className="NoteSide_SItem">
                  <img src="/image/search.png" />
                </button>
                <button className="NoteSide_RItem">
                  <img src="/image/Alarm.png" />
                </button>
                <button className="NoteSide_LItem">
                  <img src="/image/favorite.png" />
                </button>
                <button className="NoteSide_AItem">
                <img src="/image/time.png" />    
                </button>
            </ul>
            <div className="NoteSide_vertical"> 
              <hr />
             </div>
    </>)
}

export default SideNavigate;
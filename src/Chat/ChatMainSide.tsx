
import { useNavigate ,useParams} from "react-router-dom";
import "./ChatMainSide.scss"; //scss
import { useState } from "react";
import Homeimg from "../assets/images/log.png";
import Freindimg from "../assets/images/friends.png";
import Messageimg from "../assets/images/message.png";
import Chatimg from "../assets/images/talk.png";
import Searchimg from "../assets/images/search.png";
import Alarmimg from "../assets/images/Alarm.png";
import Favoriteimg from "../assets/images/favorite.png";
import Timeimg from "../assets/images/time.png" 


//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type SideBar_Active ={
    OnclickSearch:(isactive:boolean) => void
   }
  //#endregion

const ChatMainSide =(props:SideBar_Active) =>{

    const[isSearch, setIsSearch]=useState<boolean>(false);

//              +-----------------
//--------------+ 전역 변수
//              +-----------------
//#region type
    const navigate = useNavigate();
    const param=useParams();
//#endregion

    const HomeHandler =() =>{
        navigate("/main");
    }

    const Notemove= () =>{
        const id:string =param.userid! ;
        navigate(`/main/Note/${id}`);
    }

    const SearchClick =() =>{
        if(isSearch == false){
            setIsSearch(true);
            props.OnclickSearch(true);
        }
        else{
            setIsSearch(false);
            props.OnclickSearch(false);
        }
       
    }


    return(<>
        <ul className="Note_side">
                 <button className="NoteSide_Home" onClick={HomeHandler}>
                   <img src={Homeimg} />
                 </button>
                 <button className="NoteSide_FItem">
                   <img src={Freindimg} />
                 </button>
                 <button className="NoteSide_MItem" onClick={Notemove}>
                   <img src={Messageimg} />
                 </button>
                 <button className="NoteSide_CItem">
                   <img src={Chatimg}/>
                 </button>
                 <button className="NoteSide_SItem" onClick={SearchClick} >
                   <img src={Searchimg} />
                 </button>
                 <button className="NoteSide_RItem">
                   <img src={Alarmimg} />
                 </button>
                 <button className="NoteSide_LItem">
                   <img src={Favoriteimg} />
                 </button>
                 <button className="NoteSide_AItem">
                 <img src={Timeimg}/>    
                 </button>
             </ul>
     </>)

}

export default ChatMainSide;
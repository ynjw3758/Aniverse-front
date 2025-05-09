
import { useNavigate ,useParams} from "react-router-dom";
import "./ChatMainSide.scss"; //scss
import { useState } from "react";

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
                   <img src="/image/log_test.jpg" />
                 </button>
                 <button className="NoteSide_FItem">
                   <img src="/image/friends.png" />
                 </button>
                 <button className="NoteSide_MItem" onClick={Notemove}>
                   <img src="/image/message.png" />
                 </button>
                 <button className="NoteSide_CItem">
                   <img src="/image/talk.png" />
                 </button>
                 <button className="NoteSide_SItem" onClick={SearchClick} >
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
     </>)

}

export default ChatMainSide;

import { Fragment, useEffect, useState ,useRef , useContext} from "react";



//                             +--------------------
//-----------------------------+   내부라이브러리리
//                             +--------------------
//#region type
import "./SearchTagList.scss";
import user_info from"../../Userdata/Userdata";
//#endregion

//                             +--------------------
//-----------------------------+   타입
//                             +--------------------
//#region type
type list = {
    Nickname:any,
    Profile:any,
    Userid:any,
    count:number,
    total_size:number,
    //focuse:number,
    OnChoose :(name:string , profile:string) => void,
    onComplete :() => void
     }
 //#endregion
const SearchTagList =(props:list) =>{
const[showItem, setShowItem]=useState<boolean>(false);
const[focus, setFocus]=useState<boolean>(false);
const[divId, setDivId]=useState<string>("");
const curserRef = useRef<HTMLDivElement>(null);

const Timeout = 500;

useEffect(() =>{
   if(props.count== props.total_size-1){
    console.log("이제 화면을 바꾸자 하지만 바로 바꾸면 그럴수 있으니 타임을 걸어놓고 ")
    props.onComplete();
    /*
    setTimeout(() => {
        props.onComplete();
    }, Timeout);
    */
   }
   else return;
},[props.count])
    const ChooseHandler =() =>{
    console.log("사람 추가");
    props.OnChoose(props.Nickname, props.Profile);
    }
    /*
 <div className="SearchTagList_nickname">
 </div>
 <div className="SearchTagList_id">
 </div>  
 */
return(<div className="SearchTagList_Stand" id={divId} ref={curserRef} onClick={ChooseHandler}>
             <img src={props.Profile}/>
           <div className="SearchTagList_Profiles"> 
               <h3>{props.Nickname}</h3>
               <p>{props.Userid}</p>
        </div>
    </div>
)
}

export default SearchTagList;
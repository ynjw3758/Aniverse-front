import { Fragment, useEffect, useState ,useRef , useContext} from "react";



import "./SearchList.scss";
import user_info from "../../Userdata/Userdata";


//                             +--------------------
//-----------------------------+   타입
//                             +--------------------
//#region type
type list = {
   Nickname:any,
   Profile:any,
   Userid:any,
   count:number,
   focuse:number,
   OnChoose :(name:string , profile:string) => void
    }
//#endregion

const SearchList =(props:list) =>{
    const[showItem, setShowItem]=useState<boolean>(false);
    const[focus, setFocus]=useState<boolean>(false);
    const[divId, setDivId]=useState<string>("");
    const curserRef = useRef<HTMLDivElement>(null);

    const select:any = focus ? "select" : "body";
    const count = useContext(user_info);


    useEffect(() =>{
     const real_count:number = count.count-1;
     const test1:string =real_count.toString();
     if(test1 ==curserRef.current?.id ){
      setFocus(true);
     }
     else{
      setFocus(false);
     }
    },[props.focuse])


    useEffect(() =>{
      const Id:string=props.focuse.toString();
      setDivId(Id);
     setShowItem(true);
     /*
     const real_count:number = count.count-1;
     console.log("카운트 :" , count.count);
     console.log("실제 카운트 :" , real_count);
     console.log("현재 포커스 :" , );
     if(props.count == real_count){
      console.log("count :" , count.count);
      setFocus(true);
     }
     else{
      setFocus(false);
     }
      */
    },[props.Nickname , props.Profile , props.Userid ,props.focuse]);

    const ChooseHandler =() =>{
    console.log("사람 추가");
    props.OnChoose(props.Nickname, props.Profile);
    }
 
    return(<div className="SearchList_body" id={divId} ref={curserRef} onClick={ChooseHandler}>
             <img src={props.Profile}/>
           <div className="Searchlist_Profiles"> 
             <div className="Searchlist_nickname">
               <h3>{props.Nickname}</h3>
             </div>
             <div className="Searchlist_id">
               <p>{props.Userid}</p>
             </div>  
        </div>
    </div>)

}
export default SearchList;
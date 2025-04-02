
import { useEffect, useState } from "react";
import "./BlockItem.scss";
import { useNavigate , useParams } from "react-router-dom";

//                            +--------------------
//----------------------------+ props 타입
//                            +--------------------
//#region type 
type Item={
    Nickname:string,
    Id:string,
    time:string,
    onChecked:boolean,
    onselect :(data:Object) => void
   }
//#endregion

const BlockItem =(props:Item) =>{

    const[isChecked ,setIschecked]=useState<boolean>(false);

    const param=useParams();
    
    useEffect(() =>{
        setIschecked(props.onChecked);
        console.log("props 체크 값 :" , props.onChecked);
        console.log("상태 체크 값 :" ,isChecked);
    },[props.onChecked]);

    const checkHandler =() =>{
        setIschecked(true);

        const id:string =param.userid! ;
        const userinfo:Object = {Nickname:props.Nickname , Id :id };
       props.onselect(userinfo)

    }

    return(<div className="BlockItem_Item" id={props.Id}>
        <input type="checkbox" checked={isChecked} onChange={checkHandler}/>
        <div className="BlockItem_contents">
           <p>{`${props.Nickname} (${props.Id})`}</p>
        </div>
        <h4>{props.time}</h4>
    </div>)

}
export default BlockItem;
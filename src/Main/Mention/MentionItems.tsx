

import { useEffect, useState } from "react";
import "./MentionItems.scss";


interface Mention_info{
    Userinfo:user_info,
    idx:number,
    total:number,
    isready:boolean,
    onShow:() => void,
    AddMention:(data:user_info) => void,
}

type user_info={
   img:string,
   nickname:string,
   id:string
}

const MentionItems =({Userinfo, idx, total,isready ,onShow ,AddMention}:Mention_info) =>{

    const[isShow, setIsShow]=useState<boolean>(false);

    useEffect(() =>{
     if(idx === total-1){
        onShow();
     }
    },[])
    useEffect(() =>{
    if(isready === true) setIsShow(true);
    },[isready])


    const AddMentionHandler =() =>{
        AddMention(Userinfo);
    }
    
    return(<div className="MentionItems_Main_Stand" onClick={AddMentionHandler}>
        {!isShow && (<>
        </>)}
        {isShow && (<>
         <img src={Userinfo.img}/>
         <div className="MentionItems_Main_ids">
           <h3>{Userinfo.id}</h3>
           <p>{Userinfo.nickname}</p>
         </div>
        </>)}
    </div>)


}
export default MentionItems;
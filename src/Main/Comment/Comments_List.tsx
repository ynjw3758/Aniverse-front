

import Comments_Items from "./Comments_Items";
import "./Comments_List.scss";
import { useEffect, useState } from "react";



//                             +--------------------
//-----------------------------+   인터페이스
//                             +--------------------
//#region
interface props{
    Owner_infos:Owner;
    comments:comment_list[];
    Comment_Send:(data:cm_userinfo) => void
}
//#endregion

//                             +--------------------
//-----------------------------+   타입
//                             +--------------------
//#region

type comment_list={
    cm_cnt:number,
    cm_favorite:number,
    comment_text:string,
    commentid:string,
    nickname:string,
    profile:string,
    userid:string,
    like_status:string,
    cm_date:string
    mentions:mention_user[]
}

type Owner={
Text:string,
Id:string,
Profile:string,
Nickname:string,
}

type cm_userinfo={
    userid:string,
    nickname:string,
    commentdid:string
}
type mention_user={
    id:string,
    nickname:string,
    commentid:string
}
//#endregion
const Comments_List =({comments, Owner_infos ,Comment_Send}:props) =>{
    const[isOwner, setIsOwner]=useState<boolean>(false);
    const[isMore, setIsMore]=useState<boolean>(false);
    const[isnormal, setIsnormal]=useState<boolean>(false);
    const[isFullText, setIsFullText]=useState<boolean>(false);
    const[limit_text, setLimit_text]=useState<string>("");


    useEffect(() =>{
      console.log("리스트 :" , Owner_infos)
      if(Owner_infos.Text !=="") {
        if(Owner_infos.Text.length > 15){
            const text=Owner_infos.Text.slice(0, 10);
            setLimit_text(text);
            setIsMore(true);
            setIsOwner(true);
        }
        else setIsnormal(true);
    }

    },[])

    const fulltextHandler =() =>{
        setIsFullText(true);
    }
    const send_comments_info =(data:cm_userinfo) =>{
        Comment_Send(data);
    }

    return(<div className="Comments_List_Main">
       {isOwner && (<div className="Comments_List_Owner" id={Owner_infos.Id}>
         <div className="Comments_Owner_info">
        <img src={Owner_infos.Profile}/>
        <h4>{Owner_infos.Nickname}</h4>
        {isMore && (<>
        <p>{limit_text}</p>
          {!isFullText &&(<>
           <h3 onClick={fulltextHandler}>더보기...</h3>
         </> ) }
        </>)}
        {isnormal && (<>
          <p>{Owner_infos.Text}</p>
        </>)}
        </div>
        {isFullText && (<div className="Comments_List_MyTextFull">
          <p>{Owner_infos.Text.slice(11,Owner_infos.Text.length )}</p>
        </div>)}
       </div>)}
       <div className="Comments_List_CM_List">
        {comments.map((value, idx) =>(<>
            <Comments_Items comment_Items={value} SendComments={send_comments_info}/>
        </>))}
       </div>
    </div>)
}

export default Comments_List;
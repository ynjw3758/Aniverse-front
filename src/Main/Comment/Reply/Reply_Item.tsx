
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import "./Reply_Item.scss";
import MentionList from "../MentionList";

//                             +--------------------
//-----------------------------+   인터페이스
//                             +--------------------
//#region
interface props{
    Reply_infos:reply_info
  }
  //#endregion
  
  //                             +--------------------
  //-----------------------------+   타입
  //                             +--------------------
  //#region
  type reply_info={
    cm_cnt:number,
    cm_favorite:number,
    comment_text:string,
    commentid:string,
    nickname:string,
    profile:string,
    userid:string,
    like_status:string,
    cm_date:string,
    contentid:string,
    mentions:mention_user[]
  }
  type mention_user={
    id:string,
    nickname:string,
    commentid:string
}
  //#endregion
const Reply_Item =({Reply_infos}:props) =>{

    const[difdte, setDifdate]=useState<string>("");
    const[ismention, setIsmention]=useState<boolean>(false);


    useEffect(() =>{
        console.log("")
        dayjs.extend(relativeTime);
        const fromNow = dayjs(Reply_infos.cm_date).locale('ko').fromNow(); 
        setDifdate(fromNow);
    },[])
    
    return(<div className="ReplyItem_Stand">
        <div className="ReplyItem_UserInfo">
           <img src={Reply_infos.profile}/>
           <div className="ReplyItem_change">
           <h4>{Reply_infos.nickname}</h4>
           <h3>{difdte}</h3>
           </div>
        </div>
        <div className="Comments_Item_Content">
            {ismention && (<>
                <MentionList infos={Reply_infos.mentions} text={Reply_infos.comment_text}/>
            </>)}
            {!ismention && (<>
                <p>{Reply_infos.comment_text}</p>
            </>)}
           </div>
    </div>)
}

export default Reply_Item;


import Reply_Item from "./Reply_Item";
import "./Reply_List.scss";
import Comments_Items from "../Comments_Items";


//                             +--------------------
//-----------------------------+   인터페이스
//                             +--------------------
//#region
interface props{
  Reply_infos:reply_info[]
  Reply:(data:cm_userinfo) => void
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

type cm_userinfo={
    userid:string,
    nickname:string,
    commentdid:string
}
//#endregion

const Reply_List =({Reply_infos, Reply}:props) =>{
    
    const send_comments_info =(data:cm_userinfo) =>{
        Reply(data);
       //Comment_Send(data);
    }

    return(<div className="ReplyList_Stand">
       {Reply_infos.map((values) =>(<>
        <Comments_Items comment_Items={values} SendComments={send_comments_info}/>
       </>))}
    </div>)
}
export default Reply_List;

function Comment_Send(data: cm_userinfo) {
    throw new Error("Function not implemented.");
}
function Reply(data: cm_userinfo) {
    throw new Error("Function not implemented.");
}


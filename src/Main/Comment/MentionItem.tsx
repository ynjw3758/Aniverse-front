import { useEffect } from "react"
import "./MentionItem.scss";


interface mention{
    info:mentions
}

type mentions={
    id:string,
    nickname:string,
    commentid:string
}

const MentionItem =({info}:mention) =>{

    useEffect(()=>{
      console.log("니기네임 " ,info);
    },[])
    return(<div className="MentionItem_stand" key={info.id} >
        <p>{`@${info.nickname}`}</p>
        </div>)
}
export default MentionItem
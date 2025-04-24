
import { useEffect, useState } from "react";
import "./MentionList.scss";
import MentionItem from "./MentionItem";

interface mention{
    text:string,
    infos:mentions[]
}

type mentions={
    id:string,
    nickname:string,
    commentid:string
}


const MentionList =({infos, text} : mention) =>{

    const[comment ,setComment]=useState<string>("");

    const reg =  /@[가-힣a-zA-Z0-9._-]+/g;

    function splitMentions(text: string): { mentions: string[], comment: string } {
        // 멘션: @로 시작하고 한글, 영어, 숫자, 특수문자 일부 포함
        const mentionRegex = /@[가-힣a-zA-Z0-9._\-!?]+/g;
      
        // 멘션만 추출
        const mentions = text.match(mentionRegex) || [];
      
        // 멘션 제거 후 남은 일반 텍스트 추출
        const comment = text.replace(mentionRegex, '').trim();
      
        return { mentions, comment };
      }

    useEffect(() =>{
        console.log("분리하자 ");
        const result = splitMentions(text);
        setComment(result.comment);
        console.log("결과 :" , result);
    },[])

   return(<div className="MentionList_stand" >
    {infos.map((data) =>(
        <MentionItem info={data}/>
    ))}
    <p>{comment}</p>
   </div>)
}

export default MentionList;
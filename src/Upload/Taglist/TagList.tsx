import { useEffect, useState } from "react"
import TagListItem from "./TagListItem";
import "./TagList.scss";

interface TagListItem{
 Item:object[],
 Back_Search :() =>void
}
const TagList =(props:TagListItem) =>{
    const[nickname, setNickname]=useState<string[]>([]);
    const[id, setId]=useState<string[]>([]);
    const[profile, setProfile]=useState<string[]>([]);

    useEffect(() =>{
     console.log("데이터들을 모아놓고 map으로 item컴포넌트로 보낸다.");
     const list:object[] =props.Item;
     let Profiles:string[]=[...profile];
     let Nicknames:string[]=[...nickname];
     let Ids:string[]=[...id];
     list.forEach((data) =>{
        Object.entries(data).map((key) =>{
            if(key.at(0) == "Nickname"){
                Nicknames.push(key[1]);
                setNickname(Nicknames);
            }
            else if(key.at(0) == "Id"){
                Ids.push(key[1]);
                setId(Ids);

            }
            else if(key.at(0) == "Profile"){
                Profiles.push(key[1]);
                setProfile(Profiles);

            }
        })
     })
    },[props.Item])

    const back_Search =() =>{
      props.Back_Search()
    }
   return(<div className="TagList_Stand">
           <div className="TagList_Headers">
              <p>태그된 사람</p>
              <button onClick={back_Search}>태그 추가</button>
           </div>
      {id.map((value, idx) =>(<>
      <TagListItem Nickname={nickname[idx]} Profile={profile[idx]} Id={value}/>
      </>))}
   </div>)
}

export default TagList
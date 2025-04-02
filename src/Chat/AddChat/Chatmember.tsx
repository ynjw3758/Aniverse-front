
import { useEffect, useState } from "react";

import "./Chatmember.scss";
import MemberList from "./MemberList";

//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type Member_data ={
    ChatMember:object[]
 }
 //#endregion

const Chatmember =(props:Member_data) =>{
    const[img, setImg]=useState<string[]>([]);
    const[nickname, setNickname]=useState<string[]>([]);
    const[connectid, setConnectid]=useState<string[]>([]);
    const[id, setId]=useState<string[]>([]);

    useEffect(() => {
        console.log("props :" , props.ChatMember);
     const list = props.ChatMember;
     const ctid:string[]=[...connectid];
     const image:string[]=[...img];
     const Userid:string[]=[...id];
     const Nickname:string[]=[...nickname];

     list.map((data) => Object.entries(data).map((key) =>{

        if(key.at(0) == "Ctid"){
           ctid.push(key[1]);
           setConnectid(ctid);
          }
          else if(key.at(0) == "Nickname"){
           Nickname.push(key[1]);
           setNickname(Nickname);
          }
          else if(key.at(0) == "Userid"){
           Userid.push(key[1]);
           setId(Userid);

          }
          else if(key.at(0) == "Img"){
              if(key.at(1) == "N"){
                  image.push("/image/baseimg.png");
              }
              else{
                  image.push(key[1]);
              }   
              setImg(image);
          }
}))
    },[props.ChatMember]);

    return(<div className="chatmemeber_box">
        {connectid.map((data, i)=>(<div className="chatMember">
            <MemberList Ctid={data} Nickname={nickname[i]} Id={id[i]} Img={img[i]}/>
        </div>))}
    </div>)
}

export default Chatmember;
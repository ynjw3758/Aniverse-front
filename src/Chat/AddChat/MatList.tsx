//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import { useEffect, useState } from "react";
//#endregion



//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import Matitem from "./Matitem";
import "./MatList.scss";
//#endregion


//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type list ={
    List:object[],
    onlist:(data:Object)=> void
 }
 //#endregion

const MatList =(props:list) =>{

//                            +------------------
//----------------------------+ 상태 관리
//                            +------------------
//#region
const[img, setImg]=useState<string[]>([]);
const[nickname, setNickname]=useState<string[]>([]);
const[conntectid, setConnectid]=useState<string[]>([]);
const[userid, setUserid]=useState<string[]>([]);
//#endregion

useEffect(() =>{
    const matlist:object[]= props.List;
    const ctid:string[]=[...conntectid];
    const image:string[]=[...img];
    const Userid:string[]=[...userid];
    const Nickname:string[]=[...nickname];

    matlist.map((data) => Object.entries(data).map((key) =>{

                 if(key.at(0) == "connectid"){
                    ctid.push(key[1]);
                    setConnectid(ctid);
                   }
                   else if(key.at(0) == "nickname"){
                    Nickname.push(key[1]);
                    setNickname(Nickname);
                   }
                   else if(key.at(0) == "id"){
                    Userid.push(key[1]);
                    setUserid(Userid);
   
                   }
                   else if(key.at(0) == "img"){
                       if(key.at(1) == "N"){
                           image.push("/image/baseimg.png");
                       }
                       else{
                           image.push(key[1]);
                       }   
                       setImg(image);
                   }
    }))

},[props.List]);
const addList =(data:Object) =>{
    props.onlist(data);
}
   console.log("img :" ,img);

    return(<div className="MatList_list">
        {conntectid.map((data, i)=>(<div className="MatList_Listbox">
            <Matitem Ctid={data} Nickname={nickname[i]} Userid={userid[i]} Image={img[i]} onChcked={addList}/>
        </div>))}
    </div>)

}
export default MatList;
//                            +--------------------
//----------------------------+ 외부 라이브로리
//                            +--------------------
//#region type 
import { useContext, useEffect, useState ,useRef} from "react";
import { useNavigate , useParams } from "react-router-dom";
import axios from "axios";
import {Oval} from "react-loader-spinner";
//#endregion

//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import "./AddList.scss";
import Person_Add from "./Person_Add";
//#endregion

//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type list ={
    List:Object[],
    imgList:(img:string[]) => void
 }
 //#endregion

const AddList =(props:list) =>{
//              +-----------------
//--------------+ 상태 관리
//              +-----------------
//#region type
const[img, setImg]=useState<string[]>([]);
const[nickname, setNickname]=useState<string[]>([]);
const[conntectid, setConnectid]=useState<string[]>([]);
const[userid, setUserid]=useState<string[]>([]);
//#endregion

useEffect(() =>{
    const matlist:Object[]= props.List;
    const ctid:string[]=[...conntectid];
    const image:string[]=[...img];
    const Nickname:string[]=[...nickname];
    const userId:string[]=[...userid];
    matlist.map((data) => Object.entries(data).map((key) =>{
               /*
                 if(key.at(0) == "Ctid"){
                    ctid.push(key[1]);
                    setConnectid(ctid);
                   }
                   else */if(key.at(0) == "Nickname"){
                    Nickname.push(key[1]);
                    setNickname(Nickname);
                   }
                   else if(key.at(0) == "Userid"){
                    userId.push(key[1]);
                    setUserid(userId);
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
    
props.imgList(img);
},[props.List]);

useEffect(() =>{
    props.imgList(img);
},[img])

return(<div className="AddChat_list">
    {userid.map((data, i)=>(<>
        <Person_Add /*Ctid={data}*/ Nickname={nickname[i]}Image={img[i]} UserId={data}/>
    </>))}
</div>)

}

export default AddList;
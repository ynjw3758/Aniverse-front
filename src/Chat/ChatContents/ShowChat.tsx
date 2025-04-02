//                            +--------------------
//----------------------------+ 외부 라이브로리
//                            +--------------------
//#region type 
import {useEffect, useState} from "react";
//#endregion

//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import ChatHeader from "./ChatHeader";
import "./ShowChat.scss";
import AddItems from "./Input_AddItems";
//#endregion

//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type info ={
    Userinfo:Object[],
    RoomName:string,
    CreateDate:any,
    Chat_id:string,
 }
 //#endregion

//                             +--------------------
//-----------------------------+   에러 인터페이스
//                             +--------------------
//#region type
interface ResponseDataType {
    message: string;
    code: number;
    response:object
  }
//#endregion
const ShowChat =(props:info) =>{

    const[img, setImg]=useState<string[]>([]);
    const[nick, setNick]=useState<string[]>([]);
    const[id, setId]=useState<string[]>([]);
    const[ctid, setCtid]=useState<string[]>([]);
    const[size, setSize]=useState<number>(0);
    const[create, setCreate]=useState<string>("");

    useEffect(() =>{
        let list:Object[]=props.Userinfo;
        let image:string[]=[...img];
        let Nick:string[]=[...nick];
        let Id:string[]=[...id];
        let Ctid:string[]=[...ctid];
        console.log("props :" , props.Userinfo);
        list.map((data) => Object.entries(data).map((key) =>{

            if(key.at(0) == "Ctid"){
                Ctid.push(key[1]);
               setCtid(Ctid);
              }
              else if(key.at(0) == "Nickname"){
                Nick.push(key[1]);
                setNick(Nick);
              }
              else if(key.at(0) == "Userid"){
                Id.push(key[1]);
               setId(Id);
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
        const isoDate =props.CreateDate;
        const date = new Date(isoDate);
        const formatted =
            date.getFullYear() + '-' +
            String(date.getMonth() + 1).padStart(2, '0') + '-' +
            String(date.getDate()).padStart(2, '0') + ' ' +
            String(date.getHours()).padStart(2, '0') + ':' +
            String(date.getMinutes()).padStart(2, '0') + ':' +
            String(date.getSeconds()).padStart(2, '0');
         setCreate(formatted);
         setSize(list.length);
    },[props.Userinfo])

     return(<div id={props.Chat_id}>
     <div>
        <ChatHeader name={props.RoomName} Count={size}/>
     </div>
      <div className="ShowChat_vertical">
         <hr />
      </div>
      <div className="ShowChat_Showcontents">
       <AddItems CreateDate={create}/>
      </div>
     </div>)
}

export default ShowChat;
//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import { useEffect ,useRef,useState} from "react";
//#endregion

//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import "./AddChatItems.scss";
import ChatImtems from "../Chatlist/AddPerson_MultiImg";
//#endregion

//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type Chat ={
  DataList:object[],
  Roomname:string,
  RoomId:string,
  UserCount:number,
  Image:string[],
  create_date:string,
  isFocusid:string,
  IsDuple:boolean,
  showcontents(data:object):void
 }
//#endregion

const AddChatItems =(props:Chat) =>{
//              +-----------------
//--------------+ 상태 관리
//              +-----------------
//#region type
const[chatimg, setChatimg]=useState<string[]>([]);
//#endregion

//              +-----------------
//--------------+ 전역 변수
//              +-----------------
//#region type
const chatid =useRef<string>("");
//#endregion

useEffect(() =>{

  const items:object[]=props.DataList;
  let Image:any[]=[...chatimg];
 
  items.map((data) =>{
    Object.entries(data).map((key) =>{
        Object.entries(key[1]).map(values =>{
            if(values.at(0) == "Img"){
                    Image.push(values[1]);
                    setChatimg(Image);
            }
        })
       
    })
  })
  chatid.current = props.RoomId;
},[props.DataList]);

const showContentsHandler =(data:object) =>{
  props.showcontents(data);
}
console.log("타겟 : " , props.isFocusid);
     return(<>
        <ChatImtems Id={props.RoomId} title={props.Roomname} 
        Image={props.Image} Usercount={props.UserCount} Onshowcontents={showContentsHandler} 
        create_date={props.create_date} user_infos ={props.DataList} isFocusId={props.isFocusid} IsDuple={props.IsDuple}/>
     </>)   
}
export default AddChatItems;
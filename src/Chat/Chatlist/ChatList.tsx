//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import { useEffect ,useState} from "react";
//#endregion

//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import AddChatItems from "../AddChat/AddChatItems";
//#endregion

//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type Chat ={
  DataList:object[],
  ImgList:string[],
  Roomname:string,
  RoomId:string,
  create_date:string,
  showcontents(data:object):void
 }
//#endregion

const ChatList =(props:Chat) =>{

//              +-----------------
//--------------+ 상태 관리
//              +-----------------
//#region type
const[Itemslist, setItemslist]=useState<object[]>([]);
const[isdata, setIsdata]=useState<boolean>(false);
//#endregion

//              +-----------------
//--------------+ 전역 변수
//              +-----------------
//#region type
//#endregion

useEffect(() =>{
   setIsdata(true);
},[props.DataList]);

const showcontents =(data:object) =>{
  props.showcontents(data);
}
console.log("데이터 존재 가능 :" , props.ImgList)
   return(<>
   {isdata && (<>
    <AddChatItems DataList={props.DataList} RoomId={props.RoomId} Roomname={props.Roomname} 
    UserCount={props.DataList.length} Image={props.ImgList} showcontents={showcontents} create_date={props.create_date}/>
   </>)}
   </>)



}

export default ChatList;
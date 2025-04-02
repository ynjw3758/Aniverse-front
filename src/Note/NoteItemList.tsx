//                            +--------------------
//----------------------------+ 외부 라이브로리
//                            +--------------------
//#region type  
import { useEffect, useContext, useState } from "react";
//#endregion

//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type  
import "./NoteItemList.scss";
import NoteItem from "./NoteItem";
import BaseLoading from "../LoadPage/BaseLoading";
import user_info from "../Userdata/Userdata";

//#endregion



//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type receive_info ={
   Item:string[],
   Message:string,
   selectmsg:string,
   loading:boolean,
   showcontent:(isShow:Object) => void,
   OnDeleteList:(data:string) => void,
}
//#endregion
const NoteItemList =(props:receive_info) =>{

//                            +------------------
//----------------------------+ 상태 관리
//                            +------------------
//#region
     const[noteid ,setNoteid]=useState<string[]>([]);
     const[img, setImg]=useState<string[]>([]);
     const[senduser, setSenduser]=useState<string[]>([]);
     //const[infos, setInfos]=useState<any>({user:"" ,readtime :""});
     const[contents , setContents]=useState<string[]>([]);   
     const[wttime, setWttime]=useState<string[]>([]);
     const[rdtime, setRdtime]=useState<string[]>([]);
     const[readstate, setReadtate]=useState<string[]>([]);
     const[deleteList, setDeleteList]=useState<string[]>([]);
     const[receive, setReceive]=useState<boolean>(false);
     const[send, setSend]=useState<boolean>(false);  
     const[load , setLoad]=useState<boolean>(false);
     const[showItem, setShowItem]=useState<boolean>(false);
     const[readnote, setReadnote]=useState<string[]>([]);
//#endregion   

const login_info = useContext(user_info);

/*
useEffect(() =>{
    console.log("로딩 :" , props.loading);
if(load == true){
    setShowItem(false);

}
else{
    setShowItem(true);
}
},[props.loading]);
*/
    useEffect(() =>{
         console.log("아이템 :" , props.Item);
         if(props.Message == "receive"){
            setReceive(true);
         }
         else if(props.Message == "send"){
            setSend(true);
         } 

         if(props.Message !=="save"){

            const list:string[] = props.Item;
            const id:string[]=[...noteid];
            const image:string[]=[...img];
            const User:string[]=[...senduser];
            //const info:any[]=[...infos];
            const Content:string[]=[...contents];
            const Time:string[]=[...wttime];
            const readTime:string[]=[...rdtime];
            const Notestate:string[]=[...readstate];
            const read:string[]=[];
            list.map((data) =>{
               Object.entries(data).map((key) =>{
                   
                   if(key.at(0) == "noteid"){
                       id.push(key[1]);
                       setNoteid(id);
   
                   }
                   else if(key.at(0) == "content"){
                       Content.push(key[1]);
                       setContents(Content);
                   }
                   else if(key.at(0) == "writetime"){
                       Time.push(key[1]);
                       setWttime(Time);
   
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
                   else if(key.at(0) == "user"){
                       //info.push()
                       User.push(key[1]);
                       setSenduser(User);
                   }
                   else if(key.at(0) == "state"){
                    read.push(data);
                    setReadnote(read);
                       Notestate.push(key[1]);
                       setReadtate(Notestate);
                   }
                   else if(key.at(0) == "readtime"){
                       if(key.at(1) == "null"){
                           readTime.push("");
                       }
                       else{
                           readTime.push(key[1]);
                       }
                       
                       setRdtime(readTime);
                   }
               })
            })
               
         }
         else{
            console.log("보관함");
            if(props.selectmsg == "받은 편지"){
                setReceive(true);
                setSend(false);
            }
            else{
               setSend(true);
               setReceive(false);
            }
            
            const list:string[] = props.Item;
            const id:string[]=[...noteid];
            const image:string[]=[...img];
            const User:string[]=[...senduser];
            const Content:string[]=[...contents];
            const Time:string[]=[...wttime];
            const readTime:string[]=[...rdtime];
            const Notestate:string[]=[...readstate];
         
            list.map((data) =>{
                Notestate.push("N");
                setReadtate(Notestate);
               Object.entries(data).map((key) =>{
   
                   if(key.at(0) == "noteid"){
                       id.push(key[1]);
                       setNoteid(id);
   
                   }
                   else if(key.at(0) == "content"){
                       Content.push(key[1]);
                       setContents(Content);
                   }
                   else if(key.at(0) == "writetime"){
                       Time.push(key[1]);
                       setWttime(Time);
   
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
                   else if(key.at(0) == "user"){
                       User.push(key[1]);
                       setSenduser(User);
                   }

                   else if(key.at(0) == "readtime"){
                       if(key.at(1) == "null"){
                           readTime.push("");
                       }
                       else{
                           readTime.push(key[1]);
                       }
                       
                       setRdtime(readTime);
                   }
               })
            })
               
         }
        
         setShowItem(true);
    },[props.Item]);
   //console.log("체크 값 :" , login_info.check);
    const ShowNote =(data:Object) =>{
    console.log("내용 보기");
    props.showcontent(data);
    }
    const deletenote =(data:any) =>{
      props.OnDeleteList(data);

    }
      console.log("이미지 :" , img);
      console.log("senduser :" , senduser);
      console.log("contents :" , contents);
      console.log("readstate :" , readstate);
    return(<div className="NoteItemList_position">
        <div className="NoteItemList_title">
            {receive && (<h3>보낸 사람</h3>)}
            {send && (<h3>받은 사람</h3>)}
            <h4>내용</h4>
            <p>읽은 시간</p>
            <p>보낸 시간</p>
        </div>
        {!showItem && (<>
        <h2>쪽지가 존재 하지 않습니다.</h2>
        </>)}
        {showItem && (<>
            {noteid.map((data, i) =>(<div id={data} className="NoteItemList_Listbox">
            <NoteItem User={senduser[i]} image={img[i]} 
            content={contents[i]} time={wttime[i]} allcheck={login_info.check} onShow={ShowNote} 
            noteid={data} state={readstate[i]} message={props.Message} readtime={rdtime[i]} ondelete={deletenote}
            Read={readnote}/>
          </div>))}
        </>)}
        {load && (<div className="NoteItemList_loading">
            <BaseLoading  />
            </div>
         )}
    </div>)
}

export default NoteItemList;
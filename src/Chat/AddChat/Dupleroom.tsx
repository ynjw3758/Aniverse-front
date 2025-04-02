

//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import { useEffect, useState } from "react";
import "./Dupleroom.scss";
//#endregion

//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type dupldata ={
    Items:object,
    onMovechat:(type:string, id:string ,name:string, data:any[], img:string[]) =>void
 }
 //#endregion
const Dupleroom =(props:dupldata) =>{


//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
    const[roomname, setRoomname]=useState<any>("");
    const[roomid, setRoomid]=useState<any>("");
    const[userimg ,setUserimg]=useState<string[]>([]);
    const[userid, setUserid]=useState<string[]>([]);
    const[chatdata, setChatdata]=useState<any[]>([]);
    const[userlist, setUserlist]=useState<any>("");
    const[usernumber, setUsernumber]=useState<number>(0);
    const[ispng, setIspng]=useState<boolean>(false);
//#endregion

//                            +------------------
//----------------------------+ 전역 변수
//                            +------------------
//#region
const imgtype = ispng ? "DuppleRoom_jpgpicture" : "DuppleRoom_pickture"; 
    useEffect(() =>{
      let Userimg:any[]=[...userimg];
      let Userid:any[]=[...userid];
      let Userlist:any[]=[...userlist];
      let img_count=0;
     Object.entries(props.Items).map((key) =>{
        if(key.at(0) == "userlist"){
            setChatdata(key[1]);
            const array:any[]=key[1];
            const size:number =key[1].length; 
            let count:number=1;
            let RoomName:any="";
            setUsernumber(size);
            array.forEach((data) =>{
                console.log("data :" ,data);
                Object.entries(data).map((key) =>{
                    console.log("key :" , key);
                    if(key.at(0) == "Img"){
                      if(img_count < 4){
                        Userimg.push(key[1]);
                        setUserimg(Userimg);
                        img_count++;
                      }
                      else{
                        return;
                      }

                    }
                    else if(key.at(0) == "Userid"){
                        Userid.push(key[1]);
                        setUserid(Userid);
                    }
                    else if(key.at(0) =="Nickname"){
                        if(size == 1){
                            //Userlist.push(key[1]);
                            setUserlist(key[1]);
                        }
                        else{
                           if(size == count){
                            RoomName=key[1];
                            setUserlist(RoomName);
                           }
                           else{
                            RoomName+=key[1]+", ";
                            
                          }
                        }
                        count++;
                    }
                })
            })
        }
        else if(key.at(0) == "roomname"){
          if(key.at(1).length > 10){
            const name_slide=key[1].substring(0, 8);
            const rename= name_slide+"..."
            console.log("새로운 방 이름 :" ,rename);
            setRoomname(rename);
          }
          else{
            setRoomname(key[1]);
          }
           
           
        }
        else if(key.at(0) == "roomId"){
            setRoomid(key[1]);
        }
     })
    },[props.Items]);
    const[cntimg, setCntimg]=useState<string>("");
    useEffect(() =>{
        console.log("렌더링 체크");
         if(userimg.length == 3){
          setCntimg("three");
        }
        else if(userimg.length == 4){
          setCntimg("four");
        }
      if(userimg.length ==1){
        const index:number = userimg[0].lastIndexOf(".");
        const type:string=userimg[0].substring(index+1, userimg.length);
        if(type !="png") setIspng(true);
        else setIspng(false);
      }
      else return;
    },[userimg]);


    const MoveChat =() =>{
        props.onMovechat("move" ,roomid, roomname ,chatdata, userimg);
    }

    const newChat =() =>{
        props.onMovechat("new" ,roomid , roomname , chatdata ,userimg);
    }

    console.log("user list :" ,userlist);
    return(<div className="DupleRoom_MainBackDrop" /*onClick={CloseHandler}*/>
        <div className="DupleRoom_Main" onClick={(e) => e.stopPropagation()}>
          <h2>중복 채팅방 생성 안내</h2>
           <div className={`DuppleRoom_jpgpicture ${cntimg}`}>
             {userimg.map((data) =>(<>
              <img src={data}/>
             </>))}
           </div>
           <div className="DuppleRoom_userinfo">
             <p>{roomname}</p>
             <h4>{usernumber+1}</h4>
           </div>
           <div className="DuppleRoom_btn">
              <button id="DuppleRoom_newchat" onClick={newChat}>새로운 채팅방 만들기</button>
              <button id="DuppleRoom_chatmove" onClick={MoveChat}>채팅방으로 이동</button>
           </div>
         </div>
       </div>)

}
export default Dupleroom;
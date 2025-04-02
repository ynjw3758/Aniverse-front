//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import { useEffect ,useState } from "react";
//#endregion

//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import "./PartiChatList.scss";
import Multipicture from "./Multipicture";
//#endregion

//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type image ={
    Id:string,
    Name:string,
    Count:number,
    Images:Object,
    create_date:string,
    user_infos:object,
    showdata : (data:Object) => void
   }
//#endregion

const PartiChatList =(props:image) =>{


//              +-----------------
//--------------+ 상태 관리
//              +-----------------
//#region type
const[img, setImg]=useState<string[]>([]);
const[name, setName]=useState<string>("");
//#endregion

//              +-----------------
//--------------+ 전역 변수
//              +-----------------
//#region type
//#endregion

useEffect(() =>{
    let test :string[]=[...img];
    const images:object=props.Images;
    Object.entries(images).map((key) =>{
        test.push(key[1]);
        setImg(test);
    })
     console.log("길이 :" , props.Name.length);
    if(props.Name.length >= 15){
        const name = props.Name.slice(0,15)+"...";
        setName(name);
    }
    else setName(props.Name);
},[props.Images]);

const showchat= () =>{
    const show_data:object ={user_count:props.Count+1, room_name:name, room_id:props.Id, 
        create_date:props.create_date, userinfos: props.user_infos}
    props.showdata(show_data);
  console.log("해당 데이터 보여주기");
}
 
    return(<div className="PartiChatList_Main" id={props.Id} onClick={showchat}>
                <div className="PartiChatList_imgs">
                    <Multipicture Image={props.Images}/>
             </div>
             <div className="PartiChatList_contents">
            <div className="PartiChatList_info">
             <p>{name}</p>
             <h4>{props.Count+1}</h4>
          </div>
          <div className="PartiChatList_story" id={props.create_date}>
            <p>안녕하세요</p>
          </div>
        </div>
    </div>)
}

export default PartiChatList;
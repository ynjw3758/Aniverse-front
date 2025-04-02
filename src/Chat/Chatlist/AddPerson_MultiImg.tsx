

//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import { useEffect, useState } from "react";
import "./AddPerson_MultiImg.scss";
import MultiData from "./PartiChatList";
//#endregion

//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type Chatitem ={
  Id:string,
  title:string,
  Image:string[],
  user_infos:object[],
  Usercount:number,
  create_date:string,
  Onshowcontents(data:object) :void,
 }
//#endregion

const AddPerson_MultiImg =(props:Chatitem) =>{

//              +-----------------
//--------------+ 상태 관리
//              +-----------------
//#region type
    const[data, setData]=useState<Object[]>([]);
    const[ischeck, setIscheck]=useState<boolean>(false);
    const[id, setId]=useState<string[]>([]);
    const[img, setImg]=useState<object[]>([]);
    const[name, setName]=useState<string[]>([]);
    const[count,setCount]=useState<number[]>([]);
    const[create, setCreate]=useState<string[]>([]);
    const[userinfos, setUserinfos]=useState<object[]>([]);
//#endregion    


    useEffect(() =>{

      const prop_data:object = {Image :props.Image };
      const props_object:object[]=[...data];
      props_object.push(prop_data);
      setData(props_object);

      let divId:string[]=[...id];
      let usercount:number[]=[...count];
      let roomname:string[]=[...name];
      let imgs:object[]=[...img];
      let create_dates:string[]=[...create];
      let user_infos:object[]=[...userinfos];
      user_infos.push(props.user_infos);
      setUserinfos(user_infos);
      create_dates.push(props.create_date);
      setCreate(create_dates);
      imgs.push(props.Image);
      setImg(imgs);
      divId.push(props.Id);
      usercount.push(props.Usercount);
      roomname.push(props.title);
      setId(divId);
      setCount(usercount);
      setName(roomname);
      setIscheck(true);
    },[props.Image]);
    const click_data =(data:object)=>{
      console.log("data :", data);
      props.Onshowcontents(data);

    }
    
    return(<div className="AddPerson_MultiImg_total" id={props.Id}>
            {ischeck && (<>
                {id.map((data , i) =>(<>
                    <MultiData Id={data} Name={name[i]} Count={count[i]} 
                    Images={img[i]} showdata={click_data} create_date={create[i]}
                    user_infos={userinfos[i]}/>
                </>))}
                
            </>)}
    </div>)

}

export default AddPerson_MultiImg;
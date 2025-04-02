

import "./MemberList.scss";

//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type Mem_List ={
    Nickname:string,
    Ctid:string,
    Id:string,
    Img:string
 }
 //#endregion


const MemberList =(props:Mem_List) =>{

    return(<div className="chatMember_List" id={props.Ctid} >
          <img src={props.Img}/>
          <p>{props.Nickname}</p>
    </div>)
}

export default MemberList;

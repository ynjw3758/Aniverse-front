//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import "./Person_Add.scss";
//#endregion

//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type Items ={
    Nickname:string,
    //Ctid:string,
    Image:string,
    UserId:string
 }
//#endregion

const Person_Add =(props:Items) =>{
    return(<>
        <div className="AddChatPerson_Items" id={props.UserId} >
             <div className="AddChatPerson_image">
                <img src={props.Image}/>
              </div>
              <div className="AddChatPerson_nick">
                <p>{props.Nickname}</p>
              </div>
        </div>
        </>)
}

export default Person_Add;
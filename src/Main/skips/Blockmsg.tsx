import "./Blockmsg.scss";


//                             +--------------------
//-----------------------------+   타입
//                             +--------------------
//#region type
type msg = {
    blockList:string[],

  }
 //#endregion

const Blockmsg =(props:msg) =>{

    return(<div className="Blocmsg_chage">
        {props.blockList.map((data) =>(<div className="text">
          <p>{data}</p>
        </div>))}
        <button onClick={close}>닫기</button>
      </div>)

}
export default Blockmsg;
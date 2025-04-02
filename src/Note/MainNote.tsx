//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type  
import "./MainNote.scss";
import NoteList from "./NoteList";
import SideNavigate from "./SideNavigate";
//#endregion

const MainNote =() =>{

    console.log("브라우저 넓이 :" , window.innerWidth);
    //일반 피시방 모니터 크기:1920
    return(<>
    <div className="top">
    <h2>쪽지</h2>
    </div>
    <NoteList />
    <SideNavigate />
    </>)

}

export default MainNote;
//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type  
import "./MainNote.scss";
import NoteList from "./NoteList";
import SideNavigate from "./SideNavigate";
//#endregion

const MainNote =() =>{

    return(<>
    <div className="top">
    <h2>쪽지</h2>
    </div>
    <NoteList />
    <SideNavigate />
    </>)

}

export default MainNote;
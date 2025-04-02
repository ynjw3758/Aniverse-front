
import "./Sizemessage.scss";

type info ={

    onClose: () => void
}
const Sizemessage =(props:info) =>{

const CloseHandler =() =>{
 props.onClose();
}
    return(<div className="ChatSizemg_MainBackDrop" onClick={CloseHandler}>
             <div className="ChatSizemg_Main" onClick={(e) => e.stopPropagation()}>
               <h2>파일 업로드하지 못했습니다</h2>
                <p>용량이 큽니다 최대 용량은 25MB입니다</p>
              </div>
            </div>)

}

export default Sizemessage;
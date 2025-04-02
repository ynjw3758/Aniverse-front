import "./UploadComplete.scss";
import Modal from "../Modal/Modal";

const UploadComplate:React.FC<{onClose: () => void}>  =(props) =>{

    const CancelHandler =() =>{
        props.onClose();
    }

    return(<div className="MainBackDrop" onClick={CancelHandler}>
             <div className="Uploadcp_Main" onClick={(e) => e.stopPropagation()}>
                <p>업로드 진행 중입니다 업로드 완료는 
                    알림으로 확인 가능합니다</p>
   </div>
   </div>

    )
}

export default UploadComplate;
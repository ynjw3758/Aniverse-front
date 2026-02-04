import "./PetRegisterModal.scss";
import beforeImg from"../assets/images/begorearrow.png";

const PetRegisterModal =() =>{

    return(<div className="PetRegisterModal_Main">
        <div className="PetRegisterModal_Header">
            <img src={beforeImg} />
            <h3 className="PetRegisterModal_Title">새 애완동물 등록</h3>
        </div>
        <div className="PetRegisterModal_Contents">
          <div className="PetRegister_ProfileCircle">
             <span className="PetRegister_PlusIcon">+</span>
          </div>
        </div>
    </div>)

}

export default PetRegisterModal;
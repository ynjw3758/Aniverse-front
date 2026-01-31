import "./PetSelectModal.scss"




interface props{

}
const PetSelectModal:React.FC<props> =() =>{

    return(<div className="PetSelectModal_BackDrop">
     <div className="PetSelectModal_Main">
        <h4>반려동물 선택</h4>
     </div>
    </div>)
}
export default PetSelectModal;
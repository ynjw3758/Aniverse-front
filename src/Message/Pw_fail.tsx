import Modal from "../Modal/Modal";
import "./Pw_fail.scss";

const Pw_fail:React.FC<{onClose : () => void }> = (props) =>{
     

   return(<Modal onClose={props.onClose}>
   <div className="certification">
   <p>인증번호가 옮바르지 않습니다 다시 입력해주세요</p>
   </div>
   </Modal>)

}
export default Pw_fail;
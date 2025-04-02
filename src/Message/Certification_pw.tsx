import Modal from "../Modal/Modal";
import "./Certification_pw.scss";

const Certification_pw:React.FC<{onClose : () => void }> = (props) =>{
     

   return(<Modal onClose={props.onClose}>
   <div className="certification">
   <p>인증번호가 전송되었습니다 인증번호가 오지 않았다면 입력한 정보를 다시 입력해주세요</p>
   </div>
   </Modal>)

}
export default Certification_pw;
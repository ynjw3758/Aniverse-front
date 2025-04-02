import Modal from "../Modal/Modal";
import "./Err_Network.scss";
const Err_Network:React.FC<{onClose : () => void }>  =(props) =>{

    return(<Modal onClose={props.onClose}>
        <div className="error">
        <h2>Error:Network_Error</h2>
        </div>
        </Modal>)

}

export default Err_Network;
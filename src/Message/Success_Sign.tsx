

import "./Success_Sign.scss";
import Signimg from "../assets/images/success_sign.png"

const Success_Sign =() =>{



    return(<div className="SignMessage_MainBackDrop">
              <div className="SignMessage_SendNote_Main" onClick={(e) => e.stopPropagation()}>
                 <img src={Signimg}/>
                
                
                </div>
                </div>)

}






export default Success_Sign;
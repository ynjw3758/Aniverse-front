import { Fragment } from "react";
import "./Server_Error.scss";


const Server_Error =() =>{

    return(<Fragment>
        <div className="centents">
            <img src="../assets/images/500.png"/>
            <h2>현재 시스템오류가 발생하여 문제를 해결중입니다...</h2>
        </div>
    </Fragment>)
}

export default Server_Error;
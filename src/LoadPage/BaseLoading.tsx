import {Oval} from "react-loader-spinner";


import "./BaseLoading.scss";


const BaseLoading =() =>{

    return(<div className="main">
          <Oval 
                  color="#ff0000" 
                  height={100} 
                  width={100}
               />
    </div>)

}

export default BaseLoading;
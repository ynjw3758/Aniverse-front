import { Fragment } from "react";
import "./TagModal.scss";
import TagAddImg from"../assets/images/Tagsearch.png";


const TagModal =() =>{


    return(<Fragment>
        <div className="TagModal_Main">
          <div className="TagModal_Search">
            <img src={TagAddImg}/>
            <input placeholder="태그를 입력하세요"/>
          </div>
        </div>
    </Fragment>)

}

export default TagModal
import { Fragment, useEffect, useState } from "react";
import "./TagModal.scss";
import TagAddImg from"../../assets/images/Tagsearch.png";


interface props{
  localTag:string[]
}
const TagModal:React.FC<props> =({localTag}:props) =>{

   const[selTags, setSelTags]=useState<string[]>([]);
   const[sugTags,setSugTags]=useState<string[]>([])

  useEffect(() =>{
   console.log("위치 태그 데이터:" , localTag)
  },[localTag])


    return(<Fragment>
        <div className="TagModal_Main">
          <div className="TagModal_Search">
            <img src={TagAddImg}/>
              <input placeholder="태그를 입력하세요"/>
            </div>
            <div className="TagModal_Contents">
              <h4>현재 태그</h4>
              <div className="TagModal_Divider" />
                <p>test</p>
              <h4>추천 태그</h4>
              <div className="TagModal_Divider" />
              <div className="TagModal_SugTagsMain">
                {localTag.map((value, id) =>(<div className="TagModal_SugTagsList">
                <p>{value}</p>
                </div>))}
              </div>
            </div>
        </div>
    </Fragment>)

}

export default TagModal
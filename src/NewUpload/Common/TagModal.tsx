import { Fragment, useEffect, useMemo, useState } from "react";
import "./TagModal.scss";
import TagAddImg from"../../assets/images/Tagsearch.png";


interface props{
  localTag:string[]
}
const TagModal:React.FC<props> =({localTag}:props) =>{

   const[selTags, setSelTags]=useState<string[]>([])

    const sugTags = useMemo<string[]>(() => {
      console.log("위치 태그 데이터:", localTag);

      // 안전 처리 (null/undefined 대비)
      if (!localTag || localTag.length === 0) return [];

      // 중복 제거 + 최대 개수 제한 (선택)
      return Array.from(new Set(localTag)).slice(0, 10);
    }, [localTag]);


    return(<Fragment>
        <div className="TagModal_Main">
          <div className="TagModal_Search">
            <img src={TagAddImg}/>
              <input placeholder="태그를 입력하세요"/>
            </div>
            <div className="TagModal_Contents">
              <div className="TagModal_Edittor">
                 <h4>현재 태그</h4>
                 <button>편집</button>
              </div>
              
              <div className="TagModal_Divider" />
              <div className="TagModal_SelTagsMain">
                {selTags.length == 0 ? (<div className="TagModal_SelTagsList">
                  <p>추가된 태그가 없습니다.</p>
                    </div>):(<div>
                    </div>)}
              </div>
              <h4>추천 태그</h4>
              <div className="TagModal_Divider" />
              <div className="TagModal_SugTagsMain">
                {sugTags.map((value, id) =>(<div className="TagModal_SugTagsList" >
                <p>{value}</p>
                </div>))}
              </div>
            </div>
        </div>
    </Fragment>)

}

export default TagModal
import { Fragment, useEffect, useMemo, useState } from "react";
import "./TagModal.scss";
import TagAddImg from"../../assets/images/Tagsearch.png";
import XImg from"../../assets/images/ximg.png";

interface props{
  localTag:string[]
}
const TagModal:React.FC<props> =({localTag}:props) =>{
  
   const[addTag, setAddTag]=useState<string>("")
   const[selTags, setSelTags]=useState<string[]>([])
   const[reSugTags,setReSugTags]=useState<string[]>([])
   const[editStatus, setEditStatus]=useState<boolean>(false);
   const [hiddenSug, setHiddenSug] = useState<Set<string>>(new Set());

   const edit :string = editStatus ? "TagModal_seledit" :"TagModal_SugTagsList";

   const sugTags = useMemo(() => {
  if (!localTag?.length) return [];
  return Array.from(new Set(localTag)).filter(t => !hiddenSug.has(t));
}, [localTag, hiddenSug]);


    const EditHandler =() =>{
      if(editStatus == true){
        setEditStatus(false)
      }else setEditStatus(true);
    }

    const AddTagHandler =(Event :React.ChangeEvent<HTMLInputElement>) =>{
       setAddTag(Event.target.value)
    }

    const KeyBordHandler =(Event:React.KeyboardEvent<HTMLInputElement>) =>{
      if(Event.key == 'Enter'){
        if(addTag.length !==0){
          const sletag:string[]=[...selTags]
          sletag.unshift(addTag);
          setSelTags(sletag);
          setAddTag("");
        }else return

      }
    }

    useEffect(() =>{
      if(selTags.length===0) setEditStatus(false);
    },[selTags])

    const CancelHandler =() =>{

    }

    const ConfirmHandler =() =>{

    }


    return(<Fragment>
      <div className="TagModal_Backdrop">
        <div className="TagModal_Main">
          <div className="TagModal_Search">
            <img src={TagAddImg}/>
              <input placeholder="태그를 입력하세요"
              onChange={AddTagHandler}
              onKeyDown={KeyBordHandler}
              value={addTag}/>
            </div>
            <div className="TagModal_Contents">
              <div className="TagModal_Edittor">
                 <h4>현재 태그</h4>
                 <button type="button" onClick={EditHandler}>편집</button>
              </div>
              
              <div className="TagModal_Divider" />
              <div className="TagModal_SelTagsMain">
                {selTags.length == 0 ? (<div className="TagModal_SelTagsList">
                  <p>추가된 태그가 없습니다.</p>
                    </div>):(<div className="TagModal_SelTagsList">
                      {selTags.map((value, id) =>(<div className={edit} >
                        {!editStatus && (<>
                           <p>{value}</p>
                        </>)}
                     {editStatus && (<div className="TagModal_activeEdit">
                     <p>{value}</p>
                     <img src={XImg} onClick={()=>{
                      setSelTags(prev => prev.filter((_, idx) => idx !== id));
                     }}/>
                     </div>)}
                </div>))}
                    </div>)}
              </div>
              <h4>추천 태그</h4>
              <div className="TagModal_Divider" />
              <div className="TagModal_SugTagsMain">
                {sugTags.map((value, id) =>(<div className="TagModal_SugTagsList" onClick={
                  ()=>{
                     setHiddenSug(prev => {
                        const next = new Set(prev);
                        next.add(value);
                        return next;
                      });

                      setSelTags(prev => (prev.includes(value) ? prev : [...prev, value]));
                  }
                }>
                <p>{value}</p>
                </div>))}
              </div>
            </div>
             <div className="TagModal_Btn">
              <button id="TagModal_cancel" onClick={CancelHandler}>취소</button>
              <button id="TagModal_confirm" onClick={ConfirmHandler}>확인</button>
             </div>
        </div>
      </div>
    </Fragment>)

}

export default TagModal
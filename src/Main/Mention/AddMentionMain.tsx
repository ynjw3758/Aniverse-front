
import {Oval} from "react-loader-spinner";

import "./AddMentionMain.scss";
import { useEffect, useState } from "react";
import MentionItems from "./MentionItems";


interface Mention_info{
    Userinfo:user_info[],
    AddMentionData : (data:user_info) => void
}

type user_info={
   img:string,
   nickname:string,
   id:string
}

const AddMentionMain =({Userinfo ,AddMentionData}:Mention_info) =>{
    const[isready, setIsready]=useState<boolean>(false);
    const[isempty, setIsempty]=useState<boolean>(false);
    const[fini_loading, setFini_loading]=useState<boolean>(false);

    useEffect(() =>{
     console.log("넘어온 데이터 :" , Userinfo);
     if(Userinfo.length == 0) {
        setIsready(true);
        setIsempty(true);
     }
    },[Userinfo]);

    const finishloading =() =>{
        setFini_loading(true);
        setIsready(true);
    }

    const show =() =>{
        setFini_loading(true);
        setIsready(true);
        return;
    }

    const nothing =() =>{
      return;
    }

    const addMentionData =(data:user_info) =>{
     AddMentionData(data);
    }

    
   return(<div className="AddMentionMain_Stand">
    {(isready == false && fini_loading == false) && (<div className="AddMentionMain_Loading">
        <Oval 
                  color="#ff0000" 
                  height={50} 
                  width={50}
        />
        {Array.isArray(Userinfo) && Userinfo.map((values, idx) => (
            <MentionItems
                Userinfo={values}
                idx={idx}
                total={Userinfo.length}
                onShow={finishloading}
                isready={false}
                AddMention={nothing}
            />
        ))}
        
    </div>)}
    {(isready == true && fini_loading == true) && (<div className="ddMentionMain_Show">
        {Userinfo.map((values, idx) =>(<>
            <MentionItems Userinfo={values} idx={idx} total={Userinfo.length} 
            onShow={show} isready={true} AddMention={addMentionData}/>
        </>))}
    </div>)}
    {isempty && (<div className="AddMentionMain_empty">
       <p>계정을 찾을 수 없습니다.</p>
    </div>)}
   </div>)
}

export default AddMentionMain
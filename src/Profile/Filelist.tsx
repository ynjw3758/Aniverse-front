import { useEffect, useState } from "react";
import "./Filelist.scss";
import FileItem from "./FileItem";


interface file_list {

    Item:any
  }
const Filelist =(props:file_list) =>{
    const[id, setId]=useState<string[]>([]);
    const [item, setItem]=useState<string[]>([]);


    useEffect(() =>{
        console.log("list 컴포넌트 테스트 ");
        const content:string[] = props.Item;
        console.log("item 길이 :" , content.length);
        let contentid:string[]=[...id];
        let Item:string[]=[...item];
        
        content.map((data) =>{
            Object.entries((data)).map((key) =>{
                //console.log("key :", key);
                if(key.at(0) == "content_id"){
                    contentid.push(key[1]);
                    setId(contentid);
                }
                else if(key.at(0)=="file_info"){
                    Item.push(key[1]);
                    setItem(Item);
                }
                
            })
        })

    },[props.Item]);


    return(<>
     <div className="content">
     {id.map((value, i) =>(<div className="list" id={value}>
     <FileItem files={item[i]}/>
     </div>))}    
     </div>
    </>)

}

export default Filelist;
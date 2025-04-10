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
     <div className="content_List">
     {id.map((value, i) =>(<div  id={value}>
     <FileItem files={item[i]}/>
     </div>))}    
     </div>
    </>)

}

export default Filelist;
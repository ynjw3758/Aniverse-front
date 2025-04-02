import { Fragment, useEffect, useState } from "react";
import "./Contents.scss";
import ContentItem from "./ContentItem";


type Content ={
    Img:string,
    contents:string[],
    disActive : (data:boolean) =>void
}

const Contents =(props:Content) =>{
    const[nickname , setNickname]=useState<string[]>([]);
    const[profile , setProfile]=useState<string[]>([]);
    const[favorite,setFavorite]=useState<any>(0);
    const[content , setContent]=useState<string[]>([]);
    const[contentid , setContentd]=useState<string[]>([]);
    const[files, setFiles]=useState<string[]>([]);
    const[userid ,setUserid]=useState<string[]>([]);


    
    useEffect(() =>{
     const contents:string[] = props.contents;

     setContent(contents);  
     let Userid:string[]=[...userid];
     let nicknames:string[] = [...nickname];
     let content_id:string[]=[...contentid];
     let prfile:string[]=[...profile]; 
     let file_list:string[]=[...files];
     contents.map((data) =>{
        Object.entries(data).map((key) =>{

            if(key.at(0) == "nickname"){
                nicknames.push(key[1]);
                setNickname(nicknames);
            }
            else if(key.at(0) == "profile"){
                console.log("프로파일 좀보자 :" , key.at(1));
                if(key.at(1) == "null"){
                    prfile.push("/image/baseimg.png");

                }
                else{
                    prfile.push(key[1]);
                }
                
                setProfile(prfile);
            }
            else if(key.at(0) == "content_id"){
                content_id.push(key[1]);
                setContentd(content_id);
            }
            else if(key.at(0) == "file_info"){
                file_list.push(key[1]);
                setFiles(file_list);

            }
            else if(key.at(0) == "favorite"){
                setFavorite(key[1]);
            }
            else if(key.at(0) == "user"){
                Userid.push(key[1]);
                setUserid(Userid);
            }
            

        })
     })

    },[props.contents]);

    const DiActive =(data:boolean) =>{
        props.disActive(data);
    }    
    console.log("content_id :" +contentid );
    return(<Fragment>
        <div className="MainContents_position">
            {contentid.map((value , i) =>{return (<div className="MainContents_total_content" id={value}>
            <ContentItem nickname={nickname[i]} profile={profile[i]} 
            files={files[i]} heart={favorite} conntetid={value} UserId={[userid[i]]} ondeactivate={DiActive} MyImg={props.Img} index={i}/>
            </div>)}    
            )}   
          </div>

       
    </Fragment>
    )

}
export default Contents;
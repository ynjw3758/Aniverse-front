import { Fragment, useEffect, useState } from "react";
import "./Contents.scss";
import ContentItem from "./ContentItem";


type Content ={
    Img:string,
    contents:string[],
    disActive : (data:object) =>void
}

const Contents =(props:Content) =>{
    const[nickname , setNickname]=useState<string[]>([]);
    const[profile , setProfile]=useState<string[]>([]);
    const[favorite,setFavorite]=useState<number[]>([]);
    const[content , setContent]=useState<string[]>([]);
    const[contentid , setContentd]=useState<string[]>([]);
    const[files, setFiles]=useState<string[]>([]);
    const[userid ,setUserid]=useState<string[]>([]);
    const[like, setLike]=useState<string[]>([]);
    const[comment, setComment]=useState<string[]>([]);


    
    useEffect(() =>{
     const contents:string[] = props.contents;

     setContent(contents);  
     let Userid:string[]=[...userid];
     let nicknames:string[] = [...nickname];
     let content_id:string[]=[...contentid];
     let prfile:string[]=[...profile]; 
     let file_list:string[]=[...files];
     let favories:number[]=[...favorite];
     let likes:string[]=[...like];
     let comments:string[]=[...comment];
     contents.map((data) =>{
        Object.entries(data).map((key) =>{

            if(key.at(0) == "nickname"){
                nicknames.push(key[1]);
                setNickname(nicknames);
            }
            else if(key.at(0) == "profile"){
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
                const tranform =Number(key[1]);
                favories.push(tranform);
                setFavorite(favories);
            }
            else if(key.at(0) == "user"){
                Userid.push(key[1]);
                setUserid(Userid);
            }
            else if(key.at(0) == "like"){
                likes.push(key[1]);
                setLike(likes);
            }
            else if(key.at(0) == "Content_Comment"){
                comments.push(key[1]);
                setComment(comments);
            }
            

        })
     })

    },[props.contents]);

    const DiActive =(data:object) =>{
        props.disActive(data);
    }    
    return(<Fragment>
        <div className="MainContents_position">
            {contentid.map((value , i) =>{return (<div className="MainContents_total_content" id={value}>
            <ContentItem nickname={nickname[i]} profile={profile[i]} 
            files={files[i]} heart={favorite[i]} conntetid={value} UserId={userid[i]} Like={like[i]} Commnets={comment[i]}
            ondeactivate={DiActive} MyImg={props.Img} index={i}/>
            </div>)}    
            )}   
          </div>

       
    </Fragment>
    )

}
export default Contents;
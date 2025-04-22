
import "./Item.scss";
import { useEffect, useRef, useState } from "react";


type Samll_profile = {
    content:string[],

  }

const Item =(props:Samll_profile) =>{

    const[img, setImg]=useState<string[]>([]);
    const[vid, setVid]=useState<string[]>([]);
    const[Item , setItem]=useState<string[]>(props.content);
    const[check ,setCheck]=useState<boolean>(false);
     
  
    

   useEffect(() =>{

        let image:string[]=[...img];
        let video:string[]=[...vid];
        console.log("Item :" , Item.length);
        Object.entries((props.content)).map((key) =>{
            console.log("key :" , key);
            let url:string = key[1];
            let last:number =url.lastIndexOf(".");
            let expand:string =url.substring(last+1 , url.length);
            if((expand=="jpg" || expand=="png")){

                image.push(key[1]);
                setImg(image);
              }
              
              else if(expand=="mp4"){
                video.push(key[1]);
                setVid(video);

              }
            })
   },[props.content]);



    return(<div className="MainPage_ContetItem">
    {Item.map((data) =>(<div className="MainPage_Contetimg"> 
      <img src={data}/>
      </div>))}


    </div>)

}

export default Item;
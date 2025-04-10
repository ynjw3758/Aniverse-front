import { useEffect, useState } from "react";
import "./FileItem.scss";


interface file_list{
    files:any
}

const FileItem =(props:file_list) =>{
    const[img, setImg]=useState<string[]>([]);
    const[vid, setVid]=useState<string[]>([]);
    const[files, setFiles]=useState<string[]>([]);

    useEffect(() =>{

        //console.log("Item :" , props.files);
        const contentItem:string[]=props.files;

        let image:string[]=[...img];
        let video:string[]=[...vid];
        let list:string[]=[...files];


       Object.entries((contentItem[0])).map((key) =>{
          //console.log("key :" , key);
             if(key.at(0) == "url"){
                let url:string = key[1];
                let last:number =url.lastIndexOf(".");
                let expand:string =url.substring(last+1 , url.length);
                if((expand=="jpg" || expand=="png")){

                    image.push(key[1]);
                    setImg(image);
                  }
                  
                  else if(expand=="mp4"){
                    //console.log("비디오 파일 ");
                    video.push(key[1]);
                    setVid(video);

                  }


             }
               })

    },[props.files]);

    return(<>
    <div className="Item">
    {img.map((data) =>(<>
    <img src={data}/>
    </>))}
    {vid.map((data) =>(<>
    <video src={data}/>
    </>))}
    </div>
    </>)
}

export default FileItem;
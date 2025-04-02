//                            +------------------
//----------------------------+ 외부 라이브러리
//                            +------------------
//#region
import {useEffect, useState } from "react";
//#endregion

//                            +------------------
//----------------------------+ 내부 라이브러리
//                            +------------------
//#region
import "./Input_AddItems.scss";
import Emoji from"./Emoji";
import Addfiles from "./Addfiles";
import Sizemessage from "./Sizemessage";
//#endregion


//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type info ={
    CreateDate:string
 }
 //#endregion

const Input_AddItems =(props:info) =>{

//              +-----------------
//--------------+ 상태 관리
//              +-----------------
//#region type
const[isSize, setIsSize]=useState<boolean>(false);
const[isEmoticon, setIsEmoticon]=useState<boolean>(false);
const[isfiles, setIsfiles]=useState<boolean>(false);
const[emoticon, setEmoticon]=useState<string>("");
const[img, setImg]=useState<string[]>([]);
const[video, setVideo]=useState<string[]>([]);
const[imgid,  setImgid]=useState<string[]>([]);
const[videoid,  setVideoid]=useState<string[]>([]);
const[maxsize, setMaxsize]=useState<number>(0);
//#endregion

//              +-----------------
//--------------+ 상태 관리
//              +-----------------
//#region type
const max_size:number=  1024 * 1024 * 20;
//#endregion

    const AddfileHandler =(event: React.ChangeEvent<HTMLInputElement>) =>{
        console.log("파일 :" , event.target.files);
        const array :any=event.target.files;
        let imglist:string[]=[...img];
        let imidlist:string[]=[...imgid];
        let videolist:string[]=[...video];
        let vilistid:string[]=[...videoid];

        for(let count =0; count<array.length;count++){
            console.log("이미지 미리보기 만들기");
            if (array[count] !== null) {
                const file = array[count];
                if(max_size < maxsize){
                    setMaxsize((prev) => prev+file.size);
                    if (file && file.type.substring(0, 5) === "image") {
                        const currentimg = URL.createObjectURL(file);
                        console.log("url :" , currentimg);
                        imglist.push(currentimg);
                        setImg(imglist);
                        const origin:string =file.name;
                        const index:number = origin.lastIndexOf(".");
                        const name:string =file.name.substring(0, index-1);
                        imidlist.push(name);
                        setImgid(imidlist);
                    }
                    else{
    
                        const create_url = URL.createObjectURL(file);
                        videolist.push(create_url);
                        setVideo(videolist);
                        const origin:string =file.name;
                        const index:number = origin.lastIndexOf(".");
                        const name:string =file.name.substring(0, index-1);
                        vilistid.push(name);
                        setVideoid(vilistid);
                    }
                }
                else{
                    console.log("용량 초과");
                    setIsSize(true);
                    setIsfiles(false);
                    return;
                }


            }

        }
        setIsfiles(true);
     }   

    const EmoticonHandler =() =>{
        if(isEmoticon == false){
            setIsEmoticon(true);
        }
        else{
            setIsEmoticon(false);
        }
       
    }

    const AddEmoticon =(data:string) =>{
        console.log("값 :" , data);
        setEmoticon((prev)=>prev+data);
    }

    const inputHandler =(e:React.ChangeEvent<HTMLInputElement>) =>{
        setEmoticon(e.target.value);
    }
    
    const CloseHandler =() =>{
        setIsSize(false);
    }

    useEffect(() =>{
       console.log("날짜 :" , props.CreateDate);
    },[props.CreateDate]);


    return(<div className="AddChatItems_total">
        <div className="AddChatItems_date">
         <p>{props.CreateDate}</p>    
        </div>
        {isfiles &&(<div className="AddChatItems_filelist" >
            <Addfiles Img={img} Video={video} ImgId={imgid} VideoId={videoid}/>
        </div>)}
        <div className="AddChatItems_inputchat">
         <input type="text" placeholder="메시지 입력..." value={emoticon} onChange={inputHandler}/>
        </div>
        <div className="AddChatItems_AddContents">
         <img src={"/image/emoticon.png"} onClick={EmoticonHandler}/>
         <label  
            draggable="true"
            >
         <img src="/image/picture.png"/>
           <input type="file" 
           style={{display:"none"}}
           onChange={AddfileHandler}
           multiple={true}
           accept=".jpg, .jpeg, .png , .mp4"
            />
            </label>
        </div>
        {isEmoticon && (<>
          <Emoji onimage={AddEmoticon}/>
        </>)}
        {isSize && (<>
         <Sizemessage onClose={CloseHandler}/>
        </>)}
    </div>)

}
export default Input_AddItems;
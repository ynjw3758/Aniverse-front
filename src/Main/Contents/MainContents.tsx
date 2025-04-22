import { Fragment, useState ,useContext, useEffect} from "react";
import "./MainContents.scss";
import React from "react";

import user_info from "../../Userdata/Userdata";
import UserUpload from "../../Upload/UserUpload";
import Contents from "./Contents";
import UploadComplate from "../../Layout/UploadComplete";


type user_info ={
    img:string,
    nickname:string,
    content:string[],
    onload:() => void,
    onDisActive:(data:object) => void
}

const MainContentsx=(props:user_info) =>{
    const[modal , setModal]=useState<boolean>(false);
    const[complete, setComplete]=useState<boolean>(false);
    const[isdata, setIsdata]=useState<boolean>(false);
    const [isshow, setIshow]=useState<boolean>(false);
    const [isloading, setIsloading]=useState<boolean>(false);

    const disable:boolean=true;

    const ModalHandler =() =>{
        setModal(true);
    }

    const uploadclose =(check:any) =>{
        console.log("uploadHnalder :" , check);
        setModal(check);
        
    }
    const CompleteHandler =() =>{
        setModal(false);
        setComplete(true);
    }
    const closeHandler =() =>{
        setModal(false);
        setComplete(false);
    }

    const DisAvtive =(data:object) =>{
     props.onDisActive(data);
     setIshow(true);
     setIsdata(true);
     setIsloading(true);
    }
    useEffect(() =>{  
       if(props.content.length > 0 ){
        console.log("not null");
           setIsdata(true);
       }
       else{
        console.log("null");
        setIsdata(false);
        setIsloading(true);
       }
    },[props.content])

    const show =(data:object) =>{

        props.onDisActive(data);
    }
    /*
                    {!isloading && (<div className="login_loading">
                <img src="/image/login_loading.png"/>
                <p>로딩 중</p>
            </div>)}
            */
/*
        {(isdata == true && isshow ==false) && (<div className="Maincontents_body_blur">
            <Contents  contents={props.content} disActive={DisAvtive} Img={props.img}/>
        </div>)}
        {(isdata == true && isshow ==true) && (<div className="Main_Contents">
            <Contents  contents={props.content} disActive={show} Img={props.img}/>
        </div>)}
        */
       /*
               <div className="Main_Contents">
            <Contents  contents={props.content} disActive={DisAvtive} Img={props.img}/>
        </div>
        */
       
    return(<Fragment>
            {!isloading && (<div className="login_loading">
                <img src="/image/login_loading.png"/>
                <p>로딩 중</p>
            </div>)}
        <div className="Main_Contents">
        <h2>당신의 이야기를 공유해보세요</h2>
        <input  placeholder="당신에 반려견과의 일상을 공유해보세요"
          disabled={!disable}
          onClick={ModalHandler}/>
        </div>
        {(isdata == true && isshow ==false) && (<div className="Maincontents_body_blur">
            <Contents  contents={props.content} disActive={DisAvtive} Img={props.img} Nickname={props.nickname}/>
        </div>)}
        {(isdata == true && isshow ==true) && (<div className="Main_Contents">
            <Contents  contents={props.content} disActive={show} Img={props.img} Nickname={props.nickname}/>
        </div>)}

        {!isdata && (<div className="upload_story">
            <img src="/image/no_data.png"/>
            <p>당신의 이야기를 올려보세요...</p>
            </div>)}
        {modal && (<UserUpload img={props.img} nickname={props.nickname} onClose={uploadclose} onComplete={CompleteHandler}/>)}
        {complete && (<UploadComplate onClose={closeHandler}/>)}
        </Fragment>)
}

export default React.memo(MainContentsx);



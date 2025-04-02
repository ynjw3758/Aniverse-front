import Clesses from"./FirstModal.module.scss";
import Modal from "../Modal/Modal";
import { useCallback, useEffect, useState ,useContext} from "react";
import SecondsModal from "./SecondsModal";
import React from "react";
import SecondModal from "../Modal/SecondModal";
import Name from "../Userdata/Userdata";
import Modals from "../Modal/Modals";

type user_info ={
    img:string,
    nickname:string,
    onClose: () => void,
    checks:(test:boolean) => void
}

const FirstModal =(props:user_info) =>{
   const[test , setTest]=useState<boolean>(false);
   const[semodal , setSemodal]=useState<boolean>(false);
   //const [videoFile, setVideoFile] = useState<File | null>();
   const [video, setVideo] = useState<boolean>(false);
   const [preview, setPreview] = useState<string[]>([]);
   const [ previewvideo, setPreviewVideo ] = useState<any>(""); 

    const clickHandler =() =>{
        setTest(true);
    }
    const closeHandler =() =>{
        Nickname.addcheck(false);
        setTest(false);
        //props.onClose();
    }

    const onChangeImg =(event: React.ChangeEvent<HTMLInputElement>) =>{
        const array :any=event.target.files;

          for(let count =0; count<array.length;count++){
            const file = array[count];
            console.log("file : " , file);
            if(file && file.type.substring(0, 5) === "video"){
                console.log("비디오 파일 업로드 ");
                //setVideoFile(file);
                setVideo(true);
                const currentimg = URL.createObjectURL(file);
                let file_list:string[]=[...preview];
                file_list.push(currentimg);
                setPreview(file_list);

          }

    }
}

    const cancel =() =>{
     Nickname.addcheck(false);
    }
    const Nickname = useContext(Name);
    const[count, setCount]=useState(0);
    const aaaaa =useCallback(() =>{
        //setCount(count+1);
        //setTest(true);
        
        if(Nickname.check== true){
            console.log("test1");
            Nickname.addcheck(false);
        }
        if(Nickname.check== false){
            console.log("test2");
            Nickname.addcheck(true);
        }
    },[Nickname.check])
    //{test && (<SecondsModal onClose={closeHandler}/>)}

    const close =() =>{
        console.log("close test:" );
        Nickname.addcheck(true);
        console.log("check :" , Nickname.check);
    } 
    const TestClose =useCallback(() =>{
      console.log("close test:" );
      Nickname.addcheck(true);
      console.log("check :" , Nickname.check);
    },[Nickname.check]);

    const [back,setBack]=useState<boolean>(false);
    const isback = back ? Clesses.close : Clesses.test
    const backDropHandler =() =>{
        //setBack(true);
        setTest(true);
        console.log("back");
    }
   /* {test && (<div className={Clesses.back} onClick={backDropHandler}>
                <div className={Clesses.test}>
                  <p>게시물을 삭제하시겠습니까?</p>
                  <span>(지금 나가면 저장되지 않습니다)</span>
                  <div className={Clesses.btn}>
                    <button type="button" >삭제</button>
                    <button type="button"  onClick={cancel}>취소</button>
                  </div>
                </div>
        </div>)}  
        */
       
    return(<>
    <div className={Clesses.back} onClick={close}>
            <div className={Clesses.main} onClick={(e) => e.stopPropagation()}>
                <input type="file" 
                    
                     onChange={onChangeImg}
                     multiple={true}
                      />

            <button onClick={aaaaa}>test</button>
            {preview.map((video, id) =>(<div className={Clesses.video} key={id}>   
                <video  autoPlay loop controls>
                    <source src={video}  type="video/mp4" />
                    </video>
            </div>))}
        </div>
        { Nickname.check && (<div className={Clesses.back}>
              <div className={Clesses.secondmain}>
                <p>게시물을 삭제하시겠습니까?</p>
                <span>(지금 나가면 저장되지 않습니다)</span>
              <div className={Clesses.btn}>
                <button type="button" >삭제</button>
                <button type="button"  onClick={cancel}>취소</button>
             </div>
    </div>
    </div>)}
    </div> 
    </>
)
}

export default FirstModal;



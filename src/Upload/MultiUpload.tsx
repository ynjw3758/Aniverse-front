import { Fragment, useRef, useState } from "react";
import "./MultiUpload.scss";
import {useEffect} from "react";
import SecondModals from "./SecondModals";
import KaMap from "./KaMap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddTagPeople from "./AddTag/SearchTagPeople";
import TagList from "./Taglist/TagList";


interface upload_data{
    //Next :(check:boolean) => void;
    Img_List:string[];
    Video_List:string[];
    Multi_List:string[];
    Initilalize : (initial:boolean) => void;
    Next :(extend:boolean) => void;
    close:() => void;
    nickname:string;
    img:string;
    origin:string[]
}

interface ResponseDataType {
  message: string;
  code: number;
  response:object
}


const opendlist:string[]=["전체 공개" , "지인 공개" , "광고 공개"];

const MultiUpload =(props:upload_data) =>{


      const[leftactive, setLeftactive]=useState<boolean>(false);
      const[rightactive, setRightactive]=useState<boolean>(false);
      const[isSecondmodal , setIsSecondmodal]=useState<boolean>(false);
      const[modal, setModal]=useState<boolean>(false);
      const[initialpage,setInitialpage]=useState<boolean>(true);
      const[secondpage , setSecondpage]=useState<boolean>(false);
      const[openactive , setOpenavtive]=useState<boolean>(false);
      const [location, setLocation]=useState<boolean>(false);
      const[islocalform , setIslocalform]=useState<boolean>(false);
      const[isActivSearch , setIsActivSearch] = useState<boolean>(false);
      const[tagbasic, setTagbasic]=useState<boolean>(true);
      const[tagList, setTagList]=useState<boolean>(false);

      const[localdata , setLocaldata] = useState<any[]>([]);
      const[textArea , setTextArea]=useState<string>("");
      const[uploadlocal ,setUploadlocal]=useState<string>("");
      const[openkind ,setOpenkind]=useState<string>("전체 공개");
      const[preview , setPreview]=useState<string[]>(props.Img_List);
      const[videolist , setVideolist]=useState<string[]>(props.Video_List);
      const[multilist , setMultilist]=useState<string[]>(props.Multi_List);

      const[refcount, setRefcount]=useState<number>(0);
      const[pagenumber , setPagenumber]=useState<number>(1);

      const[tagItems, setTagItems]=useState<any[]>([]);
      
     //ref
      const inputref= useRef<HTMLInputElement>(null);
      const list:any=useRef<null | HTMLVideoElement[]>([]);
      let origin:string[] =props.Multi_List 

      const left_active = leftactive ? "left_active" : "left_unactive";
      const right_active = rightactive ? "right_active" : "right_unactive";

      const utilsize = 1024*1024*10;
      let currentchunk:any=0;
      let chunkcount:any=0;
      const navigate = useNavigate();


      const cancelHandler  =() =>{
        console.log("취소 버튼");
        setModal(false);
        setInitialpage(true);
       }
       const closeModalHandler =(data:any) =>{
        console.log("closedata : " , data);
        if(secondpage == false){
            props.Initilalize(true);
            setMultilist([]);
            setVideolist([]);
            setPreview([]);
        }
        else{
            console.log("처음 페이지로 이동");
            setSecondpage(false);
        }
       }
       
      const SlidebeforeHandler =() =>{

        if(pagenumber !== 1){
        setPagenumber((preNum) => preNum-1);
        console.log("이전으로 이동 :" , pagenumber , refcount , preview.length);
         if(pagenumber > preview.length){
            console.log("이전 동영상 재생 카운트가 1인 경우");
            if(refcount == 0){
                console.log("동영상 파일이 1개인 경우");
                list.current[refcount].pause();
                //setVideocnt(videocnt-1);
                return;
            }

            else{
              console.log("n카운트 일경우 :" , refcount);
              if(pagenumber-1 !== preview.length){
              list.current[refcount].pause();
              list.current[refcount-1].play();
              setRefcount(refcount-1);
              }
              else{
                list.current[0].pause();
                setRefcount(0);
              }
             }

            //list.current[0].pause();

         }
         else if(pagenumber-1 == preview.length ){
            console.log("영상 파일 영역 지남");
            list.current[0].pause();
         }
        }
        else{
          console.log("슬라이드 인덱스 0번째 이전 화살표 동작 안되게");
        }

      }

      
      const SlidenextHandler =() =>{
        console.log("page :" , pagenumber ," ,multilist :" ,multilist.length);
        if(pagenumber-1 !== multilist.length-1){
          setPagenumber((preNum) => preNum+1);
          console.log("next :" , pagenumber , preview.length);
          if(pagenumber ==preview.length){
            console.log("0번째 동영상 재생");
            if(videolist.length == 1){
            console.log("영상이 1개인 경우");
            list.current[refcount].play();
            return ;
            }
            else{
                console.log("영상이 N개인 경우 :", refcount);
                
                list.current[refcount].play();
                setRefcount(refcount+1);
                return;
            }
         }
         
         else if(pagenumber > preview.length){
            console.log("n번째 동영상까지 모든 ref 할당 후 이전 동영상 정지 후 재생");
            if(pagenumber !== multilist.length-1){
             if(refcount == 0){
                list.current[0].play();
                return;
             }
             else{
            list.current[refcount-1].pause();
            list.current[refcount].play();
            setRefcount(refcount+1);
             }
            }
            else {
                console.log("마지막");
                list.current[refcount-1].pause();
                list.current[refcount].play();
                
            }

         }
        }
        else{
          console.log("슬라이드 인덱스 마지막 다음 화살표 동작 안되게");
          setRightactive(true);
          
          return;
        }
      }
      useEffect(() =>{
        //console.log("포인트 이펙트!");
        if(pagenumber == 1){
         console.log("처음 페이지");
         setLeftactive(false);
         setRightactive(true);
         
        }
        
        else if(pagenumber == multilist.length){
         console.log("마지막 페이지");
         setRightactive(false);
         setLeftactive(true);
         
        }
        
        else if(pagenumber !== multilist.length && pagenumber !== 1){
         console.log("페이지 중간");
         setLeftactive(true);
         setRightactive(true);
         

        }

       },[leftactive , rightactive , pagenumber, refcount])

       useEffect(() =>{
        console.log("위치 검색 완료 ");
         if(uploadlocal !== ""){
          console.log("위치 검색 완료 ");
          setIslocalform(true);
         }
      },[islocalform, uploadlocal]);

      const NextHandler =() =>{
        setSecondpage(true);
        props.Next(true);
      }
      const secondbackHandler =() =>{
        setSecondpage(false);
        props.Next(false);
      }

      const textHandler =(e:React.ChangeEvent<HTMLTextAreaElement>) =>{
        console.log("text :" , e.target.value)
        setTextArea(e.target.value);
      }

      const localHandler =() =>{
        setLocation(true);
      }

      const LocationdataHandler =(info:any) =>{
        setLocation(false);
        console.log("최종 위치 데이타 :" , info.content);
        setLocaldata(info);
        setUploadlocal(info.content);
        setIslocalform(true);
            }

      const clicklist =(event:React.MouseEvent<HTMLLIElement>) =>{
              console.log("click :" , event.currentTarget.innerText);
              setOpenkind(event.currentTarget.innerText);
              setOpenavtive(false);
        }     
        const opendkind =() =>{
          console.log("공개 범위 설정 및 광고");
          if(openactive == false) setOpenavtive(true);
          else setOpenavtive(false);
       } 

      const Upload =() =>{
        console.log("파일 업로드 일상공유하기");
        console.log("파일 업로드 submit");

        let check:boolean= false;
        if(chunkcount != 0 || currentchunk !=0){
          check=true;
        }

        if(check == false){
          console.log("토큰 체크");
          let access_token:string="";          
          access_token = localStorage.getItem("a_id")!;
          console.log("access token :" , access_token);
          axios.defaults.headers.common['Authorization'] = access_token;
          axios.get("http://localhost:8080/Pets-social/acccheck")
          .then(response =>{
             console.log("응답 결과 확인 " , response.data);
            if(response.status == 200){
              console.log("토큰 인증 성공");
              //setTokencheck(true);
            }
    }).catch(error =>{
      if(axios.isAxiosError<ResponseDataType>(error)){
                  console.log("error code: " , error);
                  
                  if(error.code=="ERR_BAD_REQUEST"){
                    navigate("/error");
                  }
                  if(error.code == "ERR_NETWORK"){
                    console.log("네트워크 에러 ");
                    
                    
                  }
                  if(error.response?.status==401){
                      console.log("승인되지 않은 로그인");
                      navigate("/login");
                  }
                  if(error.response?.status==500){
                    console.log("서버 에러발생");
                    navigate("/error/se-error")
                  }
                  
                  console.log("error response: " , error.response?.data);
                }
  })

        }

        const filedata = new FormData();
         console.log("오리지널 파일 :" , origin);
        if(origin !== null && origin !== undefined){
         console.log("length :" , multilist.length);
         for(let count=0; count<origin.length;count++){
           filedata.append("UploadFile" , origin[count]);
         }
        }
           let local:any=localdata;
           const location_info:any=JSON.stringify(local);
           let id:any;
           id=localStorage.getItem("id");
             filedata.append("text" ,textArea);
             filedata.append("location" , location_info);
             filedata.append("opendkind" , openkind);
             filedata.append("id" , id);

       let access_token:string="";          
       access_token = localStorage.getItem("a_id")!;
       console.log("access token :" , access_token);
       axios.post("http://localhost:8081/Pets-social/Fileupload" , filedata,
       {headers:{"Content-Type": "multipart/form-data", /*"Authorization":access_token ,*/"processData":false , "contentType":false} })
       .then((response) =>{
         console.log("response :" , response);
          
         if(response.status == 200){
          console.log("업로드 완료");
          props.close();
          return;
         }
       })
      }
      const Firtst_backHandler =() =>{
        setModal(true);
        //props.Initilalize(true);
      }

    const MapClose =() =>{
      setLocation(false);
    }

    const AddPeopleSearch =() =>{
      console.log("검색창 활성화");
      setIsActivSearch(true);

    }
    const TagList_Active =(data:any) =>{
      const isDuplicate = tagItems.some(item => item.Id === data.Id);

      if(!isDuplicate){
        setIsActivSearch(false);
        setTagList(true);
        let infos:object[] = [...tagItems];
        infos.push(data);
        setTagItems(infos);
      }
      else{
        console.log("이밎 추가된 유저입니다");
      }
    }

    const BackSearch =() =>{
      setTagList(false);
      setIsActivSearch(true)
    }

    return(<>
    
    {modal && (<SecondModals  onClose={cancelHandler} ondelete={closeModalHandler} 
      isopen={isSecondmodal}
      isinitila={initialpage}/>)}
    {secondpage && (<Fragment>
        <div className="Multi_upload">
          <div className="Multi_upload_img">
              <img src="/image/left_arrow.png" onClick={secondbackHandler}/>
           </div>
            <h2>올리기</h2>
            <div className="Multi_upload_btn">
              <button type="button" onClick={Upload}>공유하기</button>
            </div>                     
        </div>
            <div className="Multi_upload_Horizantal">
              <hr />
            </div>
            <div className="Multi_textbody">
            {(leftactive == false && rightactive == true) && ( <div className="slide_right">
              <img src="/image/slideright.png" onClick={SlidenextHandler} id={right_active} />
              </div>)}
              {(leftactive == true && rightactive == true) && ( <>
              <div className="slide_left">
               <img src="/image/slideleft.png" onClick={SlidebeforeHandler} id={left_active} />
              </div>
              <div className="slide_right">
              <img src="/image/slideright.png" onClick={SlidenextHandler} id={right_active} />
              </div>
              </>)}
              {(leftactive == true && rightactive == false) && (<div className="slide_left">
               <img src="/image/slideleft.png" onClick={SlidebeforeHandler} id={left_active} />
              </div>)}
              <div className="Multi_slide_stand_upload">

                {preview.map((img, id) =>(<div style={{transition:"all 0.3s ease-in-out" ,
              transform:`translateX(${(pagenumber-1)* -40+"vw"})`}}>
                <img src={img} key={id} />
                </div>))}
                {videolist.map((video ,id) =>(<div style={{transition:"all 0.3s ease-in-out" ,
              transform:`translateX(${(pagenumber-1)* -40+"vw"})`}}>
                <video src={video} key={id}  ref={(element) => list.current[id] = element} controls/>
                </div>))}
             </div>
              <div className="upload_side">
              <img src ={props.img} />
              <h3>{props.nickname}</h3>
              <div className="open">
               <div className="bts">
                 <button type="button" onClick={opendkind}>{openkind}</button>
                </div>
              {openactive && (<div className="Multi_openlist">
               <ul>
                {opendlist.map((list) =>(<>
                <li onClick={clicklist} key={list}>{list}</li>
                </>))}
               </ul>
              </div>)}
              </div>
            </div>
            <div className="Multi_insert_contents">
           <textarea placeholder="당신의 일상을 올려보세요" onChange={textHandler}/>
           <input  placeholder="위치 검색"
           ref={inputref}
           onClick={localHandler}
           value={uploadlocal}
           disabled={islocalform}
          
          />
                      {tagbasic && (<button onClick={AddPeopleSearch} >태그 검색</button>)}
                      {isActivSearch && (<AddTagPeople  AddTag={TagList_Active}/>)}
                      {tagList && (<TagList Item={tagItems} Back_Search={BackSearch}/>)}
           </div>
            </div>
    </Fragment>)}
    {location && (<KaMap onData={LocationdataHandler} onclose={MapClose}/>)}
    {!secondpage && (<Fragment>
        <div className="Multi_first_headers">
          <div className="Multi_first_img">
              <img src="/image/left_arrow.png" onClick={Firtst_backHandler}/>
           </div>
            <h2>파일</h2>
            <div className="Multi_first_btn">
              <button type="button" onClick={NextHandler}>다음</button>
            </div>                     
        </div>
            <div className="Multi_first_Horizantal">
              <hr />
            </div>
            <div style={{display:"flex", flexDirection:"row", 
              
            }}>
              {(leftactive == false && rightactive == true) && ( <div className="slide_right">
              <img src="/image/slideright.png" onClick={SlidenextHandler} id={right_active} />
              </div>)}
              {(leftactive == true && rightactive == true) && ( <>
              <div className="slide_left">
               <img src="/image/slideleft.png" onClick={SlidebeforeHandler} id={left_active} />
              </div>
              <div className="slide_right">
              <img src="/image/slideright.png" onClick={SlidenextHandler} id={right_active} />
              </div>
              </>)}
              {(leftactive == true && rightactive == false) && (<div className="slide_left">
               <img src="/image/slideleft.png" onClick={SlidebeforeHandler} id={left_active} />
              </div>)}
              <div className="Multi_slide_stand">

                {preview.map((img, id) =>(<div style={{transition:"all 0.3s ease-in-out" ,
              transform:`translateX(${(pagenumber-1)* -40+"vw"})`}}>
                <img src={img} key={id} />
                </div>))}
                
                {videolist.map((video ,id) =>(<div style={{transition:"all 0.3s ease-in-out" ,
              transform:`translateX(${(pagenumber-1)* -40+"vw"})`,
               }}>
                <video  src={video} key={id} 
                  ref={(element) => list.current[id] = element}
                  controls
                 />
                </div>))}
                </div>
              </div>
              </Fragment>)}

    </>)
}

export default MultiUpload;
import "./UserUpload.scss";

import { useEffect, useState ,  useRef, Fragment} from "react";
import React from 'react';
//import SwiperCore, { Navigation, Scrollbar, Autoplay ,Pagination} from 'swiper';
// swiper bundle styles
// swiper core styles
import 'swiper/swiper-bundle.min.css'
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/swiper.min.css'
// modules styles
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import SecondModals from "./SecondModals";
import KaMap from "./KaMap"; //추후에 끌것이다
import Video from "./Video";
import MultiUpload from "./MultiUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";



type user_info ={
    img:string,
    nickname:string,
    onClose: (check:Boolean) => void
    onComplete:() => void
}

interface ResponseDataType {
  message: string;
  code: number;
  response:object
}

const opendlist:string[]=["전체 공개" , "지인 공개" , "광고 공개"];

const UserUpload=(props:user_info) =>{

  const [ previewImg, setPreviewImg ] = useState<any>(""); 
  const [imgFile, setImgFile] = useState<File | null>();

  const [videoFile, setVideoFile] = useState<File | null>();
  const [preview, setPreview] = useState<string[]>([]);
  const[videolist,setVideolist]=useState<string[]>([]);
  const[uploadvideo,setUploadvideo]=useState<string[]>([]);
  const[multilist, setMultilist]=useState<string[]>([]);
  const[one_before , setOne_before]=useState(<p></p>);
  const[mu_before , setMu_before]=useState(<p></p>);

  const [video, setVideo] = useState<boolean>(false);
  const [isimg, setIsimg] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);
  const [oneimg, setOneimg] = useState<boolean>(false);
  const[multiupload , setMutiload]=useState<boolean>(false);
  const[checkone , setCheckone]=useState<boolean>(false);
  const[checkmu , setCheckmu]=useState<boolean>(false);
  const[nextone, setNextone]=useState<boolean>(false);
  const[nextmu , setNextmu]=useState<boolean>(false);
  const[isSecondmodal , setIsSecondmodal]=useState<boolean>(false);
  const [location, setLocation]=useState<boolean>(false);
  const[sizecheck,setSizecheck]=useState<boolean>(false);
  const inputref = useRef<HTMLInputElement>(null);
  const[localdata , setLocaldata] = useState<any[]>([]);
  const[leftactive, setLeftactive]=useState<boolean>(false);
  const[rightactive, setRightactive]=useState<boolean>(false);
  const[pagenumber , setPagenumber]=useState<number>(1);
  const[extend ,setExtend]=useState<boolean>(false); 
  const[uploadFile,setUploadFile]=useState<string[]>([]);
  const[urlList , setUrlList] =useState<string[]>([]);
  const[uploadlocal ,setUploadlocal]=useState<string>("");
  const[openkind ,setOpenkind]=useState<string>("전체 공개");
  const[openactive , setOpenavtive]=useState<boolean>(false);
  const[openlist ,setOpenlist]=useState<string[]>([]);


  const left_active = leftactive ? "left_active" : "left_unactive";
  const right_active = rightactive ? "right_active" : "right_unactive";
  const max_size=1024*1024*100;
  const navigate = useNavigate();

  const onChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
/*
    const 콘텐츠영역 = {
      color= "Red"
    }
      */
    const array :any=event.target.files;
    console.log("array :" , array);
    console.log("다수 이미지 업로드 :" , array.length);
    let file_list:string[]=[...preview];
    let video_list:string[]=[...videolist];
    let multi_list:string[]=[...multilist];
    let upload_list:string[]=[...uploadFile];
    let upload_videolist:string[]=[...uploadvideo];
    let url_list:string[] = [...urlList];
    let total_size:number=0;
    //let oringin:string[]=[...originmulti];
    for(let count =0; count<array.length;count++){
      console.log("이미지 미리보기 만들기");
     
      if (array[count] !== null) {
          const file = array[count];
          upload_list.push(file);
          setUploadFile(upload_list);
          total_size+=file.size;
          if(total_size > max_size){
            setSizecheck(true);
          }
          const url  = URL.createObjectURL(file);
          url_list.push(url);
          
        if (file && file.type.substring(0, 5) === "image") {
            setIsimg(true);
            setImgFile(file);
            const currentimg = URL.createObjectURL(file);
            console.log("url :" , currentimg);
            file_list.push(currentimg);
              console.log("멀티 파일 업로드");
              multi_list.push(currentimg);
              setMultilist(multi_list);
              //setUploadFile(multi_list);
            if(array.length === 1){
              console.log("단일 사진 업로드");
              setOneimg(true);
              console.log("타겟 : " , event.target.files);
              let filereader = new FileReader();
              if(event.target.files !== null){
                const files = event.target.files[0];
                filereader.readAsDataURL(files);
                console.log("file name : " , filereader);
                filereader.onload =() =>{
                  const preview =filereader.result;
                  console.log("preview :" , preview); 
                  if(preview){
                      setPreviewImg([...previewImg, preview])
                      
                  }
                }
              }
              else{
                  console.log("파일을 선택하지 않았습니다");
                  return;
              }
              return;
        
             }
             else{     
              setPreview(file_list);
              console.log("file_list : " ,file_list );
              setCheck(true);}

          } else {
            setImgFile(null);
           }
           if(file && file.type.substring(0, 5) === "video"){
             console.log("비디오 파일 업로드 ");
             upload_videolist.push(file);
             setUploadvideo(upload_videolist);
             const create_url = URL.createObjectURL(file);
             video_list.push(create_url);
                      
              console.log("비디오 파일 추가");
              multi_list.push(create_url);
              setMultilist(multi_list);

             setVideolist(video_list);
             setVideo(true);
           
           }
           else{
            setVideoFile(null);
           }
  }
   }
   if(file_list.length !== 0 && video_list.length !== 0){
    console.log("사진 및 동영상 섞어서 업로드");
    setMutiload(true);
    setVideo(false);
    setCheck(false);
    setOneimg(false);
   }
  }



          const ExtendHandler =(data:boolean) =>{
            setExtend(data);
          }
          const SlidebeforeHandler =() =>{
            console.log("page :" , pagenumber ," ,multilist :" ,multilist);
            if(pagenumber !== 1){
            setPagenumber((preNum) => preNum-1);
            console.log("before :" , pagenumber);

            }
            else{
              console.log("슬라이드 인덱스 0번째 이전 화살표 동작 안되게");
              return;
            }

          }
          const SlidenextHandler =() =>{
            console.log("page :" , pagenumber ," ,multilist :" ,multilist.length);
            if(pagenumber-1 !== multilist.length-1){

              setPagenumber((preNum) => preNum+1);
              console.log("next :" , pagenumber);
            }
            else{
              console.log("슬라이드 인덱스 마지막 다음 화살표 동작 안되게");
              setRightactive(true);
              return;
            }
          }
          const imgDrag =(event:React.MouseEvent<HTMLImageElement>) =>{
            console.log("이미지 드래그 x:" , event.clientX);
            console.log("이미지 드래그 y:" , event.clientY);

          
            }

          
             const containRef = useRef<HTMLDivElement>(null);
             const[addimg , setAddimg]=useState<boolean>(false);
             const[secondmodal,setSecondmodal]=useState<boolean>(false);
             const [deletesecond,setDeletesecond]=useState<boolean>(false);
             const[final, setFinal] = useState<boolean>(false);
             const[initialpage,setInitialpage]=useState<boolean>(true);
             const [next,setNext]=useState<boolean>(false);
             const[mainbacks ,setMainbacks]=useState<boolean>(true);
          
          
             const nextHandler =() =>{
               console.log("다음");
               setNext(true);
          
               if(previewImg !== ""){
                console.log("한장 사진 넥스트");
                setNextone(true);
                setExtend(true);
                setOneimg(false);
                return;
               }
          
               else if(preview.length > 0 ){
                console.log("다수 사진 넥스트");
                console.log("변수 :" , check ,  oneimg, video);
                setNextmu(true);
                setExtend(true);
                setCheck(false);
                setLeftactive(false);
                setRightactive(true);
                setPagenumber(1);
                return;
               }
               else if(multilist.length >0){
                setMutiload(false);
               }
          
          
             }
          
          
             const backHandler =() =>{
              console.log("이전");
              setSecondmodal(true);
              setInitialpage(false);    
             }
          
             const secondHandler =() =>{
              console.log("취소 버튼1111");
              setSecondmodal(false);
              setDeletesecond(false);
              setFinal(false);
              
              
             }
             
             const closeModalHandler =(data:any) =>{
              console.log("closedata : " , data);
              if(multiupload == true){
                setMutiload(false);
                setPreview([]);
                setVideolist([]);
                setMultilist([]);
                props.onClose(false);
                //setMainbacks(false);
                return;
              }
              if(video == true){
                setVideo(false);
                setVideoFile(null);
                setVideolist([]);
                props.onClose(false);
                //setMainbacks((prevState:boolean) => prevState = false);
                return;
              }
              if(data == true){
                setMainbacks((prevState:boolean) => prevState = false);
                setCheck(false);
                setOneimg(false);
                setNext(false);
                setPreview([]);
                setPreviewImg("");
                setSecondmodal(false);
                props.onClose(false);
                return ;
                
              }
              if(previewImg !== ""){
                setCheck(false);
                setOneimg(false);
                setNext(false);
                setPreviewImg("");
                setSecondmodal(false);
                return;
          
              }
              else{
                setCheck(false);
                setOneimg(false);
                setNext(false);
                setPreview([]);
                setSecondmodal(false);
                return;
              }
              
             }
          
             const secondbackHandler =() =>{
              setExtend(false);
              if(previewImg !=="" && preview.length ==0){
                console.log("단일");
                setCheckone(true);
                setOne_before(<Fragment>
                  <div className="second_headers">
                    <div className="Second_img">
                  <img src="/image/left_arrow.png" onClick={backHandler}/>
                  </div>
                  <h2>사진</h2>
                  <div className="Second_btn">
                  <button type="button" onClick={nextHandler}>다음</button>
                  </div>
                  </div>
                  <div className="second_Horizantal">
                    <hr />
                  </div>
                <div className="one_img" ref={containRef}>
                  <img src={previewImg} //onMouseMove={imgDrag} 
                  //onMouseDown={mouseDown}
                  //onMouseUp={mouseSetup}     
                  //onClick={imageclick}
                  draggable="true"     
                  />
                </div>
                </Fragment>);
          
                setNext(false);
                setOneimg(true);
              }
          
              if(preview.length !==0){
                console.log("다수 사진")
                setCheck(true);
                setCheckmu(true);
                setNext(false);
              }
             }
             /*
                                  <Swiper
                       centeredSlides={true} //가운데 정렬
                       slidesPerView={1} //한 슬라이드에 보여줄 갯수
                       spaceBetween={0} //슬라이드간 거리
                       navigation // 이동 화살표
                       scrollbar={{ draggable: true }}
                      pagination={{
                       clickable: true,
                      }}
                    >
                     {preview.map((image , id) => (
                    <SwiperSlide key={id}><img  src={image}></img></SwiperSlide>
                    ))}
                    </Swiper>
                    */
             //{addimg && ((<Multipicture img={previewImg} add_img={addimgHandler}/>))}
             /*
                               <div className={Clesses.pluspicture}>
                            <img onClick={addimagHandler} src="/image/add_picture.png"/>
                            </div>
          
                            <img src={previewImg} //onMouseMove={imgDrag} 
                            //onMouseDown={mouseDown}
                            //onMouseUp={mouseSetup}     
                            //onClick={imageclick}
                            draggable="true"     
                            />
                            */
                const[islocalform , setIslocalform]=useState<boolean>(false);
                const local_search = islocalform ? "se_possible": "se_impassible";

                useEffect(() =>{
                  console.log("위치 검색 완료 ");
                   if(uploadlocal !== ""){
                    console.log("위치 검색 완료 ");
                    setIslocalform(true);
                   }
                },[islocalform, uploadlocal]);

                const LocationdataHandler =(info:any) =>{
                  setLocation(false);
                  console.log("최종 위치 데이타 :" , info.content);
                  setLocaldata(info);
                  setUploadlocal(info.content);
                      }

                const localHandler =() =>{
                  setLocation(true);
                }

                     const CancelHandler =() =>{
                      console.log("test");
                       if(check == true){
                         console.log("test1");
                         setDeletesecond(true);
                         setIsSecondmodal(false);
                         setLeftactive(false);
                         setRightactive(false);
                         
                       }
                       else if(oneimg == true){
                         console.log("test2");
                         setDeletesecond(true);
                         setIsSecondmodal(false);
                         
                       }
                       else if(check == false && oneimg == false && next == false && 
                        video == false && multiupload == false){
                         console.log("모든 데이터 삭제");
                         //setMainbacks((prevState:boolean) => prevState = false);
                         setOne_before(<p></p>);
                         setMu_before(<p></p>);
                         setCheck(false);
                         setCheckone(false);
                         setCheckmu(false);
                         setOneimg(false);
                         setSecondmodal(false);
                         props.onClose(false);
                         
                       }
                       else if(next == true){
                         console.log("test4");
                         setFinal(true);
                       }
                       else if(video == true){
                         console.log("비디오 데이터 삭제");
                         setSecondmodal(true);
                         console.log("동영상 컴포넌트 : " , video);
                       }
                       else if(multiupload == true){
                         console.log("멀티 창 취소");
                         setSecondmodal(true);
                         
                       }
                      }
                      const main:any = extend ? "Content_extend" : "Contents_Main";


                      useEffect(() =>{
                       console.log("포인트 이펙트!");
                       if(pagenumber == 1){
                        console.log("처음 페이지");
                        setLeftactive(false);
                       setRightactive(true);
                       }
                       else if(pagenumber == multilist.length){
                        console.log("마지막 페이지")
                        setRightactive(false);
                        setLeftactive(true);
                       }
                       else if(pagenumber !== multilist.length && pagenumber !== 1){
                        console.log("페이지 중간");
                        setLeftactive(true);
                        setRightactive(true);
                       }

                      },[leftactive , rightactive , pagenumber])

            const[textArea , setTextArea]=useState<string>("");
            const FirstPageHandler =() =>{
             setMutiload(false);
             setPreview([]);
             setVideolist([]);
             setMultilist([]);

            }
            const upload =() =>{
              console.log("파일 업로드 일상공유하기");
              console.log("파일 업로드 submit");
              
              let access_token:string="";          
              access_token = localStorage.getItem("a_id")!;
              console.log("access token :" , access_token);
              axios.defaults.headers.common['Authorization'] = access_token;
              axios.get("http://localhost:8080/Pets-social/acccheck")
              .then(response =>{
                 console.log("응답 결과 확인 " , response.data);
                if(response.status == 200){
                  console.log("토큰 인증 성공");
                  
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
              const filedata = new FormData();
               
              if(uploadFile !== null && uploadFile !== undefined){
               console.log("length :" , uploadFile.length);
               for(let count=0; count<uploadFile.length;count++){
                 filedata.append("UploadFile" , uploadFile[count]);
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

             axios.post("http://localhost:8081/Pets-social/Fileupload" , filedata,
             {headers:{"Content-Type": "multipart/form-data", /*"Authorization":access_token ,*/"processData":false , "contentType":false} })
             .then((response) =>{
               console.log("response :" , response);
               props.onComplete();
             })
            }
            const textHandler =(e:React.ChangeEvent<HTMLTextAreaElement>) =>{
              console.log("text :" , e.target.value)
              setTextArea(e.target.value);
            }

            const opendkind =() =>{
               console.log("공개 범위 설정 및 광고");
               if(openactive == false) setOpenavtive(true);
               else setOpenavtive(false);
            }

            const clicklist =(event:React.MouseEvent<HTMLLIElement>) =>{
              console.log("click :" , event.currentTarget.innerText);
              setOpenkind(event.currentTarget.innerText);
              setOpenavtive(false);
            }
   
            const CloseHandler =() =>{
              props.onComplete();
            }
            const videoInitial =() =>{
           setVideo(false);
           setVideolist([]);
            }

    return(<div className="MainBackDrop" onClick={CancelHandler}>
            <div className={main} onClick={(e) => e.stopPropagation()}>
            
            {multiupload && (<MultiUpload Img_List={preview} Video_List={videolist} 
            Multi_List={multilist} Initilalize={FirstPageHandler}
            Next={ExtendHandler} nickname={props.nickname} img={props.img} origin={uploadFile} 
            close={CloseHandler}/>)}
            {video && (<Video  Next={ExtendHandler} Video_List={videolist} img={props.img} 
            nickname={props.nickname} origin={uploadvideo}
            sizecheck={sizecheck} close={CloseHandler} Initilalize={videoInitial}/>)}
           
            {(check == true && checkmu== true)  && (<Fragment>
                  <div className="second_headers">
                    <div className="Second_img">
                  <img src="/image/left_arrow.png" onClick={backHandler}/>
                  </div>
                  <h2>사진</h2>
                  <div className="Second_btn">
                  <button type="button" onClick={nextHandler}>다음</button>
                  </div>
                  </div>
                  <div className="second_Horizantal">
                    <hr />
                  </div>
          
                  <>
                     {(leftactive == false && rightactive == true) && ( <div className="second_slide_right">
                       <img src="/image/slideright.png" onClick={SlidenextHandler} id={right_active} />
                     </div>)}
                     {(leftactive == true && rightactive == true) && (<>
                       <div className="second_slide_left">
                        <img src="/image/slideleft.png" onClick={SlidebeforeHandler} id={left_active} />
                       </div>
                       <div className="second_slide_right">
                       <img src="/image/slideright.png" onClick={SlidenextHandler} id={right_active} />
                        </div>
                     </>)}
                       {(leftactive == true && rightactive == false) && (<div className="second_slide_left">
                           <img src="/image/slideleft.png" onClick={SlidebeforeHandler} id={left_active} />
                        </div>)}
                      {(leftactive == true && rightactive == false) && (<div className="second_slide_left">
                        <img src="/image/slideleft.png" onClick={SlidebeforeHandler} id={left_active} />
                       </div>)}
                      <div style={{width:"40vw" ,height:"72vh",
                         display:"flex", flexDirection:"row", marginTop:"-5px", overflow:"hidden"}}>

                     {preview.map((img, id) =>(<div style={{width:"40vw" ,height:"72vh",
              transition:"all 0.3s ease-in-out" ,
              transform:`translateX(${(pagenumber-1)* -40+"vw"})`, marginTop:"-5px"}}>
                <img src={img} key={id} style={{width:"40vw" ,height:"72vh" , objectFit:"fill" ,
                  borderBottomLeftRadius:"20px",borderBottomRightRadius:"20px"
                }}/>
                </div>))}
                </div>
                     </>                    
                     </Fragment>)}
      {(oneimg == true && checkone == true ) && one_before}
      {next && ( <>
        <div className="upload">
          <div className="upload_img">
              <img src="/image/left_arrow.png" onClick={secondbackHandler}/>
           </div>
            <h2>올리기</h2>
            <div className="upload_btn">
              <button type="submit"  onClick={upload}>공유하기</button>
            </div>                     
        </div>
            <div className="upload_Horizantal">
              <hr />
            </div>
        <div className="textbody">
           {nextone && (<>
            <img src={previewImg} /> 
              </>)}
          {nextmu && (<div className="Nimg">
            {(leftactive == false && rightactive == true) && ( <div className="second_slide_right">
              <img src="/image/slideright.png" onClick={SlidenextHandler} id={right_active} />
              </div>)}
              {(leftactive == true && rightactive == true) && ( <>
              <div className="second_slide_left">
               <img src="/image/slideleft.png" onClick={SlidebeforeHandler} id={left_active} />
              </div>
              <div className="second_slide_right">
              <img src="/image/slideright.png" onClick={SlidenextHandler} id={right_active} />
              </div>
              </>)}
              {(leftactive == true && rightactive == false) && (<div className="second_slide_left">
               <img src="/image/slideleft.png" onClick={SlidebeforeHandler} id={left_active} />
              </div>)}
              {(leftactive == true && rightactive == false) && (<div className="second_slide_left">
               <img src="/image/slideleft.png" onClick={SlidebeforeHandler} id={left_active} />
              </div>)}
              <div style={{width:"40vw" ,height:"72vh",
              display:"flex", flexDirection:"row", marginTop:"-5px", overflow:"hidden"}}>

                {preview.map((img, id) =>(<div style={{width:"40vw" ,height:"72vh",
              transition:"all 0.3s ease-in-out" ,
              transform:`translateX(${(pagenumber-1)* -40+"vw"})`, marginTop:"-5px",}}>
                <img src={img} key={id} style={{width:"40vw" ,height:"72vh" , objectFit:"fill" ,
                  borderBottomLeftRadius:"20px",borderBottomRightRadius:"20px"
                }}/>
                </div>))}
                </div>
          </div>)}
          <div className="Last_vertical">
              <hr />
          </div>
          </div> 
          {/* 병신아 */}
            <div className="upload_side"> 
              <img src ={props.img} />
              <h3>{props.nickname}</h3>
              <div className="open">
               <div className="bts">
                 <button type="button" onClick={opendkind}>{openkind}</button>
              </div>
              {openactive && (<div className="openlist">
               <ul>
                {opendlist.map((list) =>(<>
                <li onClick={clicklist} key={list}>{list}</li>
                </>))}
               </ul>
              </div>)}
              </div>
            </div>
            <div className="insert_contents">
           <textarea placeholder="당신의 일상을 올려보세요" onChange={textHandler}/>
           <input  placeholder="위치 검색"
           ref={inputref}
           onClick={localHandler}
           value={uploadlocal}
           disabled={islocalform}
           id="local"
          />
           <input placeholder="지인 추가 검색"/>
           </div>
        </>)}
       {location && (<KaMap onData={LocationdataHandler}/>)}
       {final && (<SecondModals onClose={secondHandler} ondelete={closeModalHandler} 
      isopen={isSecondmodal}
      isinitila={initialpage}/>)}
      {deletesecond && (<SecondModals onClose={secondHandler} ondelete={closeModalHandler} 
      isopen={isSecondmodal}
      isinitila={initialpage}/>)}
      {secondmodal && (<SecondModals onClose={secondHandler} ondelete={closeModalHandler} 
      isopen={isSecondmodal} 
      isinitila={initialpage}/>)}
      {(oneimg == true && checkone == false ) && (<>
        <div className="second_headers">
          <div className="Second_img">
        <img src="/image/left_arrow.png" onClick={backHandler}/>
        </div>
        <h2>사진</h2>
        <div className="Second_btn">
        <button type="button" onClick={nextHandler}>다음</button>
        </div>
      </div>
       <div className="second_Horizantal">
        <hr />
       </div>
      <div className="one_img">
      <img src={previewImg} 
        draggable="true" 
        />
      </div>
      </>)}
      {(check == true && checkmu== false)  && ((<>
        <div className="second_headers">
          <div className="Second_img">
        <img src="/image/left_arrow.png" onClick={backHandler}/>
        </div>
        <h2>사진</h2>
        <div className="Second_btn">
        <button type="button" onClick={nextHandler}>다음</button>
        </div>
      </div>
      <div className="second_Horizantal">
        <hr />
       </div>
       {(leftactive == false && rightactive == true) && ( <div className="Upload_slide_right">
              <img src="/image/slideright.png" onClick={SlidenextHandler} id={right_active} />
              </div>)}
              {(leftactive == true && rightactive == true) && ( <>
              <div className="Upload_slide_left">
               <img src="/image/slideleft.png" onClick={SlidebeforeHandler} id={left_active} />
              </div>
              <div className="Upload_slide_right">
              <img src="/image/slideright.png" onClick={SlidenextHandler} id={right_active} />
              </div>
              </>)}
              {(leftactive == true && rightactive == false) && (<div className="Upload_slide_left">
               <img src="/image/slideleft.png" onClick={SlidebeforeHandler} id={left_active} />
              </div>)}
              {(leftactive == true && rightactive == false) && (<div className="Upload_slide_left">
               <img src="/image/slideleft.png" onClick={SlidebeforeHandler} id={left_active} />
              </div>)}
              <div style={{width:"40vw" ,height:"72vh",
              display:"flex", flexDirection:"row", marginTop:"-1vh", overflow:"hidden"}}>

                {preview.map((img, id) =>(<div style={{width:"40vw" ,height:"72vh",
              transition:"all 0.3s ease-in-out" ,
              transform:`translateX(${(pagenumber-1)* -40+"vw"})`, marginTop:"-1vh"}}>
                <img src={img} key={id} style={{width:"40vw" ,height:"72vh" , objectFit:"fill" ,
                  borderBottomLeftRadius:"20px",borderBottomRightRadius:"20px"
                }}/>
                </div>))}
                </div>
           </>))}

            {(check == false && oneimg == false  && video == false && multiupload == false 
              && nextone == false && nextmu== false
            ) && (<>
        <div className="Contents_headers">
          <h2>게시물 올리기</h2>
            <div className="Contents_Horizantal">
              <hr />
            </div>
           </div>                      
           <label  
            draggable="true"
            className="Upload_picture"
            >
           <img src="/image/picture.png"/>
           <input type="file" 
           style={{display:"none"}}
           onChange={onChangeImg}
           multiple={true}
           accept=".jpg, .jpeg, .png , .mp4"
            />
           <h2>클릭 후 파일 업로드 하세요</h2>
          </label>
           </>)}
            </div>
           </div>)

}

export default UserUpload;
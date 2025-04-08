
import { Fragment,useEffect , useRef, useState } from "react";
import React from 'react';
import "./Video.scss";
import 'swiper/swiper-bundle.min.css'
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/swiper.min.css'
// modules styles
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import KaMap from "./KaMap"; //추후에 끌것이다
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SecondModals from "./SecondModals";

interface video_data{
    Next :(extend:boolean) => void;
    Video_List:string[];
    img:string;
    nickname:string;
    origin:string[];
    sizecheck:boolean;
    close:() => void;
    Initilalize:(check:boolean) => void;
}

interface ResponseDataType {
  message: string;
  code: number;
  response:object
}

const opendlist:string[]=["전체 공개" , "지인 공개" , "광고 공개"];

//SwiperCore.use([Navigation, Scrollbar , Autoplay]);
const Video =(props:video_data) =>{
    
    const[list_size , setList_size]=useState<boolean>(false); 
    const [video, setVideo] = useState<string[]>(props.Video_List);
    const [origin, setOrigin] = useState<string[]>(props.origin);
    const[firstpage,  setFirstpage]=useState<boolean>(false);
    const[nextpage,  setNextpage]=useState<boolean>(false);
    const [duration,setDuration]=useState<number | undefined>(0);
    const[isplaying, setIsplaying]=useState<boolean>(false);
    const[pagenumber , setPagenumber]=useState<number>(1);
    const[leftactive, setLeftactive]=useState<boolean>(false);
    const[rightactive, setRightactive]=useState<boolean>(false);
    const[test1, setTest1]=useState<boolean>(false);
    const[refcount, setRefcount]=useState<number>(0);
    const[textArea , setTextArea]=useState<string>("");
    const inputref = useRef<HTMLInputElement>(null);
    const [location, setLocation]=useState<boolean>(false);
    const[localdata , setLocaldata] = useState<any[]>([]);
    const[uploadlocal ,setUploadlocal]=useState<string>("");
    const[islocalform , setIslocalform]=useState<boolean>(false);
    const[openkind ,setOpenkind]=useState<string>("전체 공개");
    const[openactive , setOpenavtive]=useState<boolean>(false);
    const[tokencheck , setTokencheck]=useState<any>(false);    
    const[chunklist,setChunklist]=useState<any[]>([]);
    const[sizecheck,setSizecheck]=useState<boolean>(false);
    const[filesize, setFilesize]=useState<any[]>([]);
    const[filename, setFilename]=useState<string[]>([]);
    const[modal, setModal]=useState<boolean>(false);
    const[isSecondmodal , setIsSecondmodal]=useState<boolean>(false);
    const[initialpage,setInitialpage]=useState<boolean>(true);


    const list:any=useRef<null | HTMLVideoElement[]>([]);


    //추후에 영상 다듬기에 필요한 기능들
    const[playtime , setPlaytime]=useState<number>(0);
    const [test,setTest]=useState<any[]>([]);
    const videoref = useRef<HTMLVideoElement>(null);
    const secondvideoref = useRef<HTMLVideoElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);

    const utilsize = 1024*1024*10;
    let currentchunk:any=0;
    let chunkcount:any=0;
    const navigate = useNavigate();

    useEffect(() => {
        console.log("파일 리스트 갯수 :" , props.Video_List);

        if(props.Video_List.length ==1){
           console.log("바디오 파일 1개 ");
           setVideo(props.Video_List);
           setOrigin(props.origin);
           
           if(props.sizecheck == false){
               console.log("100MB 이하");
               
           }
           else{
              console.log("100MB 이상 업로드 ");
              setSizecheck(true);
              let totalchunk:number=0;
              let chunkcount:any[] = [...chunklist];
              let Size:any[]=[...filesize]
              let filenames:string[]=[...filename];
              origin.forEach((data) =>{
                console.log("파일 리스트:" , data);
                const file:any=data;
                //totalchunk = Math.ceil(file.size/utilsize);
                totalchunk=Math.round(file.size/utilsize);
                chunkcount.push(totalchunk);
                setChunklist(chunkcount);
                Size.push(file);
                setFilesize(Size);
                  filenames.push(file.name);
                  setFilename(filenames);
                
              })

           }
           
           /*
           let totalchunk:number=0;
           origin.forEach((data) =>{
             const file:any=data;
             console.log("test :" , file.size);
             totalchunk=Math.ceil(file.size/testsize);
             console.log("chuncksize :" , totalchunk);
             for(let i=0; i<totalchunk;i++){
                 console.log("loop");
                 const start=currentchunk*testsize;
                 const end=Math.min(start+testsize , file.size);
                 console.log("start :" , start);
                 console.log("end :" , end);
                 const chunk = file.slice(start,end);
                 console.log("chunk :" , chunk);
                 currentchunk++;

             }
           })
             */
           
           /*
           if(videoFile !== null && videoFile !== undefined){
            const currentimg = URL.createObjectURL(videoFile);
            let file_list:string[]=[...preview];
            file_list.push(currentimg);
            setPreview(file_list);

            
            let filereader = new FileReader();
            
            filereader.readAsDataURL(videoFile);
            
            if(filereader.readyState == 1){
                console.log("영상 미리보기 로딩 중");
                //setLoad(true);
            }
            
            filereader.onload =() =>{
                const preview =filereader.result;
                console.log("preview :" , preview);
                console.log("영상 미리보기 완료");
                setPreviewVideo([...previewvideo, preview]);
                //setLoad(false);
        }
        
    }
            */
        }
        else{
          console.log("바디오 파일 다수 ");
          setVideo(props.Video_List);
          setOrigin(props.origin);
          setList_size(true);
           if(props.sizecheck == false){
               console.log("100MB 이하");
               
           }
           else{
            setSizecheck(true);
              console.log("100MB 이상 업로드 ");
              let totalchunk:number=0;
              let chunkcount:any[] = [...chunklist];
              let Size:any[]=[...filesize]
              let filenames:string[]=[...filename];
              origin.forEach((data) =>{
                console.log("파일 리스트:" , data);
                const file:any=data;
                //totalchunk = Math.ceil(file.size/utilsize);
                if(file.size < utilsize){
                  console.log("10MB미만의 파일");
                  chunkcount.push(1);
                  setChunklist(chunkcount);
                  filenames.push(file.name);
                  setFilename(filenames);
                }
                else{
                  console.log("10MB이상의 파일");
                  totalchunk=Math.round(file.size/utilsize);
                  chunkcount.push(totalchunk);
                  setChunklist(chunkcount);
                  Size.push(file);
                  setFilesize(Size);
                  filenames.push(file.name);
                  setFilename(filenames);
                }

                
              })

           }
        }
        setFirstpage(true);
        setTest1(true);
    }, [video , origin]);

    console.log("filename :" , filename);
    console.log("chunk :" , chunklist);

    useEffect(() =>{
      if(pagenumber == 1 && video.length == 1){
        console.log("동영상 1개일 경우 그냥 넘긴다.");
        return;
      }

      if(pagenumber == 1){
       console.log("처음 페이지");
       console.log("ref :" , refcount);
       setLeftactive(false);
       setRightactive(true);
         if(test1 == true){
          console.log("list :" , list);
          list.current[0].play();
          if(refcount == 0){
            setRefcount(refcount+1);
            return;
          }
           return;
         }
       
      }
      
      else if(pagenumber == video.length){
       console.log("마지막 페이지");
       setRightactive(false);
       setLeftactive(true);
       
      }
      
      else if(pagenumber !== video.length && pagenumber !== 1){
       console.log("페이지 중간");
       setLeftactive(true);
       setRightactive(true);
       

      }

     },[leftactive , rightactive , pagenumber, refcount])

    const NextHandler =() =>{
        console.log("next");
        setFirstpage(false);
        setNextpage(true); 
        setDuration(videoref.current?.duration);
        props.Next(true);
    }
    const backHandler =() =>{
        console.log("back");
        setFirstpage(true);
        setNextpage(false);
        setIsplaying(false);
        props.Next(false);
    }

/*
             {!load && (preview.map((video, id) =>(<div className={Clesses.video} key={id}>   
                <video  autoPlay loop controls>
                    <source src={video}  type="video/mp4" />
                    </video>
            </div>)))}
            {load && (<div className={Clesses.load}>
                 <h3>영상 미리보기 로딩 중....</h3> 
               </div>)}
               */

      /*
                          <input type="range"  min="0" max="80" list="tickmarks" step="1"/>
                    <datalist id="tickmarks" className={Clesses.test}>
                       <option value="0">0s</option>
                       <option value="10" />
                       <option value="20" />
                       <option value="30" />
                       <option value="40" />
                       <option value="50">1</option>
                       <option value="60" />
                       <option value="70" />
                       <option value="80">2</option>
                    </datalist>
*/

 const clickHandler =(e:any) =>{
   if(playtime !==videoref.current?.duration && isplaying == false){
       console.log("계속 진행 중");
       secondvideoref.current?.play();
       setIsplaying(true);
     }
    else if(isplaying == true){
        secondvideoref.current?.pause();
        setIsplaying(false);
    }
 }

 const timeHandler =(e:React.ChangeEvent<HTMLVideoElement>) =>{
    console.log("current : " , secondvideoref.current?.currentTime);
    console.log("finishtime : " , e);
    let convert:string | undefined = secondvideoref.current?.currentTime.toString();
    let ft_number:string | undefined = convert?.split(".")[0];
    if(secondvideoref.current?.currentTime == secondvideoref.current?.duration){
        console.log("재생 시간 초기화");
        setPlaytime(playtime+1);
        console.log("last playtime :" , playtime);
        secondvideoref.current?.play();
    }
    else if(Number(ft_number) == playtime){
       console.log("1초가 아직 안지남");
    }
    else if(Number(ft_number) !== playtime){
        console.log("1초 단위 업데이트");
        setPlaytime(Number(ft_number));
        console.log("first :" , playtime);
    }
    
 };
 const timeHandlers =(e:React.ChangeEvent<HTMLVideoElement>) =>{
  
    console.log("시간 업데이트 :" , videoref.current);


    let convert:string | undefined = videoref.current?.currentTime.toString();
    let ft_number:string | undefined = convert?.split(".")[0];

    if(Number(ft_number) == playtime){
       console.log("1초가 아직 안지남");
    }
    else if(Number(ft_number) !== playtime){
        console.log("1초 단위 업데이트");
        setPlaytime(Number(ft_number));
        console.log("first :" , playtime);
        if(videoref.current ){
            let video = videoref.current as unknown as HTMLCanvasElement;
            
            
            const canvas_current = canvas.current;
            const content = canvas_current?.getContext("2d");
            content?.drawImage(video , 0,0, 50 ,150);
            const dataurl =canvas.current?.toDataURL(); 
            console.log("dataurl1", dataurl);
            setTest([...test , dataurl]);
           }
    }    
    
 };

      const SlidebeforeHandler =() =>{
      console.log("az :", pagenumber, video.length, refcount);
        if(pagenumber !== 1){
        setPagenumber((preNum) => preNum-1);

        if(pagenumber <= video.length){
          list.current[refcount-1].pause();
          list.current[(refcount-1)-1].play();
            console.log("이전 동영상 재생 카운트가 1인 경우");
            setRefcount(refcount-1);
        }
        }
        else{
          console.log("슬라이드 인덱스 0번째 이전 화살표 동작 안되게");
        }

      }
      const SlidenextHandler =() =>{
        console.log("page :" , pagenumber);
        if(pagenumber-1 !== video.length-1){
          setPagenumber((preNum) => preNum+1);
          console.log("next :" , pagenumber , video.length);
          if(pagenumber < video.length){
            list.current[refcount-1].pause();
            list.current[refcount].play();
            setRefcount(refcount+1);
          }
         
        }
        else{
          console.log("슬라이드 인덱스 마지막 다음 화살표 동작 안되게");
          setRightactive(true);
          
          return;
        }
        
      }

      const last_Slidebefore =() =>{
        console.log("page :" , pagenumber);
        if(pagenumber !== 1){
        setPagenumber((preNum) => preNum-1);
        console.log("before :" , pagenumber);
        }
        else{
          console.log("슬라이드 인덱스 0번째 이전 화살표 동작 안되게");
          return;
        }
      }
      const Last_Slidenext =() =>{
        console.log("page :" , pagenumber ," ,multilist :");
        if(pagenumber-1 !== video.length-1){
          //let inTostring:string="";
          //inTostring = (pagenumber-1).toString();
          //setSlidepoint(inTostring);
          setPagenumber((preNum) => preNum+1);
          console.log("next :" , pagenumber);
          //setRightactive(false);
        }
        else{
          console.log("슬라이드 인덱스 마지막 다음 화살표 동작 안되게");
          setRightactive(true);
          return;
        }
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
              console.log("비디오 파일 업로드 일상공유하기");
              console.log("비디오 파일 업로드 submit");
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

              if(sizecheck == true){
                console.log("100MB 이상 업로드 ");
                console.log("chunkcount :" , chunkcount);
                console.log("currentchunk :" , currentchunk);
                
                //TODU
                //list에 모든 chunk사이즈 저장했으니 인덱스마다 10MB씩 
                
                    let fewsize:number=0;
                    let chunk:any="";
                    const start = currentchunk * utilsize;
                    const end = Math.min(start + utilsize, filesize.at(chunkcount).size);
                    console.log("end :" , end);

                    if(filesize.at(chunkcount).size - end <  utilsize && filesize.at(chunkcount).size - end !== 0){
                        console.log("10MB이하 남은 용량");
                        fewsize = filesize.at(chunkcount).size - end;

                        chunk = filesize.at(chunkcount).slice(0, fewsize);
                        console.log("마지막 chunk :" , chunk);
                        const formData = new FormData();
                        formData.append("chunk" , chunk , filename[chunkcount]);
                      formData.append("chunkNumber" ,currentchunk);
                      formData.append("totalchunk" , chunklist[chunkcount]);
                      let local:any=localdata;
                      const location_info:any=JSON.stringify(local);
                      let list:any;
                      let count:any;
                      list =  chunklist.length;
                      count = chunkcount;
                      count++;
                      formData.append("text" ,textArea);
                      formData.append("location" , location_info);
                      formData.append("opendkind" , openkind);
                      formData.append("fileklist" , list);
                      formData.append("chunkcount" , count);
                      formData.append("tokencheck" , tokencheck);
      /*
                      let access_token:string="";          
                      access_token = localStorage.getItem("a_id")!;
                      console.log("access token :" , access_token);
      */
                      axios.post("http://localhost:8081/Pets-social/LargeUpload" , formData,
                        {headers:{"Content-Type": "multipart/form-data", /*"Authorization":access_token ,*/"processData":false , "contentType":false} })
                        .then((response) =>{
                          console.log("response :" , response);
                           if(response.status==200){
                            console.log("대용량 업로드 완료");
                            chunkcount++;
                            if(chunkcount == chunklist.length){
                              console.log("파일 업로드 성공");
                               return;
                            }
                            else{
                              console.log("다음 파일 업로드 ");
                              currentchunk=0;
                              Upload();
                            }

                          }
                            
                        })


                    }else{
                      if(chunklist[chunkcount] == 1){
                          console.log("저용량 파일 업로드");
                          chunk = filesize.at(chunkcount).slice(0, filesize.at(chunkcount).size);
                          console.log("chec :" , chunk);
                          const formData = new FormData();
                          formData.append("chunk" , chunk , filename[chunkcount]);
                          formData.append("chunkNumber" ,currentchunk);
                          formData.append("totalchunk" , chunklist[chunkcount]);
                          let local:any=localdata;
                          const location_info:any=JSON.stringify(local);
                          let list:any;
                          let count:any;
                          list =  chunklist.length;
                          count = chunkcount;
                          formData.append("text" ,textArea);
                          formData.append("location" , location_info);
                          formData.append("opendkind" , openkind);
                          formData.append("chunklist" , list);
                          formData.append("chunkcount" , count);
          /*
                          let access_token:string="";          
                          access_token = localStorage.getItem("a_id")!;
                          console.log("access token :" , access_token);
          */
                          axios.post("http://localhost:8081/Pets-social/LargeUpload" , formData,
                            {headers:{"Content-Type": "multipart/form-data", /*"Authorization":access_token ,*/"processData":false , "contentType":false} })
                            .then((response) =>{
                              console.log("response :" , response);
                               
                              if(response.status==206){
                                currentchunk++;                          
                                  console.log("업로드 컨틴뉴");
                                  Upload();
        
                              }
                              else if(response.status==200){
                                console.log("대용량 업로드 완료");
                                if(chunkcount)
                                chunkcount++;
                                currentchunk=0;
                                Upload();
                              }
                                
                            })
                      }
                      else{
                        chunk = filesize.at(chunkcount).slice(start, end);
                        const formData = new FormData();
                        formData.append("chunk" , chunk , filename[chunkcount]);
                        formData.append("chunkNumber" ,currentchunk);
                        formData.append("totalchunk" , chunklist[chunkcount]);
                        let local:any=localdata;
                        const location_info:any=JSON.stringify(local);
                        let list:any;
                        let count:any;
                        list =  chunklist.length;
                        count = chunkcount;
                        formData.append("text" ,textArea);
                        formData.append("location" , location_info);
                        formData.append("opendkind" , openkind);
                        formData.append("fileklist" , list);
                        formData.append("chunkcount" , count);
                        formData.append("tokencheck" , tokencheck);
        
                        axios.post("http://localhost:8081/Pets-social/LargeUpload" , formData,
                          {headers:{"Content-Type": "multipart/form-data", "processData":false , "contentType":false} })
                          .then((response) =>{
                            console.log("response :" , response);
                             
                            if(response.status==206){
                              currentchunk++;                          
                                console.log("업로드 컨틴뉴");
                                setTokencheck(true);
                                Upload();
      
                            }
                                
                            else if(response.status==200){
                              console.log("대용량 업로드 완료");
                              setTokencheck(true);
                              chunkcount++;
        
                            }
                              
                          }).catch(error =>{
                            if(axios.isAxiosError<ResponseDataType>(error)){
                                        console.log("error code: " , error);
                                        
                                        if(error.code=="ERR_BAD_REQUEST"){
                                          navigate("/error");
                                        }
                                        if(error.code == "ERR_NETWORK"){
                                          console.log("네트워크 에러 ");
                                          navigate("/error/ne_error");
                                          
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

                    }
              }

              else{
                
              const filedata = new FormData();
              console.log("100MB이하 파일 업로드");
              for(let count=0; count<origin.length;count++){
                console.log("video :" ,origin[count] );
                filedata.append("UploadFile" , origin[count]);
              }
              let local:any=localdata;
              const location_info:any=JSON.stringify(local);
              let id:any;
              id=localStorage.getItem("id");
              filedata.append("text" ,textArea);
              filedata.append("location" , location_info);
              filedata.append("opendkind" , openkind);
              filedata.append("id" , id);
             //Fileupload
              axios.post("http://localhost:8081/Pets-social/Fileupload" , filedata,
              {headers:{"Content-Type": "multipart/form-data", /*"Authorization":access_token ,*/"processData":false , "contentType":false} })
              .then((response) =>{
                console.log("response :" , response);

                if(response.status==200){
                  console.log("업로드 완료");
                  props.close();
                  return;
                  
                }
              }).catch(error =>{
                if(axios.isAxiosError<ResponseDataType>(error)){
                            console.log("error code: " , error.response?.status);
                            
                            if(error.code=="ERR_BAD_REQUEST"){
                              navigate("/error");
                            }
                            if(error.code == "ERR_NETWORK"){
                              console.log("네트워크 에러 ");
                              
                            }
                            if(error.response?.status==401){
                                console.log("승인되지 않은 로그인");
                            }
                            if(error.response?.status==500){
                              console.log("서버 에러발생");
                              navigate("/error/se-error")
                            }
                            
                            console.log("error response: " , error.response?.data);
                          }
            })


              }            
             }
    const second_backHandler =() =>{
      setNextpage(false);
      setFirstpage(true);
      props.Next(false);
    }
    const first_backHandler =() =>{
      setModal(true);
    }

    const cancelHandler  =() =>{
      console.log("취소 버튼");
      setModal(false);
      setInitialpage(true);
     }
     const closeModalHandler =(data:any) =>{
      console.log("closedata : " , data);
      if(nextpage == false){
          props.Initilalize(true);
      }
      else{
          console.log("처음 페이지로 이동");
          setNextpage(false);
      }
     }

    return(<Fragment>
         {modal && (<SecondModals  onClose={cancelHandler} ondelete={closeModalHandler} 
                     isopen={isSecondmodal}
                     isinitila={initialpage}/>)}
               {nextpage && (<>               
                    <div className="video_upload">
                       <div className="video_upload_img">
                        <img src="/image/left_arrow.png" onClick={second_backHandler}/>
                       </div>
                       <h2>업로드</h2>
                    <div className="video_upload_btn">
                      <button type="submit"  onClick={Upload}>공유하기</button>
                    </div>
                </div>   
                  <div className="upload_Horizantal">
                      <hr />
                  </div>
                  <div className="view">
                    {(list_size == false) && (video.map((video, id) =>( <div className="Firstvideo_upload" key={id}>   
                      <video  autoPlay loop ref={videoref}  src={video} >
                     </video>
                      </div>)))}
                    {(list_size == true) && ( <div className="second_Nimg">
                      {(leftactive == false && rightactive == true) && ( <div className="slide_right">
              <img src="/image/slideright.png" onClick={Last_Slidenext} />
              </div>)}
              {(leftactive == true && rightactive == true) && ( <>
              <div className="slide_left">
               <img src="/image/slideleft.png" onClick={last_Slidebefore} />
              </div>
              <div className="slide_right">
              <img src="/image/slideright.png" onClick={Last_Slidenext} />
              </div>
              </>)}
              {(leftactive == true && rightactive == false) && (<div className="slide_left">
               <img src="/image/slideleft.png" onClick={last_Slidebefore}/>
              </div>)}
              <div className="Video_slide_stand_upload">
                
                {video.map((video ,id) =>(<div style={{transition:"all 0.3s ease-in-out" ,
              transform:`translateX(${(pagenumber-1)* -40+"vw"})`,}}>
                <video  src={video} key={id} 
                  ref={(element) => list.current[id] = element}
                 />
                </div>))}
                </div>
                  </div>)}

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
                     </div>
                     
                  </>)}
               {location && (<KaMap onData={LocationdataHandler}/>)}
               {(firstpage == true  && list_size == false) && (<>
                 <div className="first_headers">
                    <div className="first_img">
                        <img src="/image/left_arrow.png" onClick={first_backHandler}/>
                    </div>
                     <h2>동영상</h2>
                    <div className="first_btn">
                      <button type="button"  onClick={NextHandler}>다음</button>
                    </div>
                </div>   
                  <div className="first_Horizantal">
                      <hr />
                  </div>
                   {video.map((video, id) =>( <div className="Firstvideo" key={id}>   
                      <video  autoPlay loop ref={videoref}  src={video}>
                     </video>
               </div>))}
                    </>)}
                    {(firstpage == true && list_size == true) &&(<>
                 <div className="first_headers">
                    <div className="first_img">
                        <img src="/image/left_arrow.png" onClick={first_backHandler}/>
                    </div>
                     <h2>동영상</h2>
                    <div className="first_btn">
                      <button type="button"  onClick={NextHandler}>다음</button>
                    </div>
                </div>   
                  <div className="first_Horizantal">
                      <hr />
                  </div>
                  
                  {(leftactive == false && rightactive == true) && ( <div className="slide_right">
              <img src="/image/slideright.png" onClick={SlidenextHandler} />
              </div>)}
              {(leftactive == true && rightactive == true) && ( <>
              <div className="slide_left">
               <img src="/image/slideleft.png" onClick={SlidebeforeHandler} />
              </div>
              <div className="slide_right">
              <img src="/image/slideright.png" onClick={SlidenextHandler} />
              </div>
              </>)}
              {(leftactive == true && rightactive == false) && (<div className="slide_left">
               <img src="/image/slideleft.png" onClick={SlidebeforeHandler}/>
              </div>)}
              <div className="Video_slide_stand">
                
                {video.map((video ,id) =>(<div style={{ transition:"all 0.3s ease-in-out" ,
              transform:`translateX(${(pagenumber-1)* -40+"vw"})`}}>
                <video  src={video} key={id} 
                  ref={(element) => list.current[id] = element}
                 />
                </div>
              ))}

                </div>
               </>)};
    </Fragment>)

}

export default React.memo(Video);
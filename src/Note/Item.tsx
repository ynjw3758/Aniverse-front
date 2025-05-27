//                            +--------------------
//----------------------------+ 외부 라이브로리
//                            +--------------------
//#region type  
import { useEffect, useRef, useState,useContext } from "react";
import axios from "axios";
import { useNavigate , useParams } from "react-router-dom";
//#endregion

//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type  
import "./Item.scss";
import BaseLoading from "../LoadPage/BaseLoading";
import user_info from "../Context/Userdata";
//#endregion

//                            +--------------------
//----------------------------+ props 타입
//                            +--------------------
//#region type 
type tag_info={
tag:Object,
name:string,
size:number,
DeleteList:string[],
alldelete:(isdelete:boolean) => void,
saveNote:(isType:string) => void,
onData:(data:string[]) => void,
onLoading:(isloding:boolean) => void
}
//#endregion

//                             +--------------------
//-----------------------------+   에러 인터페이스
//                             +--------------------
//#region type
interface ResponseDataType {
  message: string;
  code: number;
  response:object
}
//#endregion

const Item =(props:tag_info) =>{

  const [allCheck , setAllCheck] = useState<boolean>(false);
  const[isdelete, setIsdelete]=useState<boolean>(true);
  const[isSave , setIsSave]=useState<boolean>(false);
  const[size , setSize]=useState<number>(/*props.size*/0);
  const[name, setName]=useState<string>(props.name);
  const[deletelist ,setDeletelist]=useState<string[]>(props.DeleteList);
  const[loading, setLoading]=useState<boolean>(false);
  const[selectname ,setSelectname]=useState<string>("받은 쪽지");

  
//                             +--------------------
//-----------------------------+   전역 변수
//                             +--------------------
//#region type
  let checkdata:boolean= false;
  const param=useParams();
  const navigate = useNavigate();
  const saveNote:any = isSave ? "NoteItems_selbtn" : "NoteItems_btn"; 
  const selectList = ["받은 쪽지" , "보낸 쪽지"];
  const login_info = useContext(user_info);
//#endregion


//                             +--------------------
//-----------------------------+   useefect
//                             +--------------------
//#region type

useEffect(() =>{
  setSize(props.size);
},[props.size])

useEffect(() =>{
  console.log("선택 이름 :" , props.name);
  if(props.name =="receive"){
    setName("받은 쪽지");
    setIsSave(false);
    setSelectname("받은 쪽지");
  }
  else if(props.name =="send"){
    setName("보낸 쪽지");
    setIsSave(false);
    setSelectname("보낸 쪽지");
  }
  else if(props.name =="save"){
    setName("보관 쪽지");
    setIsSave(true);
    props.saveNote(selectname);
  }
  else if(props.name =="spam"){
    setName("스팸 쪽지");
    setIsSave(false);
    setSelectname("받은 쪽지");
  }
  setSize(props.size);
},[props.name ]);

useEffect(() =>{
 console.log("기본으로 시작되는 상태 :" , deletelist);
 const delete_length:string[]= props.DeleteList;
 console.log("사이즈 체크 :" , size , ", item :" ,delete_length.length );
 if(delete_length.length !==0 && delete_length.length !== size) {
  setIsdelete(false);
  return;
 }
 if(delete_length.length == size && size !==0 &&delete_length.length !== 0 ){
     setAllCheck(true);
     setIsdelete(false);
 }
 else setAllCheck(false);
},[props.DeleteList])
//#endregion

  const allcheckHandler =(e:React.ChangeEvent<HTMLInputElement>) =>{

    if(size ==0){
      e.target.checked = false;
      return;
    }
    if(allCheck == false){
      setAllCheck(true);
      checkdata= true;
      setIsdelete(false);
    }
    else{
      setAllCheck(false);
      checkdata== false;
      setIsdelete(true);
    }
    login_info.addcheck(checkdata);
  }


    const deleteHandler =() =>{
      setLoading(true);
      props.onLoading(loading);
      if(allCheck == true){
         let access_token:string="";
         access_token =localStorage.getItem("a_id")!;
         console.log("access : " , access_token);
         axios.defaults.headers.common['Authorization'] = access_token;
         axios.get("http://localhost:8080/Pets-social/acccheck")
               .then((response) =>{
                 if(response.status == 200){
                     console.log("토큰 인증 성공");
                     const id:string =param.userid! ;

                     axios.post("http://localhost:8082/Pets-social/Note/DeleteNote" , {params :{Id:id , type:"all" , 
                      Message:props.name, savetype:selectname}})
                     .then((response) =>{
                      console.log("결과 :" , response);
 
                      if(response.status == 200){
                        console.log("성공");
                        props.alldelete(false);
                        setIsdelete(true);
                        setAllCheck(false);
                        setSize(0)
                        props.size=0;
                        props.onData([]);
                      }
            
                     }).catch((error) =>{
                    if(axios.isAxiosError<ResponseDataType>(error)){
                        console.log("error code: " , error.response?.status);
                        
                        if(error.code=="ERR_BAD_REQUEST"){
                          navigate("/error");
                        }
                        if(error.code == "ERR_NETWORK"){
                          console.log("네트워크 에러 ");
                          
                        }
                        if(error.response?.status==500){
                          console.log("서버 에러발생");
                          navigate("/error/se-error")
                        }
                        
                        console.log("error response: " , error.response?.data);
                      }
                 })
            
                   }
                
       
               }).catch((error) =>{
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
      else {
        props.onLoading(loading);
        let access_token:string="";
        access_token =localStorage.getItem("a_id")!;
        console.log("access : " , access_token);
        axios.defaults.headers.common['Authorization'] = access_token;
        axios.get("http://localhost:8080/Pets-social/acccheck")
              .then((response) =>{
                if(response.status == 200){
                    console.log("토큰 인증 성공");
                    const id:string =param.userid! ;
                    
                    axios.post("http://localhost:8082/Pets-social/Note/DeleteNote" , {params:{List:props.DeleteList , 
                      Id:id, Message:props.name, Savetype:selectname , type:"select"}} )
                    .then((response) =>{
                     console.log("결과 :" , response);

                     if(response.status == 200){
                      const ItemData:string[] = response.data.resultdata;
                      const ItemSize:number = response.data.resultdata.length;
                      console.log("길이 :" , ItemSize);
                       console.log("성공");
                       //props.alldelete(false);
                       setIsdelete(true);
                       setAllCheck(false);
                       setSize(ItemSize);
                       setSize(response.data.resultdata.length);
                       console.log("길이2 :" , size);
                       props.onData(ItemData);
                     }
           
                    }).catch((error) =>{
                   if(axios.isAxiosError<ResponseDataType>(error)){
                       console.log("error code: " , error.response?.status);
                       
                       if(error.code=="ERR_BAD_REQUEST"){
                         navigate("/error");
                       }
                       if(error.code == "ERR_NETWORK"){
                         console.log("네트워크 에러 ");
                         
                       }
                       if(error.response?.status==500){
                         console.log("서버 에러발생");
                         navigate("/error/se-error")
                       }
                       
                       console.log("error response: " , error.response?.data);
                     }
                })
           
                  }
               
      
              }).catch((error) =>{
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

    const Change =(e:React.ChangeEvent<HTMLSelectElement>) =>{
      console.log("이벤트 발생 :" , e.target.value);
      setSelectname(e.target.value);
      props.saveNote(e.target.value);
    }

  


    
    return(<>
    <div className="NoteItems_kind">
      <input type="checkbox" checked={allCheck} onChange={allcheckHandler}/>
     <h3>{name}</h3>
     <h4>{size}</h4>
     {isSave && (<>
       <select className="NoteItems_select" onChange={Change} value={selectname}>
          {selectList.map((item) =>(
            <option value={item} key={item}>{item}</option>
          ))}
       </select>
     </>)}
     <button type="button" onClick={deleteHandler} disabled={isdelete} id={saveNote}>삭제</button>
    </div>
    </>)

}

export default Item;
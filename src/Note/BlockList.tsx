//                            +--------------------
//----------------------------+ 외부 라이브로리
//                            +--------------------
//#region type 
import { useEffect, useState } from "react";
import { useNavigate , useParams } from "react-router-dom";
import axios from "axios";
//#endregion

//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import "./BlockList.scss";
import BlockItem from "./BlockItem";
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

//                            +--------------------
//----------------------------+ props 타입
//                            +--------------------
//#region type 
type List={
 Name:string[],
 onClose :() => void 
}
//#endregion

const BlockList =(props:List) =>{

//                            +--------------------
//----------------------------+ 상태 관리
//                            +--------------------
//#region type 
    const[allcheck ,setAllcheck]=useState<boolean>(false);
    const[itemcheck ,setItemcheck]=useState<boolean>(false);
    const[block ,setBlock]=useState<boolean>(false);
    const[change, setChange]=useState<boolean>(false);
    const[Listsize, setListsize]=useState<number>(0);
    const[name ,setName]=useState<string[]>([]);
    const[id ,setId]=useState<string[]>([]);
    const[times ,setTimes]=useState<string[]>([]);
    const[cancelList, setCancelList]=useState<Object[]>([]);
//#endregion

//                            +--------------------
//----------------------------+ 전역 변수
//                            +--------------------
//#region type 
    const Main = itemcheck ? "BlockList_cpmodal" : "BlockList_nothing";
    const navigate = useNavigate();
    const param=useParams();
//#endregion

useEffect(() =>{
    if(props.Name.length >0){
     console.log("사이즈 0아님");
     console.log("데이터 :" , props.Name);
        const list:string[] = props.Name;
        const userid:string[]=[...id];
        const nickname:string[]=[...name];
        const Time:string[]=[...times];
        setListsize(list.length);
        list.map((data) =>{
            Object.entries(data).map((key) =>{

                if(key.at(0) == "nickname"){
                    nickname.push(key[1]);
                    setName(nickname);

                }
                else if(key.at(0) == "id"){
                    userid.push(key[1]);
                    setId(userid);
                }
                else if(key.at(0) =="time" ){
                    Time.push(key[1]);
                    setTimes(Time);
                }
            })
        })
        setItemcheck(true);

    }
    else{
        console.log("차단한적이 없다");
        setItemcheck(false);
    }


},[props.Name])

    const checkHandler =(e:React.ChangeEvent<HTMLInputElement>) =>{

        if(allcheck == false){
            setAllcheck(true);
        }
        else{
            setAllcheck(false);
        }
    }

    const CloseHandler =() =>{
     props.onClose();
    }
    
    const selectchek =(data:any) =>{
        const List:Object[] = [...cancelList];
        List.push(data);
        setCancelList(List);
       
    }

    const Cancelblhandler =() =>{
        let access_token:string="";
        access_token =localStorage.getItem("a_id")!;
        console.log("access : " , access_token);
        axios.defaults.headers.common['Authorization'] = access_token;
        axios.get("http://localhost:8080/Pets-social/acccheck")
        .then(response =>{
           console.log("응답 결과 확인 " , response.data);
          if(response.status == 200){
            console.log("토큰 인증 성공");
            setName([]);
            setId([]);
            axios.post("http://localhost:8082/Pets-social/CancelBlock" , cancelList)
            .then((response) =>{
             console.log("결과 :" , response.data.resultdata);
             const list:string[] = response.data.resultdata;
             const userid:string[]=[...id];
             const nickname:string[]=[...name];
             setListsize(list.length);
             list.map((data) =>{
                 Object.entries(data).map((key) =>{
     
                     if(key.at(0) == "nickname"){
                         nickname.push(key[1]);
                         setName(nickname);
     
                     }
                     else if(key.at(0) == "userid"){
                         userid.push(key[1]);
                         setId(userid);
                     }
                 })
             })
             setItemcheck(true);

   
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

    const allblockHandler =(e:React.ChangeEvent<HTMLInputElement>) =>{
        setBlock(true);
        
    }

    const ApplyHandler =() =>{
        let access_token:string="";
        access_token =localStorage.getItem("a_id")!;
        console.log("access : " , access_token);
        axios.defaults.headers.common['Authorization'] = access_token;
        axios.get("http://localhost:8080/Pets-social/acccheck")
              .then((response) =>{
                if(response.status == 200){
                    console.log("토큰 인증 성공");
                    const id:string =param.userid! ;

                    axios.post("http://localhost:8080/Pets-social/AllBlock" , {Id:id , Type:block})
                    .then((response) =>{
                     console.log("결과 :" , response);

                     if(response.status == 200){
                       console.log("성공");
                       setChange(true);
                       setBlock(false);


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

    const close =() =>{
      setChange(false);
    }


    return(<div className={Main}>
          {change && (<div className="BlockList_change">
            <p>변경되었습니다</p>
            <button onClick={close}>닫기</button>
          </div>)}
            <p>쪽지 수신거부 설정</p>
            <div className="BlockList_Line">
                <hr />
            </div>
            <div className="BlockList_title">
            <input type="checkbox" checked={allcheck} onChange={checkHandler}/>
            <p>{`수신 거부 목록(${Listsize}명)`}</p>
            <h4>날짜</h4>
            </div>
            <div className="BlockList_bottomLine">
                <hr />
            </div>
            {itemcheck && (<div className="BlockList_ItemList">
                {id.map((data, i) =>(<>
                <BlockItem Nickname={name[i]} Id={data} onChecked={allcheck} onselect={selectchek} time={times[i]}/>
                </>
            ))}
            </div>)}
            <div className="BlockList_btn">
              <button onClick={Cancelblhandler}>거부 해제</button>
              <div className="BlockList_bottom">
                <hr />
               </div>
              <div className="BlockList_allBlock">
                <input type="checkbox"  onChange={allblockHandler} checked={block}/>
                <p>모든 쪽지 수신을 거부합니다.</p>
                <button onClick={ApplyHandler}>적용하기</button>
              </div>
            </div>
            <div className="BlockList_close">
                <button onClick={CloseHandler}>닫기</button>
            </div>
            

    </div>)
}

export default BlockList
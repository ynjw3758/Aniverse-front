//                             +--------------------
//-----------------------------+   외부부라이브러리리
//                             +--------------------
//#region type
import {Oval} from "react-loader-spinner";
import { Fragment, useEffect, useState ,useContext} from "react";
//#endregion

//                             +--------------------
//-----------------------------+   내부라이브러리리
//                             +--------------------
//#region type
import "./SearchTagItem.scss";
import SearchTagList from "./SearchTagList";
//#enfregion

//                             +--------------------
//-----------------------------+   타입
//                             +--------------------
//#region type
type Searchlist = {
    List:object[],
    addName:(data:string, profile:string) =>void
    }
//#endregion
const SearchTagItem =(props:Searchlist) =>{
      const[nickname , setNickname]=useState<string[]>([]);
      const[profile , setProfile]=useState<string[]>([]);
      const[userid ,setUserid]=useState<string[]>([]);
      const[isdata, setIsdata] = useState<boolean>(false);
      const[isloading, setIsloading]=useState<boolean>(true);
      const[nothing, setNothing]=useState<boolean>(false);
      const[total, setTotal]=useState<number>(0);
      useEffect(() =>{
        const data_list:object[] = props.List;
        let Userid:string[]=[...userid];
        let nicknames:string[] = [...nickname];
        let prfile:string[]=[...profile]; 
        console.log("결과 데이터 :" ,props.List.length )
        
        if(data_list.length != 0){
          setTotal(props.List.length);
          setIsdata(true);
          data_list.map((data) =>{
            Object.entries(data).map((key) =>{

              if(key.at(0) == "nickname"){
                nicknames.push(key[1]);
                setNickname(nicknames);
            }
            else if(key.at(0) == "img"){
              if(key.at(1) == ""){
                prfile.push("/image/baseimg.png");
  
            }
            else{
                prfile.push(key[1]);
            }
            
            setProfile(prfile);
            }
            else if(key.at(0) == "id"){
              Userid.push(key[1]);
              setUserid(Userid);
            }
  
            })
          })

        }
        else{
          setIsloading(false);
          setNothing(true);
        }

        
    },[props.List])

    const Choose =(data:string, profile:string) =>{
    props.addName(data, profile);
    }
    const showdata =() =>{
      console.log("데이터를 보내준다");
      setIsloading(false);
    }
    const completeRendering =() =>{
      setIsloading(false);
      console.log("모든 데이터 렌더링 완료");
    }
return(<>
            {isloading && (<div className="Tag_Loding">
              <Oval 
                  color="#ff0000" 
                  height={20} 
                  width={20}
               />
            </div>)}
          <div className="SearchTagItem_Stand">
        {nothing &&(<div className="SearchTagItem_Nothing">
            <p>계정을 찾을 수 없습니다</p>
          </div>)}  
          {(isdata == true && isloading == true) && (<>
            {userid.map((value , i) =>{return (<div className="SearchTagItem_body_blur" id={value} >
            <SearchTagList Nickname={nickname[i]} Profile={profile[i]} 
            Userid={userid[i]} OnChoose={Choose} 
            count={i} total_size={total}/*focuse={props.Count}*/ onComplete={showdata}/>
            </div>)}    
            )} 
          </>)}
          {(isdata == true && isloading == false) && (<>
            {userid.map((value , i) =>{return (<>
            <SearchTagList Nickname={nickname[i]} Profile={profile[i]} 
            Userid={userid[i]} OnChoose={Choose} 
            count={i} total_size={total}/*focuse={props.Count}*/ onComplete={completeRendering}/>
            </>)}    
            )} 
          </>)}
         </div>

</>)
}

export default SearchTagItem;
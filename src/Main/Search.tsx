import { Fragment, useEffect, useState ,useContext} from "react";



import "./Search.scss";
import SearchList from "./SearchList";


//                             +--------------------
//-----------------------------+   타입
//                             +--------------------
//#region type
type Searchlist = {
  List:string[],
  Count:number,
  addName:(data:string, profile:string) =>void
  }
 //#endregion


const Search =(props:Searchlist) =>{
  const[nickname , setNickname]=useState<string[]>([]);
  const[profile , setProfile]=useState<string[]>([]);
  const[userid ,setUserid]=useState<string[]>([]);
  const[isdata, setIsdata] = useState<boolean>(false);


    useEffect(() =>{
        const data_list:string[] = props.List;
        let Userid:string[]=[...userid];
        let nicknames:string[] = [...nickname];
        let prfile:string[]=[...profile]; 
        console.log("결과 데이터 :" ,props.List.length )
        if(data_list.length != 0){
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
          setIsdata(false);
        }

        
    },[props.List])

    const Choose =(data:string, profile:string) =>{
    props.addName(data, profile);
    }
  return(<Fragment>
         <div className="Search_position">
          {isdata && (<>
            {userid.map((value , i) =>{return (<div className="Search_total_content" id={value} >
            <SearchList Nickname={nickname[i]} Profile={profile[i]} Userid={userid[i]} OnChoose={Choose} count={i} focuse={props.Count} />
            </div>)}    
            )} 
          </>)}
          {!isdata &&(<div className="Search_empty">
            <p>계정을 찾을 수 없습니다</p>
          </div>)}  
         </div>
  </Fragment>)}

export default Search;
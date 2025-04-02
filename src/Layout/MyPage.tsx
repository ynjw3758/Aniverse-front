import { Fragment, useState , useRef } from "react";
import "./MyPage.scss";



type Myinfo ={
    img:string,
    Dropdow:(data:boolean) => void,
    DropRef:(count:number) => void,
    DropBlur:(blur:boolean) => void,
}

const MyPage=(props:Myinfo) =>{
    const[before , setBefore] = useState<boolean>(true);
    //const[refcount , setRefcount] = useState<number>(0);
    //const[blur , setBlur] = useState<boolean>(false);


    const ListHandler =() =>{
        //드롭다운 활성화
        if(before == true){
            console.log("활성화");
            setBefore(false);
            //setRefcount(0);
            props.Dropdow(before);
            props.DropBlur(false);
            //props.DropRef(refcount);
        }
        //드롭다운 비활성화
        else{
            console.log("비활성화");
            setBefore(true);
            //setRefcount(1);
            //ref.current +=1; 
            props.Dropdow(before);
            props.DropBlur(true);
            //props.DropRef(refcount);
        }
    }

    const BlueHandler =(event: React.FocusEvent<HTMLButtonElement>) =>{
      console.log("blur :" , event.target.blur());
      setBefore(true);
      props.DropBlur(true);
      
    }


    return(<Fragment>
        <button className="nav" onClick={ListHandler} onBlur={BlueHandler}>
        <img src={props.img}/>
        </button>

        </Fragment>
    )
}

export default MyPage;
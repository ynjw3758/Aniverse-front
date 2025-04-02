import React, {useReducer} from "react";

type state ={
    type:string;
    value:string;
    isTouched :boolean;
}
type action ={type:'INPUT'; value:string} | 
             {type:'BLUR'; };

const inputaction ={
    type:"",
    value:"",
    isTouched :false,

};
type values ={
    value:string;
    isTourched:boolean;
}
const InputReducer =(state:values,action:state):any =>{
    if(action.type === 'INPUT'){
        return {value:action.value , isTouched:state.isTourched};
        //여기서 isTouched를 저렇게 설정한 이유는 입력이 다끝나지 않았기 때문에 이전에 상태를 그래도 이어간다. 
    }
    
    if(action.type ==='BLUR'){
      return{isTouched:true , value:state.value};
      //여기서 isTouched를 true로  설정한 이유는 사용자가 입력칸
      //을 건들렸다는 의미의므로 값과는 연관이 없다.
      //그래서 이전 상태의 값을 반환해준다.
    }
    
    return inputaction;
};


function UseHook(validdateValue: (inputState:string) =>boolean) {
    
    const[inputState,dispatch]=useReducer(InputReducer,inputaction);
    const valueValid=validdateValue(inputState.value);
       let hassError= !valueValid && inputState.isTouched; //true조건:true && true.
       const valueChangeHandler =(event:React.ChangeEvent<HTMLInputElement>) =>{
           dispatch({
               type: "INPUT",
               value: event.target.value,
               isTouched:inputState.isTouched
           });

   
         }
       const inputBlurHandler =(event:React.FocusEvent<HTMLInputElement>) =>{
           dispatch({
            type: "BLUR",
            value: inputaction.value,
            isTouched: inputState.isTouched
        });
           

           }  
       
   return {
       value:inputState.value, 
       hassError,
       isValid:valueValid,
       valueChangeHandler ,
       inputBlurHandler,
   };
}


export default UseHook;
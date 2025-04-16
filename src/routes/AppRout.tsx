import { Fragment } from "react";
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import MainHeader from "../Home/MainHeader";
import Main from "../Home/Main";
import Login from "../UserInfo/Login";
import Agree from "../Agree/Agree";
import Sign from "../UserInfo/Sign";
import MapinPage from "../Main/MainPage";
import Callbackkakao from "../SocialLogin/Callback_kakao";
import Not_found from "../Error_Page/Not_Found";
import Loginfind from "../Loginfind/Loginfind";
import Resetpassword from "../Loginfind/Resetpassword";
import Layout_Page from "../Error_Page/Layout_Page";
import Authorization_Page from "../Error_Page/Authorization_Page";
import PersionPage from "../Persion/PersionPage";
import MainPerson from "../Persion/MainPerson";
import MainContentsx from "../Main/MainContents";
import Kconnet from "../Loginfind/Kconnet";
import MainProfile from"../Profile/MainProfile";
import MainNote from "../Note/MainNote";
import Network from "../Error_Page/Network";
import ChatMain from "../Chat/ChatMain";
import Server_Error from "../Error_Page/Server_Error";
import Callback_Naver from "../SocialLogin/Callback_Naver";

const router = createBrowserRouter([
  {
    path:'/',
    element: <MainHeader />,
    errorElement:<Not_found />,
    children:[
      {path:'/' , element:<Main />},
      {path:'/login' , element:<Login />},
      {path:'/Agree' , element:<Agree />},
      {path:'/sign' , element:<Sign />},
      {path:'/find' , element:<Loginfind />},
      {path:"/reset" , element:<Resetpassword />},
      {path:"/link" , element:<Kconnet />}
    ]
    
  },
  {
    path:"/main",
    element:<MapinPage />,
    errorElement:<Not_found />,
    children:[
      {path:"/main/:userid" , element:<MainProfile />}
    ]

 },
 {
  path:"/main/person/",
  element:<PersionPage />,
  errorElement:<Not_found />,
  children:[
    {path:"/main/person/" , element:<MainPerson />}
  ]
},
{ path:"/main/Note/:userid",
  element:<MainNote />,
  errorElement:<Not_found />,

},


 { path:"/main/Chat/:userid",
   element:<ChatMain />,
   errorElement:<Not_found />,

 },
 
 {
   path:"/oauth/kakao",
   element:<Callbackkakao />
 },
 {
  path:"/oauth/naver",
  element:<Callback_Naver />
},
 
 
 {
    path:"/error",
    element:<Layout_Page />,
    errorElement:<Not_found />,
    children:[
      {path:"/error/auth/" , element:<Authorization_Page />},
      {path:"/error/se-error/" , element:<Server_Error />},
      {path:"/error/ne_error" , element:<Network />}
    ]
    
 },
 
  
])

export default function AppRouter (){
     return (
       <RouterProvider router={router} />
     )
}
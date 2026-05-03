import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../Home/LandingPage";
import ExplorePage from "../Home/Explore/ExplorePage";
import Login from "../UserInfo/Login";
import Agree from "../Agree/Agree";
import Sign from "../UserInfo/Sign";
import MainPage from "../Main/MainPage";
import Callbackkakao from "../SocialLogin/Callback_kakao";
import Not_found from "../Error_Page/Not_Found";
import Loginfind from "../Loginfind/Loginfind";
import Resetpassword from "../Loginfind/Resetpassword";
import Layout_Page from "../Error_Page/Layout_Page";
import Authorization_Page from "../Error_Page/Authorization_Page";
import PersionPage from "../Persion/PersionPage";
import MainPerson from "../Persion/MainPerson";
import Kconnet from "../Loginfind/Kconnet";
import MainProfile from "../Profile/MainProfile";
import MainNote from "../Note/MainNote";
import Network from "../Error_Page/Network";
import ChatMain from "../Chat/ChatMain";
import Server_Error from "../Error_Page/Server_Error";
import Callback_Naver from "../SocialLogin/Callback_Naver";
import ShowChatWrapper from "../Chat/ChatContents/ShowChatWrapper";
import GatewayError from "../Error_Page/GatewayError";
import BadRequest from "../Error_Page/BadRequest";
import WebSocket_Chat_Provider from "../Context/WebSocker_Chat_Provider";
import Landing_Gateway from "../Error_Page/Landing_Gateway";
import Landing_BadRequest from "../Error_Page/Landing_BadRequest";
import NotFound from "../Error_Page/NotFound";
import LbNotFound from "../Error_Page/LbNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <Not_found />,
  },
  {
    path: "/explore",
    element: <ExplorePage />,
    errorElement: <Not_found />,
  },
  {
    path: "/find",
    element: <Loginfind />,
    errorElement: <Not_found />,
  },
  {
    path: "/Agree",
    element: <Agree />,
    errorElement: <Not_found />,
  },
  {
    path: "/sign",
    element: <Sign />,
    errorElement: <Not_found />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Not_found />,
  },
  {
    path: "/reset",
    element: <Resetpassword Userid={""} />,
    errorElement: <Not_found />,
  },
  {
    path: "/link",
    element: <Kconnet />,
    errorElement: <Not_found />,
  },
  {
    path: "/main",
    element: <MainPage />,
    errorElement: <Not_found />,
    children: [
      {
        path: ":userid",
        element: <MainProfile />,
      },
    ],
  },
  {
    path: "/main/person",
    element: <PersionPage />,
    errorElement: <Not_found />,
    children: [
      {
        index: true,
        element: <MainPerson />,
      },
    ],
  },
  {
    path: "/main/Note/:userid",
    element: <MainNote />,
    errorElement: <Not_found />,
  },
  {
    path: "/main/Chat",
    element: <ChatMain />,
    errorElement: <Not_found />,
    children: [
      {
        path: ":chatRoomId",
        element: (
          <WebSocket_Chat_Provider>
            <ShowChatWrapper />
          </WebSocket_Chat_Provider>
        ),
      },
    ],
  },
  {
    path: "/oauth/kakao",
    element: <Callbackkakao />,
    errorElement: <Not_found />,
  },
  {
    path: "/oauth/naver",
    element: <Callback_Naver />,
    errorElement: <Not_found />,
  },
  {
    path: "/error",
    element: <Layout_Page />,
    errorElement: <Not_found />,
    children: [
      {
        path: "auth",
        element: <Authorization_Page />,
      },
      {
        path: "se-error",
        element: <Server_Error />,
      },
      {
        path: "ne_error",
        element: <Network />,
      },
      {
        path: "NoAccess",
        element: <Authorization_Page />,
      },
      {
        path: "Gateway",
        element: <GatewayError />,
      },
      {
        path: "BadRequest",
        element: <BadRequest />,
      },
      {
        path: "NotFound",
        element: <NotFound />,
      },
      {
        path: "LbGateway",
        element: <Landing_Gateway />,
      },
      {
        path: "LbBadRequest",
        element: <Landing_BadRequest />,
      },
      {
        path: "LbNotFound",
        element: <LbNotFound />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

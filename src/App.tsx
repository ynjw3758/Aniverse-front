import React, { Fragment } from 'react';
//import './App.css';
import AppRouter from './routes/AppRout';
import IdProvider from "./Context/Userdata_Provider";
import ShowChat_Provider from './Context/ShowChat_Provider';


function App() {
  return (
    <ShowChat_Provider>
     <IdProvider>
       <AppRouter />
     </IdProvider>
     </ShowChat_Provider>
  );
}

export default App;
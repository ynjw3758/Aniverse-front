import React, { Fragment } from 'react';
//import './App.css';
import AppRouter from './routes/AppRout';
import IdProvider from "./Context/Userdata_Provider";


function App() {
  return (
     <IdProvider>
       <AppRouter />
     </IdProvider>
  );
}

export default App;
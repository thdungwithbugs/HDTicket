import React from "react";

import "./index.css";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import reportWebVitals from "./reportWebVitals";
// import 'antd/dist/antd.min.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
//Real-time config
import * as signalR from '@aspnet/signalr'
import App from "./App";

// https://movienew.cybersoft.edu.vn/DatVeHub/
export const connection = new signalR.HubConnectionBuilder().withUrl("https://movienew.cybersoft.edu.vn/DatVeHub").configureLogging(signalR.LogLevel.Information).build();

connection.start().then(()=>{
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );

}).catch(err=>{
  console.log(err);
})



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

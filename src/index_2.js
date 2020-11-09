import React from "react";
import ReactDOM from "react-dom";
import DarkTheme, { createTheme } from 'react-dark-theme'
import "./index.css";
import App from "./App";
import Job from "./Job"
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import Counters from "./components/counters";
// import timeNow from "./components/timenow";

const lightTheme = {
    background: 'white',
    text: 'black',
  }
   
  const darkTheme = {
    background: 'black',
    text: 'white',
  }

const myTheme = createTheme(darkTheme, lightTheme)

ReactDOM.render(
  <div style={{ backgroundColor: myTheme.background, color: myTheme.text }}>
  <DarkTheme light={lightTheme} dark={darkTheme} />
    {/* <Counters /> */}
    {/* <timeNow /> */}
    {/*<App/>*/}
    { <Job/>}
  </div>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

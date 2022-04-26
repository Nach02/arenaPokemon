import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Stadium from "./components/stadium/stadium";


function App() {
  return (
  <div>
    <Route exact path="/" component={Stadium}/>
  </div>
  );
}
export default App;

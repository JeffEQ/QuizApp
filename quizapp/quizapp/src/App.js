import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./Quiz";

const App = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home></Home>}></Route>
      <Route path="/quiz" element={<Quiz></Quiz>}></Route>
    </Routes>
  );
};

export default App;

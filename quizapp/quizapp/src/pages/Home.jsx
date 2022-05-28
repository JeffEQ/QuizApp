import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../auth";
import "./styles/Home.css";

const Home = () => {
  const nameRef = useRef(null);
  let navigate = useNavigate();
  const [display, setDisplay] = useState("none");
  const [errMsg, setErrMsg] = useState("Please, insert a valid name.");

  const handleSubmit = (e) => {
    let name = nameRef.current.value;
    setDisplay("none");
    e.preventDefault();
    if (name === "") {
      setDisplay("");
      setErrMsg("Please, insert a valid name.");
    } else {
      fetch("http://localhost:4000/name/save", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setToken("user", res.data);
            navigate("/quiz");
          } else {
            setDisplay("");
            setErrMsg(res.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="App">
      <h1>Stock Symbol Quiz</h1>
      <p className={display}>{errMsg}</p>
      <div className="questionbox">
        <form onSubmit={handleSubmit}>
        <button type="submit">Enter your first name</button>
          <input type="text" ref={nameRef} />
          
        </form>
      </div>
    </div>
  );
};

export default Home;

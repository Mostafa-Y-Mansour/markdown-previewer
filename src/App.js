import "./App.css";
import React, { useState } from "react";
import { marked } from "marked";
import useLocalStorage from "./hooks/useLocalStorage";

const App = () => {
  // const [code, setCode] = useState("## Hello");
  const [code, setCode] = useLocalStorage("markdown", "## Hello"); // useLocalStorage custom hook for markdown key handling its initial value "## Hello"

  // const [compiled, setCompiled] = useState("<h2 id="hello">hello</h2>");
  const compiled = marked.parse(code); // it will parse the value from local storage when added

  const [hide, hidePreview] = useState(true);

  const openMD = () => {
    console.log(0);
    hidePreview(true);
  };

  const openPreview = () => {
    console.log(0);
    hidePreview(false);
  };

  const handleChange = (e) => {
    // set the value to local storage when the input is changed
    setCode(e.target.value);
  };

  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button onClick={openMD} className="btn">
            MarkDown
          </button>
          <button onClick={openPreview}>Preview</button>
        </div>
        {hide ? (
          <div>
            <textarea onChange={handleChange} value={code} />
          </div>
        ) : (
          <div>
            <textarea value={compiled} />
          </div>
        )}
      </div>
    </>
  );
};

export default App;

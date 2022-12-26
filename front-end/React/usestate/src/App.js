import "./App.css";
import { useState } from "react";

const App = () => {
  const  [inputValue, setInputValue] = useState("");
  const  [displayedValue, setDisplayedValue] = useState("");

  return (
    <div className="App">
      <div
        style={{
          padding: 10,
          marginBottom: 10
        }}
      >
        <input
          type={"text"}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            setDisplayedValue(e.target.value)
          }}
        />
        <input type={"button"} value={"submit"} onClick={() => {
          setInputValue("")
        }} />
      </div>
      <label
        style={{
          marginLeft: 10
        }}
      >
        {displayedValue}
      </label>
    </div>
  );
};

export default App;

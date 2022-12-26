import "./App.css";
import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [savedCounter, setSavedCounter] = useState(0);
  const [savedCounters, setSavedCounters] = useState([]);

  const handleOnSavedCounter = () => {
    const newValue = savedCounter + counter
    setSavedCounter(newValue);
    setCounter(0);
    setSavedCounters([...savedCounters, newValue]);
  };

  return (
    <div className="app">
      <div className="counter">
        <input
          type={"button"}
          value={"+"}
          onClick={() => {
            setCounter(counter + 1);
          }}
        />
        <label>{counter}</label>
        <input
          type={"button"}
          value={"-"}
          onClick={() => {
            setCounter(counter - 1);
          }}
        />
        <input
          type={"button"}
          value={"Save"}
          onClick={handleOnSavedCounter}
        />
        <label>{savedCounter}</label>
        <br />
      </div>
      <div>
        {savedCounters.map((saved, index) => index == savedCounters.length -1 ? 
            (<label key={index}> {saved}</label>) : (<label key={index}> {saved},</label>))
        }
      </div>
    </div>
  );
}

export default App;

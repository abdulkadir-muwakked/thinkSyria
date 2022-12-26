import { useState } from "react";
import "./App.css";
import Box from "./components/Box/Box";
import TodoList from "./components/TodoList/TodoList";


const App = () => {
  const [notes, setNotes] = useState([])
  const [input, setInput] = useState("")

  const check = (id) => {
    const newNotes = [...notes]
    const index = newNotes.findIndex((note) => note.id == id)
    newNotes[index].isCompleted = !newNotes[index].isCompleted
    setNotes([...newNotes])
  }

  const randomColor = () => {
    return {
      red: Math.random() * 256,
      green: Math.random() * 256,
      blue: Math.random() * 256
    };
  };
  return (
    <div className="App">
      <Box>
        <h1 className="header">what's the plan for today ?</h1>
        <div className="input-btn">
          <input
            type="text"
            id="todo-input"
            placeholder="Enter you todo item here..."
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <input type="button" value="add todo" id="todo-btn" 
          onClick={()=> {
            setNotes([...notes, {
              id: notes.length + 1,
              content: input,
              color: randomColor(),
              isCompleted: false
            }])
            setInput("")
          }}
          />
        </div>
        <TodoList
          items={notes}
          handelonCheked={check}
        />
      </Box>
    </div>
  );
};

export default App;

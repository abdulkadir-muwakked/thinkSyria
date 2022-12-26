import "./Todo.css";

const Todo = ({ id, text, color, isCompleted, handelonChekedFun }) => {
  const isLight = (color) =>
    (color.red * 299 + color.green * 587 + color.blue * 114) / 1000 > 155;

  return (
    <div  key={id} className="todo"
    style={{
        backgroundColor: `rgb(${color.red},${color.green}, ${color.blue})`,
        color: `${isLight(color) ? "black" : "white"}`,
    }}
    >
      <p
      style={{
        textDecoration: `${isCompleted ? "line-through" : "none"}`
      }}
      >{text}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <span class="material-symbols-outlined" onClick={()=> handelonChekedFun(id)}>done</span>
        <span class="material-symbols-outlined">delete</span>
      </div>
    </div>
  );
};

export default Todo;

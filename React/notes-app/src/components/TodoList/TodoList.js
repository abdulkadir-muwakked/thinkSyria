import "./TodoList.css";
import Todo from "../Todo/Todo";

const TodoList = ({ items, handelonCheked }) => {
  return (
    <div className="todo-list">
      {items.map((item) => (
        <Todo 
        id={item.id} 
        text={item.content} 
        color={item.color}
        isCompleted={item.isCompleted}
        handelonChekedFun={handelonCheked}
        />
      ))}
    </div>
  );
};

export default TodoList;

const input = document.getElementById("todo-input");
const btn = document.getElementById("todo-btn");
let todoesArr = [];
const list = document.querySelector("ul");

const randomColor = () => {
  return {
    red: Math.random() * 256,
    green: Math.random() * 256,
    blue: Math.random() * 256,
  };
};


btn.addEventListener("click", () => {
  const inputText = input.value.trim();
  if (inputText != "") {
    if(inputText.length < 20){
        const newTodoObj = {
            id: todoesArr.length,
            content: inputText,
            color: randomColor(),
            isDone: false,
          };
          todoesArr = [...todoesArr, newTodoObj] 
          //todoesArr.push(newTodoObj)
          display(todoesArr);
    }else{
        window.alert("The todo task should be less than 20 characters!")    
    }
  } else {
    window.alert("please Enter the todo task!")
  }
  input.value = "";
  
});

const setStorage = (todoes) => {
  localStorage.setItem("todoes", JSON.stringify(todoes));
};

const isLight = (color) =>
  (color.red * 299 + color.green * 587 + color.blue * 114) / 1000 > 155;

const display = (arr) => {
  list.innerHTML = "";
  const newRandomColor = randomColor();
  arr.map((item) => {
    list.innerHTML += `
        <li id="${item.id}" style="background-color: rgb(${item.color.red},${
      item.color.green
    }, ${item.color.blue})">
        <p style="color: ${
          isLight(item.color) ? "black" : "white"
        }; text-decoration: ${item.isDone ? "line-through" : "none"}">${
      item.content
    }</p>
        <div style="color: ${isLight(item.color) ? "black" : "white"} ">
          <span class="material-symbols-outlined" onclick="checkTodo(${
            item.id
          })">
            done
          </span>
          <span class="material-symbols-outlined" onclick="deleteTodo(${item.id})">
            delete
          </span>
        </div>
      </li>
        `;
  });
  setStorage(todoesArr);
};

const getStorage = () => {
  if (localStorage.getItem("todoes") != null)
    todoesArr = JSON.parse(localStorage.getItem("todoes"));
  display(todoesArr);
};

getStorage();

const deleteTodo = (id) => {
  const index = todoesArr.findIndex((item) => item.id == id);
  todoesArr.splice(index, 1);
  display(todoesArr);
};

const checkTodo = (id) => {
  const index = todoesArr.findIndex((item) => item.id == id);
  todoesArr[index].isDone = !todoesArr[index].isDone;
  display(todoesArr);
};

const refresh = () => {
    localStorage.clear();
    todoesArr = []
    display(todoesArr);
}


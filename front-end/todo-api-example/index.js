const input = document.getElementById("todo-input");
const btn = document.getElementById("todo-btn");
let todoesArr = [];
const list = document.querySelector("ul");

const getData = async () => {
  await fetch("https://jsonplaceholder.typicode.com/todos?userId=1")
    .then((res) => res.json())
    .then((data) => todoesArr.push(...data))
    .catch((err) => console.log(err));
};

await getData()

const randomColor = () => {
  return {
    red: Math.random() * 256,
    green: Math.random() * 256,
    blue: Math.random() * 256
  };
};


const transformerTodoes = (todoes) => {
  const transformeredArr = []
  let count = -1
  todoes.map(todo =>{
    transformeredArr.push({
      ...todo,
      id: ++count,
      color: randomColor()
    })
  })
  return transformeredArr;
}

todoesArr = transformerTodoes(todoesArr)




btn.addEventListener("click", () => {
  const inputText = input.value.trim();
  if (inputText != "") {
    const newTodoObj = {
      id: todoesArr.length,
      title: inputText,
      color: randomColor(),
      completed: false
    };
    todoesArr.push(newTodoObj);
  }
  input.value = "";

  console.log(todoesArr);
  display(todoesArr);
});

const setStorage = (todoes) => {
  localStorage.setItem("todoes", JSON.stringify(todoes));
};

const isLight = (color) =>
  (color.red * 299 + color.green * 587 + color.blue * 114) / 1000 > 155;

const display = (arr) => {
  list.innerHTML = "";
  arr.map((item) => {
    list.innerHTML += `
        <li id="${item.id}" style="background-color: rgb(${item.color.red},${
      item.color.green
    }, ${item.color.blue})">
        <p style="color: ${
          isLight(item.color) ? "black" : "white"
        }; text-decoration: ${item.completed ? "line-through" : "none"}">${
      item.title
    }</p>
        <div style="display:flex; flex-dircation: row
        color: ${isLight(item.color) ? "black" : "white"} ">
          <span class="material-symbols-outlined">
            done
          </span>
          <span class="material-symbols-outlined">
            delete
          </span>
        </div>
      </li>
        `;
  });
  setStorage(todoesArr);
};

display(todoesArr)

const getStorage = () => {
  if (localStorage.getItem("todoes") != null)
    todoesArr = JSON.parse(localStorage.getItem("todoes"));
  display(todoesArr);
};

//getStorage();

const deleteTodo = (id) => {
  const index = todoesArr.findIndex((item) => item.id == id);
  todoesArr.splice(index, 1);
  display(todoesArr);
};

const checkTodo = (id) => {
  console.log(id)
  const index = todoesArr.findIndex((item) => item.id == id);
  todoesArr[index].completed = !todoesArr[index].completed;
  display(todoesArr);
};


list.addEventListener("click",(event)=> {
  if(event.target.innerHTML.trim() == "done") {
    const id = event.path.find( el => el.tagName =="LI").id
    checkTodo(id)
  }
  if(event.target.innerHTML.trim() == "delete") {
    const id = event.path.find( el => el.tagName =="LI").id
    deleteTodo(id)
  }
} )


console.log(todoesArr)


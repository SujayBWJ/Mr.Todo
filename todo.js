const input = document.getElementById("todo-input");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todo-list");

const saved = localStorage.getItem("todos"); // saved will store the already exisiting todos from localStorage (if any)
const todos = saved ? JSON.parse(saved) : []; // if there are some todos existing, then parse it into json, if there aren't any, give me an empty array

function saveTodos() {
  localStorage.getItem("todos", JSON.stringify(todos)); // whatever there is in todos, convert it into string and save it
}

function createTodoNode(todo, index) {
  const li = document.createElement("list");

  // Creating checkbox to mark the tasks completed or not completed
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.checked = !!todo.completed; // !! will return exactly true or exactly false [completed -> true, not completed -> false]

  // when checkbox changes, update todo.completed to match it
  checkBox.addEventListener("change", () => {
    todo.completed = checkBox.checked;
    textSpan.style.textDecoration = todo.completed ? "line-through" : "";
    saveTodos();
  });

  // script for the to-do text
  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;
  textSpan.style.margin = "0 8px";
  if (todo.completed) {
    textSpan.style.textDecoration = "line-through";
  }

  textSpan.addEventListener("dblclick", () => {
    const newText = prompt("Edit todo", todo.text);
    if (newText !== null) {
      todo.text = newText.trim();
      textSpan.textContent = todo.text;
      saveTodos();
    }
  });

  // script for the delete button functionality
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", () => {
    todos.splice(index, 1); // go to the index and remove one element from it
    render();
    saveTodos();
  });

  li.appendChild(checkBox);
  li.appendChild(textSpan);
  li.appendChild(delBtn);
  return li;
}

function render() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const node = createTodoNode(todo, index); // take the returned list item from createTodoNode and store it in node
    list.appendChild(node); // append from the end into list
  });
}

// script to add more todos
function addTodo() {
  const text = input.value.trim(); // trim() is used to remove unnecessary spaces given by the user and make it a valid todo
  if (!text) return;

  todos.push({ text, completed: false }); // marks the added todo as "not completed" by default
  input.value = ""; // clears the input box when user hits enter or clicks add button
  render();
  saveTodos();
}

// script which defines the behavior of add button and enter event
addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") addTodo();
});
render();

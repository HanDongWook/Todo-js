const todoForm = document.getElementById("todo-form"),
      todoInput = todoForm.querySelector("input"),
      todoList = document.getElementById("todo-list"),
      TODOS_KEY = "todos"
      savedTodos = localStorage.getItem(TODOS_KEY);

let toDos = [];

function saveTodos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    saveTodos();
}

function drawTodo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;

    const span = document.createElement("span");
    span.innerText = newTodo.text;

    const button = document.createElement("button");
    button.innerText = "✅";

    li.appendChild(button);
    li.appendChild(span);
    button.addEventListener("click", deleteTodo);
    todoList.appendChild(li);   
}

function handleTodoSubmit(event) {
    event.preventDefault();
    const newTodo = todoInput.value;
    if (newTodo === "") return;

    const newTodoObject = {
        text: newTodo,
        id: Date.now()
    };
    toDos.push(newTodoObject);
    drawTodo(newTodoObject);
    saveTodos();
    todoInput.value = "";
}

todoForm.addEventListener("submit", handleTodoSubmit);

if (savedTodos !== null) {
    const parsedTodos = JSON.parse(savedTodos);
    toDos.push(...parsedTodos);
    parsedTodos.forEach(drawTodo);
}
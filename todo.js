const todoForm = document.querySelector("#list-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector("#todo-list");
const todoSpaces = document.querySelectorAll(".todo-space");



for (const todoSpace of todoSpaces) {
    todoSpace.addEventListener("dragover", dragOver);
    todoSpace.addEventListener("dragenter", dragEnter);
    todoSpace.addEventListener("dragleave", dragLeave);
    todoSpace.addEventListener("drop", dragDrop);
}





function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event){
    event.preventDefault();
    this.className += " hovered";
}

function dragLeave() {
    this.className = "empty";
}

function dragDrop(event) {
    this.className = "empty";
    if (selected.className === "color-box") {
        this.children[1].style.backgroundColor = selected.style.backgroundColor;
        localStorage.setItem(this.id, selected.style.backgroundColor);
        return;
    }
    this.children[1].append(selected);
}

function dragStart() {
    this.className += " hold";
    setTimeout(() => (this.className = "invisible"), 0);
    selected = this;
}

function dragEnd() {
    this.className = "visible";
}




let todos = [];
let selected = null;


const saveTodo = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
} 

const addTodo = (todo) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("span");

    let nextId = todos.length + 1;
    const newTodo = {
        id: nextId,
        todo,
    };

    todos.push(newTodo);
    saveTodo(todos);

    span.innerText = todo;
    button.innerHTML = '<i class="far fa-window-close"></i>';

    button.addEventListener("click", (event) => {
        const clickedBtn = event.target;
        const li = clickedBtn.parentNode.parentNode;
        li.remove();
        todos = todos.filter((todo) => {
            return todo.id !== parseInt(li.id);
        });

        saveTodo(todos);
    });


    button.addEventListener("mouseover", function () {
        button.children[0].className = 'fas fa-window-close';
    });

    button.addEventListener("mouseout", function () {
        button.children[0].className = 'far fa-window-close';
    });
    


    li.id = nextId;
    li.appendChild(span);
    li.appendChild(button);
    li.draggable = true;
    li.addEventListener("dragstart", dragStart);
    li.addEventListener("dragend", dragEnd);
    todoList.appendChild(li);
};


const loadTodos = () => {
    const parsedTodos = JSON.parse(localStorage.getItem("todos"));
    if (parsedTodos !== null) {
        parsedTodos.forEach((todo) => {
            addTodo(todo.todo);
        });
    }
};


const loadColors = () => {
    for (let i = 0; i < todoSpaces.length; i++) {
        if (localStorage.getItem(todoSpaces[i].id)) {
            todoSpaces[i].children[1].style.backgroundColor = localStorage.getItem(
                todoSpaces[i].id,
            );
        }
    }
};








const handleTodoSubmit = (event) => {
    event.preventDefault();
    const todo = todoInput.value;
    if (todo === "") {
        alert("💥💥💥");
        return;
    }
    addTodo(todo);
    todoInput.value = "";
};

function init() {
    todoForm.addEventListener("submit", handleTodoSubmit);
    loadTodos();
    loadColors;
}

init();
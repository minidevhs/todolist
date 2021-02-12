const todoForm = document.querySelector("#list-form");
const todoInput = todoForm.querySelector("input");
const todoSpaces = document.querySelectorAll(".todo-space");

let before = [];
let ing = [];
let finished = [];
let selected = null;
let startSpaceType = null;

// local storage에 저장
const saveTodo = (type, todos) => {
    localStorage.setItem(type, JSON.stringify(todos));
};

// todo 삭제
function deleteTodo(type, compare) {
    switch (type) {
        case "before":
            before = before.filter((todo) => {
                return parseInt(todo.id) !== parseInt(compare.id);
            });
            saveTodo("before", before);
            break;
        case "ing":
            ing = ing.filter((todo) => {
                return parseInt(todo.id) !== parseInt(compare.id);
            });
            saveTodo("ing", ing);
            break;
        case "finished":
            finished = finished.filter((todo) => {
                return parseInt(todo.id) !== parseInt(compare.id);
            });
            saveTodo("finished", finished);
            break;
    }
}

// todo 추가
const addTodo = (type, todo) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("span");

    let nextId = before.length + ing.length + finished.length + 1;
    const newTodo = {
        id: nextId,
        todo,
    };

    span.innerText = todo;
    button.innerHTML = '<i class="far fa-window-close"></i>';
    
    // 삭제 버튼
    button.addEventListener("click", (event) => {
        const clickedBtn = event.target;
        const li = clickedBtn.parentNode.parentNode;
        const clickedSpace = li.parentNode.parentNode.id;
        li.classList.add("deleted");
        li.addEventListener("transitionend", () => {
            li.remove();
        });

        deleteTodo(clickedSpace, li);
    });


    button.addEventListener("mouseover", function () {
        button.children[0].className = 'fas fa-window-close';
    });

    button.addEventListener("mouseout", function () {
        button.children[0].className = 'far fa-window-close';
    });
    
    // li, ul에 추가
    li.id = nextId;
    li.appendChild(span);
    li.appendChild(button);
    li.draggable = true;
    li.addEventListener("dragstart", dragStart);
    li.addEventListener("dragend", dragEnd);
    
    switch (type) {
        case "before":
            before.push(newTodo);
            saveTodo("before", before);
            todoSpaces[0].children[1].appendChild(li);
            break;
        case "ing":
            ing.push(newTodo);
            saveTodo("ing", ing);
            todoSpaces[1].children[1].appendChild(li);
            break;
        case "finished":
            finished.push(newTodo);
            saveTodo("finished", finished);
            todoSpaces[2].children[1].appendChild(li);
            break;
    }
};


// drag and drop
function dragStart() {
    this.className += " hold";
    setTimeout(() => (this.className = "invisible"), 0);
    selected = this;
    startSpaceId = selected.parentNode.parentNode.id;
}

function dragEnd() {
    this.className = "visible";
}

for (const todoSpace of todoSpaces) {
    todoSpace.addEventListener("dragover", dragOver);
    todoSpace.addEventListener("dragenter", dragEnter);
    todoSpace.addEventListener("dragleave", dragLeave);
    todoSpace.addEventListener("drop", dragDrop);
}

function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
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
        localStorage.setItem(`${this.id}Color`, selected.style.backgroundColor);
        return;
    }
    this.children[1].append(selected);

    const todo = {
        id: selected.id,
        todo: selected.children[0].textContent,
    };

    switch (this.id) {
        case "before":
            before.push(todo);
            saveTodo("before", before);
            break;
        case "ing":
            ing.push(todo);
            saveTodo("ing", ing);
            break;
        case "finished":
            finished.push(todo);
            saveTodo("finished", finished);
            break;
    }
    deleteTodo(startSpaceId, selected);
}


const loadTodos = () => {
    const before = JSON.parse(localStorage.getItem("before"));
    const ing = JSON.parse(localStorage.getItem("ing"));
    const finished = JSON.parse(localStorage.getItem("finished"));
    if (before !== null) {
        before.forEach((todo) => {
            addTodo("before", todo.todo);
        });
    }
    if (ing !== null) {
        ing.forEach((todo) => {
            addTodo("ing", todo.todo);
        });
    }
    if (finished !== null) {
        finished.forEach((todo) => {
            addTodo("finished", todo.todo);
        });
    }
    if (before == null || ing == null || finished == null) {
        return;
    }
};


const loadColors = () => {
    for (let i = 0; i < todoSpaces.length; i++) {
        if (localStorage.getItem(`${todoSpaces[i].id}Color`)) {
            todoSpaces[i].children[1].style.backgroundColor = localStorage.getItem(
                `${todoSpaces[i].id}Color`,
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
    addTodo("before", todo);
    todoInput.value = "";
};

function init() {
    todoForm.addEventListener("submit", handleTodoSubmit);
    loadTodos();
    loadColors();
}

init();
const todoForm = document.querySelector("#list-form");
const todoInput = todoForm.querySelector("input");
const todoSpaces = document.querySelectorAll(".todo-space");
const editBtns = document.querySelectorAll('.fa-edit');
const todoSpacesTitle = document.querySelectorAll(".todo-space .title");

let before = [];
let ing = [];
let finished = [];
let selected = null;
let startSpaceType = null;
let isEditing = false;

// local storage에 저장
const saveTodo = (type, todos) => {
    localStorage.setItem(type, JSON.stringify(todos));
};

// todo space 제목 수정
const editTitle = (event) => {
    if (isEditing === false) {
        event.stopPropagation();
        isEditing = true;
        const titleWrap = event.target.parentNode;

        const title = titleWrap.children[0];
        const editBtn = titleWrap.children[1];
        const text = title.textContent;
        const form = document.createElement("form");
        const inputElem = document.createElement("input")
        const buttonElem = document.createElement("button");

        // form
        inputElem.value = text;
        inputElem.type = "text";
        buttonElem.type = "submit";
        buttonElem.className = 'far fa-check-square';

        buttonElem.addEventListener("mouseenter", () => {
            buttonElem.className = 'fas fa-check-square';
        });
        buttonElem.addEventListener("mouseleave", () => {
            buttonElem.className = 'far fa-check-square';
        });
        form.appendChild(inputElem);
        form.appendChild(buttonElem);
        titleWrap.innerHTML = "";

        titleWrap.appendChild(form);

        // submit
        function titleSubmit(event) {
            event.preventDefault();
            const todoSpaceId = titleWrap.parentNode.id;
            const editText = inputElem.value;
            switch (todoSpaceId) {
                case "before":
                    localStorage.setItem("beforeTitle", editText);
                    break;
                case "ing":
                    localStorage.setItem("ingTitle", editText);
                    break;
                case "finished":
                    localStorage.setItem("finishedTitle", editText);
                    break;
                default :
                    return;
            }
            titleWrap.innerHTML = "";
            const h3 = document.createElement("h3");
            h3.innerText = editText;
            titleWrap.appendChild(h3);
            editBtn.className = 'far fa-edit';
            titleWrap.appendChild(editBtn);
            isEditing = false;
        }
        form.addEventListener("submit", titleSubmit);
        editBtn.addEventListener("click", titleSubmit);

        // input focus
        if (typeof inputElem.selectionStart == "number") {
            inputElem.selectionStart =
            inputElem.slectionEnd =
            inputElem.value.length;
            inputElem.focus();
        } else if (typeof inputElem.createTextRange != "undefined") {
            inputElem.focus();
            var range = inputElem.createTextRange();
            range.collapse(false);
            range.select();
        }
    } else {
        return;
    }
};

// todoSpaceTitle 이벤트
todoSpacesTitle.forEach((todoSpaceTitle) => {
    todoSpaceTitle.addEventListener("click", editTitle);
    todoSpaceTitle.addEventListener("mouseenter", (event) => {
        if (isEditing === false) {
            event.target.children[1].className = 'fas fa-edit';
        } else {
            return;
        }
    });
    todoSpaceTitle.addEventListener("mouseleave", (event) => {
        if (isEditing === false) {
            event.target.children[1].className = 'far fa-edit';
        } else {
            return;
        }
    });
});


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
    const deleteBtn = document.createElement("i");

    let nextId = before.length + ing.length + finished.length + 1;
    const newTodo = {
        id: nextId,
        todo,
    };

    span.innerText = todo;
    deleteBtn.className = 'far fa-window-close';
    
    // 삭제 버튼
    deleteBtn.addEventListener("click", (event) => {
        const clickedBtn = event.target;
        const li = clickedBtn.parentNode;
        const clickedSpace = li.parentNode.parentNode.id;
        li.classList.add("deleted");
        li.addEventListener("transitionend", () => {
            li.remove();
        });

        deleteTodo(clickedSpace, li);
    });


    deleteBtn.addEventListener("mouseover", function () {
        deleteBtn.className = 'fas fa-window-close';
    });

    deleteBtn.addEventListener("mouseout", function () {
       deleteBtn.className = 'far fa-window-close';
    });

    
    // li, ul에 추가
    li.id = nextId;
    li.appendChild(span);
    li.appendChild(deleteBtn);
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
    this.className = "hold";
    setTimeout(() => (this.className = "invisible"), 0);
    selected = this;
    console.log(this);
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
    this.classList.add("hovered");
}

function dragLeave() {
    this.classList.remove("hovered");
}

function dragDrop(event) {
    this.classList.remove("hovered");
    if (selected.className === "color-box") {
        this.children[1].style.backgroundColor = selected.style.backgroundColor;
        localStorage.setItem(`${this.id}Color`, selected.style.backgroundColor);
        return;
    }
    this.children[1].append(selected);

    const todo = {
        id: parseInt(selected.id),
        todo: selected.children[0].textContent,
    };
    deleteTodo(startSpaceId, selected);

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

const loadTodoTitle = () => {
    const beforeTitle = localStorage.getItem("beforeTitle");
    const ingTitle = localStorage.getItem("ingTitle");
    const finishedTitle = localStorage.getItem("finishedTitle");

    if (beforeTitle !== null) {
        todoSpaces[0].children[0].children[0].innerText = beforeTitle;
    } else {
        localStorage.setItem("beforeTitle", "시작 전");
    }
    if (ingTitle !== null) {
        todoSpaces[1].children[0].children[0].innerText = ingTitle;
    } else {
        localStorage.setItem("ingTitle", "하는 중");
    }
    if (finishedTitle !== null) {
        todoSpaces[2].children[0].children[0].innerText = finishedTitle;
    } else {
        localStorage.setItem("finishedTitle", "완료");
    }
};


const handleTodoSubmit = (event) => {
    event.preventDefault();
    const todo = todoInput.value;
    if (todo === "") {
        alert("할 일이 공백이에요!");
        return;
    }
    addTodo("before", todo);
    todoInput.value = "";
};

function init() {
    todoForm.addEventListener("submit", handleTodoSubmit);
    loadTodos();
    loadColors();
    loadTodoTitle();
}

init();
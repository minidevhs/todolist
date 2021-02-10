const welcomeText = document.querySelector("#welcome");
const nameForm = document.querySelector("#name-form");
const nameInput = nameForm.querySelector("input");


const getName = () => {
    return localStorage.getItem("name") || "";
};

const saveName = (name) => {
    localStorage.setItem("name", name);
};

const welcome = (name) => {
    if (name === "") {
        welcomeText.innerText = `안녕하세요. 이름을 입력해주세요`;
    } else {
        welcomeText.innerText = `${name}님 오늘 하루도 힘내세요!`;
    }
};

const handleNameSubmit = (event) => {
    event.preventDefault();
    const name = nameInput.value;
    welcome(name);
    saveName(name);
    nameForm.classList.add("none");
    nameInput.value = "";
};

const loadWelcome = () => {
    if (getName() === ""){
        nameForm.classList.remove("none");
    }   else {
        nameForm.classList.add("none");
    }
    welcome(getName());
};

nameForm.addEventListener("submit", handleNameSubmit);
loadWelcome();
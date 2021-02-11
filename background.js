const bgColorBtn = document.querySelector("#bg-color-btn");
const bgWrapper = document.querySelector(".bg-wrap");
const body = document.querySelector("body");

bgColorBtn.addEventListener("click", () => {
    bgWrapper.style.display = "block";
});

body.addEventListener("click", (event) => {
    if (event.target.id !== "bg-color-btn") {
        bgWrapper.style.display = "none";
    }
});
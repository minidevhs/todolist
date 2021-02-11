const sideoption = document.querySelector(".sideoption");
const title = sideoption.querySelector("h3");
const p = sideoption.querySelector("p");
const toggleBtn = document.querySelector(".toggle");

toggleBtn.addEventListener("click", function () {
    sideoption.classList.toggle("active");
    if (sideoption.classList.contains("active")) {
        toggleBtn.innerHTML = '<i class="fas fa-times"></i>';
        bgWrap.style.right = "1rem";
    } else {
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        bgWrap.style.right = "-300px";
    }
});

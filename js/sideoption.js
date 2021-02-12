const sideoption = document.querySelector(".sideoption");
const toggleBtn = sideoption.querySelector(".toggle");
const resetBtn = sideoption.querySelector(".reset");
const fontWrap = sideoption.querySelector(".fonts");
const fonts = sideoption.querySelectorAll(".font");

toggleBtn.addEventListener("click", function () {
    if (sideoption.classList.contains("active")) {
        closeNav();
    } else {
        openNav();
    }
    sideoption.classList.toggle("active");
});

function openNav() {
    sideoption.style.width = "316px";
    toggleBtn.innerHTML = '<i class="fas fa-times"></i>';
    bgWrap.style.right = "1rem";
    fontWrap.style.right = "50%";
    fontWrap.style.transform = "translateX(50%)";
    resetBtn.style.right = "50%";
    resetBtn.style.transform = "translateX(50%)";
}

function closeNav() {
    sideoption.style.width = "0";
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    bgWrap.style.right = "-300px";
    fontWrap.style.right = "-200px";
    resetBtn.style.right = "-50px";
}

const a = document.querySelector(".fonts");
console.log(a);

resetBtn.addEventListener("click", (e) => {
    const real = confirm("정말 초기화 하시겠어요?");
    if (real) {
        localStorage.clear();
        window.location.reload();
    } else {
        return;
    }
});

// font

for (font of fonts) {
    const fontName = font.classList[1];
    font.addEventListener("click", (event) => {
        body.style.fontFamily = fontName;
        for (font of fonts) {
            font.classList.remove("current-font");
        }
        event.target.classList.add("current-font");
        localStorage.setItem("font", fontName);
    });
}

function loadFont() {
    const currentFont = localStorage.getItem("font");
    if (currentFont !== null) {
      body.style.fontFamily = currentFont;
      sideoption.querySelector(`.${currentFont}`).classList.add("current-font");
    } else {
      localStorage.setItem("font", "malang");
      sideoption.querySelector(".malang").classList.add("current-font");
    }
  }

function init() {
    loadFont();
}

init();
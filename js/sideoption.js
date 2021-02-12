const sideoption = document.querySelector(".sideoption");
const toggleBtn = sideoption.querySelector(".toggle");
const resetBtn = sideoption.querySelector(".reset");
const fontWrap = sideoption.querySelector(".fonts");
const fonts = sideoption.querySelectorAll(".font");
const showPalette = sideoption.querySelector(".showPalette");
const showFont = sideoption.querySelector(".showFont");
const infoBtn = document.querySelector(".info");
const infoDesc = document.querySelector(".info-desc");
const mainspace = document.querySelector(".mainspace");





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
    infoDesc.style.right = "1rem";
}

function closeNav() {
    sideoption.style.width = "0";
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    bgWrap.style.right = "-300px";
    fontWrap.style.right = "-200px";
    infoDesc.style.right = "-500px";
}


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

function openTab(event) {
    var i;
    var x = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    if (event.target.classList.contains("showPalette")) {
        bgWrap.style.display ="block";
        showPalette.classList.add("current-tab");
        showFont.classList.remove("current-tab");
        infoBtn.classList.remove("current-tab");
    } else if (event.target.classList.contains("showFont")) {
        fontWrap.style.display = "block"
        showFont.classList.add("current-tab");
        showPalette.classList.remove("current-tab");
        infoBtn.classList.remove("current-tab");
    } else {
        infoDesc.style.display = 'block';
        showFont.classList.remove('current-tab');
        showPalette.classList.remove('current-tab');
        infoBtn.classList.add('current-tab');
    }
}

showPalette.addEventListener("click", openTab);
showFont.addEventListener("click", openTab);
infoBtn.addEventListener("click", openTab);


function init() {
    showPalette.classList.add("current-tab");
    loadFont();
}

init();
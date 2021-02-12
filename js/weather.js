const weather = document.querySelector("#weather");

const API_KEY = "d4ca23d877629ef30fd4d71634fdb95c";
const COORDS = "coords";

const getWeather = (lat, lng) => {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`,
    )
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            const temp = json.main.temp;
            const place = json.name;
            weather.innerHTML = `${place}<br>${temp}℃`;
        });
};

const saveCoords = (coordsObj) => {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
};

const handleGeoSucces = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude,
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
};

const handleGeoError = () => {
    console.log("Can't access geo location");
};

const askForCoords = () => {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
};

const loadCoords = () => {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
};

function init() {
    loadCoords();
}

init();
// import './styles.css';


const clock = document.querySelector("#clock");

const getTime = () => {
    const date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let sec = date.getSeconds();
    let ap = "AM";

    if (hour > 12){
        hour = hour - 12;
        ap = "PM";
    }

    hour = hour === 0 ? 12 : hour;
    hour = hour < 10 ? `0${hour}` : hour;
    minute = minute < 10 ? `0${minute}` : minute;
    sec = sec < 10 ? `0${sec}` : sec;

    clock.innerHTML = `${hour}:${minute}:${sec} ${ap}`;
};

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();
const time = document.querySelector("#time");
const dateWrap = document.querySelector("#date");

const getTime = () => {
    const date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let sec = date.getSeconds();
    let ap = "AM";
    let month = date.getMonth() + 1;
    let _date = date.getDate();
    let dayArray = ["일", "월", "화", "수", "목", "금", "토"];
    let day = dayArray[date.getDay()];

    if (hour >= 12){
        hour = hour - 12;
        ap = "PM";
    }

    hour = hour === 0 ? 12 : hour;
    hour = hour < 10 ? `0${hour}` : hour;
    minute = minute < 10 ? `0${minute}` : minute;
    sec = sec < 10 ? `0${sec}` : sec;

    time.innerHTML = `${hour} : ${minute} : ${sec} ${ap}`;
    dateWrap.innerHTML = `${month}월 ${_date}일 ${day}요일`;
};

function init() {
    setInterval(getTime, 1000);
}

init();
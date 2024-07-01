import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

let userSelectedDate;
let intervalId;
const button = document.querySelector("[data-start]");
const timerVal = {
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]")
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if (userSelectedDate <= new Date()) {
            window.alert("Please choose a date in the future");
            return;
        }
        
        if (!intervalId) {
            button.disabled = false;
            button.addEventListener('click', timerStart)
        }
    },
};
  
const data = flatpickr("#datetime-picker", options);

function timerStart() {
    button.disabled = true;
    intervalId = setInterval(timer, 1000);
}

function timer() {
    const dateDiff = userSelectedDate - new Date();
    if (dateDiff <= 0) {
        clearInterval(intervalId);
        return;
    }
    timerVal.days.textContent = Math.floor(dateDiff/1000/60/60/24);
    timerVal.hours.textContent = Math.floor(dateDiff/1000/60/60%24);
    timerVal.minutes.textContent = Math.floor(dateDiff/1000/60%60);
    timerVal.seconds.textContent = Math.floor(dateDiff/1000%60);
}
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
let intervalId;
const button = document.querySelector("[data-start]");
const input = document.querySelector("#datetime-picker");
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
            // window.alert("Please choose a date in the future");
            iziToast.show({
                message: 'Please choose a date in the future',
                backgroundColor: 'red',
                progressBar: false,
                transitionIn: "bounceInUp",
            });
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
    input.disabled = true;
    button.disabled = true;
    intervalId = setInterval(timer, 1000);
}

function timer() {
    const dateDiffMs = userSelectedDate - new Date();
    if (dateDiffMs <= 0) {
        clearInterval(intervalId);
        input.disabled = false;
        intervalId = undefined;
        return;
    }

    const dateDiff = convertMs(dateDiffMs);

    timerVal.days.textContent = zeroPlus(dateDiff.days);
    timerVal.hours.textContent = zeroPlus(dateDiff.hours);
    timerVal.minutes.textContent = zeroPlus(dateDiff.minutes);
    timerVal.seconds.textContent = zeroPlus(dateDiff.seconds);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function zeroPlus(value) {
    if (String(value).length === 1) {
        return "0" + value;
    }

    return value;
  }
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
form.addEventListener('submit', promMaker);

function promMaker(evt) {
    evt.preventDefault();
    if (!form.delay && !form.radio) {
        return;
    }

    const delay = form.delay.value;
    const state = form.state.value;

    const prom = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve();
            } else {
                reject();
            }
    
        }, Number(delay))
    });

    prom.then(() => {
        iziToast.show({
            message: `✅ Fulfilled promise in ${delay}ms`,
            backgroundColor: 'green',
            progressBar: false,
            transitionIn: "bounceInUp",
            })
    }).catch(() => {
        iziToast.show({
            message: `❌ Rejected promise in ${delay}ms`,
            backgroundColor: 'red',
            progressBar: false,
            transitionIn: "bounceInUp",
        })
    })
}
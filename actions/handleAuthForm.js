//! Forms
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const confirmForm = document.getElementById('confirmForm');
const forgetForm = document.getElementById("forgetForm");
const resetForm = document.getElementById("resetForm");

const successLogin = document.getElementById('successLogin');
const goToRegister = document.getElementById('goToRegister');
const goToLogin = document.getElementById('goToLogin');
const goToForget = document.getElementById("goToForget");
const goToReset = document.getElementById("")
//? confirm element
const timer = document.getElementById("timer");
const retryButton = document.getElementById("retryButton");

//? change password element
// const timer2 = document.getElementById("resetPasswordTimer")
const resetPasswordTime = document.getElementById("resetPasswordTimer");
const resendCodeButton = document.getElementById("resendResetCode");



//! actions
goToRegister.addEventListener('click', activeRegisterForm);
goToLogin.addEventListener('click', activeLoginForm);
document.getElementById("goToForget").addEventListener("click", () => {
    activeForgetForm();
})
// document.getElementById("goToResetPage").addEventListener("click", () => {
//     activeResetForm()
// })

let countdown;

function activeTrueForm() {
    deactivatedForms()
    loginForm.classList.add('active');
    // resetForgetForm()

    forgetForm.classList.add("active");

}

function activeRegisterForm() {
    deactivatedForms()
    resetRegister()
    clearStorage()
    registerForm.classList.add('active')
}

function activeLoginForm() {
    deactivatedForms()
    resetLogin()
    loginForm.classList.add('active');
}

//! handle forget form
const activeForgetForm = () => {
    deactivatedForms();
    resetForgetForm();
    forgetForm.classList.add("active");
}
//! handle reset password form
const activeResetForm = () => {
    deactivatedForms();
    resetForm.classList.add("active");
    activeCounter();
}

function activeConfirmForm() {
    deactivatedForms()
    resetConfirm()

    confirmForm.classList.add('active');
    document.getElementById("confirm-address-email").textContent = getData(EMAIL);
    activeCounter()
}

function activeCounter() {
    // console.log("time started")
    if (countdown)
        clearInterval(countdown);
    timer.textContent = 'you can retry at 02:00';
    resetPasswordTime.innerHTML = "you can retry at 02:00";
    startTimer();
    setTimeout(() => {
        document.getElementById("resetPasswordHelper").style.display = "none"
    }, 10000);
    //! solution edited
    timer.style.display = "block";
    resetPasswordTime.style.display = "block";
    resendCodeButton.style.display = "none";
}

function daActiveCounter() {
    // console.log("time is over")
    //! solution edited
    timer.style.display = "none";
    resetPasswordTime.style.display = "none"
    document.getElementById("timer-helper").style.display = "block";
    retryButton.style.display = "block";
    resendCodeButton.style.display = "block";
}

function startTimer() {
    let timer = (2 * 60).toString();
    let minutes, seconds;
    countdown = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        document.getElementById("timer").textContent = 'you can retry at ' + minutes + ":" + seconds;
        document.getElementById("resetPasswordTimer").textContent = 'you can retry at ' + minutes + ":" + seconds;
        // resetPasswordTime.textContent = `you can retry at ${minutes}:${seconds}`;
        if (--timer < 0) {
            clearInterval(countdown);
            daActiveCounter()
        }
    }, 1000);
}

function activeSuccessLoginForm() {
    deactivatedForms()
    successLogin.classList.add('active');
}

function deactivatedForms() {
    loginForm.classList.remove('active');
    registerForm.classList.remove('active');
    confirmForm.classList.remove('active');
    forgetForm.classList.remove("active");
    resetForm.classList.remove("active");
    successLogin.classList.remove('active');
}

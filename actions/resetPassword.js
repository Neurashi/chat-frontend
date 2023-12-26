//! element
const submitFormButton = document.getElementById("resetPasswordButton");
const resetLoadingIndicator = document.getElementById("resetLoadingIndicator");
const codeError = document.getElementById("resetCodeError");
const newPasswordError = document.getElementById("resetNewError");
const repeatPasswordError = document.getElementById("resetRepeatError")
const errors = document.getElementById("resetError");

//! input element
const codeInput = document.getElementById("resetCodeInput");
const newPassword = document.getElementById("resetNewInput");
const repeatPassword = document.getElementById("resetRepeatInput");


//! actions
resendCodeButton.addEventListener("click", () => {
    resendResetCodeApi(getData(EMAIL)).then(res => {
        document.getElementById("resetPasswordHelper").style = "block";

        activeCounter()
    });
})
submitFormButton.addEventListener('click', (e) => {
    handleResetPassword(e);
})


//! handle actions
const handleResetPassword = (e) => {
    e.preventDefault();
    let captchaToken = grecaptcha.getResponse(3);

    if (captchaToken && emailRegex.test(getData(EMAIL)) && codeValidation(codeInput.value.length) && newPasswordValidation(newPassword.value.length) && repeatPasswordValidation(repeatPassword.value.length)) {
        if (newPassword.value === repeatPassword.value) {

            showLoadingState();
            resetPasswordApi(getData(EMAIL), codeInput.value, newPassword.value, captchaToken)
                .then(data => {
                    console.log(data)
                    deactivatedForms();
                    resetChangeForm();
                    activeLoginForm();
                })
                .catch(error => {
                    console.log("line7")
                    showInputErrors(error);
                }).finally(() => {
                    console.log("line8")
                    hideLoadingState()
                });
        } else {
            console.log("line9")
            //! handle password error
        }
    } else {
        console.log("line10")
        codeValidation(codeInput.value.length);
        newPasswordValidation(newPassword.value.length)
        repeatPasswordValidation(repeatPassword.value.length)
    }
}

//! validation
const codeValidation = (code) => {
    if (code < 6) {
        codeError.textContent = "The code sent must not be less than 6 characters"
        codeError.classList.remove("hidden");
        return false
    }
    else {
        codeError.classList.add("hidden");
        return true
    }
}
const newPasswordValidation = (password) => {
    if (password < 8) {
        newPasswordError.textContent = "The password must not be less 8 characters";
        newPasswordError.classList.remove("hidden");
        return false
    }
    else {
        newPasswordError.classList.add("hidden");
        return true
    }
}
const repeatPasswordValidation = (password) => {
    if (password < 8) {
        repeatPasswordError.textContent = "The password must not be less 8 characters"
        repeatPasswordError.classList.remove("hidden");
        return false
    }
    else if (repeatPassword.value != newPassword.value) {
        repeatPasswordError.textContent = "The new password must be the same"
        repeatPasswordError.classList.remove("hidden");
        return false
    }
    else {
        repeatPasswordError.classList.add("hidden");
        return true
    }
}


//! handle errors
const showInputErrors = (errorMessage) => {
    errors.textContent = errorMessage;
    errors.classList.remove("hidden");
}
const hideInputErrors = (codeValue, newValue, repeatValue) => {
    if (codeValue) {
        codeError.classList.add("hidden");
    }
    if (newValue) {
        newPasswordError.classList.add("hidden");
    }
    if (repeatValue) {
        repeatPasswordError.classList.add("hidden");
    }
    errors.classList.add("hidden");
}


//! handle loading
function showLoadingState() {
    submitFormButton.style.display = 'none';
    resetLoadingIndicator.style.display = 'block';
}
function hideLoadingState() {
    resetLoadingIndicator.style.display = 'none';
    submitFormButton.style.display = 'block';
}

//! handle reset
const resetChangeForm = () => {
    console.log("reset form1")
    codeInput.value = "";
    newPassword.value = "";
    repeatPassword.value = "";

    grecaptcha.reset(3);
    hideInputErrors("code", "newPassword", "repeatPassword");
    console.log('reset form2');
}
const forgetButton = document.getElementById("forgetButton");
const forgetLoadingIndicator = document.getElementById("forgetLoadingIndicator");
const forgetEmailError = document.getElementById("forgetEmailError");
const forgetError = document.getElementById("forgetError");

//! input elements
const forgetEmailInput = document.getElementById("forgetEmailInput");

//! actions
forgetEmailInput.addEventListener("click", e => {
    e.preventDefault();
    hideForgetInputError("email");
})

forgetButton.addEventListener("click", e => {
    e.preventDefault();
    handleForgetClick();
});

//! handle actions
const handleForgetClick = () => {
    const forgetEmailInput = document.getElementById("forgetEmailInput").value;

    // let captchaToken = grecaptcha.getResponse(1);
    let captchaToken = grecaptcha.getResponse(2);
    // console.log(captchaToken)
    if (captchaToken && emailRegex.test(forgetEmailInput)) {
        showForgetLoadingState();
        forgetPasswordApi(document.getElementById("forgetEmailInput").value, captchaToken)
            .then(data => {
                if (data?.error) {
                    showForgetError(data.error)
                  }else{
                storeData(CONFIRM_TOKEN, data?.token);
                storeData(EMAIL, forgetEmailInput);
                activeResetForm();}
            })
            .catch(error => {
                showForgetError(error);
            }).finally(() => {
                hideForgetLoadingState()
            });
    } else {
        showForgetInputError(forgetEmailInput);
    }
}

//! handle errors
const showForgetError = (errorMessage) => {
    forgetError.textContent = errorMessage
    forgetError.classList.remove('hidden')
}

const showForgetInputError = (email) => {
    if (!emailRegex.test(email))
        forgetEmailError.classList.remove('hidden');
}

function hideForgetInputError(email) {
    if (email)
        forgetEmailError.classList.add('hidden');
    forgetError.classList.add("hidden")
}

//! handle loading
function showForgetLoadingState() {
    forgetButton.style.display = 'none';
    forgetLoadingIndicator.style.display = 'block';
}
function hideForgetLoadingState() {
    forgetLoadingIndicator.style.display = 'none';
    forgetButton.style.display = 'block';
}

//! handle reset inputs
const resetForgetForm = () => {
    forgetEmailInput.value = "";
    grecaptcha.reset(2);
    hideForgetInputError("email");
}
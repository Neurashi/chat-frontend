const registerButton = document.getElementById('registerButton');
const registerLoadingIndicator = document.getElementById('registerLoadingIndicator');
const registerEmailError = document.getElementById('registerEmailError');
const registerPasswordError = document.getElementById('registerPasswordError');
const registerConfirmPasswordError = document.getElementById('registerConfirmPasswordError');
const registerError = document.getElementById('registerError');


const registerEmailInput = document.getElementById('registerEmailInput');
const registerPasswordInput = document.getElementById('registerPasswordInput');
registerEmailInput.addEventListener('click', function (event) {
    event.preventDefault();
    hideRegisterInputError('email', '')
});

registerPasswordInput.addEventListener('click', function (event) {
    event.preventDefault();
    hideRegisterInputError('', 'pass')
});
registerButton.addEventListener('click', function (event) {
    event.preventDefault();
    handleRegisterClick()
});


function handleRegisterClick() {
    const registerEmailInput = document.getElementById('registerEmailInput').value;
    const registerPasswordInput = document.getElementById('registerPasswordInput').value;
    const registerConfirmPasswordInput = document.getElementById('registerConfirmPasswordInput').value;
    let captchaToken = grecaptcha.getResponse(1);
    if (captchaToken && emailRegex.test(registerEmailInput) && registerPasswordInput.length >= 8 && checkConfirmPassword(registerPasswordInput, registerConfirmPasswordInput)) {
        showRegisterLoadingState()
        registerUserApi(registerEmailInput, registerPasswordInput, captchaToken)
            .then(data => {
                if (data.status === 200 || data.status === 201 || data.status === '201' || data.status === '200') {
                    storeData(CONFIRM_TOKEN, data.token)
                    storeData(EMAIL, registerEmailInput)
                    activeConfirmForm()
                } else if (data.status === 401 || data.status === '401') {
                    showRegisterError('Unauthorized')
                } else {

                    showRegisterError(data.error)
                }
            })
            .catch(error => {
                showRegisterError(error)
            }).finally(() => {
                hideRegisterLoadingState()
            });
    } else {
        showRegisterInputError(registerEmailInput, registerPasswordInput)
    }
}

function showRegisterError(errorMessage) {
    registerError.textContent = errorMessage;
    registerError.classList.remove('hidden');
}

function showRegisterInputError(email, password) {
    if (!emailRegex.test(email))
        registerEmailError.classList.remove('hidden');
    if (password.length < 8)
        registerPasswordError.classList.remove('hidden')
}
function checkConfirmPassword(password, confirmPassword) {
    if (password.length >= 8) {
        if (password !== confirmPassword) {
            registerConfirmPasswordError.classList.remove('hidden')
            return false
        }
        return true
    }
    return false

}


function hideRegisterInputError(email, password) {
    if (email)
        registerEmailError.classList.add('hidden');
    if (password) {
        registerPasswordError.classList.add('hidden')
        registerConfirmPasswordError.classList.add('hidden')
    }
    registerError.classList.add('hidden')
}
function showRegisterLoadingState() {
    registerButton.style.display = 'none';
    registerLoadingIndicator.style.display = 'block';
}

function hideRegisterLoadingState() {
    registerLoadingIndicator.style.display = 'none';
    registerButton.style.display = 'block';
}

function resetRegister() {
    registerEmailInput.value = ''
    registerPasswordInput.value = ''
    grecaptcha.reset(1)
    hideRegisterInputError('email', 'pass')
}

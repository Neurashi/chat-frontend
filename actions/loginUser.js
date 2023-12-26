const loginButton = document.getElementById('loginButton');
const loginLoadingIndicator = document.getElementById('loginLoadingIndicator');
const loginEmailError = document.getElementById('loginEmailError');
const loginPasswordError = document.getElementById('loginPasswordError');
const loginError = document.getElementById('loginError');

const loginEmailInput = document.getElementById('loginEmailInput');
const loginPasswordInput = document.getElementById('loginPasswordInput');

loginEmailInput.addEventListener('click', function (event) {
    event.preventDefault();
    hideLoginInputError('email', '')
});

loginPasswordInput.addEventListener('click', function (event) {
    event.preventDefault();
    hideLoginInputError('', 'pass')
});
loginButton.addEventListener('click', function (event) {
    event.preventDefault();
    handleLoginClick()
    // alert("test")
});

function handleLoginClick() {
    const loginEmailInput = document.getElementById('loginEmailInput').value;
    const loginPasswordInput = document.getElementById('loginPasswordInput').value;
    let captchaToken = grecaptcha.getResponse(0);
    if (captchaToken && emailRegex.test(loginEmailInput) && loginPasswordInput.length >= 8) {
        showLoginLoadingState()
        loginUserApi(loginEmailInput, loginPasswordInput, captchaToken)
            .then(data => {

                if (data.status === 200 || data.status === 201 || data.status === '201' || data.status === '200') {
                    storeData(TOKEN, data?.token)
                    storeData(REFRESH_TOKEN, data?.refresh_token)
                    setLoginRegisterTitle()
                    activeSuccessLoginForm()
                    deleteMessages()
                    appendMessage(createBotLoginSuccessMessage())
                    appendMessage(createBotMessage(' You can write now!', ''))
                } else if (data.status === 401 || data.status === '401') {

                    showLoginError('Unauthorized')
                } else {

                    showLoginError(data.error)
                }
            })
            .catch(error => {
                showLoginError(error)
            }).finally(() => {
                hideLoginLoadingState()
            });
    } else {
        showLoginInputError(loginEmailInput, loginPasswordInput)
    }
}

function showLoginError(errorMessage) {
    loginError.textContent = errorMessage
    loginError.classList.remove('hidden')
}

function showLoginInputError(email, password) {
    if (!emailRegex.test(email))
        loginEmailError.classList.remove('hidden');
    if (password.length < 8)
        loginPasswordError.classList.remove('hidden')
}

function hideLoginInputError(email, password) {
    if (email) {
        // loginEmailInput.classList.add('hidden');
        loginEmailError.classList.add('hidden');
    }

    if (password)
        loginPasswordError.classList.add('hidden')
    loginError.classList.add('hidden')
}

function showLoginLoadingState() {
    loginButton.style.display = 'none';
    loginLoadingIndicator.style.display = 'block';
}

function hideLoginLoadingState() {
    loginLoadingIndicator.style.display = 'none';
    loginButton.style.display = 'block';
}

function resetLogin() {
    loginEmailInput.value = ''
    loginPasswordInput.value = ''
    grecaptcha.reset(0)
    hideLoginInputError('email', 'pass')
}
const confirmButton = document.getElementById('confirmButton');
const confirmLoadingIndicator = document.getElementById('confirmLoadingIndicator');
const confirmError = document.getElementById('confirmError');
const confirmResendButton = document.getElementById("retryButton")

const confirmCodeInput = document.getElementById('confirmCodeInput')
confirmCodeInput.addEventListener('click', function (event) {
    event.preventDefault();
    hideConfirmInputError();
});

confirmCodeInput.addEventListener('input', (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
    event.target.value = numericValue.slice(0, 6); // Limit the input length to 12 characters
});
confirmButton.addEventListener('click', function (event) {
    event.preventDefault();
    handleConfirmClick()
});

confirmResendButton.addEventListener("click", () => {
    resendConfirmCodeApi(getData(EMAIL));
})

function handleConfirmClick() {
    const confirmCodeInput = document.getElementById('confirmCodeInput').value;
    if (confirmCodeInput) {
        showConfirmLoadingState()
        confirmUserApi(confirmCodeInput)
            .then(data => {
                if (data.status === 200 || data.status === 201 || data.status === '201' || data.status === '200') {
                    storeData(TOKEN, data?.token)
                    storeData(REFRESH_TOKEN, data?.refresh_token)
                    setLoginRegisterTitle()
                    activeSuccessLoginForm()
                    deleteMessages()
                    appendMessage(createBotLoginSuccessMessage())
                } else if (data.status === 401 || data.status === '401') {
                    showConfirmError('Unauthorized')
                } else {
                    showConfirmError(data.error)
                }
            })
            .catch(error => {
                showConfirmError(error)
            }).finally(() => {
                hideConfirmLoadingState()
            });
    } else {
        showConfirmInputError()
    }
}
function showConfirmError() {

}

function showConfirmInputError() {
    confirmError.classList.remove('hidden');

}

function hideConfirmInputError() {
    confirmError.classList.add('hidden');
}
function showConfirmLoadingState() {
    confirmButton.style.display = 'none';
    confirmLoadingIndicator.style.display = 'block';
}
function hideConfirmLoadingState() {
    confirmLoadingIndicator.style.display = 'none';
    confirmButton.style.display = 'block';
}

function resetConfirm() {
    confirmCodeInput.value = ''
    hideConfirmInputError()
}

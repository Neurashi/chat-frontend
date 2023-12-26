const loginRegisterButton = document.getElementById('loginRegisterButton');

loginRegisterButton.addEventListener('click', clickLoginRegister);

function clickLoginRegister() {
    const token = getData(TOKEN)
    if (token) {
        activeSuccessLoginForm()
    } else {
        activeLoginForm()
    }
}

function checkToken() {
    const token = getData(TOKEN)
    storeData(CAN_SEND_MESSAGE, 'true')
    handleDeleteSendImageMessageClick()
    if (token) {
        refreshTokenApi()
            .then(data => {
                if (data.status === 200 || data.status === 201 || data.status === '201' || data.status === '200') {
                    storeData(TOKEN, data?.token)
                    setLoginRegisterTitle()
                } else {
                    clearStorage()
                }
            })
            .catch(error => {
                clearStorage()

            }).finally(() => {

        });
    } else {
        setLoginRegisterTitle()
    }
}

function setLoginRegisterTitle() {
    const token = getData(TOKEN)
    const loginRegisterTitle = document.getElementById('loginRegisterTitle');
    if (token) {
        loginRegisterTitle.textContent = 'Account';
    } else {
        loginRegisterTitle.textContent = 'Login/Register';
    }
}

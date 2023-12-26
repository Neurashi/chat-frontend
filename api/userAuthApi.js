function registerUserApi(email, password, captchaToken) {
    return fetch(BASE_URL + REGISTER_URL, {
        method: "POST",
        headers: { ...MAIN_HEADER, 'g-recaptcha-response-v2': captchaToken },
        body: JSON.stringify({ email: email, password: password }),
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.text().then(errorMsg => {
                const error = returnError(errorMsg)
                throw new Error(error.message);
            });
        }
    })
}

function confirmUserApi(code) {
    const confirmToken = getData(CONFIRM_TOKEN)
    return fetch(BASE_URL + CONFIRM_URL, {
        method: "POST",
        headers: MAIN_HEADER,
        body: JSON.stringify({ token: confirmToken, code }),
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.text().then(errorMsg => {
                const error = returnError(errorMsg)
                throw new Error(error.message);
            });
        }
    })
}

const resendConfirmCodeApi = (email) => {
    console.log(email)
    return fetch(BASE_URL + RESEND_CODE, {
        method: "POST",
        headers: MAIN_HEADER,
        body: JSON.stringify({ email })
    }).then(res => {
        console.log(res);
        if (res.ok) {
            return res.json();
        } else {
            return res.text().then(errorMsg => {
                const error = returnError(errorMsg);
                throw new Error(error.message);
            })
        }
    })
}

function loginUserApi(email, password, captchaToken) {
    return fetch(BASE_URL + LOGIN_URL, {
        method: "POST",
        headers: { ...MAIN_HEADER, 'g-recaptcha-response-v2': captchaToken },
        body: JSON.stringify({ email: email, password: password }),
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.text().then(errorMsg => {
                const error = returnError(errorMsg)
                throw new Error(error.message);
            });
        }
    })
}

//! handle forget password api
const forgetPasswordApi = (email, captchaToken) => {
    return fetch(BASE_URL + FORGET_URL, {
        method: "POST",
        headers: { ...MAIN_HEADER, "g-recaptcha-response-v2": captchaToken },
        body: JSON.stringify({ email }),
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return res.text().then(errorMsg => {
                const error = returnError(errorMsg);
                throw new Error(error.message);
            })
        }
    })
}
//! handle reset password api
const resetPasswordApi = (email, code, password, captchaToken) => {
    return fetch(BASE_URL + RESETPASSWORD_URL, {
        method: "POST",
        headers: { ...MAIN_HEADER, 'g-recaptcha-response-v2': captchaToken },
        body: JSON.stringify({ email, code, password }),
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return res.text().then(errorMsg => {
                const error = returnError(errorMsg);
                throw new Error(error.message);
            })
        }
    })
}
const resendResetCodeApi = (email) => {
    return fetch(BASE_URL + RESEND_RESET_CODE, {
        method: "POST",
        headers: MAIN_HEADER,
        body: JSON.stringify({ email })
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return res.text().then(errorMsg => {
                const error = returnError(errorMsg);
                throw new Error(error.message);
            })
        }
    })
}


function refreshTokenApi() {
    const refreshToken = getData(REFRESH_TOKEN)
    return fetch(BASE_URL + REFRESH_TOKEN_URL, {
        method: "POST",
        headers: { ...MAIN_HEADER, Authorization: `Bearer ${refreshToken}` },
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.text().then(errorMsg => {
                const error = returnError(errorMsg)
                throw new Error(error.message);
            });
        }
    })
}

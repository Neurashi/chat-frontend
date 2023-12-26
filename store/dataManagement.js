const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOKEN = 'token'
const REFRESH_TOKEN = 'RefreshToken'
const CONFIRM_TOKEN = 'ConfirmToken'
const EMAIL = 'email'
const CAN_SEND_MESSAGE = 'canSendMessage'

function storeData(key, value) {
    localStorage.setItem(key, value);
}

function getData(key) {
    return localStorage.getItem(key);
}

function removeItem(key) {
    localStorage.removeItem(key);
}

function clearStorage() {
    localStorage.clear();
}

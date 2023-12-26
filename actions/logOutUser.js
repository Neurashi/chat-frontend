const logOut = document.getElementById('logOut');
logOut.addEventListener('click', function (event) {
    event.preventDefault();
    handleLogOutClick()
});
function handleLogOutClick() {
    clearStorage()
    setLoginRegisterTitle()
    activeLoginForm()
    deleteMessages()
    appendMessage(createBotLoginMessage())
}

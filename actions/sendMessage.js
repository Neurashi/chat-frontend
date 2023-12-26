const MESSAGE_TYPE_TEXT = 'text'
const MESSAGE_TYPE_IMAGE = 'photo'

const massageBoxElement = document.getElementById('chatContainer');
const fileContainer = document.getElementById("fileContainer");

const fileInput = document.getElementById("fileInput");
const selectedImage = document.getElementById("selectedImage");
const sendButton = document.getElementById('sendButton');
const deleteMessagesButton = document.getElementById('deleteMessagesButton');

const loadingIndicator = document.getElementById('loadingIndicator');

const textBox = document.getElementById('inputMessage');
fileInput.addEventListener('change', handleFileInputClick);
deleteMessagesButton.addEventListener('click', deleteMessages);

sendButton.addEventListener('click', handleSendButtonClick);

function handleDeleteSendImageMessageClick() {
    const previewImageMessage = document.getElementById("previewImageMessage");
    if (previewImageMessage) {
        fileContainer.removeChild(previewImageMessage);
    }
}

function handleFileInputClick(event) {
    handleDeleteSendImageMessageClick()
    let file = fileInput.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        createFileBoxItem(e.target.result);
    };
    reader.readAsDataURL(file);
}

function createFileBoxItem(imgSrc) {
    const fileBoxItem = document.createElement("div");
    fileBoxItem.classList.add("file_box__item");
    fileBoxItem.id = "previewImageMessage";
    fileBoxItem.setAttribute('data-btn', 'deletePreview');
    const img = document.createElement("img");
    img.id = "selectedImage";
    img.src = imgSrc;
    img.alt = "";
    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("delete_btn");
    deleteBtn.id = "deleteSendImageMessage";
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("i", "i-Systemsclose-fill");
    deleteBtn.appendChild(deleteIcon);
    fileBoxItem.appendChild(img);
    fileBoxItem.appendChild(deleteBtn);
    fileContainer.appendChild(fileBoxItem)
}


function handleSendButtonClick() {
    const inputValue = document.getElementById('inputMessage').value;
    const selectedImage = document.getElementById("selectedImage");
    const modelType = document.getElementById("model_active").className.split(" ").at(-1);
    
    if (inputValue || selectedImage) {
        const token = getData(TOKEN)
        if (token) {
            if (inputValue)
                appendMessage(createUserMessage(inputValue))
            if (selectedImage)
                appendMessage(createUserImageMessage(selectedImage?.src))
            showLoadingState()
            document.querySelector('.chat__input input').value = '';
            const messageType = selectedImage ? MESSAGE_TYPE_IMAGE : MESSAGE_TYPE_TEXT
            const content = selectedImage ? selectedImage.src : inputValue
            const caption = selectedImage ? inputValue : ''
            getRecaptchaToken('login')
                .then(captchaToken => {
            sendMessage(token, messageType, content, caption , modelType,captchaToken)
                .then(data => {
                    if (data.status === 200 || data.status === 201 || data.status === '201' || data.status === '200') {

                            appendMessage(createBotMessage(data?.content, ''))

                        hideLoadingState()
                        handleDeleteSendImageMessageClick()
                    } else {
                        showErrorMessageBox(data.error)
                        document.querySelector('.chat__input input').value = inputValue;
                        hideLoadingState()
                    }
                })
                .catch(error => {
                    //console.log(error, 'error');
                    showErrorMessageBox(error)
                    document.querySelector('.chat__input input').value = inputValue;
                    hideLoadingState()
                });
            })
            .catch(error => {
                //console.log(error, 'error');
                showErrorMessageBox(error)
                document.querySelector('.chat__input input').value = inputValue;
                hideLoadingState()
            });
        } else {
            const canSendMessage = getData(CAN_SEND_MESSAGE)
            if (canSendMessage !== 'false') {
                storeData(CAN_SEND_MESSAGE, 'false')
                appendMessage(createBotLoginMessage())
                document.querySelector('.chat__input input').value = inputValue;
            }
        }
    }
}

function getBase64FromImage() {
    getBase64FromImage2()
        .then(base64 => {
            //console.log(base64);
            // Do something with the base64 representation
        })
        .catch(error => {
            console.error(error);
            // Handle the error
        });
}

function getBase64FromImage2() {
    const selectedImage = document.getElementById("selectedImage");
    const imageSrc = selectedImage.getAttribute("src");
    // Check if the src attribute is empty or does not start with "data:image"
    if (!imageSrc || !imageSrc.startsWith("data:image")) {
        return null; // or any default value you prefer
    }
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = imageSrc;
    return new Promise((resolve, reject) => {
        image.onload = function () {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0);
            resolve(canvas.toDataURL("image/jpeg"));
        };
        image.onerror = function () {
            reject(new Error("Failed to load the image."));
        };
    });
}

function appendMessage(messageElement) {
    massageBoxElement.appendChild(messageElement);
}

function deleteMessages() {
    let child = massageBoxElement.firstChild.nextSibling;
    while (child.nextSibling) {
        massageBoxElement.removeChild(child.nextSibling);
    }
    storeData(CAN_SEND_MESSAGE, 'true')
}

function showLoadingState() {
    loadingIndicator.classList.add('show');
    sendButton.classList.add('waiting')
    appendMessage(addTypingIndicator())
}

function hideLoadingState() {
    sendButton.classList.remove('waiting');
    loadingIndicator.classList.add('hidden')
    deleteTypingIndicator()
}

function showErrorMessageBox(errorMessage) {
    const errorBoxMessage = document.getElementById("errorBoxMessage");
    errorBoxMessage.classList.remove("hidden");
    const message = document.getElementById("myErrorMessage");
    message.innerText = errorMessage;
    setTimeout(function () {
        errorBoxMessage.classList.add("hidden");
    }, 2000);
}

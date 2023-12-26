function createUserMessage(message, imageSrc) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat__msg_item', 'chat__msg_item--client');
    const wrap = document.createElement('div');
    wrap.classList.add('wrap');
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = message;
    wrap.appendChild(messageParagraph);
    if (imageSrc) {
        const image = document.createElement('img');
        image.setAttribute('src', imageSrc);
        image.setAttribute('alt', '');
        wrap.appendChild(image);
    }
    messageElement.appendChild(wrap);
    return messageElement
}

function createUserImageMessage(imageSrc) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat__msg_item', 'chat__msg_item--client', 'chat__msg_item--file');
    const wrap = document.createElement('div');
    wrap.classList.add('gallery');
    const galleryItem = document.createElement('div')
    const image = document.createElement('img');
    image.setAttribute('src', imageSrc);
    image.setAttribute('alt', '');
    galleryItem.appendChild(image)
    wrap.appendChild(galleryItem);
    messageElement.appendChild(wrap);
    return messageElement
}

function createBotLoginMessage() {
    const chatMsgItem = document.createElement('div');
    chatMsgItem.classList.add('chat__msg_item', 'chat__msg_item--robot');
    const robotInfo = document.createElement('div');
    robotInfo.classList.add('robot_info', 'd-flex', 'flex-column', 'flex-x-between', 'flex-y-center');
    const robotInfoPic = document.createElement('div');
    robotInfoPic.classList.add('robot_info--pic');
    const robotImage = document.createElement('img');
    robotImage.src = 'img/logo/w-logo-small.png';
    robotImage.alt = '';
    const robotImageSpan = document.createElement('span');
    robotInfoPic.appendChild(robotImage);
    robotInfoPic.appendChild(robotImageSpan);
    robotInfo.appendChild(robotInfoPic);
    const wrap = document.createElement('div');
    wrap.classList.add('wrap');
    const messageParagraph1 = document.createElement('p');
    messageParagraph1.textContent = 'You should register first, then you can use this AI';
    const messageParagraph2 = document.createElement('p');
    messageParagraph2.classList.add('note');
    messageParagraph2.textContent = 'You can register fast';
    const chatMsgRegister = document.createElement('div');
    chatMsgRegister.classList.add('chat__msg_register', 'd-flex');
    const loginButton = document.createElement('span');
    loginButton.setAttribute('data-btn', 'login');
    loginButton.classList.add('btn', 'm-r-8');
    loginButton.textContent = 'Login';
    const registerButton = document.createElement('span');
    registerButton.setAttribute('data-btn', 'register');
    registerButton.classList.add('btn', 'btn__gold');
    registerButton.textContent = 'Register';
    chatMsgRegister.appendChild(loginButton);
    chatMsgRegister.appendChild(registerButton);
    wrap.appendChild(messageParagraph1);
    wrap.appendChild(messageParagraph2);
    wrap.appendChild(chatMsgRegister);
    chatMsgItem.appendChild(robotInfo);
    chatMsgItem.appendChild(wrap);
    return chatMsgItem;
}

function createBotLoginSuccessMessage() {
    // Create the main container div
    const chatItem = document.createElement("div");
    chatItem.classList.add("chat__msg_item", "chat__msg_item--robot");
    // Create the robot info div
    const robotInfo = document.createElement("div");
    robotInfo.classList.add("robot_info", "d-flex", "flex-column", "flex-x-between", "flex-y-center");
    // Create the robot info pic div
    const robotInfoPic = document.createElement("div");
    robotInfoPic.classList.add("robot_info--pic");
    // Create the robot info pic image
    const robotInfoPicImg = document.createElement("img");
    robotInfoPicImg.src = "img/logo/w-logo-small.png";
    robotInfoPicImg.alt = "";
    // Create the robot info pic span
    const robotInfoPicSpan = document.createElement("span");
    // Append the image and span to the robot info pic div
    robotInfoPic.appendChild(robotInfoPicImg);
    robotInfoPic.appendChild(robotInfoPicSpan);
    // Append the robot info pic div to the robot info div
    robotInfo.appendChild(robotInfoPic);
    // Create the wrap div
    const wrap = document.createElement("div");
    wrap.classList.add("wrap");
    // Create the first paragraph
    const firstParagraph = document.createElement("p");
    firstParagraph.textContent = "Welcome to BGT CHAT";
    // Create the second paragraph with the note class
    const secondParagraph = document.createElement("p");
    secondParagraph.classList.add("note");
    secondParagraph.textContent = "You can write all of your think that I can show for you, send me about Objects, Feelings or anythings!";
    // Create the third paragraph with the note and note--success classes
    const thirdParagraph = document.createElement("p");
    thirdParagraph.classList.add("note", "note--success");
    thirdParagraph.textContent = "Logging in is successful.";
    // Append the paragraphs to the wrap div
    wrap.appendChild(firstParagraph);
    wrap.appendChild(secondParagraph);
    wrap.appendChild(thirdParagraph);
    // Append the robot info div and wrap div to the main container div
    chatItem.appendChild(robotInfo);
    chatItem.appendChild(wrap);
    // Return the created chat section
    return chatItem;
}

function createBotMessage(message, imageSrc) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat__msg_item', 'chat__msg_item--robot');
    const robotInfo = document.createElement('div');
    robotInfo.classList.add('robot_info', 'd-flex', 'flex-column', 'flex-x-between', 'flex-y-center');
    const robotPic = document.createElement('div');
    robotPic.classList.add('robot_info--pic');
    const robotImage = document.createElement('img');
    robotImage.setAttribute('src', 'img/logo/w-logo-small.png');
    robotImage.setAttribute('alt', '');
    const languageSpan = document.createElement('span');
    robotPic.appendChild(robotImage);
    robotPic.appendChild(languageSpan);
    robotInfo.appendChild(robotPic);
    const wrap = document.createElement('div');
    wrap.classList.add('wrap');
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = message;
    wrap.appendChild(messageParagraph);
    if (imageSrc) {
        const image = document.createElement('img');
        image.setAttribute('src', imageSrc);
        image.setAttribute('alt', '');
        wrap.appendChild(image);
    }
    messageElement.appendChild(robotInfo);
    messageElement.appendChild(wrap);
    return messageElement;
}

function addTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("typing");
    typingDiv.id = "botMessageLoading";
    const spanElement = document.createElement("span");
    spanElement.classList.add("typing__animation");
    const innerSpanElement = document.createElement("span");
    spanElement.appendChild(innerSpanElement);
    typingDiv.appendChild(document.createTextNode("Typing "));
    typingDiv.appendChild(spanElement);
    return typingDiv
}

function deleteTypingIndicator() {
    const typingDiv = document.getElementById("botMessageLoading");
    if (typingDiv) {
        typingDiv.parentNode.removeChild(typingDiv);
    }
}

function createBotMessageTest(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat__msg_item', 'chat__msg_item--robot');
    messageElement.innerHTML = '<div class="wrap">' + message + '</div>';
    return messageElement
}

function createBotLoginMessageExample() {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat__msg_item', 'chat__msg_item--robot');
    messageElement.innerHTML = '<div class="wrap"> <p> You should to register first, then you can use this AI </p> <p class="note">you can register fast </p> <div class="chat__msg_register d-flex"> <span data-btn="register" class="btn m-r-8">login</span> <span data-btn="register" class="btn btn__gold ">register</span> </div> </div>'
    return messageElement
}

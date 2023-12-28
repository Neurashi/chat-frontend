
function sendMessage(token, messageType, content, caption,model,captchaToken) {
    //console.log(model)
     return fetch(BASE_URL + MESSAGES_SEND_URL, {
      method: "POST",
      headers: { ...MAIN_HEADER, Authorization: `Bearer ${token}` , 'g-recaptcha-response': captchaToken},
      body: JSON.stringify({ message_type: messageType, content, caption ,model}),
    }).then(response=>{
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
l
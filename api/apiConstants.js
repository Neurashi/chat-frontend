const BASE_URL = "https://bgt.beastbrain.org";
const MESSAGES_SEND_URL = "/api/messages";
const REGISTER_URL = "/api/register";
const CONFIRM_URL = "/api/confirm";
const LOGIN_URL = "/api/login";
const REFRESH_TOKEN_URL = "/api/refresh-token";
const RESEND_CODE = "/api/resend-confirm-code"; // /register  body => email 
const FORGET_URL = "/api/request-reset-password";  // body => email
const RESETPASSWORD_URL = "/api/reset-password";  // body => code ,password ,email
const RESEND_RESET_CODE ="/api/resend-reset-password-reset-code";  // /reset password  
// const 
const MAIN_HEADER = {
    "Content-Type": "application/json",
};

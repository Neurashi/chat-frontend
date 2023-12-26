function getRecaptchaToken(action) {
    return new Promise((resolve, reject) => {
        grecaptcha.ready(() => {
            grecaptcha.execute('6Ld4jlAoAAAAAGAGr8moco7MYacJtXz9LBcUrLHv', {action})
                .then(token => {
                    //console.log(token)
                    resolve(token);
                })
                .catch(error => {
                    reject(error);
                });
        });
    });
}
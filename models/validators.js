const emailValidator = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regex.test(email)
}

const passwordValidator = (pw) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    return regex.test(pw)
} // min 8 char, a capital, a number, and a lowercase

const phoneValidator = (phone) => {
    const regex = /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/
    return regex.test(phone)
}

module.exports = {
    emailValidator,
    passwordValidator,
    phoneValidator
}
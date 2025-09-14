export const registerFormValidator = (newAuth) => {

    if (!newAuth.email || !newAuth.username || !newAuth.password || !newAuth.confPassword) {
        throw Error("All fields are required");
    }

    if (newAuth.username.length < 3) {
        throw Error("Username must be at least 5 chars long");
    }

    if (!/[a-zA-Z0-9]+@[a-zA-z]+\.[a-zA-Z]+/.test(newAuth.email)) {
        throw Error("Invalid Email, Example *****@***.***");
    }

    if (newAuth.password.length < 4) {
        throw Error("Password must be at least 5 chars");
    }

    if (newAuth.password !== newAuth.confPassword) {
        throw Error("Password and Confirm password don't match");
    }

};
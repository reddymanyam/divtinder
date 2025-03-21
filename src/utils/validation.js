const validator = require('validator');

const validationSignUp = (req) => {

    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Enter the first and lastName");
    } else if (!validator.isEmail(email)) {
        throw new Error("Enter the correct Email");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter the Strong Password!");
    }
};

module.exports = {validationSignUp};
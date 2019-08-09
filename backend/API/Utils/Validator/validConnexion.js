const emailRegex = require('email-regex');
const isEmpty = require('../isEmpty');

// Validator Sign UP
const ValidSignup = (req, res, next) => {
    let errors = {};
    let regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;
    console.log(regexPwd);

    console.log(regexPwd.test(req.body.password));

    if(!regexPwd.test(req.body.password))
        errors.password = 'Password(8, 15 characters) should contains one of each: Uppercase Lowercase Number & Special character';
    if (isEmpty(req.body.username))
        errors.username = 'Must not be empty';
    if (isEmpty(req.body.email))
        errors.email = 'Must not be empty';
    if (!emailRegex().test(req.body.email))
        errors.email = 'Email must be a validate email';
    if (isEmpty(req.body.password)) 
        errors.password = 'Must not be empty';
    if (isEmpty(req.body.confirmPassword))
        errors.confirmPassword = 'Must not be empty';
    if (!req.body.confirmPassword.match(req.body.password))
        errors.general = 'Passwords must match';
    if (Object.keys(errors).length > 0)
        res.status(500).send({errors});
    else next();
};


// Validator Sign In
const ValidLogin = (req, res, next) => {
    let errors = {};
    
    if (isEmpty(req.body.email))
        errors.email = 'Must not be empty';
    if (isEmpty(req.body.password)) 
        errors.password = 'Must not be empty';
    if (Object.keys(errors).length > 0)
        res.status(400).send({errors});
    else next();
};

module.exports = { ValidSignup, ValidLogin };
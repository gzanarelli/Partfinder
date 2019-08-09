// Validator Password
module.exports = ValidPassword = (req, res, next) => {
    let errors = {};
    let regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;

    if ((typeof req.body.oldPassword === "undefined") || (typeof req.body.password === "undefined") || (typeof req.body.confirmPassword === "undefined")
    || (req.body.oldPassword === '') || (req.body.password === '') || (req.body.confirmPassword === ''))
        errors.password = 'Passwords must not be empty';
    else if(!regexPwd.test(req.body.password))
        errors.password = 'Password(8, 15 characters) should contains one of each: Uppercase Lowercase Number & Special character';
    else if (!req.body.confirmPassword.match(req.body.password))
        errors.passwords = 'Passwords must match';
    if (Object.keys(errors).length > 0)
        res.status(500).send({errors});
    else next();
};
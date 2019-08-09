const emailRegex = require('email-regex');

// Validator route /profil/edit

module.exports = ValidProfil = (req, res, next) => {
    let errors = {};
    console.log('type email', typeof req.body.email)
    if (req.body.email !== '')
        if (!emailRegex().test(req.body.email))
            errors.email = 'Email must be a validate email';
    if (Object.keys(errors).length > 0)
        res.status(500).send({errors});
    else next();
};
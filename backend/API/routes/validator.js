// const emailRegex = require('email-regex');
// const crypto = require('crypto');


/* FUNCTION Vérifie que les données envoyées du Front ne sont pas NULL */

// const isEmpty = (data) => {
//     if (!data) return true;
//     else return false;
// };


// // Validator Sign UP
// const validSignup = (req, res, next) => {
//     let errors = {};
//     let regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;
//     console.log(regexPwd);

//     console.log(regexPwd.test(req.body.password));

//     if(!regexPwd.test(req.body.password))
//         errors.password = 'Password(8, 15 characters) should contains one of each: Uppercase Lowercase Number & Special character';
//     if (isEmpty(req.body.username))
//         errors.username = 'Must not be empty';
//     if (isEmpty(req.body.email))
//         errors.email = 'Must not be empty';
//     if (!emailRegex().test(req.body.email))
//         errors.email = 'Email must be a validate email';
//     if (isEmpty(req.body.password)) 
//         errors.password = 'Must not be empty';
//     if (isEmpty(req.body.confirmPassword))
//         errors.confirmPassword = 'Must not be empty';
//     if (!req.body.confirmPassword.match(req.body.password))
//         errors.general = 'Passwords must match';
//     if (Object.keys(errors).length > 0)
//         res.status(500).send({errors});
//     else next();
// };


// // Validator Sign In
// const validLogin = (req, res, next) => {
//     let errors = {};
    
//     if (isEmpty(req.body.email))
//         errors.email = 'Must not be empty';
//     if (isEmpty(req.body.password)) 
//         errors.password = 'Must not be empty';
//     if (Object.keys(errors).length > 0)
//         res.status(400).send({errors});
//     else next();
// };


// // Validator Edit Profil
// const validProfil = (req, res, next) => {
//     let errors = {};
//     console.log('type email', typeof req.body.email)
//     if (req.body.email !== '')
//         if (!emailRegex().test(req.body.email))
//             errors.email = 'Email must be a validate email';
//     if (Object.keys(errors).length > 0)
//         res.status(500).send({errors});
//     else next();
// };


// // Validator Password
// const validPassword = (req, res, next) => {
//     let errors = {};
//     let regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;

//     if ((typeof req.body.oldPassword === "undefined") || (typeof req.body.password === "undefined") || (typeof req.body.confirmPassword === "undefined")
//     || (req.body.oldPassword === '') || (req.body.password === '') || (req.body.confirmPassword === ''))
//         errors.password = 'Passwords must not be empty';
//     else if(!regexPwd.test(req.body.password))
//         errors.password = 'Password(8, 15 characters) should contains one of each: Uppercase Lowercase Number & Special character';
//     else if (!req.body.confirmPassword.match(req.body.password))
//         errors.passwords = 'Passwords must match';
//     if (Object.keys(errors).length > 0)
//         res.status(500).send({errors});
//     else next();
// };


// Validator Add Sports
// const validSport = (req, res, next) => {
//     let data = {
//         sport: req.body.data.sport,
//         day: req.body.data.day,
//         start: req.body.data.start,
//         stop: req.body.data.stop,
//     }
//     let errors = {};

//     if (data.sport === '')
//         errors.sport = 'sport must be select';
//     if (data.day === '')
//         errors.day = 'day must be select';
//     if (data.start === '')
//         errors.start = 'start must be select';
//     if (data.stop === '')
//         errors.stop = 'stop must be select';
//     console.log('On est la pour voir data.sport: ', errors);
//     if (Object.keys(errors).length > 0)
//         res.status(500).send({ errors })
//     else
//         next();
// }

// module.exports = { validSignup, validLogin, validProfil, validPassword, validSport };
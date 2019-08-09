// Validator route /profil/sport-add

module.exports = ValidSport = (req, res, next) => {
    let data = {
        sport: req.body.data.sport,
        day: req.body.data.day,
        start: req.body.data.start,
        stop: req.body.data.stop,
    }
    let errors = {};

    if (data.sport === '')
        errors.sport = 'sport must be select';
    if (data.day === '')
        errors.day = 'day must be select';
    if (data.start === '')
        errors.start = 'start must be select';
    if (data.stop === '')
        errors.stop = 'stop must be select';
    console.log('On est la pour voir data.sport: ', errors);
    if (Object.keys(errors).length > 0)
        res.status(500).send({ errors })
    else
        next();
}
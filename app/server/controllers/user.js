const express = require('express');
const router = express.Router();
const { getPrograms, getGradYears } = require('../services/school');
const { create, authenticate } = require('../services/user');


router.get('/signup', (req, res) => {
    const programs = getPrograms();
    const gradYear = getGradYears();
    const errors = req.flash("error");
    res.render('Signup', { programs: programs, gradYear: gradYear, errors: errors, user: req.session.user });
})

router.post('/signup', async (req, res) => {
    const formData = {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        program: req.body.program,
        matricNumber: req.body.matricNumber,
        graduationYear: req.body.graduationYear,
    }
    const newUser = await create(formData);
    if (newUser[0] === true) {
        req.session.user = newUser[1];
        res.redirect('/');
    } else {
        const errors = newUser[1];
        req.flash('error', errors);
        res.redirect(303, '/signup');
    }
})

router.get('/login', (req, res) => {
    const errors = req.flash('error');
    res.render('Login', { errors, user: req.session.user });
})

router.post('/login', async (req, res) => {
    const logUser = await authenticate(req.body.email, req.body.password);
    if (logUser[0] === true) {
        req.session.user = logUser[1];
        res.redirect('/');
    } else {
        const errors = logUser[1];
        req.flash('error', errors);
        res.redirect(303, '/login');
    }
})

module.exports = router;
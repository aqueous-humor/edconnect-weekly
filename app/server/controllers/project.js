const express = require('express');
const router = express.Router();
const { create, getById } = require('../services/project');
const user = require('../services/user');

router.get('/projects/submit', (req, res) => {
    const user = req.session.user;
    const errors = req.flash('error');
    res.render('CreateProject', { errors, user });
    if (!user) {
        res.redirect('/login');
    }
})

router.post('/projects/submit', (req, res) => {
    const formData = {
        name: req.body.name,
        abstract: req.body.abstract,
        tags: req.body.tags.split(","),
        authors: req.body.authors.split(","),
        createdBy: req.session.user.id
    }
    const newProject = create(formData);
    if (newProject[0] === true) {
        res.redirect('/');
    } else {
        const errors = newProject[1];
        req.flash('error', errors);
        res.redirect(303, '/projects/submit');
    }
})

router.get('/project/:id', (req, res) => {
    const id = req.params.id;
    const project = getById(id);
    const createdBy = user.getById(project.createdBy);
    res.render('Project', { project, createdBy, user: req.session.user })
})

module.exports = router;
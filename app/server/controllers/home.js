const express = require('express');
const { getAll } = require('../services/project');
const router = express.Router();


router.get('/', (req, res) => {
    const user = req.session.user;
    const projectList = getAll();
    res.render('Home', { projectList, user });
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/')
})

module.exports = router;
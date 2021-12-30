const express = require('express');
const { getAll } = require('../services/project');
const router = express.Router();


router.get('/', async (req, res) => {
    const projectList = await getAll();
    res.render('Home', { projectList, user: req.session.user });
})

router.get('/logout', (req, res) => {
    delete req.session.user; //instead of destroying the entire session we are only deleting the user prop so as to be able to have a logged out state for each client that persists for the entire lifespan of the cookie (connect.sid). 
    // delete req.session.notifications;
    res.redirect('/')
})

module.exports = router;
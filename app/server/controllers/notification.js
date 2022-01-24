const express = require('express');
const router = express.Router();
const {
    addNotification,
    getUserNotifications,
    readNotification,
    getUnreadNotifications
} = require('../services/notification');


router.get('/notifications/:id', async (req, res) => {
    const userNotifs = await getUserNotifications(req.params.id);
    res.render('Notifications', { user: req.session.user, notifs: userNotifs })
})

router.get('/notifications/unread/:id', async (req, res) => {
    const unreadNotifs = await getUnreadNotifications(req.params.id);
    res.send({ unreadNotifs: unreadNotifs.length });
})

module.exports = router;
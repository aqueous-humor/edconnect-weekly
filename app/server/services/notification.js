const { Notification } = require('../models/user');
const helper = require('../models/mongo_helper');

/**
 * Creates a new notification document
 * @param {string} forUser - The unique id of the user the notification is for.
 * @param {string} message - The body of the notification
 * @param {string} projectId - The project id of the comment generating the notification
 * @returns {(Boolean|Array)} Returns true if successful, and an array with elements false(index 0) and the translated error(index 1) if unsuccessful
 */
const addNotification = async ({
    forUser,
    message,
    projectId,
}) => {
    try {
        const notification = new Notification({
            forUser,
            message,
            projectId,
        })
        const validNotification = await notification.save();
        if (validNotification) {
            return true;
        }
    } catch (error) {
        return [false, helper.translateError(error)];
    }
}

/**
 * Get all notifications for a specific user
 * @param {string} userId - The unique id of the user
 * @returns {Array}  Array containing all notifications for a user or array containing translated error(s) if try block fails
 */
const getUserNotifications = async (userId) => {
    try {
        const notifications = await Notification.find({ forUser: userId });
        return notifications;
    } catch (error) {
        return helper.translateError(error)
    }
}

/**
 * Marks a particular notification as read
 * @param {string} id - The unique id of the notification to be modified
 * @returns {(Object|Array)} The UpdateResult object returned from the update operation, or an array of translated errors in the event of failure
 */
const readNotification = async (id) => {
    try {
        return await Notification.updateOne({ _id: id }, { isRead: true })
    } catch (error) {
        return helper.translateError(error);
    }
}

const getUnreadNotifications = async (id) => {
    try {
        return await Notification.find({ forUser: id }, { isRead: false })
    } catch (error) {
        return helper.translateError(error);
    }
}

module.exports = {
    addNotification,
    getUserNotifications,
    readNotification,
    getUnreadNotifications
}
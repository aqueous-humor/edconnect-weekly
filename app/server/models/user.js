const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        salt: { type: String, required: true },
        matricNumber: { type: String, required: true },
        program: { type: String, required: false },
        graduationYear: { type: String, required: false }

    },
    { timestamps: true }
)

const NotificationSchema = new Schema(
    {
        //The notification message
        message: { type: String, required: true },
        //The user who the message is for
        forUser: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
        //reflects whether the notification has been read or not
        isRead: { type: Boolean, default: false },
        //the project id of the comment generating the notification
        projectId: { type: Schema.Types.ObjectId, ref: 'projects' }
    },
    { timestamps: true }
)

const hash = (password, salt) => crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");


UserSchema.methods.setPassword = function (password) {
    if (password.length >= 7) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.password = hash(password, this.salt);
    } else {
        throw new Error('Password should have at least 7 characters');
    }

}

UserSchema.methods.validPassword = function (password) {
    return this.password === hash(password, this.salt);
}

const User = mongoose.model("users", UserSchema);
const Notification = mongoose.model('notifications', NotificationSchema);

module.exports = {
    User,
    Notification
};
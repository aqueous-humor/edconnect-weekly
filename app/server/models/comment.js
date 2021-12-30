const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    //the type of comment, which can either be a root or child           
    type: { type: String, enum: ['parent', 'child'], required: true },
    //author is a two element array that holds the name of author and id in postions 0 and 1 respectively.
    author: { type: [String], trim: true, required: true },
    //the body of the comment 
    text: { type: String, trim: true, required: true },
    // the id of the project where the comment was made
    projectId: { type: Schema.Types.ObjectId, ref: 'projects' },
    //an array of the user ids of all users who like the comment
    likes: { type: [Schema.Types.ObjectId], ref: 'users' },
    // id of the parent for child comments
    parentId: {
        type: Schema.Types.ObjectId,
        //parentId should only be specified when the type is set to child
        validate: {
            validator: function () {
                return this.type === 'child';
            }
        }
    }
}, { timestamps: true })


const Comment = mongoose.model('comments', CommentSchema);

module.exports = Comment;
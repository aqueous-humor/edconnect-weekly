const Comment = require('../models/comment');
const helper = require('../models/mongo_helper');

/**
 * Creates a new comment document
 * @param {string} type - A string which specifies if the comment is a parent or child
 * @param {string[]} author - An array containing author's name(index 0), and author's unique id(index 1)  
 * @param {string} text - A string containing the markup received from the text editor on the client
 * @param {string} projectId - A string representing the unique id of the project under which the comment is made
 * @param {(string|null)} parentId - A string representing the unique id of the parent comment under which a reply is made or null for parent comments
 * @returns {Array} An array with a boolean (index 0), and either an object containing the saved document or the translated error in the case of failure(index 1)
 */
const createComment = async ({
    type,
    author,
    text,
    projectId,
    parentId
}) => {
    try {
        //create a new comment document
        const comment = new Comment({
            type,
            author,
            text,
            projectId,
            parentId
        });
        const validComment = await comment.save();
        if (validComment) {
            return [true, comment];
        }
    } catch (error) {
        return [false, helper.translateError(error)];
    }
}

const getCommentById = async (id) => {
    try {
      const comment = await Comment.findById(id);
      return comment;
    } catch (error) {
      return helper.translateError(error);
    }
  };
/** 
 * Gets all the parent comments for a particular project
 * @param {string} id - The unique id of the project
 * @returns {Array}  Array containing all comments for a project which are parent comments or array containing translated error(s) if try block fails 
 */
const getAllParentComments = async (id) => {
    try {
        const comments = await Comment.find({ projectId: id, type: 'parent' });
        return comments;
    } catch (error) {
        return helper.translateError(error);
    }
}

/**  Gets all the child comments for a particular comment
 * @param {string} id - The unique id of the parent comment
 * @returns {Array}  Array containing all children comments of a parent or array containing translated error(s) if try block fails 
 */
const getAllCommentReplies = async (id) => {
    try {
        const replies = await Comment.find({ parentId: id });
        return replies;
    } catch (error) {
        return helper.translateError(error);
    }
}

/**
 * Likes a comment
 * @param {string} id - The unique id of the document to be modified
 * @param {string} userId - The unique id of the user liking the comment
 * @returns {(Object|Array)} The UpdateResult object returned from the update opreation, or an array of translated errors in the event of failure
 */
const addLike = async (id, userId) => {
    try {
        return await Comment.updateOne({ _id: id },
            {
                //Adds userId to the likes array only if they do not already exist in the set so no room to like twice.
                $addToSet: {
                    likes: [userId]
                }
            });
    } catch (error) {
        return helper.translateError(error);
    }
}

/**
 * Unlikes a comment
 * @param {string} id - The unique id of the document to be modified
 * @param {string} userId - The unique id of the user unliking the comment
 * @returns {(Object|Array)} The UpdateResult object returned from the update opreation, or an array of translated errors in the event of failure
 */
const removeLike = async (id, userId) => {
    try {
        return await Comment.updateOne({ _id: id },
            {
                //Remove any userId that matches the specified userId in the likes array
                $pull: {
                    likes: {
                        $in: [userId]
                    }
                }
            });
    } catch (error) {
        return helper.translateError(error);
    }
}

/**
 * Removes a document from the comments collection
 * @param {string} id - The unique id of the comment to be deleted from the collection 
 * @param {string} type - The type of comment to be deleted
 * @returns {(Object|Array)} The DeleteResult object returned from the delete opreation, or an array of translated errors in the event of failure
 */
const delComment = async (id, type) => {
    try {
        const replies = await Comment.find({ parentId: id });
        if (type == 'parent' && replies.length > 0) { //when deleting parent comments, we also want to also delete their children, as there is no point keeping them
            const delChildren = await Comment.deleteMany({ parentId: id });
            if (delChildren) {
                return await Comment.deleteOne({ _id: id })
            }
        } else {
            return await Comment.deleteOne({ _id: id })
        }
    } catch (error) {
        return helper.translateError(error);
    }
}

/**
 * Edits the text of a comment document in the comments collection
 * @param {string} id - The unique id of the document to be modified
 * @param {string} newText - The updated text to be saved
 * @returns {(Object|Array)} The UpdateResult object returned from the update operation, or an array of translated errors in the event of failure
 */
const editComment = async (id, newText) => {
    try {
        return await Comment.updateOne({ _id: id }, { text: newText })
    } catch (error) {
        return helper.translateError(error);
    }
}



module.exports = {
    createComment,
    getCommentById,
    getAllParentComments,
    getAllCommentReplies,
    delComment,
    editComment,
    addLike,
    removeLike,
}
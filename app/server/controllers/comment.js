const express = require('express');
const router = express.Router();
const {
    createComment,
    getCommentById,
    delComment,
    editComment,
    addLike,
    removeLike,
    getAllParentComments,
    getAllCommentReplies,
} = require('../services/comment');
const { addNotification } = require('../services/notification');
const { getById } = require('../services/project');
const user = require('../services/user');

//receives get request from CommentList and sends back an array of all parent comments belonging to a project
router.get('/project/comment/parent/:id', async (req, res) => {
    const comments = await getAllParentComments(req.params.id);
    res.send({ comments })
})

//receives get request from CommentList and sends back an array of all child comments belonging to a parent comment
router.get('/project/comment/child/:id', async (req, res) => {
    const comments = await getAllCommentReplies(req.params.id);
    res.send({ comments })
})

//receives post request from CommentForm and sends back an object containing the status of the operation(creating a comment, parent or child), and the translated erro
router.post('/project/comment/:id', async (req, res) => {
    const formData = {
        type: req.body.type,
        author: req.body.author.split(','),
        text: req.body.comment,
        projectId: req.params.id, // the value of the id param is the project id
        parentId: req.body.parentId
    }
    const comment = await createComment(formData);

    if (comment[0] === true) {
        const project = await getById(req.params.id);
        const createdBy = project.createdBy;
        const createdByUserDb = await user.getById(createdBy)
        const commentAuthor = await user.getById(comment[1].author[1]);
        let parentComment;
        let parentCommentAuthor;
        const parentId = comment[1].parentId;
        if (parentId) {
            parentComment = await getCommentById(comment[1].parentId);
            parentCommentAuthor = await user.getById(parentComment.author[1]);
        }
        //notification logic for the project owner
        if (comment[1].author[1] !== createdBy) {
            if (comment[1].type == 'parent') {
                await addNotification({
                    forUser: createdBy,
                    message: `${comment[1].author[0]} commented on your project`,
                    projectId: req.params.id
                })
            } else if (comment[1].type == 'child' && parentComment.author[1] == createdBy) {
                await addNotification({
                    forUser: createdBy,
                    message: `${comment[1].author[0]} replied your comment on your project`,
                    projectId: req.params.id
                })
            } else {
                await addNotification({
                    forUser: createdBy,
                    message: `${comment[1].author[0]} replied ${parentComment.author[0]}'s comment on your project`,
                    projectId: req.params.id
                })
            }
        }

        //notification logic for user
        if (parentCommentAuthor !== undefined && parentComment.author[1] !== createdBy) {
            await addNotification({
                forUser: parentComment.author[1],
                message: `${comment[1].author[0]} replied your comment on ${createdByUserDb.firstname} ${createdByUserDb.lastname}'s project`,
                projectId: req.params.id
            })
        }
        //We do not want to send a notification if the author of a comment is also the author of the project
        // if (comment[1].author[1] !== createdBy._id) {
        //     if (comment[1].type == 'parent') {
        //         await addNotification({
        //             forUser: createdBy._id,
        //             message: `${comment[1].author[0]} commented on your project`
        //         })
        //     } else if (comment[1].type == 'child') {
        //         const parent = await getCommentById(comment[1].parentId);
        //         const parentAuthor = await user.getById(parent.author[1]);
        //         if (parentAuthor) { //checking that the parent author is a registered user
        //             let msgSnippet = parentAuthor._id == createdBy._id ? ('your comment') : (`${parentAuthor.firstname}'s comment`)
        //             await addNotification({
        //                 forUser: createdBy._id,
        //                 message: `${comment[1].author[0]} replied to ${msgSnippet} on your project`
        //             })

        //             await addNotification({
        //                 forUser: parentAuthor._id,
        //                 message: `${comment[1].author[0]} replied to your comment on ${createdBy.firstname}'s project`
        //             })
        //         }
        //     }
        // }
        res.send({ status: 'ok', comment: comment[1] })
    }
})

// receives delete request from CommentDelete and sends back back the DeleteResult object
router.delete('/project/comment/delete/:id', async (req, res) => {
    const delComm = await delComment(req.params.id);
    res.send(delComm);
})

//receives post request from CommentForm with what should be the new comment document and sends the UpdateResult object from the operation
router.post('/project/comment/edit/:id', async (req, res) => {
    const editComm = await editComment(req.params.id, req.body.comment); // the value of the id param is the comment id
    res.send(editComm);
})

router.post('/project/comment/like/:id', async (req, res) => {
    const like = await addLike(req.params.id, req.body.userId);
    const comment = await getCommentById(req.params.id);
    const project = await getById(comment.projectId);
    const createdByUserDb = await user.getById(project.createdBy)
    const commentAuthor = comment.author[1];
    const commentAuthorUserDb = await user.getById(commentAuthor);
    const likeAuthorUserDb = await user.getById(req.body.userId);
    if (req.body.userId !== project.createdBy) {
        if (like.acknowledged == true && commentAuthorUserDb && project.createdBy !== commentAuthor) {
            await addNotification({
                forUser: commentAuthor,
                message: `${likeAuthorUserDb.firstname} ${likeAuthorUserDb.lastname} liked your ${comment.type == 'parent' ? 'comment' : 'reply'} on ${createdByUserDb.firstname} ${createdByUserDb.lastname}'s project `,
                projectId: comment.projectId
            })
        } else if (like.acknowledged == true && commentAuthorUserDb && project.createdBy === commentAuthor) {
            await addNotification({
                forUser: commentAuthor,
                message: `${likeAuthorUserDb.firstname} ${likeAuthorUserDb.lastname} liked your ${comment.type == 'parent' ? 'comment' : 'reply'} on your project`,
                projectId: comment.projectId
            })
        }
    }
    res.send(like)
})

router.post('/project/comment/unlike/:id', async (req, res) => {
    const unlike = await removeLike(req.params.id, req.body.userId);
    res.send(unlike)
})

module.exports = router;
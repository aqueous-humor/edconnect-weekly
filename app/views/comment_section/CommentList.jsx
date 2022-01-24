import React, { useState, useEffect } from 'react';
import {
    Container,
} from 'react-bootstrap';
import Comment from './Comment';

const CommentList = ({ children, user, guest, createdBy, replies, editorValue, setEditorValue, activeEdit, setActiveEdit, editComment, deleteComment }) => {
    //the border property which we want to give to the component when it is rendering a list of replies
    const [className, setClassName] = useState('');

    useEffect(() => {
        if (replies) {
            setClassName('border-left');
        }
    })

    /** 
     * Removes a deleted comment from the list of comments to be rendered
     * @param {Object} id - The unique id of the comment to be deleted, received as prop from the Comment component
    */
    // const deleteComment = (id, type) => {
    //     //array to be filtered will depend on what type of comment is to be deleted (i.e root or child)
    //     let newArr;
    //     if (type == 'parent') {
    //         newArr = comments.filter((comment) => {
    //             return comment._id !== id;
    //         })
    //         setComments(newArr);
    //     } else {
    //         newArr = replies.filter((comment) => {
    //             return comment._id !== id;
    //         })
    //         setReplies(newArr);
    //     }
    // }

    // const editComment = (id, type, newText) => {
    //     if (type == 'parent') {
    //         comments.forEach((comment) => {
    //             if (comment._id == id) {
    //                 comment.text = newText;
    //             }
    //         })
    //     } else {
    //         replies.forEach((comment) => {
    //             if (comment._id == id) {
    //                 comment.text = newText;
    //             }
    //         })
    //     }
    // }

    return (
        <Container className='border border-secondary bg-info rounded'>
            {replies ? (
                <Container className={className}>
                    {replies.map((reply) => {
                        return (
                            <Comment
                                key={reply._id}
                                comment={reply}
                                user={user}
                                guest={guest}
                                createdBy={createdBy}
                                editorValue={editorValue}
                                setEditorValue={setEditorValue}
                                activeEdit={activeEdit}
                                setActiveEdit={setActiveEdit}
                                editComment={editComment}
                                deleteComment={deleteComment}
                            />
                        )
                    })}
                </Container>
            ) : (
                <Container>
                    {children}
                </Container>
            )}

        </Container>
    )
}

export default CommentList;
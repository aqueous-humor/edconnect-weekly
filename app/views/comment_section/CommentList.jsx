import React, { useState, useEffect } from 'react';
import {
    Container,
} from 'react-bootstrap';
import Comment from './Comment';
import axios from 'axios';

const CommentList = ({ user, createdBy, guest, comments, setComments, editorValue, setEditorValue, activeEdit, setActiveEdit, activeReply, setActiveReply, replies, setReplies }) => {
    //since this component is meant to be reusable, we are creating a state which stores the type of comments to be rendered ie parents or children, depending on where CommentList is rendered
    const [commListToBeRendered, setCommListToBeRendered] = useState([]);
    //the border property which we want to give to the component when it is rendering a list of replies
    const [className, setClassName] = useState('');

    useEffect(() => {
        if (comments) {
            setCommListToBeRendered(comments);
        }
    }, [comments])
    useEffect(() => {
        if (replies) {
            setCommListToBeRendered(replies)
            setClassName('border-left');
        }
    }, [replies])

    /** 
     * Removes a deleted comment from the list of comments to be rendered
     * @param {Object} id - The unique id of the comment to be deleted, received as prop from the Comment component
    */
    const deleteComment = (id, type) => {
        //array to be filtered will depend on what type of comment is to be deleted (i.e root or child)
        let newArr;
        if (type == 'parent') {
            newArr = comments.filter((comment) => {
                return comment._id !== id;
            })
            setComments(newArr);
        } else {
            newArr = replies.filter((comment) => {
                return comment._id !== id;
            })
            setReplies(newArr);
        }
    }

    const editComment = (id, type, newText) => {
        if (type == 'parent') {
            comments.forEach((comment) => {
                if (comment._id == id) {
                    comment.text = newText;
                }
            })
        } else {
            replies.forEach((comment) => {
                if (comment._id == id) {
                    comment.text = newText;
                }
            })
        }
    }

    return (
        <Container className='border border-secondary bg-info rounded'>
            <Container className={className}>
                {commListToBeRendered.map((comment) => {
                    return (<Comment
                        key={comment._id}
                        comments={comments}
                        comment={comment}
                        user={user}
                        guest={guest}
                        createdBy={createdBy}
                        editorValue={editorValue}
                        setEditorValue={setEditorValue}
                        activeEdit={activeEdit}
                        setActiveEdit={setActiveEdit}
                        activeReply={activeReply}
                        setActiveReply={setActiveReply}
                        editComment={editComment}
                        deleteComment={deleteComment}
                    />)
                })}
            </Container>

        </Container>
    )
}

export default CommentList;
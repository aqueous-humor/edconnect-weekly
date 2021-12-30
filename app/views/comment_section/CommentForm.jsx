import React, { useState, useEffect } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Container,
} from 'react-bootstrap';
import axios from 'axios';
import TextEditor from './TextEditor';


const CommentForm = ({ url, commentType, projectId, commentId, parentId, user, addComment, addReply, editComment, guest, onCancelClick, editorValue, setEditorValue, editMode, replyMode, setActiveEdit, setActiveReply, setEditMode, setReplyMode }) => {
    const [formContent, setFormContent] = useState()
    const [res, setRes] = useState();
    const [variant, setVariant] = useState('');
    const [btnText, setBtnText] = useState('');
    //const [onCancelClick, setOnCancelClick] = useState();
    //const [url, setUrl] = useState();

    useEffect(() => {
        if (editMode) {
            setVariant('success');
            setBtnText('Save Changes');
        } else if (replyMode) {
            setVariant('info');
            setBtnText('Reply');
        } else {
            setVariant('primary');
            setBtnText('Comment');
        }
    }, [])

    // useEffect(() => {
    //     if (!editMode) {
    //         setUrl(`/project/comment/${projectId}`);
    //     } else {
    //         setUrl(`/project/comment/edit/${commentId}`);
    //     }
    // }, [])



    const commentSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formDataJSON = Object.fromEntries(formData.entries());
        formDataJSON.comment = editorValue;
        formDataJSON.projectId = projectId;
        formDataJSON.type = commentType;
        formDataJSON.parentId = parentId;
        const sendComment = await axios.post(url, formDataJSON);
        const resData = sendComment.data;
        setRes(resData)
        if (resData.status === 'ok') {
            if (replyMode == true) {
                addReply(resData.comment);
                setReplyMode(false);
                setActiveReply(false);
            } else {
                addComment(resData.comment);
            }
        } else if (resData.acknowledged == true) {
            editComment(commentId, commentType, formDataJSON.comment);
            setEditMode(false);
            setActiveEdit(false);
        }
        setEditorValue('');
    }

    return (
        <Form className='mt-3' id='commentForm' onSubmit={commentSubmit} >
            {user ? (
                <input
                    type='hidden'
                    name='author'
                    value={user.firstname + ' ' + user.lastname + ',' + user._id}
                />
            ) : (
                <input
                    type='hidden'
                    name='author'
                    value={'Guest,' + guest}
                />
            )}
            <FormGroup>
                <TextEditor editorValue={editorValue} setEditorValue={setEditorValue} />
            </FormGroup>
            {editMode || replyMode ? (
                <Button variant='light' onClick={onCancelClick}>
                    Cancel
                </Button>
            ) : null
            }
            <Button variant={variant} type='submit'>
                {btnText}
            </Button>
        </Form>
    )

}

export default CommentForm;
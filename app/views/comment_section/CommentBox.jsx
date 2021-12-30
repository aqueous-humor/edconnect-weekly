import React, { useState, useEffect } from 'react';
import {
    Container,
} from 'react-bootstrap';
import CommentForm from './CommentForm';
import CommentHead from './CommentHead';
import CommentList from './CommentList';
import axios from 'axios';

const CommentBox = ({ projectId, user, guest, createdBy }) => {
    //array state representing all the comments for the project 
    const [allComments, setComments] = useState([]);
    // boolean states of this component that indicate whether the client is currently editing or replying a comment.
    const [activeEdit, setActiveEdit] = useState(false);
    const [activeReply, setActiveReply] = useState(false);
    //boolean state that indicates if the comment sorting is to be done in ascending order or not.
    const [ascending, setAscending] = useState(false);
    //creating this state in the comment box enables us to manipulate the editor value from any of our child components by passing down setEditorValue.
    const [editorValue, setEditorValue] = useState('');

    //whenever this component mounts, it makes a get request to retrieve all the parent comments belonging to the project in view
    useEffect(() => {
        async function getComments() {
            const getParentComments = await axios.get(`/project/comment/parent/${projectId}`);
            setComments(getParentComments.data.comments);
        }
        getComments();
    }, [])

    /** 
     * Adds a saved comment to the allComments array
     * @param {Object} comment - The comment object to be added to the comments array
    */
    const addComment = (comment) => {
        const newArr = [...allComments, comment];
        setComments(newArr);
    }

    return (
        <Container className='p-5 shadow-lg rounded' style={{ backgroundColor: 'paleturquoise' }}>
            <CommentHead
                comments={allComments}
                ascending={ascending}
                setAscending={setAscending}
            />
            {allComments.length === 0 ? (
                <div className="alert text-center alert-info">
                    No comments added yet
                </div>
            ) : (
                <CommentList
                    projectId={projectId}
                    user={user}
                    guest={guest}
                    createdBy={createdBy}
                    comments={allComments}
                    setComments={setComments}
                    editorValue={editorValue}
                    setEditorValue={setEditorValue}
                    activeEdit={activeEdit}
                    setActiveEdit={setActiveEdit}
                    activeReply={activeReply}
                    setActiveReply={setActiveReply}
                />
            )}
            {activeEdit == true || activeReply == true ? (
                null
            ) : (
                <CommentForm
                    commentType='parent'
                    projectId={projectId}
                    user={user}
                    guest={guest}
                    url={`/project/comment/${projectId}`}
                    addComment={addComment}
                    editorValue={editorValue}
                    setEditorValue={setEditorValue}
                />
            )}

        </Container>
    )
}

export default CommentBox;
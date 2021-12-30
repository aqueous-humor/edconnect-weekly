import React, { useState, useEffect } from 'react';
import {
    FaRegEdit,
    FaRegCommentDots,
    FaCaretDown,
    FaCaretUp
} from 'react-icons/fa';
import {
    Container,
    Button,
} from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import Interweave from 'interweave';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import CommentLike from './CommentLike';
import CommentUnlike from './CommentUnlike';
import CommentDelete from './CommentDelete';


const Comment = ({ comments, comment, guest, user, createdBy, editorValue, setEditorValue, activeEdit, setActiveEdit, activeReply, setActiveReply, editComment, deleteComment }) => {
    const { type, author, text, projectId, createdAt, _id, likes, parentId } = comment;

    // const [canLike, setCanLike] = useState(false);
    const [canDelete, setCanDelete] = useState();
    const [canEdit, setCanEdit] = useState();
    const [editMode, setEditMode] = useState(false);
    const [replyMode, setReplyMode] = useState(false);
    const [replies, setReplies] = useState([]);
    const [likesArr, setLikesArr] = useState(likes);
    const [liked, setLiked] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    // const [resp, setResp] = useState();

    useEffect(() => {
        async function getRep() {
            const getReplies = await axios.get(`/project/comment/child/${_id}`);
            setReplies(getReplies.data.comments);

        }
        if (type == 'parent') {
            getRep();
        }
    }, [])

    const addReply = (reply) => {
        const newArr = [...replies, reply];
        setReplies(newArr);
    }

    useEffect(() => {
        if (user) {
            const arr = likesArr;
            if (arr.includes(user._id)) {
                setLiked(true);
            } else {
                setLiked(false);
            }
        }
    }, [likesArr])


    const likeComment = (userId) => {
        const newArr = [...likesArr, userId];
        setLikesArr(newArr);
        setLiked(true);
    }

    const unlikeComment = (userId) => {
        const newArr = likesArr.filter((uid) => {
            return uid !== userId;
        })
        setLikesArr(newArr);
        setLiked(false);
    }

    // const editComment = (id, newCommentText) => {
    //     comments.forEach((comment) => {
    //         if (comment._id == id) {
    //             comment.text = newCommentText;
    //         }
    //     })        
    // }

    const onClickEdit = (event) => {
        event.preventDefault();
        if (editMode == false) {
            setEditMode(true);
            setActiveEdit(true);
            setEditorValue(text);
        } else {
            setEditMode(false);
            setActiveEdit(false);
            setEditorValue('');
        }
    }

    const onClickReply = (event) => {
        event.preventDefault();
        if (replyMode == false) {
            setReplyMode(true);
            setActiveReply(true)
        } else {
            setReplyMode(false);
            setActiveReply(false);
            setEditorValue('');
        }
    }

    const toggleShowReplies = (event) => {
        event.preventDefault();
        if (showReplies == false) {
            setShowReplies(true)
        } else {
            setShowReplies(false);
        }
    }

    useEffect(() => {
        setCanDelete(false)
        const delBoo = function () {
            if (guest) {
                if (guest == comment.author[1]) {
                    setCanDelete(true);
                } else if (user) {
                    if (user._id == comment.author[1] || user._id == createdBy._id) {
                        setCanDelete(true);
                    }
                }
            }
        }
        delBoo();
    }, [])

    useEffect(() => {
        setCanEdit(false);
        const editBoo = function () {
            if (user) {
                if (user._id == comment.author[1]) {
                    setCanEdit(true);
                }
            } else if (guest == comment.author[1]) {
                setCanEdit(true);
            }
        }
        editBoo();
    }, [])



    return (
        <Container className='m-3 p-2 rounded bg-secondary d-flex flex-column'>
            <Container className='media'>
                <img className="mr-3 bg-light rounded" width="48" height="48" />
                <div className="media-body p-2 shadow-sm rounded bg-light border">
                    <time className="float-right text-muted">{moment(createdAt).fromNow()}</time>
                    <h6 className="mt-0 mb-1 text-primary">{author[0]}</h6>
                    {editMode ? (
                        <Container className='border rounded'>
                            <CommentForm
                                user={user}
                                guest={guest}
                                projectId={projectId}
                                commentId={_id}
                                commentType={type}
                                url={`/project/comment/edit/${_id}`}
                                onCancelClick={onClickEdit}
                                editComment={editComment}
                                editMode={editMode}
                                editorValue={editorValue}
                                setEditorValue={setEditorValue}
                                setActiveEdit={setActiveEdit}
                                setEditMode={setEditMode}
                            />
                        </Container>
                    ) : (<Interweave content={text} />)
                    }
                    <div className='mt-2 d-flex justify-content-around'>
                        {type == 'parent' ? (
                            <Button variant='link' onClick={onClickReply} disabled={activeReply}>
                                <FaRegCommentDots />
                                <span className='text-primary'>({replies.length})</span>
                            </Button>) : null}
                        {user ? (
                            <>
                                {liked == true ? (
                                    <CommentUnlike
                                        id={_id}
                                        userId={user._id}
                                        likesCount={likesArr.length}
                                        unlikeComment={unlikeComment}
                                    />
                                ) : (
                                    <CommentLike
                                        id={_id}
                                        userId={user._id}
                                        likesCount={likesArr.length}
                                        likeComment={likeComment}
                                    />
                                )}
                            </>
                        ) : (null)}
                        {canEdit == true ? (
                            <Button variant='link' onClick={onClickEdit} disabled={activeEdit}>
                                <FaRegEdit />
                            </Button>
                        ) : null}
                        {canDelete == true ? (
                            <CommentDelete
                                id={_id}
                                type={type}
                                deleteComment={deleteComment}
                            />
                        ) : null}
                    </div>
                </div>
            </Container>
            {replies.length > 0 ? (
                <Button className='mt-1 mb-1' variant='light' onClick={toggleShowReplies} size='sm'>
                    {showReplies == true ? ('hide replies') : ('show replies')}
                    {showReplies == true ? <FaCaretUp /> : <FaCaretDown />}
                </Button>) : null}
            {showReplies == true ? (
                <CommentList
                    replies={replies}
                    setReplies={setReplies}
                    parentId={parentId}
                    user={user}
                    guest={guest}
                    createdBy={createdBy}
                    editorValue={editorValue}
                    setEditorValue={setEditorValue}
                    activeEdit={activeEdit}
                    setActiveEdit={setActiveEdit}
                />
            ) : null
            }
            {replyMode == true ? (
                <CommentForm
                    user={user}
                    guest={guest}
                    projectId={projectId}
                    commentType={'child'}
                    parentId={_id}
                    url={`/project/comment/${projectId}`}
                    onCancelClick={onClickReply}
                    addReply={addReply}
                    replyMode={replyMode}
                    editorValue={editorValue}
                    setEditorValue={setEditorValue}
                    setReplyMode={setReplyMode}
                    setActiveReply={setActiveReply}
                />
            ) : null
            }
        </Container>
    )
}

export default Comment;
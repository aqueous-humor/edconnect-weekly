import React, {useState, useEffect} from 'react';
import {
    Button,
    Form
} from 'react-bootstrap';
import {
    FaHeart
} from 'react-icons/fa';
import axios from 'axios';

const CommentUnlike = ({ id, userId, likesCount, unlikeComment}) => {
    const onClickUnlike = async (event) => {
        event.preventDefault();
        const postUnlike = await axios.post(`/project/comment/unlike/${id}`, {userId});
        const resData = postUnlike.data;
        if (resData.acknowledged == true) {
            unlikeComment(userId);
        }

    }

    return (
        <Form id='likeComment' onSubmit={onClickUnlike}>
            <Button variant='link' type='submit' >
                <FaHeart />
                <span className='text-primary'>({likesCount})</span>
            </Button>
        </Form>
    )
}

export default CommentUnlike;
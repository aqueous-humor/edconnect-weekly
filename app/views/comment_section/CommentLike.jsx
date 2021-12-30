import React, {useState, useEffect} from 'react';
import {
    Button,
    Form
} from 'react-bootstrap';
import {
    FaRegHeart
} from 'react-icons/fa';
import axios from 'axios';

const CommentLike = ({ id, userId, likesCount, likeComment}) => {
    const [btnClass, setBtnClass] = useState('');

    useEffect(() => {
        if (!userId) {
            setBtnClass('disabled');
        }
    }, [])
    const onClickLike = async (event) => {
        event.preventDefault();
        const postLike = await axios.post(`/project/comment/like/${id}`, {userId});
        const resData = postLike.data;
        if (resData.acknowledged == true) {
            likeComment(userId);
        }

    }

    return (
        <Form id='likeComment' onSubmit={onClickLike}>
            <Button variant='link' type='submit' className={btnClass} >
                <FaRegHeart />
                <span className='text-primary'>({likesCount})</span>
            </Button>
        </Form>
    )
}

export default CommentLike;
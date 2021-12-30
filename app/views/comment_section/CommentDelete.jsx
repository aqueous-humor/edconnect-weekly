import React from 'react';
import {
    Form,
    Button,
} from 'react-bootstrap';
import {
    FaRegTrashAlt,
} from 'react-icons/fa';
import axios from 'axios';

const CommentDelete = ({ id, type, deleteComment }) => {
    

    const onClickDel = async (event) => {
        event.preventDefault();
        const delReq = await axios.delete(`/project/comment/delete/${id}`, {type});
        const resData = delReq.data;
        if (resData.length == undefined) { //i.e if it is an object, not an array. This tells us that no error was caught from the delComment service.
            if (resData.deletedCount == 1) {
                deleteComment(id, type);
            }
        }
    }

    return (
        <Form id='delComment' onSubmit={onClickDel}>
            <Button variant='link' type='submit' >
                <FaRegTrashAlt />
            </Button>
        </Form>
    )
}

export default CommentDelete;
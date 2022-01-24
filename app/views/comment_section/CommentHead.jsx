import React from 'react';
import {
    Badge,
    Container,
} from 'react-bootstrap';



const CommentHead = ({ children, comments }) => {


    return (
        <Container className='mb-4 d-flex justify-content-between border-bottom border-secondary'>
            <h5 className="text-muted">
                <Badge variant="primary">{comments.length}</Badge>{" "}
                {comments.length == 1 ? "Comment" : 'Comments'}
            </h5>
            {children}
        </Container>
    )
}

export default CommentHead;
import React, { useState, useEffect } from 'react';
import {
    Button,
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import Layout from './shared/Layout';
import CommentForm from './comment_section/CommentForm';
import CommentHead from './comment_section/CommentHead';
import CommentList from './comment_section/CommentList';
import CommentSort from './comment_section/CommentSort';
import Comment from './comment_section/Comment';
import axios from 'axios';


const Project = ({ project, createdBy, user, guest }) => {
    //array state representing all the comments for the project 
    const [parentComments, setComments] = useState([]);
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
            const getParentComments = await axios.get(`/project/comment/parent/${project._id}`);
            setComments(getParentComments.data.comments);
        }
        getComments();
    }, [])

    /** 
     * Adds a saved comment to the parentComments array
     * @param {Object} comment - The comment object to be added to the comments array
    */
    const addParent = (comment) => {
        const newArr = [...parentComments, comment];
        setComments(newArr);
    }

    const deleteParent = (id) => {
        const newArr = comments.filter((comment) => {
            return comment._id !== id;
        })
        setComments(newArr);
    }

    const editParent = (id, newText) => {
        parentComments.forEach((comment) => {
            if (comment._id == id) {
                comment.text = newText;
            }
        })
    }

    return (
        <Layout user={user}>
            <main>
                <Container className='border rounded p-3 mt-5'>
                    <Container>
                        <Row>
                            <h4 id='project_name'>{project.name}</h4>
                        </Row>
                    </Container>
                    <Container className='bg-light mt-4'>
                        <Row className='align-items-center'>
                            <Col className='text-center mt-3'>
                                <h6>Created By</h6>
                                <p id='project_author'>{createdBy.firstname}{' '}{createdBy.lastname}</p>
                            </Col>
                            <Col className='text-center mt-3'>
                                <h6>Date Created</h6>
                                <p>{new Date(project.createdAt).toLocaleDateString()}</p>
                            </Col>
                            <Col className='text-center mt-3'>
                                <h6>Last Updated</h6>
                                <p>{new Date(project.updatedAt).toLocaleDateString()}</p>
                            </Col>
                            <Col className='text-center'>
                                <Button>
                                    Edit Project
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Container>
                <Container className='mt-5'>
                    <Row>
                        <Col>
                            <h5 className='border-bottom py-3'>Project Abstract</h5>
                            <p className='mt-4 mb-5' id='project_abstract'>{project.abstract}</p>
                            <Container className='p-5 shadow-lg rounded' style={{ backgroundColor: 'paleturquoise' }}>
                                <CommentHead comments={parentComments} >
                                    <CommentSort
                                        ascending={ascending}
                                        setAscending={setAscending}
                                        comments={parentComments}
                                    />
                                </CommentHead>
                                {parentComments.length === 0 ? (
                                    <div className="alert text-center alert-info">
                                        No comments added yet
                                    </div>
                                ) : (
                                    <CommentList>
                                        {parentComments.map((comment) => {
                                            return (
                                                <Comment
                                                    key={comment._id}
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
                                                    editComment={editParent}
                                                    deleteComment={deleteParent}
                                                />
                                            )
                                        })}
                                    </CommentList>
                                )}
                                {activeEdit == true || activeReply == true ? (
                                    null
                                ) : (
                                    <CommentForm
                                        commentType='parent'
                                        projectId={project._id}
                                        user={user}
                                        guest={guest}
                                        url={`/project/comment/${project._id}`}
                                        addParent={addParent}
                                        editorValue={editorValue}
                                        setEditorValue={setEditorValue}
                                    />
                                )}

                            </Container>
                        </Col>
                        <Col>
                            <h5 className='border-bottom py-3'>Project Details</h5>
                            <div className='card'>
                                <h5 className='card-header'>Author(s)</h5>
                                <div className='card-body' id='project_authors'>
                                    {project.authors.map(author => {
                                        return (<p key={author} className='card-text'>{author}</p>)
                                    })}
                                </div>
                                <div className='card-footer' id='project_tags'>
                                    {project.tags.map(tag => {
                                        return (<a key={tag} href='#' className='card-link'>{tag}</a>)
                                    })}
                                </div>
                            </div>
                            <div className='card mt-4'>
                                <h5 className='card-header'>Project Files</h5>
                                <div className='card-body'>
                                    <p className='card-text text-center'>No files uploaded yet</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
        </Layout>
    )

}

export default Project;
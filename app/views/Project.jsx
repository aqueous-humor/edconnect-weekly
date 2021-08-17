import React from 'react';
import {
    Button,
    Form,
    FormGroup,
    FormLabel,
    FormControl,
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import Layout from './shared/Layout';

const Project = ({ project, createdBy, user }) => {

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
                                <p>{ new Date(project.updatedAt).toLocaleDateString()}</p>
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
                            <Form>
                                <FormGroup>
                                    <FormLabel><strong>Comments</strong></FormLabel>
                                    <FormControl as='textarea' type='text' name='abstract' placeholder='Leave a comment' required />
                                </FormGroup>
                                <Button variant='primary' type='submit'>
                                    Submit
                                </Button>
                            </Form>
                            <div className='mt-4 border-top'>
                                <p className="text-center mt-3">No comments added yet</p>
                            </div>
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
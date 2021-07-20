import React, { useState, useEffect } from 'react';
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
import { useParams } from 'react-router-dom';

const Project = () => {
    const { id } = useParams();
    const ID = id.slice(1);
    const [projectName, setProjectName] = useState('');
    const [projectAbstract, setProjectAbstract] = useState('');
    const [projectAuthors, setProjectAuthors] = useState([]);
    const [projectTags, setProjectTags] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');



    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const getProjectDB = async () => {
            const projectInfoResponse = await fetch(`/api/projects/${ID}`, { signal: signal });
            const projectInfo = await projectInfoResponse.json();
            const createdBy = projectInfo.createdBy;
            const userInfoResponse = await fetch(`/api/users/${createdBy}`, { signal: signal });
            const userData = await userInfoResponse.json();
            const FirstName = userData.firstname;
            const LastName = userData.lastname;
            const ProjectName = projectInfo.name;
            const ProjectAbstract = projectInfo.abstract;
            const ProjectAuthors = projectInfo.authors;
            const ProjectTags = projectInfo.tags;
            setProjectName(ProjectName);
            setProjectAbstract(ProjectAbstract);
            setProjectAuthors(ProjectAuthors);
            setProjectTags(ProjectTags);
            setFirstName(FirstName);
            setLastName(LastName);
        }
        getProjectDB();
        return () => {
            abortController.abort();
        }
    }, [ID])

    return (
        <Layout>
            <main>
                <Container className='border rounded p-3 mt-5'>
                    <h4 id='project_name'>{projectName}</h4>
                    <Container className='bg-light mt-4'>
                        <Row className='align-items-center'>
                            <Col className='text-center mt-3'>
                                <h6>Created By</h6>
                                <p id='project_author'>{firstName}{' '}{lastName}</p>
                            </Col>
                            <Col className='text-center mt-3'>
                                <h6>Date Created</h6>
                                <p>2020-08-30</p>
                            </Col>
                            <Col className='text-center mt-3'>
                                <h6>Last Updated</h6>
                                <p>2020-08-30</p>
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
                            <p className='mt-4 mb-5' id='project_abstract'>{projectAbstract}</p>
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
                                    {projectAuthors.map(author => {
                                        return (<p key={author} className='card-text'>{author}</p>)
                                    })}
                                </div>
                                <div className='card-footer' id='project_tags'>
                                    {projectTags.map(tag => {
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
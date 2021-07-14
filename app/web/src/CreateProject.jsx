import React, { useState } from 'react';
import {
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    Button,
    Col,
    Container,
} from 'react-bootstrap';
import Layout from './shared/Layout';
import { useHistory } from 'react-router-dom';

const CreateProject = () => {
    let history = useHistory();

    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState([]);

    const submitProject = async (event) => {
        event.preventDefault();
        const createProjectData = new FormData(event.target);
        const createProjectDataJSON = Object.fromEntries(createProjectData.entries());
        createProjectDataJSON.authors = createProjectDataJSON.authors.split(',');
        createProjectDataJSON.tags = createProjectDataJSON.tags.split(',');
        const submitResponse = await fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createProjectDataJSON, null, 1)
        });
        const submitResponseJSON = await submitResponse.json();
        const Status = submitResponseJSON.status;
        const Errors = submitResponseJSON.errors;
        if (Status !== 'error') {
            history.push('/')
        }
        setStatus(Status);
        setErrors(Errors);
    }

    return (
        <Layout>
            <>
                <Container className='border rounded p-5 mt-5'>
                    <h4 className="mt-2 mb-4 font-weight-bold">Submit Project</h4>
                    {status == 'error' &&
                        <div className='alert alert-danger'>
                            {errors.map(error => {
                                return (<p>{error}</p>)
                            })}
                        </div>
                    }
                    <Form onSubmit={submitProject} noValidate>
                        <FormGroup>
                            <FormLabel>Project Name</FormLabel>
                            <FormControl type='text' placeholder='Enter Project Name' name='name' required />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Project Abstract</FormLabel>
                            <FormControl as='textarea' type='text' name='abstract' required />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Author(s)</FormLabel>
                            <FormControl type='text' placeholder='Enter Author name(s) (separated by commas)' name='authors' required />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Tag(s)</FormLabel>
                            <FormControl type='text' placeholder='Use # to tag project with different topics separated by commas (e.g. #javascript, #mongodb)' name='tags' required />
                        </FormGroup>
                        <Button variant="primary" type="submit">
                            Continue
                        </Button>
                    </Form>
                </Container>
            </>
        </Layout>
    )
}

export default CreateProject;
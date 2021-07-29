import React from 'react';
import {
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    Button,
    Container,
} from 'react-bootstrap';
import Layout from './shared/Layout';


const CreateProject = ({ errors, user }) => {



    return (
        <Layout user={user}>
            <>
                <Container className='border rounded p-5 mt-5'>
                    <h4 className="mt-2 mb-4 font-weight-bold">Submit Project</h4>
                    {errors.length > 0 &&
                        <div className='alert alert-danger'>
                            {errors.map(error => {
                                return (<p key={error}>{error}</p>)
                            })}
                        </div>
                    }
                    <Form id='createProjectForm' method='post' action='/projects/submit' noValidate>
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
import React from 'react';
import {
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    Button,
    Col,
    Container,
    Alert
} from 'react-bootstrap';
import Layout from './shared/Layout';


const Signup = ({ programs, gradYear, errors, user }) => {

    return (
        <Layout user={user}>
            <>
                <Container className='border rounded p-5 mt-5'>
                    <h4 className="mt-2 mb-4 font-weight-bold">Sign up</h4>
                    {errors.length > 0 &&
                        <div className='alert alert-danger'>
                            {errors.map((error) => {
                                return (<p key={error}>{error}</p>)
                            })}
                        </div>
                    }
                    <Form id='signupForm' method='post' action='signup'>
                        <Form.Row>
                            <FormGroup as={Col} controlId='firstname'>
                                <FormLabel>First Name</FormLabel>
                                <FormControl type='text' placeholder='First Name' name='firstName' required />
                            </FormGroup>
                            <FormGroup as={Col} controlId='lastname'>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl type='text' placeholder='Last Name' name='lastName' required />
                            </FormGroup>
                        </Form.Row>
                        <Form.Row>
                            <FormGroup as={Col} controlId='email'>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl type='email' placeholder='Your Email Address' name='email' required />
                            </FormGroup>
                            <FormGroup as={Col} controlId='password'>
                                <FormLabel>Password</FormLabel>
                                <FormControl type='password' placeholder='Your Password' name='password' required />
                            </FormGroup>
                        </Form.Row>
                        <Form.Row>
                            <FormGroup as={Col} controlId='program'>
                                <FormLabel>Program</FormLabel>
                                <FormControl as='select' defaultValue='Choose...' name='program' >
                                    <option>Choose...</option>
                                    {programs.map((program, index) => {
                                        return (<option key={index}>{program}</option>)
                                    })}
                                </FormControl>
                            </FormGroup>
                            <FormGroup as={Col} controlId='matricNumber'>
                                <FormLabel>Matriculation Number</FormLabel>
                                <FormControl type='text' placeholder='e.g. 16/2020' name='matricNumber' />
                            </FormGroup>
                            <FormGroup as={Col} controlId='graduationYear'>
                                <FormLabel>Graduation Year</FormLabel>
                                <FormControl as='select' defaultValue='Choose...' name='graduationYear'  >
                                    <option>Choose...</option>
                                    {gradYear.map((gradYear, index) => {
                                        return (<option key={index}>{gradYear}</option>)
                                    })}
                                </FormControl>
                            </FormGroup>
                        </Form.Row>
                        <Button variant="primary" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Container>
            </>
        </Layout>
    )
}

export default Signup;
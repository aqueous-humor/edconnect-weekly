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

const Login = ({ user, errors }) => {

    return (
        <Layout user={user} >
            <>
                <Container className='border rounded p-5 mt-5'>
                    <h4 className="mt-2 mb-4 font-weight-bold">Login</h4>
                    {errors.length > 0 &&
                        <div className='alert alert-danger'>
                            {errors.map(error => {
                                return (<p key={error}>{error}</p>)
                            })}
                        </div>
                    }
                    <Form id='loginForm' method='post' action='login'>
                        <FormGroup>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl type='email' placeholder='Enter Email' name='email' required />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Password</FormLabel>
                            <FormControl type='password' placeholder='Password' name='password' required />
                        </FormGroup>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Container>
            </>
        </Layout>
    )
}

export default Login;
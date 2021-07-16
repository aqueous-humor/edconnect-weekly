import React, { useState, } from 'react';
import {
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    Button,
    Container,
} from 'react-bootstrap';
import Layout from './shared/Layout';
import { useCookies } from "react-cookie";
import { useHistory } from 'react-router-dom';

const Login = () => {
    let history = useHistory();

    const [status, setStatus] = useState('');
    const [cookies, setCookies] = useCookies(['uid']);

    const login = async (event) => {
        event.preventDefault();
        const loginFormData = new FormData(event.target);
        const loginFormJSON = Object.fromEntries(loginFormData.entries());
        const loginResponse = await fetch('/api/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(loginFormJSON, null, 1)
      });
      const loginResponseJSON = await loginResponse.json();
      const Status = loginResponseJSON.status;
      const Data = loginResponseJSON.data;
      if (Status !== 'error') {
        setCookies('uid', Data.id, {
            path: '/',
        })
        history.push('/')
    }
      setStatus(Status);
    }

    return (
        <Layout>
            <>
                <Container className='border rounded p-5 mt-5'>
                    <h4 className="mt-2 mb-4 font-weight-bold">Login</h4>
                    {status === 'error' &&
                        <div className='alert alert-danger'>
                            <p>Invalid email/password</p>
                        </div>
                    }
                    <Form onSubmit={login}>
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
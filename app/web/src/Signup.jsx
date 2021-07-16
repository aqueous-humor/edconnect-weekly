import React, { useState, useEffect } from 'react';
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
import { useCookies } from "react-cookie";
import { useHistory } from 'react-router-dom';


const Signup = () => {
    let history = useHistory()

    const [programList, setProgramList] = useState([]);
    const [graduationYearList, setGraduationYearList] = useState([]);
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState([]);
    const [cookies, setCookies] = useCookies(['uid']);


    const registerUser = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formJSON = Object.fromEntries(formData.entries());
        const RegisterResponse = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formJSON, null, 1)
        });
        const RegisterResponseJSON = await RegisterResponse.json();
        const Status = RegisterResponseJSON.status;
        const Errors = RegisterResponseJSON.errors;
        const Data = RegisterResponseJSON.data;
        if (Status !== 'error') {
            setCookies('uid', Data.id, {
                path: '/',
            })
            history.push('/')
        }
        setStatus(Status);
        setErrors(Errors);
    }

    
    

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const getPrograms = async () => {
            const programs = await fetch('/api/programs', {signal: signal});
            const programsJSON = await programs.json();
            setProgramList(programsJSON);
        };
        const getGraduationYears = async () => {
            const graduationYears = await fetch('/api/graduationYears', {signal: signal});
            const graduationYearsJSON = await graduationYears.json();
            setGraduationYearList(graduationYearsJSON);
        };
        getPrograms();
        getGraduationYears();
        return () => {
            abortController.abort();
        }
    }, []);



    return (
        <Layout>
            <>
                <Container className='border rounded p-5 mt-5'>
                    <h4 className="mt-2 mb-4 font-weight-bold">Sign up</h4>
                    {status === 'error' &&
                        <div className='alert alert-danger'>
                            {errors.map(error => {
                                return (<p>{error}</p>)
                            })}
                        </div>
                    }
                    <Form onSubmit={registerUser}>
                        <Form.Row>
                            <FormGroup as={Col} controlId='firstname'>
                                <FormLabel>First Name</FormLabel>
                                <FormControl type='text' placeholder='First Name' name='firstname' required />
                            </FormGroup>
                            <FormGroup as={Col} controlId='lastname'>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl type='text' placeholder='Last Name' name='lastname' required />
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
                                    {programList.map((program, index) => {
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
                                    {graduationYearList.map((gradYear, index) => {
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
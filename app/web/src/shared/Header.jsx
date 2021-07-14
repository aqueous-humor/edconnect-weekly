import React, { useState, useEffect } from 'react';
import {
    Nav,
    Navbar,
    Form,
    FormControl,
    Button,
} from 'react-bootstrap';
import { useCookies } from "react-cookie";
import { useHistory } from 'react-router-dom';

export default () => {
    let history = useHistory();
    const [cookies, setCookies] = useCookies(['uid']);
    const [userFirstName, setUserFirstname] = useState('');

    const updateNav = async () => {
        const UserDb = await fetch('/api/users/' + cookies.uid + '');
        const UserDbJSON = await UserDb.json();
        const FirstName = UserDbJSON.firstname;
        setUserFirstname(FirstName);
    }
    useEffect(() => {
        if (cookies.uid) {
            updateNav();
        }
    }, [])

    const logout = () => {
        history.push('/');
        setCookies('uid', '', {
            path: '/',
            expires: (new Date(Date.now())),
        })
    }

    return (
        <Navbar bg='primary' variant='dark' className='justify-content-between'>
            <Nav>
                <Navbar.Brand href='/'>Project Explorer App</Navbar.Brand>
                <Form inline>
                    <FormControl className='mr-2' type='text' placeholder='Search Projects' />
                    <Button type='submit' variant='outline-light'>
                        Search
                    </Button>
                </Form>
                <Nav className='ml-2'>
                    <Nav.Link href='/projects'>Projects</Nav.Link>
                    <Nav.Link href='/projects/submit'>Create Project</Nav.Link>
                </Nav>
            </Nav>
            {cookies.uid ? (
                <Nav className='justify-content-end'>
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                    <Navbar.Text>Hi,{' '}{userFirstName}</Navbar.Text>

                </Nav>
            ) : (
                    <Nav>
                        <Nav.Link href='/signup'>Signup</Nav.Link>
                        <Nav.Link href='/login'>Login</Nav.Link>
                    </Nav>
                )}
        </Navbar>
    )
}
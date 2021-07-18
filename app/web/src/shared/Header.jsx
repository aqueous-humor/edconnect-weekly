import React, { useState, useEffect, } from 'react';
import {
    Nav,
    Navbar,
    Form,
    FormControl,
    Button,
} from 'react-bootstrap';
import { useCookies } from "react-cookie";
import { useHistory } from 'react-router-dom';

const Header = () => {
    let history = useHistory();
    

    const [userFirstName, setUserFirstname] = useState('');
    const [cookies, setCookies] = useCookies(['uid']);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        const updateNav = async () => {
            const UserDb = await fetch('/api/users/' + cookies.uid + '', {signal: signal});
            const UserDbJSON = await UserDb.json();
            const FirstName = UserDbJSON.firstname;
            setUserFirstname(FirstName);
        }
        if (cookies.uid) {
            updateNav();
        }
        return () => {
           abortController.abort();
        }
    }, [cookies.uid])

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
                    <Nav.Link id='logout' onClick={logout}>Logout</Nav.Link>
                    <Navbar.Text id='username'>Hi,{' '}{userFirstName}</Navbar.Text>

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

export default Header;
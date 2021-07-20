import React, { useState, useEffect, } from 'react';
import {
    Nav,
    Navbar,
    Form,
    FormControl,
    Button,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Header = () => {
    let history = useHistory();


    const [userFirstName, setUserFirstname] = useState('');

    const setCookie = (name, value, duration) => {
        let date = new Date();
        date.setTime(date.getTime() + (duration * 24 * 60 * 60 * 1000));
        let expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    const getCookie = (name) => {
        let cookieDecoded = decodeURIComponent(document.cookie);
        let cookiesArr = cookieDecoded.split(';');
        for (let i = 0; i < cookiesArr.length; i++) {
            let cookie = cookiesArr[i].split('=');
            if (name === cookie[0].trim()) {
                return cookie[1];
            }
        }
        return '';
    }

    useEffect(() => {
        const cookie = getCookie('uid');
        const abortController = new AbortController();
        const signal = abortController.signal;
        const updateNav = async () => {
            const UserDb = await fetch('/api/users/' + cookie + '', { signal: signal });
            const UserDbJSON = await UserDb.json();
            const FirstName = UserDbJSON.firstname;
            setUserFirstname(FirstName);
        }
        if (cookie !== '') {
            updateNav();
        }
        return () => {
            abortController.abort();
        }
    }, [])

    const logout = () => {
        history.push('/');
        setCookie('uid', '', -1)
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
            {getCookie('uid') !== '' ? (
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
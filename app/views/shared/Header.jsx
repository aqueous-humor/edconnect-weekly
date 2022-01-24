import React, { useState, useEffect } from 'react';
import {
    Nav,
    Navbar,
    Form,
    FormControl,
    Button,
    Link,
    Badge,
} from 'react-bootstrap';
import {
    FaBell,
} from 'react-icons/fa';
import axios from 'axios';

const Header = ({ user }) => {
    const [unreadCount, setUnreadCount] = useState()

    useEffect(() => {
        async function getUnreadCount() {
            const getUnread = await axios.get(`/notifications/unread/${user._id}`);
            const data = getUnread.data
            setUnreadCount(data.unreadNotifs);
        }
        getUnreadCount()
    }, [])

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
            {user ? (
                <Nav className='justify-content-end'>
                    <Nav.Link href={`/notifications/${user._id}`}>
                        <FaBell />
                        {unreadCount > 0 ? (
                            <span>
                                <Badge pill variant='danger'>
                                    {unreadCount}
                                </Badge>
                            </span>
                        ) : null}
                    </Nav.Link>
                    <Nav.Link id='logout' href='/logout'>Logout</Nav.Link>
                    <Navbar.Text id='username'>Hi,{' '}{user.firstname}</Navbar.Text>
                </Nav>
            ) : (
                <Nav>
                    <Nav.Link href='/signup'>Sign Up</Nav.Link>
                    <Nav.Link href='/login'>Login</Nav.Link>
                </Nav>
            )
            }
        </Navbar>
    )
}

export default Header;
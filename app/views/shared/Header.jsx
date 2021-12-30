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
// import NotificationIcon from './NotificationIcon';

const Header = ({ user }) => {
    // const [unreadNotifs, setUnreadNotifs] = useState(notifications.filter((notification) => {
    //     return notification.isRead == false;
    // }));

    //useEffect(() => {
    // notifications.filter((notification) => {
    //     return notification.isRead == false;
    // })
    // }, [])

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
                    <Nav.Link id='logout' href='/logout'>Logout</Nav.Link>
                    <Navbar.Text id='username'>Hi,{' '}{user.firstname}</Navbar.Text>
                    {/* <Link href='#'>
                        <FaBell />
                        {unreadNotifs.length > 0 ? (
                            <span>
                                <Badge pill variant='danger'>
                                    {unreadNotifs.length}
                                </Badge>
                            </span>
                        ) : null}
                    </Link> */}
                    {/* <NotificationIcon user={user} unreadNotifs={unreadNotifs.length} /> */}
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
import React, { useState, useEffect } from 'react';
import {
    Button,
    Container,
} from 'react-bootstrap';
import Layout from './shared/Layout';
import moment from 'moment';

const Notifications = ({ user, notifs }) => {
    
    return (
        <Layout user={user}>
            <h4 className="mt-4 mb-4 ml-4 p-5 font-weight-bold">Notifications</h4>
            <Container className='border rounded p-5 mt-5'>
                {notifs.length > 0 ? (
                    <>
                        {notifs.map((notif) => {
                            return (
                                <Container key={notif._id} className={notif.isRead === false ? 'media bg-secondary' : 'media'}>
                                    <div className="media-body p-2 shadow-sm rounded bg-light border">
                                        <time className="float-right text-muted">{moment(notif.createdAt).fromNow()}</time>
                                        <a href={`/project/${notif.projectId}`}>{notif.message}</a>
                                    </div>
                                </Container>
                            )
                        })}
                    </>
                ) : (
                    <div className="alert text-center alert-info">
                        You have no notifications yet, {user.firstname}.
                    </div>
                )}
            </Container>
        </Layout>
    )
}

export default Notifications;
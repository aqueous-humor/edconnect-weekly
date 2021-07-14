import React, { useState, useEffect } from 'react';
import {
    Button,
    Jumbotron,
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from './shared/Layout';


const Home = () => {
    const [projectList, setProjectList] = useState([]);
    const getProjects = async () => {
        const projects = await fetch('/api/projects');
        const projectsJSON = await projects.json();
        setProjectList(projectsJSON);
    };
    useEffect(() => {
        getProjects();
    }, []);

    return (
        <Layout>
            <>
                <Jumbotron>
                    <div>
                        <h1>Welcome to Project Explorer</h1>
                    </div>
                    <p>Project Explorer is a repository for final years projects across all departments at your institution. You can submit your project and search projects submitted by others to learn from.</p>
                    <div>
                        <Button href='/signup' variant='primary' className='mr-3'>Get Started</Button>
                        <Button href='/login' variant='secondary'>Login</Button>
                    </div>
                </Jumbotron>
                <Container>
                    <Row>
                        {projectList.map((project) => {
                            return (<Col key={project.name}>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h5 className='card-title'>
                                            <Link className='card-link' to={`projects/:${project.id}`}>{project.name}</Link>
                                        </h5>
                                        <h6 className='card-subtitle text-muted my-2'>{project.authors}</h6>
                                        <p className='card-text'>{project.abstract}</p>
                                        <div>
                                            {project.tags.map((tag) => {
                                                return (<a className='card-link' key={tag} href='#'>{tag}</a>)
                                            })}
                                        </div>
                                    </div>
                                </div>

                            </Col>)
                        })}
                    </Row>
                </Container>
            </>
        </Layout>
    )
}

export default Home;
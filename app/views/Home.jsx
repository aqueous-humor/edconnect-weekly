import React from 'react';
import {
    Button,
    Jumbotron,
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import Layout from './shared/Layout';


const Home = ({ projectList, user }) => {

    return (
        <Layout user={user} >
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
                    <Row className='showcase'>
                        {projectList.slice(0, 4).map((project) => {
                            return (<Col key={project.name}>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h5 className='card-title'>
                                            <a className='card-link' href={`project/${project.id}`}>{project.name}</a>
                                        </h5>
                                        <h6 className='card-subtitle text-muted my-2'>{project.authors}</h6>
                                        <p className='card-text'>{project.abstract}</p>
                                        <div>
                                            {project.tags.map((tag) => {
                                                return (<a className='card-link' href='#' key={tag} >{tag}</a>)
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
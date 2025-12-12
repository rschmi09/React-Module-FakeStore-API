// src/components/HomePage.jsx

import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function HomePage() {
    return (
        <Container>

            <h1 className="mb-4">Welcome to FakeStore</h1>
            <p className='mb-5'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. At ullam hic
                voluptatum! Reprehenderit eaque sint, quos sequi error accusamus quam
                voluptas sapiente expedita, quaerat saepe cupiditate adipisci,
                voluptate perspiciatis animi.
            </p>

            <p className='fw-bold mb-1'>FakeStoreAPI is a TESTING API</p>
            <p>Responses to POST/PUT/DELETE will appear successfull,
               but the underlying data will not change pernamently. 
            </p>

        </Container>
    );
}

export default HomePage;
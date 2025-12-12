// src/components/NewProductForm.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import AddProductModal from './AddProductModal';
import axios from 'axios';

const NewProductForm = () => {

    // Form fields
    const [formData, setFormData] = useState({
        title: '',
        price:'',
        description:'',
        category:'',
    });

    const [submitted, setSubmitted] = useState(false);
    const [newProduct, setNewProduct] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // confirmation modal
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/products');
    };

    const [validated, setValidated] = useState(false);

    // handle user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData( {
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        // prevent a default form being submitted
        e.preventDefault();

        // validation
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            
            try {
                const response = await axios.post('https://fakestoreapi.com/products', formData);
                console.log(response.data);
                setNewProduct(response.data);
                setSubmitted(true);
                setShowModal(true);
                setError(null);

            } catch (err) {
                setError(`Error submitting the form. Please try again: ${err.message}`);
                setSubmitted(false);
            }
        }

        setValidated(true);

    };

    return (

        <Container className='mt-4'style={{ maxWidth: '600px' }}>
            <h2 className="mb-4">Add a Product</h2>

            {/*FormModal*/}
            <AddProductModal newProduct={newProduct} submitted={submitted} showModal={showModal} handleCloseModal={handleCloseModal} />

            {/* Aletrs */}
            {submitted && (
                <Alert variant="success" dismissible>
                    {newProduct.name} added successfully!
                </Alert>
            )}

            {error && (
                <Alert variant="danger" dismissible>
                    {error}
                </Alert>
            )}    

            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                {/*Product Title*/}    
                <Form.Group controlId='formName' className='mb-3'>

                    <Form.Label className="fw-bold">Product Title</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Product Title'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <Form.Control.Feedback type='invalid'>
                        Please provide a product title
                    </Form.Control.Feedback>

                </Form.Group>
                    
                {/*Product Price*/}     
                <Form.Group controlId='formPrice' className='mb-3'>

                    <Form.Label className="fw-bold">Price</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Price'
                        name='price'
                        value={formData.price}
                        onChange={handleChange}
                        step='0.01'
                        min='0'
                        required
                    />

                    <Form.Control.Feedback type='invalid'>
                        Please provide a valid price
                    </Form.Control.Feedback>

                </Form.Group>
                    
                {/*Product Description*/}      
                <Form.Group controlId='formDescription' className='mb-3'>

                    <Form.Label className="fw-bold">Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder='Description'
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <Form.Control.Feedback type='invalid'>
                        Please provide a product description
                    </Form.Control.Feedback>

                </Form.Group>

                {/*Product Category*/}     
                <Form.Group controlId='formCategory' className='mb-4'>

                    <Form.Label className="fw-bold">Category</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Category'
                        name='category'
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />

                    <Form.Control.Feedback type='invalid'>
                        Please provide a product category
                    </Form.Control.Feedback>

                </Form.Group>
                 

                <Button variant="primary" type="submit" className="mt-3">
                    Submit
                </Button>

            </Form>

        </Container>

    );

};

export default NewProductForm;
// src/components.EditProduct.jsx

import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useFetchProductId } from './FetchProducts';
import { useUpdateProduct } from './UpdateProduct';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';


// Update an existing product
const EditProduct = () => {

    const { productId } = useParams();
    const navigate = useNavigate();

    // useFetchProductId hook
    const { 
        product, 
        loading, 
        error:fetchError 
    } = useFetchProductId(productId);

    // update the hook
    const {
        updateProduct,
        loading: updating,
        error: updateError,
        success
    } = useUpdateProduct();

    // local form state
    const [formData, setFormData] = useState ({
        title: '',
        price:'',
        description:'',
        category:'',
    });


;    // initialize form data ONCE after product loaded
    useEffect(() => {
        if (!product) return;
            
        setFormData({
            title: product.title || '',
            price: product.price || '',
            description: product.description || '',
            category: product.category || ''
        });

    }, [product]);


    // handle imput
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    // submit changes
    const handleSubmit = async (e) => {
        e.preventDefault();

        await updateProduct(productId, formData);

        if (!updateError) {
            setTimeout(() => navigate('/products'), 1500);
        }

    };    

    // Loading State - fetch product
    if (loading) {
        return (
            <Container>
                <h3>
                <Spinner
                    animation="border"
                    variant="info"
                    style={{ marginRight: '15px' }}
                    role="status"
                />
                Loading...
                </h3>
            </Container>
        )
    }

    return (

        <Container className='mt-4'>

            <h2 className='mb-4'>Edit Product</h2>

            {/* fetch loading error */}
            {fetchError && <Alert variant="danger">{fetchError}</Alert>}

            {/* update error */} 
            {updateError && <Alert variant="danger">{updateError}</Alert>}

            {/* submit success */} 
            {success && (
                <Alert variant="success">Product updated successfully</Alert>
            )}           


            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label className="fw-bold">Product Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPrice">
                    <Form.Label className="fw-bold">Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label className="fw-bold">Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formCategory">
                    <Form.Label className="fw-bold">Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>   

                <Button 
                    type='submit' 
                    variant='primary' 
                    disabled={updating}
                    className='me-2'
                >
                    {updating ? 'Saving...' : 'Save Changes'}
                </Button>             

                <Button
                    variant="secondary"
                    className='ms-2'
                    onClick={() => navigate('/products')}
                >
                    Cancel
                </Button>

            </Form>

        </Container>

    )

};

export default EditProduct;
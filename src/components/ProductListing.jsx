// src/components/Users.js

import { Link } from 'react-router-dom';

import { useFetchListing } from './FetchListing'; 

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


function ProductListing() {
  
  const { products, loading, error } = useFetchListing();     // State to store users

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
          Loading Products...   
        </h3>

      </Container>
    )

  }

  if (error) return <p>{error}</p>;

  return (
    <Container>

      <h3 className="my-3">Products</h3>

      <Button as={Link} to="/add-product" className="btn-info my-3">
        Add Product
      </Button>

      <Row>
        {products.map(product => (

          <Col key={product.id} className="mt-4">

            <Card style={{ width: '18rem' }} >
              {/* render product image */}
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                style={{ height: '200px', objectFit: 'contain', padding: '1rem' }}
              />

              <Card.Body>

                <Card.Title>{product.title}</Card.Title>

                <Card.Subtitle className="mb-2 text-muted">${product.price}</Card.Subtitle>
                
                <Button 
                  as={Link} 
                  to={`/products/${product.id}`} 
                  className="btn-dark me-2"
                >
                  Product Details
                </Button>

                <Button 
                  as={Link} 
                  to={`/edit-product/${product.id}`} 
                  className="btn-secondary">
                  Edit Product
                </Button>

              </Card.Body>

            </Card>

          </Col>

        ))}
      </Row>
      
    </Container>
  );
}

export default ProductListing;
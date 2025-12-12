// src/components/ProductDetails.jsx

import { useParams } from 'react-router-dom';
import { useFetchProductId } from './FetchProducts.jsx';
import { useAddToCart } from './AddProduct.jsx';
import { useDeleteProduct } from './DeleteProduct.jsx';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ProductDetails() {
  const { productId } = useParams();      

  // fetch product
  const { product, loading, error } = useFetchProductId(productId);

  // event handlers
  const { 
    message: cartMessage, 
    showAddModal,
    openAddModal,
    closeAddModal,
    handleAddToCart 
  } = useAddToCart();
  
  const { 
    showConfirmModal,
    handleOpenModal,
    handleCloseModal,
    handleDeleteProduct 
  } = useDeleteProduct(productId);


  if (loading) {
    return (
      <Container className="mt-4">
        <h3>
          <Spinner
            animation="border"
            variant="info"
            style={{ marginRight: '15px' }}
            role="status"
          />
          Loading Product Details...
        </h3>
      </Container>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <Container className="mt-4">

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
          <Card.Text>{product.description}</Card.Text>

          {/* Event Buttons */}
          <Row className="mt-4">
            <Col>
              <Button variant="primary" className="w-100" onClick={openAddModal}>
                Add to Cart
              </Button>
            </Col>

            <Col>
              <Button variant="secondary" className="w-100" onClick={handleOpenModal}>
                Delete Product
              </Button>
            </Col>
          </Row>

          {(cartMessage) && (
            <p className="mt-3 text-center text-info fw-bold">
              {cartMessage}
            </p>           
          )}

        </Card.Body>

        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <strong>Category:</strong> {product.category}
          </ListGroup.Item>

          <ListGroup.Item>
            <strong>Price:</strong> ${product.price}
          </ListGroup.Item>
        </ListGroup>

      </Card>

      <Modal
        show={showAddModal} 
        onHide={closeAddModal} 
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Would you like to add this product to your cart?
        </Modal.Body>

        <Modal.Footer>
          <Button 
          variant="secondary" 
          onClick={closeAddModal}
          >
            Cancel
          </Button>

          <Button 
          variant="primary" 
          onClick={handleAddToCart}
          >
            Confirm
          </Button>
        </Modal.Footer>


      </Modal>

      <Modal
        show={showConfirmModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to delete this product? This action cannot be undone.
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>  

    </Container>
    
  );

}

export default ProductDetails;

//  <Button as={Link} to={`/product-details/${product.id}`} className="btn-dark">Product Details</Button>

//  <Button as={Link} to={`/product-details/${product.id}`} className="btn-dark">Product Details</Button>

                

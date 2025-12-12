// src/components/AddProductModal.jsx

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Modal showing the successfully added categories
const AddProductModal = ({ newProduct, submitted, showModal, handleCloseModal }) => {

    return (
        <>
    
            <Modal show={showModal} onHide={handleCloseModal}>

                <Modal.Header closeButton>
                    <Modal.Title>Product Submitted</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {submitted &&
                        <>
                            <p>{newProduct.title} Submitted</p>
                            <p><b>Product Title: </b>{newProduct.title}</p>
                            <p><b>Price: </b>{newProduct.price}</p>
                            <p><b>Description: </b>{newProduct.description}</p>
                            <p><b>Category: </b>{newProduct.category}</p>
                        </>
                    }
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='primary' onClick={handleCloseModal}>
                     Close
                    </Button>
                </Modal.Footer>

            </Modal>
    
        </>
    )

}

export default AddProductModal;
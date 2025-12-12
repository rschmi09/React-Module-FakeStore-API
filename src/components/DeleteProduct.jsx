// src/components/DeleteProduct.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function useDeleteProduct(productId) {

    const [deleteMessage, setDeleteMessage] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const navigate = useNavigate();

    // Open modal
    const handleOpenModal = () => {
        setShowConfirmModal(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setShowConfirmModal(false);
    };

    const handleDeleteProduct = async () => {
        try {
            await axios.delete(`https://fakestoreapi.com/products/${productId}`);
            setDeleteMessage("Product Deleted");

            // hide modal after product is deleted
            setShowConfirmModal(false);

            setTimeout(() => navigate("/products"), 500);
            
        } catch (err) {
            setDeleteMessage(`Failed to delete product: ${err.message}`);
            setShowConfirmModal(false);
        }
    };

    return { 
        deleteMessage, 
        showConfirmModal,
        handleOpenModal,
        handleCloseModal,
        handleDeleteProduct
    };

}


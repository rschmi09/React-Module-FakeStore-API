// stc/components/AddProduct

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAddToCart () {

    const [message, setMessage] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

    const navigate = useNavigate();

    const openAddModal = () => setShowAddModal(true);
    const closeAddModal = () => setShowAddModal(false);

    const handleAddToCart = () => {

        setMessage("Added to Cart");

        setTimeout(() => navigate("/products"), 500);

        setShowAddModal(false);

    };

    return { 
        message, 
        showAddModal,
        openAddModal,
        closeAddModal,
        handleAddToCart, 
    };

}


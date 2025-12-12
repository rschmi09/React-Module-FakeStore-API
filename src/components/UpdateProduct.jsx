// src/components/UpdateProduct.jsx

import { useState } from 'react';
import { useCallback } from 'react';

import axios from 'axios';

// for EditProducts.jsx
export function useUpdateProduct() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const updateProduct = useCallback(async (productId, formData) => {
        
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await axios.put(
                `https://fakestoreapi.com/products/${productId}`,
                formData
            );
            setSuccess(true);

        } catch (err) {
            setError(`Failed to update product: ${err.message}`);
            
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        updateProduct,
        loading,
        error,
        success
    };
}
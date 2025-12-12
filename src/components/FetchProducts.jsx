// src/components/FetchProducts.jsx

import { useState } from 'react';
import { useEffect } from 'react';

import axios from 'axios';

export function useFetchProductId (productId) {

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!productId) return;

        let cancelled = false;


        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
                if (!cancelled) {
                    setProduct(prev => (prev?.id !== response.data.id ? response.data : prev));
                }

            } catch (producterror) {
                if (!cancelled) setError(`Failed to fetch: ${producterror.message}`);

            } finally {
                if (!cancelled) setLoading(false);
            }
        };
    
        fetchProduct();

        return () => (cancelled = true);
        
    }, [productId]);

    return { product, loading, error };


}


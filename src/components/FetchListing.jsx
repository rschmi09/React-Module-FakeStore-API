// src/components/FetchListing.jsx

import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

// Fetch products (for ProductListing.jsx)
export function useFetchListing() {
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                const response = await axios.get("https://fakestoreapi.com/products");
                if (!cancelled) setData(response.data);

            } catch (err) {
                if (!cancelled) setError(`Failed to fetch products: ${err.message}`);
            
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => (cancelled = true);

    }, []);

    return {products: data, loading, error};
}
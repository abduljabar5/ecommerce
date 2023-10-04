'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from '@components/ProductCard';
import SellPageProductCard from './SellPageProductCard';

const GetProduct = ({ view }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/product');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Fetch Error: ', error);
            }
        };

        fetchProducts();
    }, []);

    // Determining which component to render based on the view prop
    const CardComponent = view === 'admin' ? ProductCard : 
                          view === 'user'  ? SellPageProductCard : 
                          null;

    if (!CardComponent) {
        return <p>Invalid view type. Please provide a valid view type: 'admin' or 'user'.</p>
    }
    const gridClasses = view === 'user' 
    ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-x-auto'
    : 'flex overflow-x-auto space-x-4';

    return (
        <div className={gridClasses}>
            {products.map((product, index) => (
                <CardComponent key={index} product={product} />
            ))}
        </div>
    );
};

export default GetProduct;


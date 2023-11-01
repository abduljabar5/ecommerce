'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from '@components/ProductCard';
import SellPageProductCard from './SellPageProductCard';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import Loading from './Loading';
const GetProduct = ({ view }) => {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = React.useState("Shoes");
    const categories = ['Shirts', 'Pants', 'Shoes', 'Accessories', 'Sports'];
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/product', { cache: 'no-store' });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
                setReload(false);
                setLoading(false);
            } catch (error) {
                console.error('Fetch Error: ', error);
            }

        };
        fetchProducts();
    }, [reload]);
    const CardComponent = view === 'admin' ? ProductCard :
        view === 'user' ? SellPageProductCard :
            null;

    if (!CardComponent) {
        return <p>Invalid view type. Please provide a valid view type: 'admin' or 'user'.</p>
    }
    const gridClasses = view === 'user'
        ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-x-auto'
        : 'flex overflow-x-auto space-x-4';

    return (

        <>
            {view === 'admin' ? <>
                {loading ? <div><Loading /></div> :
                    <div className='flex flex-col overflow-y-auto space-y-4'>

                        {products.map((product, index) => (
                            <CardComponent key={index} product={product} setReload={setReload} />
                        ))}

                    </div>}</> : <div>
                <Tabs value={activeTab}>

                    <TabsHeader
                        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                        indicatorProps={{
                            className:
                                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                        }}
                    >
                        {categories.map((product, index) => (
                            <Tab
                                key={index}
                                value={product}
                                onClick={() => setActiveTab(product)}
                                className={activeTab === product ? "text-gray-900" : ""}
                            >
                                {product}
                            </Tab>
                        ))}
                    </TabsHeader>
                    {loading ? <div><Loading /></div> :
                        <TabsBody> <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>

                            {products.map((product, index) => (


                                <TabPanel key={index} value={product.category}>

                                    <CardComponent key={index} product={product} setReload={setReload} />
                                </TabPanel>

                            ))} </div>
                        </TabsBody>
                    }

                </Tabs>
            </div>}

        </>
    );
};

export default GetProduct;


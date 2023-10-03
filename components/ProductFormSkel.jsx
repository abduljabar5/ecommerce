'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, Input, Textarea, Button } from "@material-tailwind/react";
import { useSession } from 'next-auth/react';
const ProductFormSkel = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [salePrice, setSalePrice] = useState(0);
    const [products, setProducts] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const { data: session } = useSession();

    const handleSubmitOne = (e) => {
        e.preventDefault();
        setProducts({
            userId: session.user.id,
            productName,
            price: Number(price), // parse price as number
            imageUrl,
            description,
            salePrice: Number(salePrice) // parse salePrice as number
        });
    };
    
    const createProduct = async () => {
        setSubmitting(true);
        try {
            const response = await fetch('/api/product/new', {
                method:'POST',
                body: JSON.stringify({
                    products
                })
            });
            if(response.ok){
                console.log('ok');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    useEffect(() => {
        console.log("products:", products);
        // Condition to avoid sending an API request with empty product
        if(products.productName) {
            createProduct();
        }
    }, [products]);

  return (
    <div> <section className="my-6 p-6 border border-gray-200 rounded-md">
    <h2 className="text-2xl mb-4 text-center">Add Product</h2>
    <form onSubmit={handleSubmitOne} className="w-1/2 mx-auto">
        <div className="mb-4">
            <Input
                type="text"
                color="lightBlue"
                size="regular"
                outline={true}
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                fullwidth
            />
        </div>
        <div className="mb-4">
            <Input
                type="text"
                color="lightBlue"
                size="regular"
                outline={true}
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullwidth
            />
        </div>
        <div className="mb-4">
            <Input
                type="text"
                color="lightBlue"
                size="regular"
                outline={true}
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                fullwidth
            />
        </div>
        <div className="mb-4">
            <Textarea
                color="lightBlue"
                size="regular"
                outline={true}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullwidth
            />
        </div>
        <div className="mb-4">
            <Input
                type="text"
                color="lightBlue"
                size="regular"
                outline={true}
                placeholder="Sale Price (Optional)"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                fullwidth
            />
        </div>
       
        <div className="flex justify-end mt-6">
            <Button
                color="lightBlue"
                buttonType="filled"
                size="regular"
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="light"
                type="submit"
            >
                Add Product
            </Button>
        </div>
    </form>
</section></div>
  )
}

export default ProductFormSkel
'use client';
import React, { useState, useEffect } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Input,
    Select,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
const ProductDetail = (promps) => {
    // const [action, setAction] = useState(false)
    console.log("new Product:", promps);
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const colors = ['red', 'blue', 'green', 'yellow'];
    const { category, desc, discount, image, name, price } = promps.product
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(sizes[0]);
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const handleButton = () => {
        promps.handleOpen(false);
    }
    const handleAddToCart = () => {
        // Create a product object to keep the data clean and structured
        const productData = {
            name,
            desc,
            price,
            selectedSize,
            selectedColor,
            quantity,
        };

        console.log("Adding the following product to cart:", productData);

        // If using Redux, dispatch an action here to add to your cart state
        // dispatch(addProductToCart(productData));

        // If sending to a server, make a POST request here
        // axios.post("/api/cart", productData);
    };
    return (
        <Card className="w-full max-w-[48rem] flex-row relative">
            <button
                className="absolute top-4 right-4 p-2 bg-white rounded-full hover:shadow-xl hover:bg-gray-100"
                onClick={() => { handleButton() }}
            >
                <XMarkIcon className="w-4 h-4" />
            </button>
            <CardHeader
                shadow={false}
                floated={false}
                className="m-0 w-2/5 shrink-0 rounded-r-none"
            >
                <img
                    src={image}
                    alt="product-image"
                    className="h-full w-full object-cover"
                />
            </CardHeader>
            <CardBody>

                <Typography variant="h6" color="gray" className="mb-4 uppercase">
                    {name}
                </Typography>
                <Typography color="gray" className="mb-4 font-normal">
                    {desc}
                </Typography>
                <div className="flex items-center">
                {promps.discountedPrice ? (
                    <><Typography variant="h6" color="blue-gray" className="font-medium mr-2 mb-4">
                        ${promps.discountedPrice || price}
                    </Typography><Typography variant="h6" color="blue-gray" className="font-medium line-through mb-4">
                            ${price}
                        </Typography></>
                ) : (<Typography variant="h6" color="blue-gray" className="font-medium mb-4">
                    ${price}
                </Typography>)}
                </div>

                {/* Size Selector */}
                <div className="flex mb-4">
                    {sizes.map((size, index) => (
                        <Button
                            key={index}
                            color={selectedSize === size ? "lightBlue" : "gray"}
                            onClick={() => setSelectedSize(size)}
                            className="m-1 px-4 py-1"
                        >
                            {size}
                        </Button>
                    ))}
                </div>

                {/* Color Selector */}
                <div className="flex mb-4">
                    {colors.map((color, index) => (
                        <Button
                            key={index}
                            color={selectedColor === color ? "lightBlue" : "gray"}
                            onClick={() => setSelectedColor(color)}
                            className="m-1"
                        >
                            {color}
                        </Button>
                    ))}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center mt-auto">
                    <Button
                        color="gray"
                        onClick={() => setQuantity(q => Math.max(q - 1, 1))}
                        className="m-1"
                    >
                        -
                    </Button>
                    <Typography color="gray" className="mx-4">
                        {quantity}
                    </Typography>
                    <Button
                        color="gray"
                        onClick={() => setQuantity(q => q + 1)}
                        className="m-1"
                    >
                        +
                    </Button>
                    <Button color="lightBlue" className="m-1" ripple="dark"
                    onClick={() => { handleAddToCart() }}
                >
                    Add to Cart
                </Button>
                </div>
                
            </CardBody>
        </Card>

    )
}

export default ProductDetail
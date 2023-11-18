'use client';
import React, { useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import RatingStars from '@components/RatingStars';
import { addToCart } from '@utils/idb';
import { toast } from 'sonner';
import { useAppContext } from '@utils/appProvider';
import { useSession } from "next-auth/react";

import Link from 'next/link';
const ProductDetail = (promps) => {
    const { cartItemCount, add2Cart } = useAppContext();
    const { data: session } = useSession();
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const colors = ['red', 'blue', 'green', 'yellow'];
    const { category, desc, image, name, price, _id, images } = promps.product
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const discountedPrice = promps.discountedPrice;
    const handleButton = () => {
        promps.handleOpen(false);
    }
    const handleAdd2Cart = () => {
        add2Cart(1);
    };
    const handleAddToCart = async () => {
        const productData = {
            creator: session?.user?.id,
            _id,
            name,
            desc,
            price,
            discountedPrice,
            selectedSize,
            selectedColor,
            quantity,
            image,
            images,
            category,
        };

        console.log("Adding the following product to cart:", productData);
        try {
            await addToCart(productData);
            toast.success("Added itme to cart!");
            handleAdd2Cart();
            handleButton();
            console.log('cart item count:c', cartItemCount);
        } catch (error) {
            console.error('Error adding item to cart:', error);
            toast.error('Product already in cart!', { background: 'pink' },);
            handleButton();
        }
    };
    return (
        <Card className="lg:flex-row sm:flex-col relative">
            <button
                className="absolute top-4 z-10 right-4 p-2 bg-white rounded-full hover:shadow-xl hover:bg-gray-100"
                onClick={() => { handleButton() }}
            >
                <XMarkIcon className="w-4 h-4" />
            </button>
            <CardHeader
                shadow={false}
                floated={false}
                className="m-0 lg:w-2/5 shrink-0"
            >
                <img
                    src={image || images[0]}
                    alt="product-image"
                    className=" object-fill"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h6" color="gray" className="mb-4 uppercase">
                    {name}
                </Typography>
                <Typography color="gray" className="mb-4 font-normal">
                    {desc}
                </Typography>
                <RatingStars />
                <div className="flex">
                    {promps.discountedPrice ? (
                        <><Typography variant="h6" color="blue-gray" className="font-lg text-lg mr-2 mb-4">
                            ${promps.discountedPrice || price}
                        </Typography><Typography variant="h6" color="blue-gray" className="font-medium line-through mb-4">
                                ${price}
                            </Typography></>
                    ) : (<Typography variant="h6" color="blue-gray" className="font-medium mb-4">
                        ${price}
                    </Typography>)}
                </div>

                {/* Size Selector */}
                <div className=" mb-4">
                    {sizes.map((size, index) => (
                        <Button
                            key={index}
                            className={selectedSize === size ? "lightBlue m-1 px-4 py-1" : "ring-black ring-1 text-black bg-transparent m-1 px-4 py-1 shadow-none"}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </Button>
                    ))}
                </div>

                {/* Color Selector */}
                <div className=" mb-4">
                    {colors.map((color, index) => (
                        <Button
                            key={index}
                            className={selectedColor === color ? "light-blue m-1 px-4 py-1" : "ring-black ring-1 text-black bg-transparent m-1 px-4 py-1 shadow-none"}
                            onClick={() => setSelectedColor(color)}
                        >
                            {color}
                        </Button>
                    ))}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center mt-auto">
                    <Button

                        onClick={() => setQuantity(q => Math.max(q - 1, 1))}
                        className="m-1 bg-transparent text-black shadow-none text-lg"
                    >
                        -
                    </Button>
                    <Typography color="gray" className="mx-4">
                        {quantity}
                    </Typography>
                    <Button
                        color="gray"
                        onClick={() => setQuantity(q => q + 1)}
                        className="m-1 bg-transparent text-black shadow-none text-lg"
                    >
                        +
                    </Button>
                    <Button color="blue-gray" className="m-1" ripple="dark"
                        onClick={() => { handleAddToCart() }}
                        disabled={!selectedColor || !selectedSize}
                        fullWidth
                    >
                        Add to Cart
                    </Button>
                </div>
                <Link href={`/productdetail/${_id}`}>
                    <Button fullWidth>View product detail</Button>
                </Link>

            </CardBody>
        </Card>

    )
}

export default ProductDetail
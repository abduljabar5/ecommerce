'use client';
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  Select,
} from "@material-tailwind/react";

import RatingStars from '@smallcomponents/RatingStars';
import { addToCart, getCartItems } from '@utils/idb';
import { toast } from 'sonner';
import { useAppContext } from '@utils/appProvider';
import Link from 'next/link';
const Product = ({ params }) => {

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['red', 'blue', 'green', 'yellow'];
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [productData, setProductData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const getProduct = async () => {
    try {
      const response = await fetch(`/api/product/${params.id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("🚀 ~ file: page.jsx:13 ~ getProduct ~ data:", data)
      setProductData(data);
      setActiveImage(data.images[0])
      setIsLoading(false);

    } catch (error) {
      console.error('Fetch Error: ', error);
    }
  }
  useEffect(() => {
    getProduct();
  }, [])
  useEffect(() => {
    console.log("product data:", productData);
  }, [productData])
  return (
    <div className="flex flex-col md:flex-row m-8">
      {isLoading ? <div>Loading...</div> :
        <><div className="flex flex-col-reverse md:flex-col md:w-1/2">
         <div className="h-[70%] flex items-center justify-center overflow-hidden rounded-xl">
    <img
        src={activeImage}
        alt="Large product"
        className="w-full object-cover transform transition-transform duration-500 hover:scale-90"
    />
</div>


          <div className="flex space-x-2 mt-2 rounded-xl">
            {productData.images.map((img, idx) => (
              <div
                key={idx}
                className="relative w-16 h-16 cursor-pointer rounded-xl overflow-hidden"
                onClick={() => setActiveImage(img)}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className="w-full h-full object-cover"
                />
                {activeImage === img && (
                  <div className="absolute inset-0 bg-black opacity-20 ring-2 ring-black"></div>
                )}
              </div>
            ))}
          </div>

        </div><div className="md:w-1/2 p-4">
            <h1 className="text-xl md:text-3xl mb-2">{productData.name}</h1>
            <p className="text-sm md:text-base mb-2">★★★★☆ (40 reviews)</p>
            <Typography color="gray" className="mb-4 font-normal">
                    {productData.desc}
                </Typography>
                <RatingStars />
                <div className="flex">
                    {productData.discount ? (
                        <><Typography variant="h6" color="blue-gray" className="font-lg text-lg mr-2 mb-4">
                            ${productData.discount || productData.price}
                        </Typography><Typography variant="h6" color="blue-gray" className="font-medium line-through mb-4">
                                ${productData.price}
                            </Typography></>
                    ) : (<Typography variant="h6" color="blue-gray" className="font-medium mb-4">
                        ${productData.price}
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
          </div></>
      }
    </div>
  )
}

export default Product
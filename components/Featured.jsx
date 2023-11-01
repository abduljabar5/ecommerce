import React from 'react'
import {
  EyeIcon,
  ShoppingCartIcon
} from "@heroicons/react/24/outline";
const Featured = () => {
  return (
    <div className="bg-gray-100 py-12 my-12 relative overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.everydayhealth.com/images/what-are-natural-skin-care-products-alt-1440x810.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover blur-md"
      />
      {/* Frosted Glass Overlay */}
      <div
        className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-md"
        style={{ backdropFilter: 'blur(10px)' }}
      ></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap -mx-4">
          {/* Product Image */}
          <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0 flex items-center justify-center">
            <img
              src="https://images.everydayhealth.com/images/what-are-natural-skin-care-products-alt-1440x810.jpg"
              alt="Featured Product"
              className="w-full md:w-3/4 object-cover rounded-lg shadow-lg"
            />
          </div>
          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-4">Featured Product</h2>
            <p className="text-lg text-gray-700 mb-6">Your exciting product description here. Highlight the key features and benefits that make this product special and worth purchasing.</p>
            <div className=" flex space-y-4 md:space-y-0 md:space-x-4">
              <button className="flex items-center bg-black-500 text-white px-4 py-2 rounded-md hover:bg-black focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-800">
                <span>View</span>
                <EyeIcon className="h-5 w-5 ml-2" />
              </button>

              <button className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-200 active:bg-gray-800">
                <span>Add to cart</span>
                <ShoppingCartIcon className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured
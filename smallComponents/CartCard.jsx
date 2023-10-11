'use client';
import {useEffect, useState} from 'react';
import { addToCart, getCartItems } from '@utils/idb';

function CartCard() {
    const [CartItems, setCartItems] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const colorClasses = {
    red: "bg-red-700",
    blue: "bg-blue-700",
    yellow: "bg-yellow-700",
    green: "bg-green-700"
};
// GET
    const fetchCartItems = async () => { 
        try {
          const items = await getCartItems();
          setCartItems(items);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      };
      const handleCartChange = () => {
        fetchCartItems();
    };
// /GET/ //
// DELETE
const deleteCartItem = async () => { 
    
}
// DELETE / //
    useEffect(() => {
        fetchCartItems();
        window.addEventListener('cartChanged', handleCartChange);
        return () => {
            window.removeEventListener('cartChanged', handleCartChange);
        };
    }, []);

    useEffect(() => {
        console.log('items:', CartItems);
    }, [CartItems]);
    return (
        <div className="border-t border-gray-600">
    {isLoading ? (
        <div>Loading...</div>
    ) : (
        <div>
            {CartItems.map((item, index) => (
                <div key={index} className="flex gap-4 py-4 my-4">
                    <div className="w-1/4">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-center object-cover rounded-lg"
                        />
                    </div>
                    <div className="md:pl-3 md:w-3/4 w-full my-4">
                        <div className="flex items-center justify-between w-full pt-1">
                            <p className="text-base font-black leading-none text-gray-800">
                                {item.name}
                            </p>
                            <select className="py-2 px-1 border-none border-gray-200 mr-6 focus:outline-none">
                                <option>01</option>
                                <option>02</option>
                                <option>03</option>
                            </select>
                        </div>
                        <p className="text-xs leading-3 text-gray-600 pt-2">
                            Size: {item.selectedSize}
                        </p>
                        <p className={`text-xs leading-3 text-gray-600 py-2`}>
                            Color: <span className={`bg-${colorClasses[item.selectedColor]} p-1 text-white rounded-full`}> {item.selectedColor}</span>
                        </p>
                        <div className="flex items-center justify-between pt-5 pr-6">
                            <div className="flex items-center">
                                <p className="text-xs leading-3 text-red-500 pl-5 cursor-pointer underline">
                                    Remove
                                </p>
                            </div>
                            <p className="text-base font-black leading-none text-gray-800">
                                ${item.price}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )}
</div>

    );
}
export default CartCard;
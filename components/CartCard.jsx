'use client';
import { useEffect, useState } from 'react';
import { deleteFromCart, getCartItems } from '@utils/idb';
import { useAppContext } from '@utils/appProvider';
function CartCard() {
    const { cartItemCount, addToCart, notificationCount, addNotification } = useAppContext();
    const [CartItems, setCartItems] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState({});
    const [total, setTotal] = useState(0);
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
    const deleteCartItem = async (deleteId) => {
        try {
            await deleteFromCart(deleteId);
            fetchCartItems();
        } catch (error) {
            console.error('Error deleting cart item:', error);
        }
    };
    const handleDelete = (deleteID) => {
        deleteCartItem(deleteID);
    }
    // DELETE / //
    const handleQuantityChange = (itemId, value) => {
        setQuantity((prevQuantity) => {
            const newQuantity = { ...prevQuantity, [itemId]: value };
            localStorage.setItem('cartQuantity', JSON.stringify(newQuantity));
            return newQuantity;
        });
    };
    useEffect(() => {
        if (CartItems && quantity) {
            const newTotal = CartItems.reduce((acc, item) => {
                const itemTotal = item.discountedPrice
                    ? (quantity[item._id] || 1) * item.discountedPrice
                    : (quantity[item._id] || 1) * item.price;
                return acc + itemTotal;
            }, 0);
            setTotal(newTotal);
            localStorage.setItem('cartTotal', JSON.stringify(newTotal));
        }
    }, [CartItems, quantity]);
    useEffect(() => {
        const savedQuantity = localStorage.getItem('cartQuantity');
        const savedTotal = localStorage.getItem('cartTotal');

        if (savedQuantity) {
            setQuantity(JSON.parse(savedQuantity));
        }
        if (savedTotal) {
            setTotal(JSON.parse(savedTotal));
        }
        fetchCartItems();
        window.addEventListener('cartChanged', handleCartChange);
        return () => {
            window.removeEventListener('cartChanged', handleCartChange);
        };
    }, []);
    useEffect(() => {
        fetchCartItems();
    }, [cartItemCount])
    useEffect(() => {
        console.log(CartItems);
    }, [CartItems])
    return (
        <div className='h-[89%]'><div className="border-t border-gray-600 mb-4 height-96 overflow-auto">
            {isLoading ? ( 
                <div>Loading...</div>
            ) : (
                <div>
                    {[...CartItems].reverse().map((item, index) => (
                        <div key={index} className="flex gap-4 py-4 my-4">
                            <div className="w-1/4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-center object-cover rounded-lg" />
                            </div>
                            <div className="md:pl-3 md:w-3/4 w-full my-4">
                                <div className="flex items-center justify-between w-full pt-1">
                                    <p className="text-base font-black leading-none text-gray-800">
                                        {item.name}
                                    </p>
                                    <select value={quantity[item._id] || 1} onChange={(e) => handleQuantityChange(item._id, e.target.value)} className="py-2 px-1 border-none mr-6 focus:outline-none cursor-pointer">
                                        <option value='1'>01</option>
                                        <option value='2'>02</option>
                                        <option value='3'>03</option>
                                    </select>
                                </div>
                                <p className="text-xs leading-3 text-gray-600 pt-2">
                                    Size: {item.selectedSize}
                                </p>
                                <p className="text-xs leading-3 text-gray-600 py-2 flex items-center gap-2">
                                    Color:
                                    <span
                                        className="p-1 text-white rounded-full w-4 h-4 inline-block my-auto"
                                        style={{ backgroundColor: item.selectedColor }}
                                    >
                                    </span>
                                </p>

                                <div className="flex items-center justify-between pt-5 pr-6">
                                    <div className="flex items-center">
                                        <button onClick={() => { handleDelete(item._id); } } className="text-xs leading-3 text-red-500 p-0 cursor-pointer underline">
                                            Remove
                                        </button>
                                    </div>
                                    <p className="text-base font-black leading-none text-gray-800">
                                        ${item.discountedPrice
                                            ? (quantity[item._id] || 1) * item.discountedPrice
                                            : (quantity[item._id] || 1) * item.price}
                                    </p>

                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}


        </div><div className='flex flex-row justify-end gap-4 items-center mx-4'>
                <p>Subtotal: ${total}</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md focus:outline-none focus:shadow-outline-blue active:bg-blue-700">
                    Checkout
                </button>

            </div></div>

    );
}
export default CartCard;
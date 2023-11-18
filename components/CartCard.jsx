'use client';
import { useEffect, useState } from 'react';
import { deleteFromCart, getCartItems, updateCartItem } from '@utils/idb';
import { useAppContext } from '@utils/appProvider';
import Checkout from './Checkout';
import EmptyCart from './EmptyCart';
function CartCard() {
    const { cartItemCount } = useAppContext();
    const [CartItems, setCartItems] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState({});
    const [total, setTotal] = useState(0);
    // GET
    const fetchCartItems = async () => {
        try {
            const items = await getCartItems();
            if (!items.discountedPrice) {
            // Assuming items is an array of item objects
            const updatedItems = items.map(item => {
                if (!item.discountedPrice) {
                    const newPrice =
                        item.discount > 0 ?
                        (item.price - (item.price * item.discount / 100)).toFixed(2) :
                        item.price; // Keep the original price if no discount
                    
                    return { ...item, discountedPrice: newPrice };
                }
                return item;
            });
        
            console.log("🚀 ~ file: CartCard.jsx:23 ~ fetchCartItems ~ updatedItems:", updatedItems);
            setCartItems(updatedItems);
             } else {
                setCartItems(items)
             }
             
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
            // Save to IndexedDB
            updateCartItem({
                _id: itemId,
                quantity: value,
            });
            return newQuantity;
        });
    };

    useEffect(() => {
        if (CartItems && quantity) {
            const newTotal = CartItems.reduce((acc, item) => {
                const itemTotal = parseInt(item.discountedPrice)
                    ? (quantity[item._id] || 1) * parseInt(item.discountedPrice)
                    : (quantity[item._id] || 1) * parseInt(item.price);
                return acc + itemTotal;
            }, 0);
            setTotal(newTotal);
        }

    }, [CartItems, quantity]);
    useEffect(() => {
        const fetchSavedCartData = async () => {
            try {
                const savedItems = await getCartItems();
                const savedQuantity = savedItems.reduce((acc, item) => {
                    acc[item._id] = item.quantity;
                    return acc;
                }, {});
                setCartItems(savedItems);
                setQuantity(savedQuantity);
            } catch (error) {
                console.error('Error fetching saved cart data:', error);
            }
        };

        fetchSavedCartData();
        window.addEventListener('cartChanged', handleCartChange);

        return () => {
            window.removeEventListener('cartChanged', handleCartChange);
        };
    }, []);
    useEffect(() => {
        fetchCartItems();
    }, [cartItemCount])
    return (
        <div className='h-[89%]'><div className="border-t border-gray-300 mb-4 height-96 overflow-auto">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {CartItems.length === 0 ? (<div><EmptyCart /></div>) : (<>
                        {[...CartItems].reverse().map((item, index) => (
                            <div key={index} className="flex flex-col lg:flex-row xl:flex-row md:flex-row gap-4 py-4 my-4">
                                <div className="lg:w-1/3 md:w-1/3 xl:w-1/3 h-44">
                                    <img
                                        src={item?.image || item?.images[0]}
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
                                            <button onClick={() => { handleDelete(item._id); }} className="text-xs leading-3 text-red-500 p-0 cursor-pointer underline">
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
                        ))} </>)}
                </div>
            )}


        </div><div className='flex flex-row justify-end gap-4 items-center mx-4'>

                <Checkout total={total} items={CartItems} quantity={quantity} />

            </div></div>

    );
}
export default CartCard;
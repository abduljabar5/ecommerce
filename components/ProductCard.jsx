import {Button,} from "@material-tailwind/react";
  
  export default function HorizontalCard({ product, setReload }) {

        const deleteProduct = async () => {
            try {
                const response = await fetch(`/api/product/${product._id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setReload(true);
                const data = await response.json();
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
            
        };
    
    
    return (
       
        <div className="flex-none w-full max-w-full mb-6 md:w-6/12 xl:w-3/12 snap-always">
             <img src={product.image} alt="img-blur-shadow" class="w-64 shadow-soft-2xl rounded-2xl rounded-b-none h-64 object-cover" />
            <div className="p-4 bg-white rounded-2xl shadow-lg">
                <div className="px-1 pt-6">
                    
                    <p className="mb-2 text-xl font-bold leading-normal">{product.name}</p>
                    <a href="#">
                        <h5 className="font-bold">${product.price}</h5>
                    </a>
                    <p className="mb-6 text-sm leading-normal max-h-24 overflow-y-auto">{product.desc}</p>
                    <div className="flex items-center gap-2">
                        <Button
                            className="bg-gray-500 hover:bg-green-600 hover:shadow-green-900 p-2 ms-auto"
                            buttonType="outline"
                            size="regular"
                            rounded={true}
                            block={false}
                            iconOnly={false}
                            ripple="dark"
                        >
                            Update
                        </Button>
                        <div className="">
                        <Button
                            color="Black"
                            className="hover:bg-red-600 hover:shadow-red-900 p-2"
                            buttonType="outline"
                            size="regular"
                            rounded={true}
                            block={false}
                            iconOnly={false}
                            ripple="dark"
                            onClick={deleteProduct}
                        >
                            Delete
                        </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
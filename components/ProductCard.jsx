import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
  
  export default function HorizontalCard({ product }) {
    console.log(product);
    return (
       
        <div className="flex-none w-full max-w-full mb-6 md:w-6/12 xl:w-3/12 snap-always">
            <div className="p-4 bg-white rounded-2xl shadow-lg">
                <div className="relative rounded-2xl">
                    <a className="block rounded-2xl">
                    <img src={product.image} alt="img-blur-shadow" class="max-w-full shadow-soft-2xl rounded-2xl h-64 object-cover" />

                    </a>
                </div>
                <div className="px-1 pt-6">
                    <p className="mb-2 text-xl font-bold leading-normal">{product.name}</p>
                    <a href="#">
                        <h5 className="font-bold">${product.price}</h5>
                    </a>
                    <p className="mb-6 text-sm leading-normal max-h-24 overflow-y-auto">{product.desc}</p>
                    <div className="flex items-center justify-between">
                        <Button
                            className="bg-gray-500 hover:bg-green-600 hover:shadow-green-900"
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
                            className="hover:bg-red-600 hover:shadow-red-900 "
                            buttonType="outline"
                            size="regular"
                            rounded={true}
                            block={false}
                            iconOnly={false}
                            ripple="dark"
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
  
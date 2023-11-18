'use client'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import FormModal from "./FormModal";
import React from "react";
import RatingStars from "@components/RatingStars";
const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
};

const SellPageProductCard = ({ product }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);
    const discountedPrice =
        product.discount > 0 ?
            (product.price - (product.price * product.discount / 100)).toFixed(2) :
            null;
    return (
        <Card className=" my-12  relative">
            <img
                src={product.image || product.images[0]}
                alt="card-image"
                className="h-full w-full object-cover rounded-md"
            // style={{width:'288px', height:'288px'}}
            />
            {product.discount > 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-xs text-white px-2 py-1 rounded-full">
                    {product.discount}% OFF
                </div>
            )}
            <CardBody>
                <RatingStars />
                <div className="mb-1 lg:flex items-center justify-between">
                    <Typography color="blue-gray" className="text-sm font-bold lg:text-lg ">
                        {truncateText(product.name, 2)}
                    </Typography>
                    <div className="flex items-center">
                        {discountedPrice ? (
                            <><Typography color="blue-gray" className="lg:font-medium text-xs mr-2">
                                ${discountedPrice || product.price}
                            </Typography><Typography color="blue-gray" className="lg:font-medium text-xs  line-through">
                                    ${product.price}
                                </Typography></>
                        ) : (<Typography color="blue-gray" className="lg:font-medium text-xs ">
                            ${product.price}
                        </Typography>)}

                    </div>
                </div>
                <Typography
                    variant="small"
                    color="gray"
                    className="lg:font-normal lg:block hidden opacity-75"
                >
                    {truncateText(product.desc, 20)}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0 mt-auto text-xs">
                <Button
                    ripple={false}
                    fullWidth={true}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 text-xs px-2 py-2"
                    onClick={() => handleOpen(true)}
                >
                    View item
                </Button>
            </CardFooter>
            <FormModal product={product} discountedPrice={discountedPrice} handleOpen={handleOpen} open={open} />
        </Card>
    )
}

export default SellPageProductCard;


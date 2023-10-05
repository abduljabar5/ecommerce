import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
};

const SellPageProductCard = ({ product }) => {
    const discountedPrice = 
  product.discount > 0 ? 
    (product.price - (product.price * product.discount / 100)).toFixed(2) : 
    null;
    return (
        <Card className="w-72 my-12 relative">
            <img
                src={product.image}
                alt="card-image"
                className="h-full w-full object-cover rounded-md"
                style={{width:'288px', height:'288px'}}
            />
            {product.discount > 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full">
                    {product.discount}% OFF
                </div>
            )}
            <CardBody>
                <div className="mb-2 flex items-center justify-between">
                    <Typography color="blue-gray" className="font-medium">
                        {truncateText(product.name, 2)}
                    </Typography>
                    <div className="flex items-center">
                        {discountedPrice ? (
                             <><Typography color="blue-gray" className="font-medium mr-2">
                                ${discountedPrice || product.price}
                            </Typography><Typography color="blue-gray" className="font-medium line-through">
                                    ${product.price}
                                </Typography></>
                        ): (<Typography color="blue-gray" className="font-medium">
                        ${product.price}
                    </Typography>)}
                
                    </div>
                </div>
                <Typography
                    variant="small"
                    color="gray"
                    className="font-normal opacity-75"
                >
                    {truncateText(product.desc, 20)}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0 mt-auto">
                <Button
                    ripple={false}
                    fullWidth={true}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    )
}

export default SellPageProductCard;


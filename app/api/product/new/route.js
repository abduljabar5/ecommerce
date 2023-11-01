import { connectToDB } from "@utils/database";
import Product from '@models/product'
export const POST = async (req, res) => {

    const {products} = await req.json();
    try {
        console.log(products);
        await connectToDB();
        const newProduct = new Product({
            creator: products.userId,
            category: products.category,
            name: products.productName,
            desc: products.description,
            images: products.imageUrls,
            price: products.price,
            discount: products.salePrice,
        })
        await newProduct.save();

        return new Response(JSON.stringify(newProduct), {status: 201})
    } catch (error){
        return new Response("Failed to create a new prompt", {status:500})
    }
}  
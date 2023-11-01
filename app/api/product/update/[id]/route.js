import Product from "@models/product";
import { connectToDB } from "@utils/database";

export const PUT = async (req, { params }) => {
    console.log("🚀 ~ file: route.js:4 ~ UPDATE ~ params:", params.body);
    const { id } = params;
    const {products} = await req.json();
    try {
        await connectToDB();
        await Product.findOneAndUpdate({ 
            _id: id,
            creator: products.userId,
            category: products.category,
            name: products.productName,
            desc: products.description,
            images: products.imageUrls,
            price: products.price,
            discount: products.salePrice,
        });
        return new Response("Product updated successfully", { status: 200 });
    } catch (error) {
        console.error("Error updating Product:", error);
        return new Response("Error updating Product", { status: 500 });
    }
};

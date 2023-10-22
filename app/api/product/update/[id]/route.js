import Product from "@models/product";
import { connectToDB } from "@utils/database";

export const PUT = async (req, { params }) => {
    console.log("🚀 ~ file: route.js:4 ~ UPDATE ~ params:", params.body);

    // Assuming params.id contains the product ID and request.body contains the update data
    const { id } = params;
    const {products} = await req.json();


    // console.log(id, updateData);

    try {
        await connectToDB();
        console.log('Connected to DB');

        // Find the Product by ID and update it
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

import Product from "@models/product";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
console.log('yeppy');
        // Find the prompt by ID and remove it
        const product = await Product.findById(params.id);

        return new Response(JSON.stringify(product), { status: 200 })
    } catch (error) {
        return new Response("Error getting product", { status: 500 });
    }
}
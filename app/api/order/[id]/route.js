import Order from "@models/order";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        const orders = await Order.find({ 'Data.creator': params.id }).populate('Data.creator');
        if (orders.length > 0){
             return new Response(JSON.stringify(orders), { status: 200 })
        } 
        return new Response(undefined, { status: 200 })
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch all order", { status: 500 })
    }
}

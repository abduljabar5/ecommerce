import Order from "@models/order";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()
        const orders = await Order.find({})
        return new Response(JSON.stringify(orders), { status: 200 })
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch all order", { status: 500 })
    }
} 
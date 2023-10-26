import Orders from "@models/order";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const orders = await Orders.find({}).populate('creator')

        return new Response(JSON.stringify(orders), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all orders", { status: 500 })
    }
} 
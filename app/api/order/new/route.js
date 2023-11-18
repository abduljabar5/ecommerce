import { connectToDB } from "@utils/database";
import Order from '@models/order'
export const POST = async (req, res) => {

    const order = await req.json();
    try {
        await connectToDB();
        const newOrder = new Order(order)
        newOrder.save()
        return new Response(JSON.stringify(newOrder), {status: 201})
    } catch (error){
        return new Response("Failed to save a new order", {status:500})
    }
}  
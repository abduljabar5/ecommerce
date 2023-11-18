import Stripe from "stripe";
import { NextResponse } from "next/server";
export const POST = async (request) => {
    const stripe = new Stripe(process.env.TEST_STRIPE_SECRET_KEY);
    try {
        const reqBody = await request.json();
        const { items, email } = await reqBody;
        const extractingItems = await items.map((item) => ({
            quantity: item.quantity ? item.quantity : 1,
            price_data: {
                currency: "usd",
                unit_amount: (item.discountedPrice || item.price) * 100,
                product_data: {
                    name: item.name,
                    description: item.desc,
                    images: [item.image],
                },
            },
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: extractingItems,
            mode: "payment",
            success_url: `${process.env.NEXTAUTH_URL}/success`,
            cancel_url: `${process.env.NEXTAUTH_URL}/`,
            metadata: {
                email
            },
        });

        return NextResponse.json({
            message: "Connection is Active!",
            success: true,
            id: session.id,
        });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};


import Stripe from 'stripe';

const stripe = new Stripe(process.env.TEST_STRIPE_SECRET_KEY);

export const GET = async () => {
    try {
        const charges = await stripe.charges.list();
        return new Response(JSON.stringify(charges), { status: 200 })
      } catch (error) {
        return new Response("Failed to fetch all charges", { status: 500 })
      }
}
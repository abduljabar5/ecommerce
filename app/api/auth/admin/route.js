import { connectToDB } from "@utils/database";
import User from '@models/user';

export const POST = async (req, res) => {
    const { email } = await req.json();
console.log(email);
    try {
        await connectToDB();
        
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({success: false, message: `User with email: ${email} not found.` });
            return;
        }

        user.role = 'admin';
        await user.save();

        return new Response(JSON.stringify({success: true, message: `User with email: ${email} updated to admin.` }), {status: 200})

    } catch (error) {
        return new Response(JSON.stringify({success: false, message: "Error updating user to admin: ", error: error.message }), {status: 201})

    }
};


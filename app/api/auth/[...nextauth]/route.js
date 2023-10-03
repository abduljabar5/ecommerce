import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      session.user.role = sessionUser.role; // Add this line to include the role in session
    
      return session;
        
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();
console.log('proflie:', profile);
        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          try {
              await User.create({
                  email: profile.email,
                  username: profile.name.replace(" ", "").toLowerCase(),
                  password: profile.at_hash,
                  image: profile.picture,
              });
          } catch (error) {
              console.error("Error creating user:", error.message);
              // Optionally, if you want to log the full error object including the stack trace
              // console.error(error);
          }
      }
      
        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})
export { handler as GET, handler as POST }
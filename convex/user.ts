import { a } from "motion/react-client";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateNewUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        imageUrl: v.string()
    },
    handler: async (ctx, args) => {
        // check if user already exists
        const user = await ctx.db.query("UserTable")
        .filter((q)=>q.eq(q.field("email"), args.email))
        .collect();

        if (user?.length == 0) {
            const userData={
                name:args.name,
                email:args.email,
                imageUrl:args.imageUrl
            }
            // if not then  create new user
            const result = await ctx.db.insert("UserTable", userData);
            return userData;

    }
        return user[0];
    } 
})

// what we are doing here is that when a new user signs up using Clerk authentication we are creating a new entry for that user in Convex DB using this mutation.
// We first check if a user with the same email already exists in the Convex DB. If not, we create a new user entry with the provided name, email, and imageUrl.
// If the user already exists, we simply return the existing user data.
// This ensures that each user has a corresponding entry in the Convex DB for further interactions within the application.
// This mutation can be called from the client-side code whenever a new user signs up or logs in for the first time.
// Make sure to handle errors and edge cases as needed in a real application.
// Also, ensure that the Convex schema has a UserTable defined with appropriate fields (name, email, imageUrl, etc.).
// This is a basic implementation and can be extended based on specific application requirements.
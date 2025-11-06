import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// ✅ Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      role?: string | null;
    };
  }

  interface User {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    role?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
 
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          await connectDB();
          const user = await User.findOne({ email: credentials.email });
          if (!user) return null;

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) return null;

          // ✅ Return consistent user data
          return {
            id: user._id.toString(),
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            email: user.email,
            role: user.role ?? "user",
          };
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // ✅ Save user info in token
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName ?? "";
        token.lastName = user.lastName ?? "";
        token.role = user.role ?? "user";
      }
      return token;
    },

    async session({ session, token }) {
      // ✅ Attach token data to session.user
      if (session.user) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.role = token.role ?? "user";
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);

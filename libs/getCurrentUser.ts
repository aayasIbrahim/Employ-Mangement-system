// libs/session.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/authOption";

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return null;

    return {
      fristName: session.user.firstName,
      lastName: session.user.lastName,
      email: session.user.email,
      role: session.user.role, // make sure you store role in JWT or session
    };
  } catch (err) {
    console.error("Error getting current user:", err);
    return null;
  }
}

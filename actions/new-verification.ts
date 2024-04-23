"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/utils/user";
import { getVerificationTokenByToken } from "@/utils/verificationToken";

export const newVerificationToken = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenByToken(token);
    if (!existingToken) return { error: "Token does not exist" };
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) return { error: "Token has expired!" };
    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) return { error: "User does not exist" };

    await db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
    return { suceess: "Email verified" };
  } catch (error) {
    return null;
  }
};
